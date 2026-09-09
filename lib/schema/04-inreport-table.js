module.exports = {
  title: "InReport - Inventory Transaction Report",
  content: String.raw`

=== TABLE: InReport ===

PURPOSE:
InReport is the inventory transaction report table.

It contains item-level inventory and commercial transaction information,
including purchases, purchase returns, sales, sales returns, stock transfers,
adjustments, stores issues, direct expenses and other inventory movements.

==================================================
TABLE DEFINITION
==================================================

CREATE TABLE InReport
(
    DocTy varchar(6) not null,
    DocNo varchar(20) not null,
    DocLno int not null,
    TranType varchar(50) not null,
    DocTyDesc varchar(100),
    DocDate datetime,
    AcYear int,
    AcMth tinyint,

    CompCode varchar(6),
    CompName varchar(100),

    LocCode varchar(6),
    LocName varchar(100),

    LocGrpCode varchar(6),
    LocGrpName varchar(100),

    CCCode varchar(20),
    CCName varchar(250),

    ItemCode varchar(20),
    ItemDesc varchar(100),

    CatCode varchar(6),
    CatDesc varchar(100),

    GrpCode varchar(6),
    GrpDesc varchar(100),

    TypeCode varchar(10),
    TypeDesc varchar(100),

    BatchNo varchar(50),
    ExpiryDate datetime,

    BaseUom varchar(6),

    Qty decimal(15,3),
    TotCost decimal(15,3),
    TotAmount decimal(15,3),
    Discount decimal(15,3),
    TaxAmount decimal(15,3),

    SubLedgerCode varchar(20),
    SubLedgerName varchar(1000)
)

PRIMARY KEY:
(DocTy, DocNo, DocLno, TranType)

IMPORTANT:
TranType is part of the primary key.

Therefore multiple InReport rows can exist for the same:

DocTy + DocNo + DocLno

when their TranType values differ.

==================================================
BUSINESS PURPOSE
==================================================

InReport represents inventory-side transactions.

Use this table for questions relating to:

- Stock
- Inventory
- Items
- Purchases
- Purchase returns
- Sales
- Sales returns
- Transfers
- Adjustments
- Stores issues
- Direct expenses
- Inventory quantities
- Inventory cost
- Item sales
- Customer sales
- Supplier purchases
- Batch numbers
- Expiry dates
- Locations
- Location groups
- Categories
- Groups
- Item types

Do NOT use AcReport when the request is purely about inventory quantities
or inventory transactions.

==================================================
TRANTYPE VALUES
==================================================

Known TranType values:

- Purchase
- Purchase Return
- Sales
- Sales Return
- Adjustment
- Transfer In
- Transfer Out
- Stores Issue
- Direct Expense
- Others

Always use the exact documented TranType value.

==================================================
QUANTITY RULE
==================================================

Qty is the transaction quantity.

For inventory movement:

- Inventory In transactions have positive Qty.
- Inventory Out transactions have negative Qty.

Therefore:

Stock balance = SUM(Qty)

Do not arbitrarily use ABS(Qty) when calculating stock.

For example:

Purchase:
positive quantity

Purchase Return:
normally represents stock leaving inventory and therefore follows the
stored sign in Qty.

Sales:
negative quantity

Sales Return:
positive quantity

Transfer In:
positive quantity

Transfer Out:
negative quantity

Adjustment:
use the sign stored in Qty

Stores Issue:
inventory-out movement, following the stored Qty sign

IMPORTANT:
The sign stored in Qty is authoritative.

==================================================
STOCK CALCULATION
==================================================

For a stock balance:

SUM(Qty)

For stock as of a particular date:

DocDate <= requested date

Example:

User:
item wise stock as on 31/03/2026

Use:

SELECT ItemCode, ItemDesc, SUM(Qty) AS StockQty
FROM InReport
WHERE DocDate <= '2026-03-31'
GROUP BY ItemCode, ItemDesc

Do not use only Purchase transactions to calculate stock.

Stock must account for all relevant inventory movements represented by the
table, including:

- Purchase
- Purchase Return
- Sales
- Sales Return
- Transfer In
- Transfer Out
- Adjustment
- Stores Issue
- Other inventory movements

==================================================
INVENTORY COST
==================================================

TotCost is the total inventory cost.

The documented sign convention is:

- Inventory In transactions: positive TotCost
- Inventory Out transactions: negative TotCost

Therefore inventory cost movement can be calculated as:

SUM(TotCost)

Do NOT use TotAmount as inventory cost.

==================================================
SALES AND SALES RETURNS
==================================================

Sales transaction:

TranType = 'Sales'

Sales Return transaction:

TranType = 'Sales Return'

TotAmount:

- Sales values are negative.
- Return values are positive.
- TotAmount includes tax.

Discount:

- Sales values are positive.
- Return values are negative.

TaxAmount:

- Sales values are positive.
- Return values are negative.

==================================================
SALES AMOUNT FORMULA
==================================================

For sales transactions:

Sales Amount = TotAmount - Discount - TaxAmount

Use this formula when the user asks for the sales amount according to the
documented business rule.

Do not invent a different sales formula.

==================================================
CUSTOMERS
==================================================

SubLedgerCode and SubLedgerName are used for customer/supplier identification.

For:

TranType = 'Sales'

or:

TranType = 'Sales Return'

the SubLedger fields represent the customer.

Examples:

SubLedgerCode
SubLedgerName

Use SubLedgerName when the user asks for a customer by name.

For customer sales questions, filter by the appropriate sales transaction
type rather than assuming all InReport rows are sales.

==================================================
SUPPLIERS
==================================================

For:

TranType = 'Purchase'

or:

TranType = 'Purchase Return'

the SubLedger fields represent the supplier.

Use:

SubLedgerCode
SubLedgerName

when identifying suppliers.

Example:

User:
last 10 purchases of supplier - uniglobe

Use:

TranType = 'Purchase'

and match:

SubLedgerName

Example condition:

SubLedgerName LIKE '%uniglobe%'

==================================================
CUSTOMER SALES ANALYSIS
==================================================

For questions such as:

- Which customer has the highest sales?
- Top 5 customers by sales
- Customer-wise sales
- Sales by customer
- Highest selling customer

use InReport.

Prefer:

TranType = 'Sales'

and group by:

SubLedgerCode,
SubLedgerName

When the user asks for sales amount, apply the documented sales formula:

TotAmount - Discount - TaxAmount

When ranking by sales, use descending order.

Example:

SELECT TOP (5) SubLedgerCode, SubLedgerName,
SUM(TotAmount - Discount - TaxAmount) AS SalesAmount
FROM InReport
WHERE TranType = 'Sales'
GROUP BY SubLedgerCode, SubLedgerName
ORDER BY SalesAmount DESC

==================================================
SUPPLIER PURCHASE ANALYSIS
==================================================

For questions such as:

- Which supplier has the highest purchases?
- Top 5 suppliers by purchase amount
- Supplier-wise purchases
- Purchases from supplier
- Highest purchasing supplier

use:

TranType = 'Purchase'

and:

SubLedgerCode,
SubLedgerName

For purchase amount, use the appropriate transaction amount fields documented
in InReport.

Do not use accounting GL balances from AcReport for inventory purchase
questions.

==================================================
LATEST TRANSACTIONS
==================================================

For requests such as:

- latest 10 purchases
- last 10 purchases
- latest sales
- last 5 transactions
- recent purchases

use TOP (N).

Prefer:

ORDER BY DocDate DESC, DocNo DESC, DocLno DESC

Example:

SELECT TOP (10) DocDate, DocNo, ItemCode, ItemDesc, Qty, TotCost,
SubLedgerName
FROM InReport
WHERE TranType = 'Purchase'
ORDER BY DocDate DESC, DocNo DESC, DocLno DESC

If the user specifies a customer or supplier, filter using SubLedgerName or
SubLedgerCode where appropriate.

==================================================
ITEM INFORMATION
==================================================

Item-related columns:

ItemCode
ItemDesc

Use both when appropriate.

Examples:

- Item-wise stock
- Item-wise sales
- Item-wise purchases
- Item movement
- Highest selling items
- Lowest selling items

==================================================
CATEGORY INFORMATION
==================================================

Category columns:

CatCode
CatDesc

Known CatCode values:

FL = Forklift
KA = Keg Accessories
TB = Tobacco
EK = Empty Keg
GI = Gins
LI = Liqueurs
OT = Others
RU = Rums
TE = Tequilas
VO = Vodkas
WH = Whiskies
WI = Wines
PS = POS Material
BE = Beers
BR = Brandies
AP = Aperitifs
AR = Araks
CH = Champagnes
AC = Air Conditioners
SW = Softwares
CP = Computers
FF = Furniture & Fixtures
MV = Motor Vehicles
OE = Office Equipment
XP = Trading Expense
NS = Service / Nonstock Items
FC = FA-Furniture & Fixtures - Chairs

Use exact CatCode values when the user explicitly refers to a category.

==================================================
GROUP INFORMATION
==================================================

Group columns:

GrpCode
GrpDesc

Use these fields when the user asks for grouping by inventory group.

==================================================
TYPE INFORMATION
==================================================

Type columns:

TypeCode
TypeDesc

Known TypeCode values include:

091 = Empty Keg
092 = Fruit Liqueur-O
097 = Others
099 = Cider
095 = White Wines
098 = Rose Wine
001 = Vermouth-L
002 = Other Spirit
003 = Georgian Wines
004 = Cocktail / RTDs-L
005 = Whisky
006 = Fruit Liqueur
007 = Chilean Wine
008 = Blended Scotch Whisky
009 = Liqueur Chocolate
010 = Standard Vodka
011 = IMFL-G
012 = Mezcal
013 = V.S.O.P
014 = Cocktail / RTDs-V
015 = Wine
016 = Tonic Wines
017 = Premium Whiskies
018 = Rum
019 = Irish Whisky
020 = Austrian Wines
021 = Brandy
022 = Gin
023 = Cask Wines
024 = Sake & Chochu
025 = Beer Cans
026 = Liqueurs
027 = Tequila
028 = Premium Gin
029 = Italian Wines
030 = Cocktail / RTDs-R
031 = XO
032 = Vodka-G
033 = Canadian Whisky
034 = Other Spirit-WI
035 = IMFL-R
036 = Premium
037 = Bulgarian Wines
038 = Australian Wines
039 = Cognac
040 = Wine With Aroma
041 = Single Malt
042 = Cocktail / RTDs-W
043 = Baiju
044 = Fine Wines
045 = Beer Keg
046 = IMFL-V
047 = Liqueurs-O
048 = Premium Scotch
049 = Deluxe Whisky
050 = Champagne
051 = Gin-O
052 = Deluxe Scotch
053 = Spanish Wine
054 = Japanese Sake
055 = American Whisky
056 = Standard Scotch
057 = Secondary Scotch
058 = French Wines
059 = Cocktail / RTDs-WI
060 = Aperitif-O
061 = Soft Drinks
062 = Premium Rums
063 = Still Wine
064 = Vermouth-WI
065 = Bourbon Whisky
066 = Beer Bottles
067 = IMFL-O
068 = Vodka
069 = Sake & Soju
070 = Vermouth-R
071 = Cocktail / RTDs-O
072 = IMFL-WI
073 = RTD
074 = Premium Vodkas
075 = Absinthe
076 = Arak
077 = V.S
078 = Aperitif-A
079 = Aperitif-L
080 = Split Shots
081 = Pisco
082 = IMFL-W
083 = IMFL-B
084 = Sparkling Wines
085 = Champagne-W
086 = Craft Beer
087 = Mezcals
088 = Soft Drinks-OT
089 = Irish Gin
090 = POS Material
093 = Rye Whisky
094 = Sour Mash Whisky
096 = Red Wine

Use the documented TypeCode/TypeDesc values exactly when filtering by type.

==================================================
LOCATION
==================================================

Location fields:

LocCode
LocName

Location group fields:

LocGrpCode
LocGrpName

For location-wise stock:

Group by the item and location.

Example:

SELECT ItemCode, ItemDesc, LocCode, LocName, SUM(Qty) AS StockQty
FROM InReport
WHERE DocDate <= '2026-03-31'
GROUP BY ItemCode, ItemDesc, LocCode, LocName

==================================================
BATCH AND EXPIRY
==================================================

Batch-related field:

BatchNo

Expiry field:

ExpiryDate

Use these fields for questions about:

- batch
- expiry
- expiring inventory
- batch-wise inventory

Only use information that can be obtained from these fields.

==================================================
UNIT OF MEASURE
==================================================

BaseUom contains the base unit of measure.

Use BaseUom when the user asks for the item's unit or stock unit.

==================================================
COMPANY AND COST CENTER
==================================================

Company:

CompCode
CompName

Cost Center:

CCCode
CCName

Use these when the user explicitly asks for:

- company-wise inventory
- cost-center-wise transactions
- company-specific sales
- location/company comparisons

==================================================
DATE AND ACCOUNTING PERIOD
==================================================

Date:

DocDate

Accounting year:

AcYear

Accounting month:

AcMth

For a specific date:

DocDate <= requested date

For date ranges, apply the exact range requested by the user.

Do not invent dates.

==================================================
COMMON EXAMPLES
==================================================

User:
item wise Stock as on 31/03/2026

Use:
InReport

Logic:
SUM(Qty)
WHERE DocDate <= '2026-03-31'
GROUP BY ItemCode, ItemDesc

--------------------------------------------------

User:
which customer is having highest sales? top 5 pls

Use:
InReport

Logic:
TranType = 'Sales'
GROUP BY SubLedgerCode, SubLedgerName
ORDER BY sales amount DESC
TOP (5)

--------------------------------------------------

User:
pls give last 10 purchases of supplier - uniglobe

Use:
InReport

Logic:
TranType = 'Purchase'
SubLedgerName LIKE '%uniglobe%'
TOP (10)
ORDER BY DocDate DESC, DocNo DESC, DocLno DESC

--------------------------------------------------

User:
top 10 selling items

Use:
InReport

Use:
TranType = 'Sales'

Group by:
ItemCode
ItemDesc

Order descending by the requested sales measure.

--------------------------------------------------

User:
stock by location

Use:
InReport

Group by:
ItemCode
ItemDesc
LocCode
LocName

Stock:
SUM(Qty)

==================================================
RELATIONSHIP WITH AcReport
==================================================

AcReport and InReport represent different aspects of the ERP system.

AcReport:
Accounting / General Ledger side.

InReport:
Inventory / operational transaction side.

Both contain some common fields including:

DocTy
DocNo
DocLno
DocDate
AcYear
AcMth
CompCode
CompName
CCCode
CCName
SubLedgerCode
SubLedgerName

However, no foreign-key relationship between AcReport and InReport is
documented here.

Therefore:

DO NOT automatically JOIN AcReport and InReport.

In particular, do not assume that:

DocTy + DocNo + DocLno

is always a guaranteed one-to-one relationship.

If a request can be answered from InReport alone, use InReport alone.

If a request can be answered from AcReport alone, use AcReport alone.

Only join them when a valid relationship is explicitly established by the
knowledge base or by confirmed ERP business rules.

==================================================
IMPORTANT QUERY PRINCIPLES
==================================================

1. Use InReport for inventory-side requests.

2. Use SUM(Qty) for stock quantity.

3. Use SUM(TotCost) for inventory cost where appropriate.

4. Use TranType = 'Sales' for sales questions.

5. Use TranType = 'Purchase' for purchase questions.

6. Use SubLedgerName/SubLedgerCode for customer or supplier identification
   when appropriate.

7. Use DocDate <= requested date for stock-as-of-date questions.

8. Use TOP (N) for ranking/latest-N requests.

9. Use ORDER BY DESC for highest/latest requests.

10. Do not join AcReport unless the request genuinely requires accounting
    information and the relationship is known.

11. Never invent fields or codes.

12. Follow the signs already stored in Qty, TotCost, TotAmount, Discount and
    TaxAmount.

==================================================
SAMPLE USER REQUESTS
==================================================

- item wise Stock as on 31/03/2026
- which customer is having highest sales? top 5 pls
- pls give last 10 purchases of supplier - uniglobe
- top 10 selling items
- stock by location
- sales by customer for March 2026
- purchases by supplier for 2026
- items expiring before June 2026
- category-wise stock
- type-wise stock
- latest 10 sales invoices
- latest 10 purchases
`,
};
