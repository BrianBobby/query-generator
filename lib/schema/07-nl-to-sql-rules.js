module.exports = {
  title: "Natural Language to SQL — Rules, Examples & Ambiguities",
  content: `
GENERAL DIMENSION RULE
When the user says "by", "wise", "per", or "breakdown by", group by the
corresponding code and description.

Examples:
"sales by customer" -> GROUP BY SubLedgerCode, SubLedgerName
"stock by item" -> GROUP BY ItemCode, ItemDesc
"expenses by GL" -> GROUP BY GlCode, GlDesc
"sales by category" -> GROUP BY CatCode, CatDesc
"stock by location" -> GROUP BY LocCode, LocName
"revenue by month" -> GROUP BY AcYear, AcMth or an appropriate DocDate
  month expression if the requested calendar interpretation requires it.

TOP / BOTTOM RULE
"top 5 customers" -> SELECT TOP (5) ... ORDER BY measure DESC
"highest 10 items" -> SELECT TOP (10) ... ORDER BY measure DESC
"bottom 5 customers" -> SELECT TOP (5) ... ORDER BY measure ASC

LAST / RECENT RULE
"last 10 purchases" -> SELECT TOP (10) ... ORDER BY DocDate DESC, DocNo DESC
"latest transaction" -> SELECT TOP (1) ... ORDER BY DocDate DESC, DocNo DESC
"last 10 purchases of supplier Uniglobe":
  Dataset = InReport, TranType = 'Purchase',
  Supplier match = SubLedgerName LIKE '%Uniglobe%',
  TOP (10) ORDER BY DocDate DESC, DocNo DESC

AS-OF RULE
"stock as on 31/03/2026": include all inventory movements through 31 March 2026.
  Preferred pattern: WHERE DocDate < DATEADD(DAY, 1, '2026-03-31')
"account balance as on 31/03/2026": include all AcReport transactions through 31 March 2026.
  Preferred pattern: WHERE DocDate < DATEADD(DAY, 1, '2026-03-31')

DETAIL VS SUMMARY
If the user asks: "show", "list", "give last 10", "transactions", "details"
  -> prefer transaction-level columns.
If the user asks: "total", "how much", "by", "wise", "highest", "lowest", "top"
  -> prefer aggregation/grouping as appropriate.
Do NOT group when the user explicitly asks for individual transactions.

NAME MATCHING
For a user-provided business name, item name, customer name, supplier
name, or description, use LIKE '%value%' when an exact code is not
available. Example: SubLedgerName LIKE '%Uniglobe%'
If the user asks for an exact code, use equality: ItemCode = 'ABC123'
Escape apostrophes correctly in T-SQL for names containing them.

UNKNOWN ENTITY
If the user asks for an entity/value not present in the dictionary, do
not invent a code. The SQL may search the relevant descriptive field
when appropriate instead.

================================================================
EXAMPLE SQL GENERATION
================================================================

EXAMPLE 1
USER: item wise Stock as on 31/03/2026
SQL: SELECT ItemCode, ItemDesc, SUM(Qty) AS StockQty FROM InReport WHERE
DocDate < DATEADD(DAY, 1, '2026-03-31') GROUP BY ItemCode, ItemDesc ORDER BY ItemDesc;

EXAMPLE 2
USER: which customer is having highest sales? top 5 pls
SQL: SELECT TOP (5) SubLedgerCode AS CustomerCode, SubLedgerName AS
CustomerName, -SUM(TotAmount) AS SalesAmount FROM InReport WHERE
TranType IN ('Sales', 'Sales Return') GROUP BY SubLedgerCode,
SubLedgerName ORDER BY SalesAmount DESC;

EXAMPLE 3
USER: pls give last 10 purchases of supplier - uniglobe
SQL: SELECT TOP (10) DocDate, DocTy, DocNo, DocLno, ItemCode, ItemDesc,
Qty, TotCost, SubLedgerCode AS SupplierCode, SubLedgerName AS
SupplierName FROM InReport WHERE TranType = 'Purchase' AND SubLedgerName
LIKE '%Uniglobe%' ORDER BY DocDate DESC, DocNo DESC, DocLno DESC;

EXAMPLE 4
USER: show stock of whisky by location as on 31 March 2026
SQL: SELECT LocCode, LocName, SUM(Qty) AS StockQty FROM InReport WHERE
CatCode = 'WH' AND DocDate < DATEADD(DAY, 1, '2026-03-31') GROUP BY
LocCode, LocName ORDER BY LocName;

EXAMPLE 5
USER: top 10 items by sales in 2026
SQL: SELECT TOP (10) ItemCode, ItemDesc, -SUM(TotAmount) AS SalesAmount
FROM InReport WHERE TranType = 'Sales' AND DocDate >= '2026-01-01' AND
DocDate < '2027-01-01' GROUP BY ItemCode, ItemDesc ORDER BY SalesAmount DESC;

EXAMPLE 6
USER: what are our total expenses in 2026?
SQL: SELECT SUM(Amount) AS TotalExpense FROM AcReport WHERE CatClass IN
('G', 'H') AND DocDate >= '2026-01-01' AND DocDate < '2027-01-01';
NOTE: For accounting reports, determine whether the requested "expense"
should be presented as signed net accounting Amount, Debit, or an
absolute expense amount based on the wording and accounting class.

EXAMPLE 7
USER: show the ledger transactions for GL 601010 during March 2026
SQL: SELECT DocDate, DocTy, DocNo, DocLno, GlCode, GlDesc,
SubLedgerCode, SubLedgerName, DrAmount, CrAmount, Amount, Remarks FROM
AcReport WHERE GlCode = '601010' AND DocDate >= '2026-03-01' AND DocDate
< '2026-04-01' ORDER BY DocDate, DocNo, DocLno;

================================================================
COMMON AMBIGUITIES TO HANDLE
================================================================

"sales"
  In inventory reporting: use InReport and TotAmount.
  In accounting reporting: use AcReport and the appropriate revenue GL/category hierarchy.

"stock" -> use InReport and SUM(Qty).

"inventory value" -> use InReport and SUM(TotCost).

"purchase amount" -> prefer InReport TotCost for inventory purchase cost,
  because TotAmount is defined for sales/sales returns only.

"customer" -> normally means SubLedgerName/SubLedgerCode in InReport sales transactions.

"supplier" -> normally means SubLedgerName/SubLedgerCode in InReport purchase transactions.

"account" -> normally means AcReport GlCode/GlDesc unless context clearly
  indicates a subledger or another accounting dimension.

"branch" -> AcReport uses BranchCode/BranchName. InReport uses
  LocCode/LocName for inventory location. Do not interchange Branch and
  Location without context.

"location" -> InReport uses LocCode/LocName.

================================================================
SQL OUTPUT CONTRACT (for direct-SQL / RightERP execution mode)
================================================================

When the user asks a report/data question, return ONLY executable SQL
Server SELECT SQL in the <sql> section — no "Here is the query:", no
markdown, no JSON, no pseudocode, no parameter declarations, no
application/VB.NET/C#/React code, and no database modification statements.
The generated query must be directly executable.

QUERY QUALITY CHECKLIST — every generated query should:
- Use the correct dataset (AcReport vs InReport).
- Use only known, documented columns.
- Apply the correct transaction types.
- Apply the correct sign convention.
- Apply date boundaries correctly.
- Use correct grouping.
- Use TOP (N) where requested.
- Use deterministic ordering.
- Return meaningful aliases.
- Avoid unnecessary columns and unnecessary joins.
- Avoid SELECT *.
`,
};
