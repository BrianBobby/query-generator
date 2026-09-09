/*
 * Knowledge-base module #3: DocTy (voucher/document type) reference data.
 * Maps the short DocTy codes stored on AcReport to their meaning, so the
 * assistant can filter by voucher type intelligently (e.g. "sales
 * invoices", "receipts", "journal vouchers") without guessing codes.
 */

module.exports = {
  title: "DocTy reference data (DocTy | TyDesc)",
  content: `
GGCM | GRN Costing MarketingUGT
GPCP | Petty Cash Purchase UGT
GICV | Intercompany Voucher(Auto) UGT
GRC  | CASH RECEIPT VOUCHER UGT
GTN  | TRANSFER NOTE UGT
GOB  | OPENING BALANCE UGT
GPRL | Purchase Return Local UGT
GWIE | Sales Invoice Export UGT
GSAC | Stock Adjustment Claims UGT
GFP  | Asset Purchase UGT
GJVD | Depreciation
GCN  | CREDIT NOTE UGT
GRB  | BANK RECEIPT VOUCHER UGT
GGCI | Goods Receipt Note
GSRE | Warehouse Sales Return Export UGT
GGC  | GRN Costing Local UGT
GWI  | Sales Invoice Warehouse
GGQS | GRN Quantity Service UGT
GJVY | YEAR CLOSING JV
GSA  | Stock Adjustment UGT
GWIB | Branch Transfer Invoice UGT
GPDI | PDC ISSUED - RELEASE VOUCHER UGT
GGL  | Exchange Rate Gain or Loss JV
GJVA | Intercompany Adjustment UGT
GGIT | Goods in Transit UGT
GSR  | Warehouse Sales Return UGT
GRBE | BANK RECEIPT VOUCHER UGT USER
GPDR | PDC RECEIVED - RELEASE VOUCHER UGT
GGQ  | GRN Quantity Local UGT
GSRB | Branch Transfer Invoice Return UGT
GFW  | Asset Write Off UGT
GAM  | Amortization UGT
GOPT | Other Purchase With VAT UGT
GPRK | Purchase Return Keg UGT
GMSI | Misc Sales Invoice UGT
GWIF | Sales Invoice FOC
GTNL | TRANSFER NOTE NEW UGT
GGQM | GRN Quantity MarketingUGT
GJV  | JOURNAL VOUCHER UGT
GGCS | GRN Costing Service UGT
GCP  | CASH PAYMENT VOUCHER UGT
GBP  | BANK PAYMENT VOUCHER UGT
GDN  | DEBIT NOTE UGT
GBPE | BANK PAYMENT VOUCHER UGT USER
GGXA | GRN Qty & Costing Service - ADMIN UGT
GFS  | Asset Sales UGT
GPRI | Purchase Return Import UGT
GPC  | PETTY CASH VOUCHER UGT

-- Note: "sales" style requests (invoices, sales returns) typically map to
-- DocTy IN ('GWI','GWIE','GWIB','GWIF','GMSI','GSR','GSRE','GSRB').
-- "Receipt" requests typically map to DocTy IN ('GRC','GRB','GRBE').
-- "Payment" requests typically map to DocTy IN ('GCP','GBP','GBPE','GPCP').
-- Only apply a DocTy filter when the user's request implies a specific
-- voucher type; general requests like "trial balance" or "customer
-- balance" should NOT filter by DocTy.
`,
};
