/*
 * Knowledge-base module #2: GL chart of accounts reference data.
 * This is sample/reference data for CatCode, GrpCode and GlCode values
 * that already exist in AcReport.CatCode/CatDesc/GrpCode/GrpDesc/
 * GlCode/GlDesc. It helps the assistant map natural-language account
 * names (e.g. "trade receivable", "bank charges") to the correct
 * GlCode/GlDesc/CatDesc values instead of guessing.
 */

module.exports = {
  title: "GL chart of accounts reference data (CatCode | CatDesc | GrpCode | GrpDesc | GlCode | GlDesc)",
  content: `
10 | Property Plant & Equpments | 1010 | Land & Land Improvement Cost | 101010 | Land & Land Improvement Cost
10 | Property Plant & Equpments | 1011 | Buildings | 101012 | Buildings -Cost
10 | Property Plant & Equpments | 1012 | Leasehold Improvements | 101013 | Leasehold Improvements
10 | Property Plant & Equpments | 1013 | Warehouse Equipments | 101014 | Warehouse Equipments
10 | Property Plant & Equpments | 1014 | Vehicles | 101016 | Vehicle-cost
10 | Property Plant & Equpments | 1015 | FFE-Cost | 101510 | Furniture & Fixtures
10 | Property Plant & Equpments | 1020 | Office Equipments | 102010 | Office Equipments
10 | Property Plant & Equpments | 1025 | Asset Clearing Account | 102510 | Buildings -Clearing
10 | Property Plant & Equpments | 1025 | Asset Clearing Account | 102512 | Equipments & Furniture-Clearing
10 | Property Plant & Equpments | 1025 | Asset Clearing Account | 102514 | Vehicle-Clearing
10 | Property Plant & Equpments | 1025 | Asset Clearing Account | 102516 | FFE-Clearing
10 | Property Plant & Equpments | 1025 | Asset Clearing Account | 102518 | SOE-Clearing
10 | Property Plant & Equpments | 1011 | Buildings | 103010 | Acc Depreciation-Buidling
10 | Property Plant & Equpments | 1012 | Leasehold Improvements | 103011 | Acc. Depreciation - Leasehold Improvements
10 | Property Plant & Equpments | 1013 | Warehouse Equipments | 103012 | Acc Depreciation -Warehouse Equipments
10 | Property Plant & Equpments | 1014 | Vehicles | 103014 | Acc Depreciation-Vehicle
10 | Property Plant & Equpments | 1015 | FFE-Cost | 103016 | Acc Depreciation-Furniture & Fixtures
10 | Property Plant & Equpments | 1020 | Office Equipments | 103018 | Acc Depreciation-Office Equipments
14 | Intangible Assets | 1420 | Right to Use Asset | 103020 | Acc Depreciation-Right to use
14 | Intangible Assets | 1411 | Software | 103022 | Accumulated Amortization - Software
12 | Investments | 1210 | Investments | 121010 | Equity Investment
12 | Investments | 1210 | Investments | 121012 | Investment in Maketable Securities
12 | Investments | 1210 | Investments | 121014 | Investment in HMS
14 | Intangible Assets | 1410 | Intangible Assets | 141010 | Goodwill
14 | Intangible Assets | 1411 | Software | 141012 | Software
14 | Intangible Assets | 1420 | Right to Use Asset | 142010 | Right to Use
20 | Work In Progress-Wip | 2010 | Work In Progress-Wip | 201010 | Building - WIP
20 | Work In Progress-Wip | 2010 | Work In Progress-Wip | 201012 | MEP-Wip
20 | Work In Progress-Wip | 2010 | Work In Progress-Wip | 201014 | FFE-WIP
20 | Work In Progress-Wip | 2020 | WIP Clearing account | 202010 | WIP Clearing Account
22 | Inventory | 2210 | Trading Inventory | 221010 | Trading Stock - Spirits
22 | Inventory | 2210 | Trading Inventory | 221012 | Trading Stock - Wine
22 | Inventory | 2210 | Trading Inventory | 221014 | Trading Stock - Beer
22 | Inventory | 2210 | Trading Inventory | 221016 | Trading Stock - Others
22 | Inventory | 2210 | Trading Inventory | 221018 | Trading Stock - POS
22 | Inventory | 2210 | Trading Inventory | 221020 | Trading Stock - Tobacco
22 | Inventory | 2210 | Trading Inventory | 221022 | Trading Stock - Retail Products & Accessories
22 | Inventory | 2210 | Trading Inventory | 221030 | Inter-Org Transit Inventory
22 | Inventory | 2210 | Trading Inventory | 221050 | Inventory in Transit
24 | Receivables & Prepayment | 2410 | Trade Receivables | 241010 | Trade Receivable
24 | Receivables & Prepayment | 2410 | Trade Receivables | 241012 | On-Account Receipts
24 | Receivables & Prepayment | 2410 | Trade Receivables | 241014 | Unapplied Receipts
24 | Receivables & Prepayment | 2410 | Trade Receivables | 241016 | Receivable/Payable Adjustment
24 | Receivables & Prepayment | 2415 | Credit Card Collection Receivables | 241510 | Card Collection Transit - Visa
24 | Receivables & Prepayment | 2415 | Credit Card Collection Receivables | 241512 | Card Collection Transit - Master
24 | Receivables & Prepayment | 2415 | Credit Card Collection Receivables | 241514 | Card Collection Transit - Amex
24 | Receivables & Prepayment | 2415 | Credit Card Collection Receivables | 241516 | Card Collection Transit - Others
24 | Receivables & Prepayment | 2415 | Credit Card Collection Receivables | 241517 | POS-Card Collection Charges Clearing Account
24 | Receivables & Prepayment | 2420 | Pdc Received | 242010 | PDC Cheques Received
24 | Receivables & Prepayment | 2425 | Advance To Suppliers | 242510 | Advance To Suppliers
24 | Receivables & Prepayment | 2425 | Advance To Suppliers | 242520 | Advance to CRP
24 | Receivables & Prepayment | 2430 | Staff account | 243010 | Advance To Staff
24 | Receivables & Prepayment | 2435 | Other Receivables | 243510 | Accrued Interest Receivable
24 | Receivables & Prepayment | 2435 | Other Receivables | 243512 | Accrued Income
24 | Receivables & Prepayment | 2435 | Other Receivables | 243514 | Insurance Claims Receivable
24 | Receivables & Prepayment | 2435 | Other Receivables | 243516 | Accrued-Marketing Supports & Inccentives
24 | Receivables & Prepayment | 2435 | Other Receivables | 243518 | Other Receivables
24 | Receivables & Prepayment | 2435 | Other Receivables | 243520 | Advance Against Expenses
24 | Receivables & Prepayment | 2435 | Other Receivables | 243522 | Travelling Advance
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244010 | Prepaid - Rental
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244012 | Prepaid - Others
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244014 | Prepaid Interest
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244016 | Prepaid Insurance - Vehicle
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244017 | Prepaid Insurance - Others
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244018 | Prepaid Staff Visa Expense
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244020 | Prepaid Vehicle Maintenance
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244022 | Prepaid Parking Expenses
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244024 | Prepaid Sewerage
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244026 | Courier Charges - Prepaid
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244028 | Prepaid A M C
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244030 | Prepaid Electricity & Water
24 | Receivables & Prepayment | 2440 | Prepaid Expenses | 244031 | Staff Visa Expenses - Prepaid
24 | Receivables & Prepayment | 2445 | Deposit | 244510 | Deposits - Water & Electricity Deposits
24 | Receivables & Prepayment | 2445 | Deposit | 244512 | Deposits - Empty Kegs
24 | Receivables & Prepayment | 2445 | Deposit | 244513 | Deposits- Ajman Sewerage
24 | Receivables & Prepayment | 2445 | Deposit | 244514 | Deposits - Rent Security
24 | Receivables & Prepayment | 2445 | Deposit | 244516 | Deposit - Customs Department
24 | Receivables & Prepayment | 2445 | Deposit | 244518 | Deposit - Labour Department/Immigration
24 | Receivables & Prepayment | 2445 | Deposit | 244520 | Deposit - E-Dhiram
24 | Receivables & Prepayment | 2445 | Deposit | 244522 | Deposit - Others
24 | Receivables & Prepayment | 2445 | Deposit | 244526 | LC Margin
24 | Receivables & Prepayment | 2445 | Deposit | 244528 | Credit card Security Deposit
26 | Tax Credits | 2610 | Vat Recoverable | 261010 | VAT Input
26 | Tax Credits | 2610 | Vat Recoverable | 261012 | VAT Advance Purchase
26 | Tax Credits | 2610 | Vat Recoverable | 261014 | RCM VAT Input Credit
26 | Tax Credits | 2610 | Vat Recoverable | 261016 | IC VAT Input Credit
28 | Advance Corporate tax | 2810 | Advance Corporate tax | 281010 | Advance corporate tax
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301010 | Abu Dhabi Commercial Bank
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301012 | Emirates NBD-1012246335602
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301019 | Emirates NBD-1012246335616
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301021 | Emirates NBD-1012246335614 AED
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301022 | First Abu Dhabi Bank
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301024 | National Bank Of Fujairah
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301026 | Union National Bank
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301028 | Emirates NBD-1012246335601
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301029 | Al Maryah Community Bank LLC
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301041 | Emirates NBD #1012246335606
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301042 | Emirates NBD A/c No. 1012246335612
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301043 | Emirates NBD A/c No. 1012246335613
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301050 | Fiduciary Deposit
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301060 | Fixed Deposit
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301070 | Corporate Card
30 | Cash on Hand & Bank | 3010 | Bank Current Accounts | 301080 | Emirates NBD Credit Card
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302010 | Petty Cash-Main
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302012 | Petty cash -Jurf
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302014 | Petty cash -RAK
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302016 | Petty cash -SHJ
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302018 | Petty cash - Sanaya
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302020 | Petty cash -MD office
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302022 | PRO Advance
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302024 | Main Cash
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302026 | Export Sales Cash
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302028 | Petty Cash - Lucky
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302030 | Petty Cash - Container Drivers
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302032 | Petty Cash - Jurf Wh 2 (Marble)
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302034 | Petty cash Advance A/c
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302036 | Cash Collection Account
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302037 | Petty Cash - Travel Card KK
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302038 | Petty cash - Abu dhabi
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302042 | Petty cash -UGT DIBBA BR
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302043 | Counter Float cash UGT DIBBA BR
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302044 | Float Cash - Masfouth
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302045 | Float Cash-Seaport Br.
30 | Cash on Hand & Bank | 3020 | Cash On Hand | 302046 | Petty Cash- On Trade Rak
30 | Cash on Hand & Bank | 3030 | Deposit Accounts | 303050 | Finance House
30 | Cash on Hand & Bank | 3030 | Deposit Accounts | 303060 | Finance House LD
32 | Deferred Asset | 3210 | Pre-Operative Expenses | 321010 | Preliminary Expenses
32 | Deferred Asset | 3210 | Pre-Operative Expenses | 321012 | Deferred Revenue Expenses
40 | Lease liability | 4010 | Leases | 401010 | Lease Liability
41 | Financial Liabilites | 4110 | Debts & Borrowings | 411030 | Loan A/c
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421010 | Provision - Staff Gratuity
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421012 | Provision - Staff Leave Salaries
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421013 | Provision for Leave Allowances
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421014 | Provision - Staff Air Ticket
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421016 | Staff Payable Account
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421018 | Trip Allowance Payable
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421020 | Staff Salary Payable
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421022 | Loading Unloading Payable
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421024 | Provision-Incentive & Allowances
42 | Staff Accruals | 4210 | Staff Payables & Accruals | 421026 | Provision-Basic Salary
44 | Provision For Bad And Doubtful Debts | 4410 | Provision For Bad And Doubtful Debts | 441010 | Provision For Receivable - Bad Debts
44 | Provision For Bad And Doubtful Debts | 4410 | Provision For Bad And Doubtful Debts | 441012 | Provision For Deposits
44 | Provision For Bad And Doubtful Debts | 4410 | Provision For Bad And Doubtful Debts | 441014 | Provision For Other Receivables
45 | Provision for Stock | 4510 | Stock Provisions | 451010 | Provision for Stock
46 | Trade Payables | 4610 | Trade Payable | 461010 | Trade Payables
46 | Trade Payables | 4610 | Trade Payable | 461012 | PDC Cheques Issued
46 | Trade Payables | 4610 | Trade Payable | 461014 | Import Clearing Account
46 | Trade Payables | 4610 | Trade Payable | 461016 | Purchase Clearing Account (Local)
48 | Purchase Control Account | 4810 | Purchase Control account | 481010 | Purchase Control Account
48 | Purchase Control Account | 4810 | Purchase Control account | 481012 | Purchase Control Account - Marketing
48 | Purchase Control Account | 4810 | Purchase Control account | 481014 | Purchase Control Account - Service
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501010 | Advances From Customers
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501012 | Other Payables
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501013 | Retention Payable
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501014 | Accruals - General
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501016 | Accruals - Medical Expense
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501018 | Accruals - Electricity & Water
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501020 | Accruals - Telephone
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501022 | Accrual - Audit Fee
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501024 | Inventory Ap Accruals
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501026 | Expense Ap Accruals
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501027 | Rent Payable
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501028 | Advance from DRP
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501029 | Provision for Trade Discount
50 | Other Payables & Accruals | 5010 | Other Payables & Accruals | 501031 | Proposed Dividend Payable
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521010 | VAT Output
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521012 | VAT Advance Sales
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521014 | RCM VAT Output
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521015 | IC VAT Output
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521016 | Net Vat Payable
52 | Statutory Tax Payables | 5210 | Statutory Tax Payables | 521017 | Corporate Tax Payable
55 | Equity | 5510 | Share Capital | 551010 | Share Capital
55 | Equity | 5510 | Share Capital | 551030 | Drawings
55 | Equity | 5515 | Share holders current account | 551510 | Share Holders Current Account
55 | Equity | 5520 | Reserves & Surplus | 552010 | Retained Earnings
55 | Equity | 5520 | Reserves & Surplus | 552020 | Statutory Reserve
55 | Equity | 5520 | Reserves & Surplus | 552090 | Opening Balance Account
55 | Equity | 5525 | Net Profit | 552510 | Profit & Loss A/C
55 | Equity | 5530 | Dividend | 553010 | Proposed Dividend Payable
60 | Operating Revenue | 6010 | Sales Turnover | 601010 | Spirits Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601012 | Wine Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601014 | Beer Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601016 | Sales - Others
60 | Operating Revenue | 6010 | Sales Turnover | 601018 | Volume Discounts & Incentives provided
60 | Operating Revenue | 6010 | Sales Turnover | 601020 | On Trade Discounts
60 | Operating Revenue | 6010 | Sales Turnover | 601022 | Product Scheme Discounts
60 | Operating Revenue | 6010 | Sales Turnover | 601024 | Sales - POS
60 | Operating Revenue | 6010 | Sales Turnover | 601026 | Sales - Retail Products & Accessories
60 | Operating Revenue | 6010 | Sales Turnover | 601040 | BT Spirits Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601042 | BT Wine Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601044 | BT Beer Sales
60 | Operating Revenue | 6010 | Sales Turnover | 601046 | BT Sales - Others
60 | Operating Revenue | 6010 | Sales Turnover | 601048 | BT Sales - POS
60 | Operating Revenue | 6010 | Sales Turnover | 601050 | Food Revenue POS
60 | Operating Revenue | 6010 | Sales Turnover | 601051 | Beverage Revenue POS
60 | Operating Revenue | 6010 | Sales Turnover | 601052 | Other F&B Revenue POS
60 | Operating Revenue | 6010 | Sales Turnover | 601053 | Tobacco Revenue POS
60 | Operating Revenue | 6010 | Sales Turnover | 601060 | Spirits Sales - Ontrade
60 | Operating Revenue | 6010 | Sales Turnover | 601061 | Wine Sales - Ontrade
60 | Operating Revenue | 6010 | Sales Turnover | 601062 | Beer Sales - Ontrade
60 | Operating Revenue | 6010 | Sales Turnover | 601063 | Sales Others - Ontrade
60 | Operating Revenue | 6010 | Sales Turnover | 601064 | Tobacco Sales - Ontrade
60 | Operating Revenue | 6010 | Sales Turnover | 601065 | Sales - Retail Products & Accessories Ontrade
65 | Non Operating Income | 6510 | Miscellaneous Income | 651010 | Miscellaneous Income
65 | Non Operating Income | 6510 | Miscellaneous Income | 651012 | Other Income - Scrap Sales
65 | Non Operating Income | 6510 | Miscellaneous Income | 651014 | Discount Received
65 | Non Operating Income | 6510 | Miscellaneous Income | 651016 | Bank Interest
65 | Non Operating Income | 6510 | Miscellaneous Income | 651018 | Insurance Claims Received
65 | Non Operating Income | 6510 | Miscellaneous Income | 651020 | Sundry Balances Written Back
65 | Non Operating Income | 6510 | Miscellaneous Income | 651022 | Provisions Written Back
65 | Non Operating Income | 6510 | Miscellaneous Income | 651024 | Pos Excess(Short) Account
65 | Non Operating Income | 6510 | Miscellaneous Income | 651026 | Round Off Expenses/Income
65 | Non Operating Income | 6510 | Miscellaneous Income | 651028 | Exchange Gain / Loss
65 | Non Operating Income | 6510 | Miscellaneous Income | 651030 | Notice Period Recovery
65 | Non Operating Income | 6510 | Miscellaneous Income | 651032 | Other Income-Display Rental
65 | Non Operating Income | 6510 | Miscellaneous Income | 651034 | Dividend Income
65 | Non Operating Income | 6510 | Miscellaneous Income | 651038 | Rental Income
65 | Non Operating Income | 6510 | Miscellaneous Income | 651039 | Interest Income Received
65 | Non Operating Income | 6510 | Miscellaneous Income | 651040 | Freight Charges Received
65 | Non Operating Income | 6510 | Miscellaneous Income | 651041 | Customs Charges Received
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652010 | Profit / Loss On Sale Land
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652012 | Profit/Loss On Sale Of - Buidling
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652013 | Profit/Loss on Sales of - Leased Assets
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652014 | Profit/Loss On Sale Of - Equipments
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652016 | Profit/Loss On Sale Of - Vehicles
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652018 | Profit On Sale Of -Furnitre & Fixtures
65 | Non Operating Income | 6520 | Profit/Loss On Fixed Asset Sales | 652020 | Profit/Loss on Fixed Asset Sales
65 | Non Operating Income | 6530 | Rebates & Supports | 653001 | Rebate & Supports Income
65 | Non Operating Income | 6530 | Rebates & Supports | 653002 | Visibility Rental Income
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701010 | Spirits Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701012 | Wine Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701014 | Beer Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701016 | Others Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701018 | POS Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701020 | Disposable Cost Of Sales
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701022 | Retails and Accessories Cost of Goods Sold
70 | Cost Of Sales | 7010 | Cost Of Goods Sold - Consumption | 701030 | Misc. Items Cost Of Goods Sold
75 | Other Cogs Accounts | 7510 | Variance Stock Provisions | 751010 | Inventory Expense
75 | Other Cogs Accounts | 7510 | Variance Stock Provisions | 751012 | Cost Variance
75 | Other Cogs Accounts | 7510 | Variance Stock Provisions | 751022 | Damages
75 | Other Cogs Accounts | 7510 | Variance Stock Provisions | 751026 | Stock Adjustment Account
75 | Other Cogs Accounts | 7510 | Variance Stock Provisions | 751028 | Stock Write Off
75 | Other Cogs Accounts | 7515 | Customs Duty & Charges | 751510 | Custom Duty
75 | Other Cogs Accounts | 7520 | Port /Terminal Charges | 752010 | Port Cargo Security Charges
75 | Other Cogs Accounts | 7530 | Inbound Expenses | 753010 | Bank Charges Import
75 | Other Cogs Accounts | 7530 | Inbound Expenses | 753014 | Freight Imports
75 | Other Cogs Accounts | 7535 | Direct Expenses | 753510 | Packing Material
80 | Personnel Cost | 8010 | Staff Cost-Managerial | 801010 | Salary Chairman
80 | Personnel Cost | 8015 | Salary & Benefits | 801510 | Staff Salary- Basic- Admin
80 | Personnel Cost | 8015 | Salary & Benefits | 801514 | Overtime
80 | Personnel Cost | 8020 | Other Payroll Costs | 802012 | Staff Bonus
80 | Personnel Cost | 8020 | Other Payroll Costs | 802016 | Staff- Gratuity - Admin
80 | Personnel Cost | 8020 | Other Payroll Costs | 802018 | Staff Medical Insurance
85 | General Admin Expense | 8510 | Rent | 851010 | Rent - Admn Office
85 | General Admin Expense | 8510 | Rent | 851012 | Rent - Branch Offices
85 | General Admin Expense | 8515 | Utilities | 851510 | Utilities - Electricity
85 | General Admin Expense | 8520 | Property Insurance | 852010 | Insurance Money Insurance
85 | General Admin Expense | 8525 | Licence fee and legal expenses | 852534 | Legal Expenses
85 | General Admin Expense | 8525 | Licence fee and legal expenses | 852540 | Audit Fees Account
85 | General Admin Expense | 8530 | Repairs & Maintenance | 853010 | Maintenance Service Contract - Amc
85 | General Admin Expense | 8535 | Vehicle Running Expenses | 853510 | Vehicle Fuel Consumed
85 | General Admin Expense | 8540 | Business Development Expenses | 854012 | Travelling Expenses
85 | General Admin Expense | 8545 | Advertisement & Promotion Expenses | 854510 | Brand Promotion
85 | General Admin Expense | 8550 | Telephone and Communication expenses | 855010 | Telephone & Internet Charges
85 | General Admin Expense | 8555 | Other Admn Expenses | 855510 | Printing & Stationery
85 | General Admin Expense | 8555 | Other Admn Expenses | 855532 | Miscellaneous Expenses
85 | General Admin Expense | 8560 | Software and computer maintenance | 856010 | Computer Maintenance - Hardware
85 | General Admin Expense | 8565 | Bad debts provision | 856515 | Bad Debts
85 | General Admin Expense | 8570 | Management Fee | 857010 | Board Members Remunerations
85 | General Admin Expense | 8580 | Corporate Tax Expenses | 858001 | Corporate Tax Expenses
87 | Finance Cost | 8710 | Finance Charges | 871010 | Bank Charges
87 | Finance Cost | 8710 | Finance Charges | 871012 | Bank Credit Card Commission
87 | Finance Cost | 8710 | Finance Charges | 871014 | Interest On Term Loans
90 | Depreciation & Amortization | 9010 | Depreciation On Assets | 901010 | Depreciation-Building
90 | Depreciation & Amortization | 9010 | Depreciation On Assets | 901014 | Depreciation-Vehicles
90 | Depreciation & Amortization | 9015 | Amortisations | 901510 | Amortisation-Goodwill
90 | Depreciation & Amortization | 9015 | Amortisations | 901512 | Amortisation-Software

(Note: this is a representative sample of the GL chart of accounts, grouped
by CatCode/CatDesc -> GrpCode/GrpDesc -> GlCode/GlDesc, sourced from the
same data provided for AcReport. GL codes not listed above may still exist
in the live table — use the pattern above to infer sensible GlCode/GlDesc
filters, but never fabricate a GlCode that contradicts this reference.)
`,
};
