module.exports = {
  title: "Accounting Dataset — AcReport",
  content: `
TABLE: AcReport
PURPOSE: Accounting/general-ledger transaction reporting.

Use AcReport for: General ledger, Trial balance, Ledger transactions,
Debit/credit analysis, Account balances, Revenue, Expenses, Assets,
Liabilities, Equity, Receivables, Payables, Cash/bank, Profit and loss
analysis, GL/category/group/class analysis, Subledger analysis, Cost
centre analysis, Accounting transaction details.

CREATE TABLE AcReport (
  DocTy varchar(6) not null, DocNo varchar(20) not null, DocLno int not null,
  DocDate datetime, AcYear int, AcMth tinyint,
  CompCode varchar(6), CompName varchar(100),
  BranchCode varchar(6), BranchName varchar(100),
  CCCode varchar(20), CCName varchar(250),
  CatClass varchar(1), ClassDesc varchar(50),
  CatCode varchar(6), CatDesc varchar(250),
  GrpCode varchar(6), GrpDesc varchar(250),
  GlCode varchar(10), GlDesc varchar(250),
  Qty decimal(15,3), DrAmount decimal(15,3), CrAmount decimal(15,3),
  Amount decimal(15,3), DC varchar(1), Remarks varchar(500),
  SubLedgerCode varchar(20), SubLedgerName varchar(1000),
  AnalysisCode varchar(20), AnalysisDesc varchar(1000), Flag varchar(1),
  CONSTRAINT [PK_AcReport] PRIMARY KEY CLUSTERED (DocTy ASC, DocNo ASC, DocLno ASC) ON [PRIMARY]
)

FIELD MEANINGS
DocTy: Document type. DocNo: Document number. DocLno: Document line number.
DocDate: Accounting transaction/document date. AcYear: Accounting year.
AcMth: Accounting month. CompCode/CompName: Company. BranchCode/BranchName: Branch.
CCCode/CCName: Cost centre. CatClass: Accounting class code. ClassDesc: Accounting class description.
CatCode/CatDesc: GL category. GrpCode/GrpDesc: GL group. GlCode/GlDesc: General ledger account.
Qty: Accounting transaction quantity, when applicable.
DrAmount: Debit amount. CrAmount: Credit amount. Amount: Net accounting amount.
DC: Debit/Credit indicator. Remarks: Transaction remarks.
SubLedgerCode/SubLedgerName: Subledger. AnalysisCode/AnalysisDesc: Analysis/subledger analysis.
Flag: Transaction flag.

ACCOUNTING CLASS SEMANTICS (CatClass / Class)
A = Fixed Assets, B = Current Assets, C = Long Term Liabilities,
D = Short Term Liabilities, E = Direct Revenue, F = Indirect Revenue,
G = Direct Expenses, H = Indirect Expenses, I = Equity

Natural-language mappings:
"fixed assets" -> CatClass = 'A'
"current assets" -> CatClass = 'B'
"long term liabilities" -> CatClass = 'C'
"short term liabilities" -> CatClass = 'D'
"direct revenue" -> CatClass = 'E'
"indirect revenue" -> CatClass = 'F'
"direct expenses" -> CatClass = 'G'
"indirect expenses" -> CatClass = 'H'
"Equity" -> CatClass = 'I'

ACCOUNTING MEASURE SEMANTICS
Debit: SUM(DrAmount)
Credit: SUM(CrAmount)
Net accounting amount: SUM(CASE WHEN DC = 'D' THEN Amount ELSE -1 * Amount END)
Debit balance: SUM(CASE WHEN DC = 'D' THEN Amount ELSE 0 END)
Credit balance: SUM(CASE WHEN DC = 'C' THEN Amount ELSE 0 END)

IMPORTANT: Amount is always stored as a positive value. DC determines
whether the transaction is a Debit (D) or Credit (C). The AcReport Amount
follows the Debit/Credit representation of the accounting transaction.
Do NOT apply the InReport sales sign conventions or rules to AcReport.

For a conventional ledger display:
Debit = CASE WHEN DC = 'D' THEN Amount ELSE 0 END
Credit = CASE WHEN DC = 'C' THEN Amount ELSE 0 END

ACCOUNTING DATE SEMANTICS
"as on DATE": for balance/position questions, include transactions
through that date: DocDate < DATEADD(DAY, 1, 'YYYY-MM-DD')
"during DATE RANGE": use an inclusive start and exclusive next-day/end boundary.
"this year": prefer AcYear when the accounting year is clearly the requested year.
"this month": prefer AcYear + AcMth when appropriate, or DocDate date boundaries.

ACCOUNTING DIMENSION MAPPINGS
"company" / "company name" -> CompCode / CompName
"branch" -> BranchCode / BranchName
"cost centre" / "cost center" / "CC" -> CCCode / CCName
"category" -> CatCode / CatDesc
"group" / "account group" -> GrpCode / GrpDesc
"GL" / "account" / "ledger account" -> GlCode / GlDesc
"subledger" -> SubLedgerCode / SubLedgerName
"analysis" -> AnalysisCode / AnalysisDesc
"document" -> DocTy / DocNo / DocLno
"remarks" / "narration" -> Remarks

ACCOUNTING INTENT EXAMPLES
"show ledger for 101010" -> AcReport, filter GlCode = '101010', detail transactions
"expenses for 2026" -> AcReport, normally filter CatClass IN ('G','H') or relevant
  expense classes per wording, aggregate Amount/DrAmount as appropriate
"sales for 2026" -> Prefer the GL hierarchy/category/account definitions in this
  dictionary rather than guessing. Operating Revenue is CatCode 60.
"trial balance" -> Group by the relevant GL account and calculate
  debit/credit/net amounts. Do NOT use InReport.
"highest expense account" -> AcReport, expense accounts, GROUP BY GlCode/GlDesc,
  ORDER BY expense amount DESC.

ACCOUNTING AS-OF BALANCE
For a balance as of a date, accounting transaction history through the
requested date is normally required. Do not filter DocDate = 'YYYY-MM-DD'
for an "as on" balance unless the user explicitly asks for transactions
occurring on that exact date.

Example:
SELECT GlCode, GlDesc, SUM(Amount) AS Balance FROM AcReport
WHERE DocDate < DATEADD(DAY, 1, '2026-03-31') GROUP BY GlCode, GlDesc ORDER BY GlCode;

CUSTOMER / SUPPLIER SEMANTICS
Customer (Debtor / Accounts Receivable) and Supplier (Creditor / Accounts
Payable) information is stored in SubLedgerCode and SubLedgerName.
GlCode determines whether the transaction relates to a Customer or
Supplier subledger. Use GlCode plus the associated subledger information
to identify and filter Customer/Supplier transactions. Do not infer
Customer/Supplier identity from transaction descriptions when subledger
information is available.

STATEMENT OF ACCOUNTS
For Customer or Supplier Statements of Accounts, use the same GlCode and
Subledger-based identification method:
- Filter using the relevant GlCode.
- Filter the specific Customer/Supplier using SubLedgerCode and/or SubLedgerName.
- Include all relevant transactions for the requested period.
- Amount is always positive; DC determines the accounting direction.

For Customers:
  D = Positive, C = Negative
  Transaction Amount = +Amount when DC = 'D'; -Amount when DC = 'C'
  Opening Balance = Total Debit Amount − Total Credit Amount

For Suppliers:
  C = Positive, D = Negative
  Transaction Amount = +Amount when DC = 'C'; -Amount when DC = 'D'
  Opening Balance = Total Credit Amount − Total Debit Amount

Opening Balance = net balance of all transactions before the Statement From Date.

SUBLEDGER MATCHING
Table: AcSlMatch — stores Customer/Supplier transaction matching records.

Fields:
mrRefno = Matching reference number
mrRefLno = Matching reference line number
mrID = Matching record ID
mrSubLedgerCode = Customer/Supplier subledger code
mrDocTy = Matched transaction document type
mrDocNo = Matched transaction document number
mr_DocLno = Matched transaction document line number
mrMatchingDate = Matching date
mrMatchAmount = Matched amount
mr_MatchFC = Foreign currency code
mrMatchAmountFC = Matched amount in foreign currency
mrExchRate = Exchange rate
mr_flag = Matching status/flag

RELATION:
AcSlMatch.mrSubLedgerCode + mrDocTy + mrDocNo + mr_DocLno identify the
transaction being matched:
  AcSlMatch.mrSubLedgerCode = AcReport.SubLedgerCode
  AcSlMatch.mrDocTy = AcReport.DocTy
  AcSlMatch.mrDocNo = AcReport.DocNo
  AcSlMatch.mr_DocLno = AcReport.DocLno

RULE: Outstanding Amount = Transaction Amount − SUM(mrMatchAmount) for the
same subledger transaction. Outstanding Amount = 0 means fully matched.
`,
};
