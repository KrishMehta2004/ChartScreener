const initialChartDataJson = {
  "1": {
    "Legend": "MAHINDRA & MAHINDRA LTD",

    // ===================== PROFIT & LOSS =====================
    "FinancialYear_PL": ['FY16','FY17','FY18','FY19','FY20','FY21','FY22','FY23','FY24','FY25'],
    "Sales_PL": [75841, 83773, 92094, 104721, 75382, 74278, 90171, 121269, 139078, 159211],
    "Sales_Growth_PL": [null, 10.46, 9.93, 13.71, -28.02, -1.46, 21.4, 34.49, 14.69, 14.48],
    "Gross_Margin_PL": [40.5, 39.55, 41.86, 42.56, 49.03, 48.29, 42.55, 38.99, 39.88, 39.86],
    "Operating_Profit_Margin_PL": [13.29, 12.81, 14.36, 14.52, 13.48, 15.46, 16.28, 16.73, 17.9, 19.17],
    "Net_Profit_Margin_PL": [4.15, 4.41, 8.16, 5.08, 0.17, 2.44, 7.29, 8.48, 8.1, 8.12],
    "Operating_Profit_PL": [10082, 10735, 13226, 15207, 10158, 11487, 14683, 20285, 24892, 30518],
    "Net_Profit_PL": [3148, 3698, 7510, 5315, 127, 1812, 6577, 10282, 11269, 12929],
    "Net_Profit_Growth_PL": [null, 17.46, 103.09, -29.23, -97.61, 1326.71, 262.89, 56.32, 9.6, 14.74],
    "Dividend_Yield_PL": [20.61, 21.83, 10.85, 17.4, 205.06, 53.6, 19.53, 17.6, 20.87, 21.84],

    // ===================== BALANCE SHEET =====================
    "Return_On_Equity_BS": [null, 13.14, 22.57, 13.85, 0.32, 4.45, 14.83, 19.87, 18.39, 18.05],
    "Debt_BS": [41553, 48762, 55898, 70848, 82092, 80625, 77605, 92247, 108647, 129025],
    "Debt_Equity_BS": [1.57, 1.64, 1.52, 1.77, 2.05, 1.94, 1.65, 1.64, 1.64, 1.67],
    "Debtor_Days_BS": [28, 31, 34, 30, 34, 30, 26, 21, 20, 19],
    "Inventory_Days_BS": [74, 64, 64, 74, 106, 91, 82, 83, 81, 78],

    // ===================== CASH FLOW =====================
    "Cash_from_Operations_CF": [2385, 183, 682, -4347, -1457, 17909, 9248, -7074, -5630, 3176],
    "Cash_from_Investing_CF": [-5506, -5875, -5467, -7174, -6870, -19685, -3252, -8866, -5615, -18616],
    "Cash_from_Financing_CF": [2967, 6108, 6315, 13194, 6933, 406, -5883, 15946, 12281, 15834],
    "Net_Cash_Flow_CF": [-154, 416, 1529, 1672, -1394, -1370, 113, 6, 1037, 394],

    // ===================== RETURNS =====================
    "Returns": [null, 6.29, 14.83, -8.8, -57.72, 179.08, 1.42, 43.66, 65.82, 38.75],

    // ===================== QUARTERLY =====================
    "IndianFYQuarter_Q": [
      'Q1 FY24','Q2 FY24','Q3 FY24','Q4 FY24',
      'Q1 FY25','Q2 FY25','Q3 FY25','Q4 FY25',
      'Q1 FY26','Q2 FY26'
    ],
    "Sales_Q": [33892, 34436, 35299, 35452, 37218, 37924, 41470, 42599, 45529, 46106],
    "Sales_Growth_Q": [null, null, null, null, 9.8, 10.1, 17.5, 20.2, 22.3, 21.6]
  }
};





// const initialChartDataJson = {

