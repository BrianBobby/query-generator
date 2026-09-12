module.exports = {
  title: "Accounting GL Master — Current Chart of Accounts (AcReport)",
  content: `
The accounting GL hierarchy is stored in AcReport fields: CatCode/CatDesc,
GrpCode/GrpDesc, GlCode/GlDesc, with CatClass/ClassDesc at the top level.

ClassDesc mapping: A=Fixed Assets, B=Current Assets, C=Long Term Liabilities,
D=Short Term Liabilities, E=Direct Revenue, F=Indirect Revenue,
G=Direct Expenses, H=Indirect Expenses, I=Equity (no ClassDesc stored for I).

Format below: CatClass | CatCode CatDesc | GrpCode GrpDesc | GlCode GlDesc

A | 10 Property Plant & Equipments | 1011 Buildings | 101012 Buildings -Cost
A | 10 Property Plant & Equipments | 1013 Warehouse Equipments | 101014 Warehouse Equipment's
A | 10 Property Plant & Equipments | 1013 Warehouse Equipments | 103012 Acc Depreciation -Warehouse Equipments
A | 10 Property Plant & Equipments | 1014 Vehicles | 101016 Vehicle-cost
A | 10 Property Plant & Equipments | 1014 Vehicles | 103014 Acc Depreciation-Vehicle
A | 10 Property Plant & Equipments | 1015 FFE-Cost | 101510 Furniture & Fixtures
A | 10 Property Plant & Equipments | 1015 FFE-Cost | 103016 Acc Depreciation-Furniture & Fixtures
A | 10 Property Plant & Equipments | 1020 Office Equipments | 102010 Office Equipments
A | 10 Property Plant & Equipments | 1020 Office Equipments | 103018 Acc Depreciation-Office Equipments
A | 10 Property Plant & Equipments | 1025 Asset Clearing Account | 102510 Buildings -Clearing
A | 12 Investments | 1210 Investments | 121014 Investment in HMS
A | 14 Intangible Assets | 1411 Software | 103022 Accumulated Amortization - Software
A | 14 Intangible Assets | 1411 Software | 141012 Software
B | 22 Inventory | 2210 Trading Inventory | 221010 Trading Stock - Spirits
B | 22 Inventory | 2210 Trading Inventory | 221012 Trading Stock - Wine
B | 22 Inventory | 2210 Trading Inventory | 221014 Trading Stock - Beer
B | 22 Inventory | 2210 Trading Inventory | 221016 Trading Stock - Others
B | 22 Inventory | 2210 Trading Inventory | 221018 Trading Stock - POS
B | 22 Inventory | 2210 Trading Inventory | 221030 Inter-Org Transit Inventory
B | 22 Inventory | 2210 Trading Inventory | 221050 Inventory in Transit
B | 24 Receivables & Prepayment | 2410 Trade Receivables | 241010 Trade Receivable
B | 24 Receivables & Prepayment | 2420 Pdc Received | 242010 PDC Cheques Received
B | 24 Receivables & Prepayment | 2435 Other Receivables | 243510 Accrued Interest Receivable
B | 24 Receivables & Prepayment | 2435 Other Receivables | 243514 Insurance Claims Receivable
B | 24 Receivables & Prepayment | 2435 Other Receivables | 243518 Other Receivables
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244010 Prepaid - Rental
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244012 Prepaid - Others
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244016 Prepaid Insurance - Vehicle
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244017 Prepaid Insurance - Others
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244018 Prepaid Staff Visa Expense
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244020 Prepaid Vehicle Maintenance
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244026 Courier Charges - Prepaid
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244028 Prepaid A M C
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244030 Prepaid Electricity & Water
B | 24 Receivables & Prepayment | 2440 Prepaid Expenses | 244031 Staff Visa Expenses - Prepaid
B | 24 Receivables & Prepayment | 2445 Deposit | 244510 Deposits - Water & Electricity Deposits
B | 24 Receivables & Prepayment | 2445 Deposit | 244513 Deposits- Ajman Sewerage
B | 24 Receivables & Prepayment | 2445 Deposit | 244514 Deposits - Rent Security
B | 24 Receivables & Prepayment | 2445 Deposit | 244516 Deposit - Customs Department
B | 24 Receivables & Prepayment | 2445 Deposit | 244528 Credit card Security Deposit - A/c 1512246335600004
B | 26 Tax Credits | 2610 Vat Recoverable | 261010 VAT Input
B | 26 Tax Credits | 2610 Vat Recoverable | 261012 VAT Advance Purchase
B | 26 Tax Credits | 2610 Vat Recoverable | 261014 RCM VAT Input Credit
B | 26 Tax Credits | 2610 Vat Recoverable | 261016 IC VAT Input Credit
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301012 Emirates NBD-1012246335602
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301019 Emirates NBD-1012246335616
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301028 Emirates NBD-1012246335601
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301029 Al Maryah Community Bank LLC - A/c 3002039980000001
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301050 Fiduciary Deposit
B | 30 Cash on Hand & Bank | 3010 Bank Current Accounts | 301060 Fixed Deposit
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302010 Petty Cash-Main
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302012 Petty cash -Jurf
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302014 Petty cash -RAK
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302016 Petty cash -SHJ
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302018 Petty cash - Sanaya
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302020 Petty cash -MD office
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302024 Main Cash
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302028 Petty Cash - Lucky
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302030 Petty Cash - Container Drivers
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302032 Petty Cash – Jurf Wh 2 (Marble)
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302034 Petty cash Advance A/c
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302036 Cash Collection Account
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302037 Petty Cash – Travel Card KK
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302038 Petty cash – Abu dhabi
B | 30 Cash on Hand & Bank | 3020 Cash On Hand | 302046 Petty Cash- On Trade Rak
D | 41 Financial Liabilites | 4110 Debts & Borrowings | 411030 Loan A/c
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421010 Provision - Staff Gratuity
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421012 Provision - Staff Leave Salaries
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421013 Provision for Leave Allowances
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421014 Provision - Staff Air Ticket
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421016 Staff Payable Account
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421018 Trip Allowance Payable
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421020 Staff Salary Payable
D | 42 Staff Accruals | 4210 Staff Payables & Accruals | 421022 Loading Unloading Payable
D | 44 Provision For Bad And Doubtful Debts | 4410 Provision For Bad And Doubtful Debts | 441010 Provision For Receivable - Bad Debts
D | 45 Provision for Stock | 4510 Stock Provisions | 451010 Provision for Stock
D | 46 Trade Payables | 4610 Trade Payable | 461010 Trade Payables
D | 46 Trade Payables | 4610 Trade Payable | 461012 PDC Cheques Issued
D | 46 Trade Payables | 4610 Trade Payable | 461014 Import Clearing Account
D | 48 Purchase Control Account | 4810 Purchase Control account | 481010 Purchase Control Account
D | 48 Purchase Control Account | 4810 Purchase Control account | 481012 Purchase Control Account - Marketing
D | 48 Purchase Control Account | 4810 Purchase Control account | 481014 Purchase Control Account - Service
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501012 Other Payables
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501013 Retention Payable
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501022 Accrual – Audit Fee
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501026 Expense Ap Accruals
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501027 Rent Payable
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501029 Provision for Trade Discount
D | 50 Other Payables & Accruals | 5010 Other Payables & Accruals | 501031 Proposed Dividend Payable
D | 52 Statutory Tax Payables | 5210 Statutory Tax Payables | 521010 VAT Output
D | 52 Statutory Tax Payables | 5210 Statutory Tax Payables | 521014 RCM VAT Output
D | 52 Statutory Tax Payables | 5210 Statutory Tax Payables | 521015 IC VAT Output
D | 52 Statutory Tax Payables | 5210 Statutory Tax Payables | 521016 Net Vat Payable
D | 52 Statutory Tax Payables | 5210 Statutory Tax Payables | 521017 Corporate Tax Payable
E | 60 Operating Revenue | 6010 Sales Turnover | 601010 Spirits Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601012 Wine Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601014 Beer Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601016 Sales - Others
E | 60 Operating Revenue | 6010 Sales Turnover | 601020 On Trade Discounts
E | 60 Operating Revenue | 6010 Sales Turnover | 601024 Sales - POS
E | 60 Operating Revenue | 6010 Sales Turnover | 601040 BT Spirits Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601042 BT Wine Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601044 BT Beer Sales
E | 60 Operating Revenue | 6010 Sales Turnover | 601046 BT Sales - Others
E | 60 Operating Revenue | 6010 Sales Turnover | 601048 BT Sales - POS
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651010 Miscellaneous Income
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651012 Other Income - Scrap Sales
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651014 Discount Received
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651018 Insurance Claims Received
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651026 Round Off Expenses/Income
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651028 Exchange Gain / Loss
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651034 Dividend Income
F | 65 Non Operating Income | 6510 Miscellaneous Income | 651039 Interest Income Received
F | 65 Non Operating Income | 6520 Profit/Loss On Fixed Asset Sales | 652014 Profit/Loss On Sale Of - Equipments
F | 65 Non Operating Income | 6520 Profit/Loss On Fixed Asset Sales | 652016 Profit/Loss On Sale Of - Vehicles
F | 65 Non Operating Income | 6530 Rebates & Supports | 653001 Rebate & Supports Income
F | 65 Non Operating Income | 6530 Rebates & Supports | 653002 Visibility Rental Income
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701010 Spirits Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701012 Wine Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701014 Beer Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701016 Others Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701018 POS Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701040 BT Spirits Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701042 BT Wine Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701044 BT Beer Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701046 BT Others Cost of Goods Sold
G | 70 Cost Of Sales | 7010 Cost Of Goods Sold - Consumption | 701048 BT POS Cost of Goods Sold
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751014 Invoice Price Variance
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751016 Purchase Price Variance
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751020 Purchase Return Variance
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751022 Damages
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751023 Spoilage & Leakage
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751024 Shortages Excess
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751026 Stock Adjustment Account
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751028 Stock Write Off
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751030 Stock Provision
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751040 Promo Packing
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751041 Gifts & Compliments
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751042 Item Code Rectification
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751043 Brand Promotion / Trade Samples
G | 75 Other Cogs Accounts | 7510 Variance Stock Provisions | 751044 Cycle Count Adjustment
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751510 Custom Duty
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751516 Customs Duty on FOC
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751518 Customs Documentation fee
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751522 Customs Duty Incentives
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751524 Customs Inspection Fee
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751526 Customs Charges Others
G | 75 Other Cogs Accounts | 7515 Customs Duty & Charges | 751528 Invoice Attestation Fee
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752010 Port Cargo Security Charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752012 Port Container Seal Fee
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752014 Port Documentation fee
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752016 Port Gate Pass
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752018 Port Security Sucharges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752020 Port Container Repairing charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752022 Port Monitoring charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752026 Port Storage charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752028 Port Overtime charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752030 Port/Terminal Loading and Unloading charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752032 Port Weighing charges
G | 75 Other Cogs Accounts | 7520 Port /Terminal Charges | 752034 Port.Terminal Infrastructure Fee
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752036 Terminal Handling Charges
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752510 Delivery Order Fee
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752512 Delivery Order Extension/Demurrage Fee
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752514 Container Protection Charges
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752516 Container Seal Fee
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752520 Container Washing Charges
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752522 ISPS Charges
G | 75 Other Cogs Accounts | 7525 Shipping Company Charges | 752526 Surcharge
G | 75 Other Cogs Accounts | 7530 Inbound Expenses | 753014 Freight Imports
G | 75 Other Cogs Accounts | 7530 Inbound Expenses | 753017 Purchase Incentives
G | 75 Other Cogs Accounts | 7530 Inbound Expenses | 753019 Inbound stock adjustments
G | 75 Other Cogs Accounts | 7530 Inbound Expenses | 753022 Transportation
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753510 Packing Material
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753512 Packing Expense For Export
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753514 Kegs Re-export Expenses
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753516 Re-packing Expenses
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753518 Pallets
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753520 Loading Unloading
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753524 Export Expenses
G | 75 Other Cogs Accounts | 7535 Direct Expenses | 753525 Documentation Charges-Outbounds-Port/Fze
H | 80 Personnel Cost | 8010 Staff Cost-Managerial | 801010 Salary Chairman
H | 80 Personnel Cost | 8010 Staff Cost-Managerial | 801011 Bonus to Chairman
H | 80 Personnel Cost | 8010 Staff Cost-Managerial | 801012 Expenses Of Chairman
H | 80 Personnel Cost | 8010 Staff Cost-Managerial | 801014 Directors Remuneration -Others
H | 80 Personnel Cost | 8015 Salary & Benefits | 801510 Staff Salary- Basic- Admin
H | 80 Personnel Cost | 8015 Salary & Benefits | 801511 Staff Salary- Basic- Store
H | 80 Personnel Cost | 8015 Salary & Benefits | 801512 Staff Salary Allowance - Admin
H | 80 Personnel Cost | 8015 Salary & Benefits | 801518 Staff Salary Allowance Store
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802010 Ticket Allowance- Others
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802011 Staff Ticket Allowance-Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802014 Staff Leave Salaries - Basic-Admn
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802015 Staff Leave Salaries - Basic- Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802016 Staff- Gratuity - Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802017 Staff-Gratuity - Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802018 Staff Medical Insurance
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802020 Staff - Group Life & Personal Accident
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802022 Staff Accomodation Amenties -Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802023 Staff Accomodation Amenties - Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802024 Staff Meal-Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802025 Staff Meal-Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802026 Staff Visa Expenses
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802027 Visa Expenses-Staff-Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802028 Staff Uniform & Shoes Expenses
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802030 Staff Other Benefits
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802032 Trip Allowance
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802034 Staff Medical Expenses - Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802035 Staff Medical Expenses-Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802036 Rent-Staff Accomodations-Admin
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802037 Rent-Staff Accomodation-Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802038 Staff Conveyance
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802040 Staff Ticket Allowance-Store
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802046 Visa Expenses-Others
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802070 Staff Leave Salaries - Allowance - Admn
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802072 Staff Leave Salaries - Allowance - Stores
H | 80 Personnel Cost | 8020 Other Payroll Costs | 802301 Staff Welfare
H | 85 General Admin Expense | 8510 Rent | 851010 Rent - Admn Office
H | 85 General Admin Expense | 8510 Rent | 851012 Rent - Branch Offices
H | 85 General Admin Expense | 8510 Rent | 851014 Rent-Outlets
H | 85 General Admin Expense | 8510 Rent | 851016 Rent -Warehouses
H | 85 General Admin Expense | 8510 Rent | 851020 Maintenance
H | 85 General Admin Expense | 8510 Rent | 851026 Rent,Commission And Brokerage
H | 85 General Admin Expense | 8510 Rent | 851028 Municipality Fee
H | 85 General Admin Expense | 8515 Utilities | 851512 Utilities - Electricity & Water -Admin
H | 85 General Admin Expense | 8515 Utilities | 851513 Utilities - Electricity & Water - Stores
H | 85 General Admin Expense | 8515 Utilities | 851514 Sewerage- Admin
H | 85 General Admin Expense | 8515 Utilities | 851516 Sewerage- Stores
H | 85 General Admin Expense | 8520 Property Insurance | 852010 Insurance Money Insurance
H | 85 General Admin Expense | 8520 Property Insurance | 852012 Insurance Fidelity Guarantee
H | 85 General Admin Expense | 8520 Property Insurance | 852016 Insurance - Loss Of Rent - Fire & Allied Perils
H | 85 General Admin Expense | 8520 Property Insurance | 852018 Insurance - P & M,Furniture - Fire & Allied Perils
H | 85 General Admin Expense | 8520 Property Insurance | 852022 Insurance-Third PartyLiability
H | 85 General Admin Expense | 8520 Property Insurance | 852024 Insurance-Staff-Group Life & Personal Accident
H | 85 General Admin Expense | 8520 Property Insurance | 852026 Insurance-Others
H | 85 General Admin Expense | 8520 Property Insurance | 852028 Insurance - Stock - Fire & Allied Perils
H | 85 General Admin Expense | 8520 Property Insurance | 852030 Insurance –Staff belongings-Fire & Allied Perils
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852510 Commercial License Fee
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852512 Trade License Fees Account
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852518 Post Box Renewal
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852520 Echannels Renewal Fee
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852524 Registration & Other Government Fee
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852526 Sponsorship Fee
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852532 Other Miscellanou Rates& Fees
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852536 Professional Expenses
H | 85 General Admin Expense | 8525 Licence fee and legal expenses | 852542 Audit Fee - External
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 851022 Generator Maintenance
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 851023 Generator /Diesel Expenses-Stores
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 851024 Annual Maintenance Charges
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853010 Maintenance Service Contract - Amc
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853012 Security Charges
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853014 House Keeping Expenses-Admn
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853018 Maintenance-Stores
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853020 Maintenance-Admin
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853022 Repairs -Stores
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853024 Repairs -Admn
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853026 Staff Accomodation-maintenance-Admn
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853028 Staff Accomodation-maintenance-Stores
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853030 House Keeping Expenses-Stores
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853032 Consumable & Spares
H | 85 General Admin Expense | 8530 Repairs & Maintenance | 853034 Waste Disposal Charge
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853510 Vehicle Fuel Consumed
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853512 Vehicle Hire Charges
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853516 Vehicle - Salik & Mawaqif
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853518 Vehicle Renewal & Maintenance Expenses
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853520 Vehicle Toll Fee
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853522 Vehicle Parking Charges
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853524 Vehicle Fines Penalties Account
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853526 Tyres
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853528 Vehicle Insurance Exp
H | 85 General Admin Expense | 8535 Vehicle Running Expenses | 853529 Vehicle Delivery Permit Fee
H | 85 General Admin Expense | 8540 Business Development Expenses | 854012 Travelling Expenses
H | 85 General Admin Expense | 8540 Business Development Expenses | 854014 Conveyance
H | 85 General Admin Expense | 8540 Business Development Expenses | 854016 Business Promotion Expense
H | 85 General Admin Expense | 8540 Business Development Expenses | 854018 Other Business Dev Expenses
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854510 Brand Promotion
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854514 Advt & Promos At Point of Sale
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854516 Advertisement & Publicity
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854518 Sales Promotion
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854522 Gifts Compliments
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854524 Visibility Rentals
H | 85 General Admin Expense | 8545 Advertisement & Promotion Expenses | 854528 Business Promotion
H | 85 General Admin Expense | 8550 Telephone and Communication expenses | 855010 Telephone & Internet Charges
H | 85 General Admin Expense | 8550 Telephone and Communication expenses | 855012 Mobile Lines
H | 85 General Admin Expense | 8550 Telephone and Communication expenses | 855014 Courier Expenses
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855510 Printing & Stationery
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855516 Staff-Refreshments-Stores
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855518 Staff-Refreshments-Admn
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855520 Staff-Water-Stores
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855522 News Paper Subsription
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855524 Taxi Fare& Conveyance-Admin
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855526 Taxi Fare& Conveyance-Stores
H | 85 General Admin Expense | 8555 Other Admn Expenses | 855528 Online Recruitment Services
H | 85 General Admin Expense | 8560 Software and computer maintenance | 856010 Computer Maintenance - Hardware
H | 85 General Admin Expense | 8560 Software and computer maintenance | 856012 Computer Maintenance - Software
H | 85 General Admin Expense | 8560 Software and computer maintenance | 856016 Software licence renewal
H | 85 General Admin Expense | 8565 Bad debts provision | 856510 Fines and Penalties
H | 85 General Admin Expense | 8565 Bad debts provision | 856515 Bad Debts
H | 85 General Admin Expense | 8580 Corporate Tax Expenses | 858001 Corporate Tax Expenses
H | 87 Finance Cost | 8710 Finance Charges | 871010 Bank Charges
H | 87 Finance Cost | 8710 Finance Charges | 871012 Bank Credit Card Commission
H | 87 Finance Cost | 8710 Finance Charges | 871014 Interest On Term Loans
H | 87 Finance Cost | 8710 Finance Charges | 871016 Profit/Loss On Exchange Rate
H | 87 Finance Cost | 8710 Finance Charges | 871018 Cash Management Service Charges
H | 87 Finance Cost | 8710 Finance Charges | 871020 Forex Gain Or Loss
H | 90 Depreciation & Amortization | 9010 Depreciation On Assets | 901012 Depreciation- Warehouse Equipment
H | 90 Depreciation & Amortization | 9010 Depreciation On Assets | 901013 Depreciation Office Equipment
H | 90 Depreciation & Amortization | 9010 Depreciation On Assets | 901014 Depreciation-Vehicles
H | 90 Depreciation & Amortization | 9010 Depreciation On Assets | 901015 Depreciation-Furniture & Fixtures
H | 90 Depreciation & Amortization | 9015 Amortisations | 901512 Amortisation-Software
I | 55 Equity | 5510 Share Capital | 551010 Share Capital
I | 55 Equity | 5510 Share Capital | 551030 Drawings
I | 55 Equity | 5515 Share holders current account | 551510 Share Holders Current Account
I | 55 Equity | 5520 Reserves & Surplus | 552010 Retained Earnings
I | 55 Equity | 5520 Reserves & Surplus | 552020 Statutory Reserve
I | 55 Equity | 5520 Reserves & Surplus | 552090 Opening Balance Account
I | 55 Equity | 5525 Net Profit | 552510 Profit & Loss A/C
`,
};
