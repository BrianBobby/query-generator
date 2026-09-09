module.exports = {
  title: "AcReport table structure & business rules",
  content: `
-- Table: AcReport
-- This is the single accounts-transaction (general ledger) table.
-- Every posted accounting document line, across all voucher types
-- (sales, purchases, receipts, payments, journals, depreciation,
-- stock adjustments, etc.), lives in this one table.

CREATE TABLE AcReport
(
    DocTy           varchar(6)      NOT NULL,   -- Document/voucher type code (see DocTy reference list)
    DocNo           varchar(20)     NOT NULL,   -- Document number
    DocLno          int             NOT NULL,   -- Document line number
    DocDate         datetime,                   -- Document/transaction date
    AcYear          int,                        -- Accounting year
    AcMth           tinyint,                    -- Accounting month (1-12)
    CompCode        varchar(6),                 -- Company code
    CompName        varchar(100),               -- Company name
    BranchCode      varchar(6),                 -- Branch code
    BranchName      varchar(100),               -- Branch name
    CCCode          varchar(20),                -- Cost center code
    CCName          varchar(250),               -- Cost center name
    CatClass        varchar(1),                 -- Top level GL classification, see ClassDesc mapping below
    ClassDesc       varchar(50),                -- Description of CatClass (denormalized, already stored on each row)
    CatCode         varchar(6),                 -- GL Category code
    CatDesc         varchar(250),               -- GL Category description
    GrpCode         varchar(6),                 -- GL Group code
    GrpDesc         varchar(250),               -- GL Group description
    GlCode          varchar(10),                -- GL account code
    GlDesc          varchar(250),               -- GL account description
    Qty             decimal(15,3),              -- Quantity (for stock-related postings)
    DrAmount        decimal(15,3),              -- Debit amount for this line
    CrAmount        decimal(15,3),              -- Credit amount for this line
    Amount          decimal(15,3),              -- Net/signed amount for this line
    DC              varchar(1),                 -- 'D' = Debit line, 'C' = Credit line
    Remarks         varchar(500),               -- Free text narration
    SubLedgerCode   varchar(20),                -- Sub-ledger code, e.g. customer code or supplier code
    SubLedgerName   varchar(1000),              -- Sub-ledger name, e.g. customer name or supplier name
    AnalysisCode    varchar(20),                -- Optional analysis/dimension code
    AnalysisDesc    varchar(1000),              -- Optional analysis/dimension description
    Flag            varchar(1),                 -- Misc status flag
    CONSTRAINT [PK_AcReport] PRIMARY KEY CLUSTERED (DocTy ASC, DocNo ASC, DocLno ASC) ON [PRIMARY]
);

-- CatClass -> ClassDesc mapping (also physically stored in the ClassDesc column on every row):
-- 'A' = Fixed Assets
-- 'B' = Current Assets
-- 'C' = Long Term Liabilities
-- 'D' = Short Term Liabilities
-- 'E' = Direct Revenue
-- 'F' = Indirect Revenue
-- 'G' = Direct Expenses
-- 'H' = Indirect Expenses

-- === BUSINESS RULES THE ASSISTANT MUST FOLLOW ===

-- 1. THERE IS NO SEPARATE "Customer" OR "Supplier" TABLE.
--    Customers, suppliers, staff, and any other sub-ledger party are all
--    represented via SubLedgerCode / SubLedgerName on AcReport itself.
--    When a user asks about "a customer" (e.g. by name), filter on
--    SubLedgerName (use LIKE '%name%' for partial/fuzzy name matches,
--    since names may not match exactly) and/or SubLedgerCode.
--    Customer balances are typically the net of DrAmount/CrAmount (or
--    signed Amount) on rows where the GL relates to Trade Receivables
--    (CatDesc = 'Receivables & Prepayment', GrpDesc = 'Trade Receivables',
--    e.g. GlCode 241010 'Trade Receivable'), unless the user specifies
--    a different account.

-- 2. TRIAL BALANCE.
--    A trial balance as of a given date is produced by summing DrAmount
--    and CrAmount (or Amount, grouped by DC) for all AcReport rows with
--    DocDate <= the given date, grouped by GlCode/GlDesc (and typically
--    also CatCode/CatDesc/GrpCode/GrpDesc/ClassDesc for a structured
--    report). The net closing balance per GL account = SUM(DrAmount) -
--    SUM(CrAmount). Normal balance sign follows CatClass: Assets (A, B)
--    and Expenses (G, H) are normally debit balances; Liabilities (C, D),
--    Equity, and Revenue (E, F) are normally credit balances — but the
--    query itself should just compute SUM(DrAmount) - SUM(CrAmount) per
--    account unless the user asks for the balance to be split into
--    separate Debit/Credit trial-balance columns, in which case use a
--    CASE expression (or two aggregates) to show the balance in the Dr
--    column when positive and in the Cr column when negative (or vice
--    versa), rather than filtering out rows.

-- 3. TRANSACTION LISTS ("last N transactions of X", "recent postings").
--    Return one row per AcReport line (DocTy, DocNo, DocLno, DocDate,
--    GlDesc, Remarks, DrAmount, CrAmount, Amount, SubLedgerName as
--    relevant), ordered by DocDate DESC (and DocNo DESC as a tie
--    breaker), limited with SQL Server's TOP (N).

-- 4. DATES. DocDate is a datetime column. When a user gives a date
--    like "31/03/2026" or "as on 31/03/2026", treat it as DD/MM/YYYY
--    and compare using DocDate <= 'YYYY-MM-DD' (end of that day) —
--    use CONVERT/CAST as needed, e.g. DocDate < DATEADD(day, 1,
--    'YYYY-MM-DD') to include the whole day.

-- 5. ALWAYS write standard Microsoft SQL Server (T-SQL) syntax:
--    use TOP (N) instead of LIMIT, square-bracket identifiers only
--    when necessary, and GETDATE() for "today" if no date is given.

-- 6. Only use tables, columns, and reference values that appear in
--    this knowledge base. Never invent table or column names.
-- 7. DISTINGUISHING "CUSTOMER" FROM "SUPPLIER" ON THE SAME SubLedgerCode.
--    A single SubLedgerCode/SubLedgerName can appear on both receivable
--    and payable rows (e.g. a party that is both a customer and a
--    vendor), so the word the user uses ("customer" vs "supplier"/
--    "vendor") decides which GL account to filter on, not just the name.
--    Always filter on GlCode directly (not just CatDesc/GrpDesc) so the
--    query is pinned to the exact account, not just its category:
--    - "Customer" requests -> filter to Trade Receivables using
--      CatDesc = 'Receivables & Prepayment' AND GrpDesc = 'Trade
--      Receivables' AND GlCode = '241010' (Trade Receivable), per rule 1.
--    - "Supplier"/"vendor" requests -> filter to Trade Payables using
--      CatDesc = 'Trade Payables' AND GrpDesc = 'Trade Payable' AND
--      GlCode = '461010' (Trade Payables).
--    - If the user just gives a name without saying "customer" or
--      "supplier" (e.g. "show me Westwood's balance"), do not guess —
--      compute the balance from whichever GL account (receivable or
--      payable) actually has rows for that SubLedgerCode/SubLedgerName;
--      if both exist, include both and label them separately rather
--      than netting them together.
`,
};
