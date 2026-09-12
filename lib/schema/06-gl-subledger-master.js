module.exports = {
  title: "GL Subledger Type Master",
  content: `
The following GLs have associated subledgers, along with their
corresponding Subledger Type Code and Subledger Type Description
(F = Fixed Assets, P = Customer or Supplier as noted).

Format: GlCode GlDesc | SlTypeCode SlTypeDesc

101012 Buildings -Cost | F Fixed Assets
101014 Warehouse Equipment's | F Fixed Assets
101016 Vehicle-cost | F Fixed Assets
101510 Furniture & Fixtures | F Fixed Assets
102010 Office Equipments | F Fixed Assets
102510 Buildings -Clearing | F Fixed Assets
102512 Equipments & Furniture-Clearing | F Fixed Assets
102514 Vehicle-Clearing | F Fixed Assets
103010 Acc Depreciation-Buidling | F Fixed Assets
103012 Acc Depreciation -Warehouse Equipments | F Fixed Assets
103014 Acc Depreciation-Vehicle | F Fixed Assets
103016 Acc Depreciation-Furniture & Fixtures | F Fixed Assets
103018 Acc Depreciation-Office Equipments | F Fixed Assets
241010 Trade Receivable | P Customer
242510 Advance To Suppliers | P Supplier
242520 Advance to CRP | P Supplier
244020 Prepaid Vehicle Maintenance | F Fixed Assets
244028 Prepaid A M C | F Fixed Assets
244510 Deposits - Water & Electricity Deposits | P Supplier
244514 Deposits - Rent Security | P Customer
461010 Trade Payables | P Supplier
501010 Advances From Customers | P Customer
501028 Advance from DRP | P Customer
652012 Profit/Loss On Sale Of - Buidling | F Fixed Assets
652014 Profit/Loss On Sale Of - Equipments | F Fixed Assets
652016 Profit/Loss On Sale Of - Vehicles | F Fixed Assets
652018 Profit On Sale Of -Furnitre & Fixtures | F Fixed Assets
802023 Staff Accomodation Amenties - Stores | F Fixed Assets
851012 Rent - Branch Offices | P Customer
851026 Rent,Commission And Brokerage | P Customer
851028 Municipality Fee | P Customer
853510 Vehicle Fuel Consumed | F Fixed Assets
853512 Vehicle Hire Charges | F Fixed Assets
853518 Vehicle Renewal & Maintenance Expenses | F Fixed Assets
853520 Vehicle Toll Fee | F Fixed Assets
853522 Vehicle Parking Charges | F Fixed Assets
853524 Vehicle Fines Penalties Account | F Fixed Assets
853526 Tyres | F Fixed Assets
853528 Vehicle Insurance Exp | F Fixed Assets
853529 Vehicle Delivery Permit Fee | F Fixed Assets
901010 Depreciation-Building | F Fixed Assets
901012 Depreciation- Warehouse Equipment | F Fixed Assets
901013 Depreciation Office Equipment | F Fixed Assets
901014 Depreciation-Vehicles | F Fixed Assets
901015 Depreciation-Furniture & Fixtures | F Fixed Assets
`,
};
