module.exports = {
  title: "Inventory Dataset — InReport",
  content: `
TABLE: InReport
PURPOSE: Inventory-related transaction reporting.

Use InReport for: Stock, Inventory movements, Purchases, Purchase
returns, Sales, Sales returns, Stock transfers, Adjustments, Stores
issues, Direct inventory expenses, Item-wise analysis,
Category/group/type analysis, Location-wise stock, Customer sales,
Supplier purchases, Batch analysis, Expiry analysis, Inventory
cost/value.

CREATE TABLE InReport (
  DocTy varchar(6) not null, DocNo varchar(20) not null, DocLno int not null,
  TranType varchar(50) not null, DocTyDesc varchar(100),
  DocDate datetime, AcYear int, AcMth tinyint,
  CompCode varchar(6), CompName varchar(100),
  LocCode varchar(6), LocName varchar(100),
  LocGrpCode varchar(6), LocGrpName varchar(100),
  CCCode varchar(20), CCName varchar(250),
  ItemCode varchar(20), ItemDesc varchar(100),
  CatCode varchar(6), CatDesc varchar(100),
  GrpCode varchar(6), GrpDesc varchar(100),
  TypeCode varchar(10), TypeDesc varchar(100),
  BatchNo varchar(50), ExpiryDate datetime, BaseUom varchar(6),
  Qty decimal(15,3), TotCost decimal(15,3), TotAmount decimal(15,3),
  Discount decimal(15,3), TaxAmount decimal(15,3),
  SubLedgerCode varchar(20), SubLedgerName varchar(1000),
  CONSTRAINT [PK_InReport] PRIMARY KEY CLUSTERED (DocTy ASC, DocNo ASC, DocLno ASC, TranType ASC) ON [PRIMARY]
)

FIELD MEANINGS
DocTy/DocNo/DocLno: document identifiers. TranType: inventory transaction type.
DocTyDesc: document type description. DocDate: transaction/document date.
AcYear/AcMth: accounting year/month. CompCode/CompName: company.
LocCode/LocName: location. LocGrpCode/LocGrpName: location group.
CCCode/CCName: cost centre. ItemCode/ItemDesc: item.
CatCode/CatDesc: inventory category. GrpCode/GrpDesc: inventory group.
TypeCode/TypeDesc: inventory type. BatchNo: batch number. ExpiryDate: expiry date.
BaseUom: base unit of measure. Qty: inventory quantity movement.
TotCost: total inventory cost. TotAmount: sales/sales return amount including tax.
Discount: sales discount. TaxAmount: sales/sales return tax amount.
SubLedgerCode/SubLedgerName: supplier for purchases, customer for sales.

INVENTORY TRANSACTION TYPES
Purchase, Purchase Return, Sales, Sales Return, Adjustment, Transfer In,
Transfer Out, Stores Issue, Direct Expense, Others.

TRANSACTION TYPE SEMANTICS
Purchase: goods/items purchased from suppliers.
Purchase Return: goods/items returned to suppliers.
Sales: goods/items sold to customers.
Sales Return: goods/items returned by customers.
Adjustment: inventory quantity/value adjustment.
Transfer In: stock transferred into a location.
Transfer Out: stock transferred out of a location.
Stores Issue: stock issued from stores.
Direct Expense: inventory-related direct expense transaction.
Others: other inventory transaction.

QUANTITY SEMANTICS
Qty is the primary inventory movement quantity.
Positive Qty: stock comes IN. Negative Qty: stock goes OUT.
Stock quantity/balance: SUM(Qty)
Inventory stock as of a date: SUM(Qty) for transactions with DocDate
through the requested date.

IMPORTANT: Do not use COUNT(*) as stock quantity. Do not use TotAmount to
calculate stock quantity. Do not infer stock sign from TranType when Qty
already contains the signed inventory movement.

Example: Purchase +100, Sales -30, Sales Return +10, Adjustment -5
  -> Closing stock = 75

INVENTORY COST SEMANTICS
TotCost is total inventory cost. Inbound: positive. Outbound: negative.
Inventory/stock cost value: SUM(TotCost)
Use TotCost for inventory cost/value questions unless the user explicitly
asks for a sales amount or another monetary measure.

SALES AMOUNT SEMANTICS
TotAmount is Sales/Sales Return Amount INCLUDING TAX.
Sales: TotAmount is negative. Sales Return: TotAmount is positive.

Gross sales: SUM(-1*TotAmount - Discount - TaxAmount) WHERE TranType = 'Sales'
Sales returns: SUM(-1*TotAmount - Discount - TaxAmount) WHERE TranType = 'Sales Return'
Net sales: SUM(-1*TotAmount - Discount - TaxAmount) WHERE TranType IN ('Sales', 'Sales Return')

Example: Sales = -100000, Sales Return = +5000, SUM(TotAmount) = -95000, Net Sales = 95000

DISCOUNT SEMANTICS
Discount: Sales = positive, Sales Return = negative.
Business rule: Sales Amount = TotAmount - Discount - TaxAmount

TAX SEMANTICS
TaxAmount: Sales = positive, Sales Return = negative.
Net tax for sales: SUM(TaxAmount) for Sales and Sales Return as appropriate.

GROSS PROFIT SEMANTICS
For both Sales and Sales Return transactions, apply at the transaction level:
Net Sales = -1 * TotAmount - Discount - TaxAmount WHERE TranType IN ('Sales', 'Sales Return')
Net Cost = -1 * TotCost
Gross Profit = Net Sales − Net Cost

When calculating Gross Profit for a period, compute the above per
applicable transaction and then aggregate.

IMPORTANT: Do not treat Sales Return as a separate positive sale. A Sales
Return must reduce both Net Sales and the corresponding Cost of Sales, so
the resulting Gross Profit correctly reflects the net effect of Sales and
Sales Returns.

CUSTOMER / SUPPLIER SEMANTICS
Same fields used for customers and suppliers: SubLedgerCode / SubLedgerName.
Meaning depends on transaction type:
  Sales -> Customer
  Sales Return -> Customer
  Purchase -> Supplier
  Purchase Return -> Supplier
Customer transactions: TranType IN ('Sales', 'Sales Return')
Supplier transactions: TranType IN ('Purchase', 'Purchase Return')

Natural-language mappings:
customer / client / buyer / customer name / customer-wise -> SubLedgerCode /
  SubLedgerName with Sales/Sales Return
supplier / vendor / supplier name / supplier-wise / purchases from supplier ->
  SubLedgerCode / SubLedgerName with Purchase/Purchase Return

INVENTORY DIMENSION MAPPINGS
item / product / SKU -> ItemCode / ItemDesc
category -> CatCode / CatDesc
group / item group / product group -> GrpCode / GrpDesc
type -> TypeCode / TypeDesc
location / warehouse / store -> LocCode / LocName
location group / warehouse group -> LocGrpCode / LocGrpName
cost centre / cost center / CC -> CCCode / CCName
batch / batch number -> BatchNo
expiry / expiry date -> ExpiryDate
unit / UOM / unit of measure -> BaseUom
company -> CompCode / CompName

INVENTORY DATE SEMANTICS
"as on 31/03/2026" -> DocDate < DATEADD(DAY, 1, '2026-03-31')
"stock as of 31/03/2026" -> SUM(Qty) WHERE DocDate < DATEADD(DAY, 1, '2026-03-31')
"sales during March 2026" -> DocDate >= '2026-03-01' AND DocDate < '2026-04-01'
"purchases in 2026" -> DocDate >= '2026-01-01' AND DocDate < '2027-01-01'
Prefer half-open date ranges (>= start, < day after end) to avoid problems
caused by time portions in datetime fields.

INVENTORY MEASURE DEFINITIONS
Stock Quantity: SUM(Qty)
Stock Value / Inventory Value: SUM(TotCost)
Purchase Cost: SUM(TotCost) WHERE TranType IN ('Purchase', 'Purchase Return')
Purchase Cost excluding returns: SUM(TotCost) WHERE TranType = 'Purchase'
Sales Amount: -SUM(TotAmount) WHERE TranType = 'Sales'
Sales Return Amount: SUM(TotAmount) WHERE TranType = 'Sales Return'
Net Sales: -SUM(TotAmount) WHERE TranType IN ('Sales', 'Sales Return')
Discount: SUM(Discount)
Tax: SUM(TaxAmount)
Gross Profit: Net Sales - TotCost

IMPORTANT PURCHASE AMOUNT RULE
Do NOT assume TotAmount is the purchase amount. TotAmount is defined as
Sales/Sales Return amount including tax. For purchase/inventory cost
questions, TotCost is the primary monetary field.

INVENTORY INTENTS

1. STOCK BALANCE
   Triggers: stock, stock balance, closing stock, current stock,
   inventory balance, inventory on hand, stock as on, stock as of,
   available stock. Default: SUM(Qty)

2. STOCK VALUE
   Triggers: stock value, inventory value, value of stock, inventory
   worth, stock worth. Default: SUM(TotCost)

3. SALES
   Triggers: sales, sale, sold, selling, customer sales, sales amount.
   Default: TranType = 'Sales', Measure = -SUM(TotAmount)

4. NET SALES
   Triggers: net sales, sales after returns, sales including returns.
   Default: TranType IN ('Sales', 'Sales Return'), Measure = -SUM(TotAmount)

5. PURCHASE
   Triggers: purchase, purchases, bought, buying, procurement, supplier
   purchases. Default: TranType = 'Purchase' unless wording clearly
   includes purchase returns. For cost, use SUM(TotCost).

6. PURCHASE INCLUDING RETURNS
   Triggers: net purchases, purchases including returns, purchase
   movement including returns. Default: TranType IN ('Purchase',
   'Purchase Return'), Measure = SUM(TotCost)

7. CUSTOMER SALES
   Triggers: customer sales, sales by customer, top customer, best
   customer, highest customer sales, customer-wise sales.
   Dimension: SubLedgerCode, SubLedgerName. Transactions: Sales/Sales
   Return. Measure: -SUM(TotAmount)

8. SUPPLIER PURCHASES
   Triggers: supplier purchases, purchases by supplier, vendor
   purchases, supplier-wise purchase, purchases from supplier.
   Dimension: SubLedgerCode, SubLedgerName. Transactions: Purchase/
   Purchase Return. Measure: SUM(TotCost)

9. RECENT / LAST TRANSACTIONS
   Triggers: last 10, latest 10, recent 10, most recent, latest
   purchases, recent purchases. Default: TOP N ORDER BY DocDate DESC,
   DocNo DESC

10. RANKING
    Triggers: top, highest, largest, best, maximum, lowest, smallest,
    bottom. Default: TOP N ORDER BY calculated measure DESC for
    highest/top; ORDER BY calculated measure ASC for lowest/bottom

11. EXPIRY
    Triggers: expiry, expiring, expired, expiry date. Field: ExpiryDate.
    expired: ExpiryDate < requested/current date
    expiring by date: ExpiryDate >= start date AND ExpiryDate < end date
`,
};