//     "1": {
//         "Legend": "ETERNAL LTD",
//         "FinancialYear_PL": [null, null, 'FY18', 'FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25'],
//         "Sales_PL": [NaN, NaN, 466, 1313, 2605, 1994, 4192, 7079, 12114, 20243],
//         "Sales_Growth_PL": [null, NaN, NaN, 181.66, 98.44, -23.45, 110.27, 68.85, 71.13, 67.1],
//         "Gross_Margin_PL" : [NaN, NaN, NaN, 98.74, 95.82, 90.38, 87.49, 80.29, 76.21, 72.51],
//         "Operating_Profit_Margin_PL": [NaN, NaN, NaN, -170.92, -88.48, -23.43, -44.15, -17.11, 0.35, 3.2],
//         "Net_Profit_Margin_PL": [NaN, NaN, -22.25, -73.51, -90.88, -40.77, -28.83, -13.72, 2.9, 2.6],
//         "Return_On_Equity_BS": [null, NaN, NaN, -56.9, -168.3, NaN, NaN, -5.4, 1.76, 2.08],
//         "Net_Profit_Growth_PL": [null, NaN, NaN, -830.7, -145.31, 65.66, -48.71, 19.67, 136.15, 50.14],
//         "Operating_Profit_PL": [NaN, NaN, -92, -2243, -2305, -467, -1851, -1211, 43, 648],
//         // "Net_Profit_PL": [NaN, NaN, -104, -965, -2367, -813, -1209, -971, 351, 527],
//         "Debtor_Days_BS": [],
//         "Inventory_Days_BS": [],
//         "Cash_from_Operations_CF": [],
//         "Cash_from_Financing_CF": [],
//         "Cash_from_Investing_CF": [],
//         "Net_Cash_Flow_CF": [],
//         "Debt_BS": [],
//         "Debt_Equity_BS": [],
//         "Returns": [],
//         "Dividend_Yield_PL": [],
//         "Operating_Profit_Margin_Q": [],
//         "Net_Profit_Q": []
//     }
// };

//     "2": {  

//         "Legend": "SWIGGY LTD",
//         "FinancialYear_PL": [null, null, null, null, 'FY20', 'FY21', 'FY22', 'FY23', 'FY24', 'FY25'],
//         "Sales_PL": [NaN, NaN, NaN, NaN, 3468, 2547, 5705, 8265, 11247, 15227],  
//         "Sales_Growth_PL": [null, NaN, NaN, NaN, NaN, -26.56, 123.99, 44.87, 36.09, 35.38],
//         "Gross_Margin_PL" : [NaN, NaN, NaN, NaN, 90.24, 77.62, 60.24, 59.09, 59.06, 60.59],
//         "Operating_Profit_Margin_PL": [NaN, NaN, NaN, NaN, -110.27, -50.9, -63.97, -51.7, -19.55, -18.31],
//         "Net_Profit_Margin_PL": [NaN, NaN, NaN, NaN, -113.04, -63.49, -63.61, -50.57, -20.9, -20.47],
//         "Return_On_Equity_BS": [null, NaN, NaN, NaN, NaN, -68.76, 465.51, 85.28, 32.9, -255.72],
//         "Net_Profit_Growth_PL": [null, NaN, NaN, NaN, NaN, 58.76, -124.44, -15.17, 43.76, -32.62],
//         "Operating_Profit_PL": [NaN, NaN, NaN, NaN, -3824, -1296, -3650, -4273, -2199, -2788],
//         // "Net_Profit_PL": [NaN, NaN, NaN, NaN, -3920, -1617, -3629, -4179, -2350, -3117]   
//         "Debtor_Days_BS": [],
//         "Inventory_Days_BS": [],  
//         "Cash_from_Operations_CF": [],
//         "Cash_from_Financing_CF": [],
//         "Cash_from_Investing_CF": [],
//         "Net_Cash_Flow_CF": [],
//         "Debt_BS": [],
//         "Debt_Equity_BS": [],
//         "Returns": [],
//         "Dividend_Yield_PL": [],
//         "Operating_Profit_Margin_Q": [],
//         "Net_Profit_Q": []
//     }
