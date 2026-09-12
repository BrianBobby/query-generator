module.exports = {
  title: "Master Data — Inventory Category & Type Codes",
  content: `
INVENTORY CATEGORY MASTER (InReport.CatCode -> CatDesc)
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
AC = Air Conditioners, Refrigerators & Water Coolers
SW = Softwares
CP = Computers
FF = Furniture & Fixtures
MV = Motor Vehicles
OE = Office Equipment
XP = Trading Expense
NS = Service / Nonstock Items
FC = FA-Furniture & Fixtures - Chairs

INVENTORY TYPE MASTER (InReport.TypeCode -> TypeDesc)
001 = Vermouth-L, 002 = Other Spirit, 003 = Georgian Wines, 004 = Cocktail / RTDs-L,
005 = Whisky, 006 = Fruit Liqueur, 007 = Chilean Wine, 008 = Blended Scotch Whisky,
009 = Liqueur Chocolate, 010 = Standard Vodka, 011 = IMFL-G, 012 = Mezcal,
013 = V.S.O.P, 014 = Cocktail / RTDs-V, 015 = Wine, 016 = Tonic Wines,
017 = Premium Whiskies, 018 = Rum, 019 = Irish Whisky, 020 = Austrian Wines,
021 = Brandy, 022 = Gin, 023 = Cask Wines, 024 = Sake & Chochu, 025 = Beer Cans,
026 = Liqueurs, 027 = Tequila, 028 = Premium Gin, 029 = Italian Wines,
030 = Cocktail / RTDs-R, 031 = XO, 032 = Vodka-G, 033 = Canadian Whisky,
034 = Other Spirit-WI, 035 = IMFL-R, 036 = Premium, 037 = Bulgarian Wines,
038 = Australian Wines, 039 = Cognac, 040 = Wine With Aroma, 041 = Single Malt,
042 = Cocktail / RTDs-W, 043 = Baiju, 044 = Fine Wines, 045 = Beer Keg,
046 = IMFL-V, 047 = Liqueurs-O, 048 = Premium Scotch, 049 = Deluxe Whisky,
050 = Champagne, 051 = Gin-O, 052 = Deluxe Scotch, 053 = Spanish Wine,
054 = Japanese Sake, 055 = American Whisky, 056 = Standard Scotch,
057 = Secondary Scotch, 058 = French Wines, 059 = Cocktail / RTDs-WI,
060 = Aperitif-O, 061 = Soft Drinks, 062 = Premium Rums, 063 = Still Wine,
064 = Vermouth-WI, 065 = Bourbon Whisky, 066 = Beer Bottles, 067 = IMFL-O,
068 = Vodka, 069 = Sake & Soju, 070 = Vermouth-R, 071 = Cocktail / RTDs-O,
072 = IMFL-WI, 073 = RTD, 074 = Premium Vodkas, 075 = Absinthe, 076 = Arak,
077 = V.S, 078 = Aperitif-A, 079 = Aperitif-L, 080 = Split Shots, 081 = Pisco,
082 = IMFL-W, 083 = IMFL-B, 084 = Sparkling Wines, 085 = Champagne-W,
086 = Craft Beer, 087 = Mezcals, 088 = Soft Drinks-OT, 089 = Irish Gin,
090 = POS Material, 091 = Empty Keg, 092 = Fruit Liqueur-O, 093 = Rye Whisky,
094 = Sour Mash Whisky, 095 = White Wines, 096 = Red Wine, 097 = Others,
098 = Rose Wine, 099 = Cider

MASTER-DATA RULE
If the user supplies a recognizable description such as "Whisky", "Craft
Beer", "Single Malt", "Wines", etc., use the master mapping above to
identify the exact code where appropriate. Do not invent a code that is
not documented here.
`,
};
