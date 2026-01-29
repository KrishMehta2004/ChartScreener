


function parseAllFiles(arrayDataJSON) {
    // console.log("Parsing all files...", arrayDataJSON);

    // Make it global Variable to hold Chart Data
    window.chartArrayDataJson = [];
    
    // Iterate through each file's data
    Object.entries(arrayDataJSON).forEach(([fileNo]) => {
        parseXLSX(fileNo, arrayDataJSON);
    });

    console.log("Final ChartArray:" ,window.chartArrayDataJson);
}

function parseXLSX(fileNo, arrayDataJSON) {
    // console.log("Parsing XLSX for file number:", fileNo);

    // Add Key if not present
    if (!chartArrayDataJson[fileNo]) 
    {
        chartArrayDataJson[fileNo] = {};
    }

    //---------------General Info----------------
    const chart_company_name = arrayDataJSON[fileNo][0][1];
    // console.log("Company Name: ",chart_company_name);

    const chart_current_price = arrayDataJSON[fileNo][7][1];
    // console.log("Current Price: ",chart_current_price);

    const chart_market_cap = arrayDataJSON[fileNo][8][1];
    // console.log("Market Cap: ",chart_market_cap);

    const price = arrayDataJSON[fileNo][89].slice(1);
    // console.log("Price: ",price);

    const adjusted_equity_per_share = arrayDataJSON[fileNo][92].slice(1);
    // console.log("Adjusted Equity per Share: ",adjusted_equity_per_share);

    //---------------Profit & Loss Data----------------
    const report_date_PL = arrayDataJSON[fileNo][15].slice(1);
    // console.log("Report Dates: ",report_date_PL);

    const sales_PL = arrayDataJSON[fileNo][16].slice(1);
    // console.log("Sales PL: ",sales_PL);

    const raw_material_cost_PL = arrayDataJSON[fileNo][17].slice(1);
    // console.log("Raw Material Cost PL: ",raw_material_cost_PL);

    const change_in_inventory_PL = arrayDataJSON[fileNo][18].slice(1);
    // console.log("Change in Inventory PL: ",change_in_inventory_PL);

    const power_and_fuel_PL = arrayDataJSON[fileNo][19].slice(1);
    // console.log("Power and Fuel PL: ",power_and_fuel_PL);

    const other_mfr_exp_PL = arrayDataJSON[fileNo][20].slice(1);
    // console.log("Other Manufacturing Expenses PL: ",other_mfr_exp_PL);

    const employee_cost_PL = arrayDataJSON[fileNo][21].slice(1);
    // console.log("Employee Cost PL: ",employee_cost_PL);

    const selling_and_admin_PL = arrayDataJSON[fileNo][22].slice(1);
    // console.log("Selling and Admin Expenses PL: ",selling_and_admin_PL);

    const other_expenses_PL = arrayDataJSON[fileNo][23].slice(1);
    // console.log("Other Expenses PL: ",other_expenses_PL);

    const other_income_PL = arrayDataJSON[fileNo][24].slice(1);
    // console.log("Other Income PL: ",other_income_PL);

    const depreciation_PL = arrayDataJSON[fileNo][25].slice(1);
    // console.log("Depreciation PL: ",depreciation_PL);

    const interest_PL = arrayDataJSON[fileNo][26].slice(1);
    // console.log("Interest PL: ",interest_PL);

    const profit_before_tax_PL = arrayDataJSON[fileNo][27].slice(1);
    // console.log("Profit Before Tax PL: ",profit_before_tax_PL);

    const tax_PL = arrayDataJSON[fileNo][28].slice(1);
    // console.log("Tax PL: ",tax_PL);

    const net_profit_PL = arrayDataJSON[fileNo][29].slice(1);
    // console.log("Net Profit PL: ",net_profit_PL);

    const dividend_amount_PL = arrayDataJSON[fileNo][30].slice(1);
    // console.log("Dividend Amount PL: ",dividend_amount_PL);

    //------------------Quarterly Data------------------
    const report_date_Q = arrayDataJSON[fileNo][40].slice(1);
    // console.log("Report Dates Q: ",report_date_Q);

    const sales_Q = arrayDataJSON[fileNo][41].slice(1);
    // console.log("Sales Q: ",sales_Q);

    const expenses_Q = arrayDataJSON[fileNo][42].slice(1);
    // console.log("Expenses Q: ",expenses_Q);

    const other_income_Q = arrayDataJSON[fileNo][43].slice(1);
    // console.log("Other Income Q: ",other_income_Q);

    const depreciation_Q = arrayDataJSON[fileNo][44].slice(1);
    // console.log("Depreciation Q: ",depreciation_Q);

    const interest_Q = arrayDataJSON[fileNo][45].slice(1);
    // console.log("Interest Q: ",interest_Q);

    const profit_before_tax_Q = arrayDataJSON[fileNo][46].slice(1); 
    // console.log("Profit Before Tax Q: ",profit_before_tax_Q);

    const tax_Q = arrayDataJSON[fileNo][47].slice(1);
    // console.log("Tax Q: ",tax_Q);

    const net_profit_Q = arrayDataJSON[fileNo][48].slice(1);
    // console.log("Net Profit Q: ",net_profit_Q);

    const operating_profit_Q = arrayDataJSON[fileNo][49].slice(1);
    // console.log("Operating Profit Q: ",operating_profit_Q);

    //-------------Balance Sheet Data----------------
    const report_date_BS = arrayDataJSON[fileNo][55].slice(1);
    // console.log("Report Dates BS: ",report_date_BS);

    const equity_share_capital_BS = arrayDataJSON[fileNo][56].slice(1);
    // console.log("Equity Share Capital BS: ",equity_share_capital_BS);

    const reserves_BS = arrayDataJSON[fileNo][57].slice(1);
    // console.log("Reserves BS: ",reserves_BS);

    const borrowings_BS = arrayDataJSON[fileNo][58].slice(1);
    // console.log("Borrowings BS: ",borrowings_BS);

    const other_liabilities_BS = arrayDataJSON[fileNo][59].slice(1);
    // console.log("Other Liabilities BS: ",other_liabilities_BS);

    const total_liabilities_BS = arrayDataJSON[fileNo][60].slice(1);
    // console.log("Total Liabilities BS: ",total_liabilities_BS);

    const net_block_BS = arrayDataJSON[fileNo][61].slice(1);
    // console.log("Net Block BS: ",net_block_BS);

    const capital_work_in_progress_BS = arrayDataJSON[fileNo][62].slice(1);
    // console.log("Capital Work in Progress BS: ",capital_work_in_progress_BS);

    const investments_BS = arrayDataJSON[fileNo][63].slice(1);
    // console.log("Investments BS: ",investments_BS);

    const other_assets_BS = arrayDataJSON[fileNo][64].slice(1);
    // console.log("Other Assets BS: ",other_assets_BS);

    const total_assets_BS = arrayDataJSON[fileNo][65].slice(1);
    // console.log("Total Assets BS: ",total_assets_BS);

    const receivables_BS = arrayDataJSON[fileNo][66].slice(1);
    // console.log("Receivables BS: ",receivables_BS);

    const inventory_BS = arrayDataJSON[fileNo][67].slice(1);
    // console.log("Inventory BS: ",inventory_BS);

    const cash_and_bank_BS = arrayDataJSON[fileNo][68].slice(1);
    // console.log("Cash & Bank BS: ",cash_and_bank_BS);

    const no_of_equity_shares_BS = arrayDataJSON[fileNo][69].slice(1);
    // console.log("No. of Equity Shares BS: ",no_of_equity_shares_BS);

    const new_bonus_shares_BS = arrayDataJSON[fileNo][70].slice(1);
    // console.log("New Bonus Shares BS: ",new_bonus_shares_BS);

    const face_value_BS = arrayDataJSON[fileNo][71].slice(1);
    // console.log("Face Value BS: ",face_value_BS);

    //-------------Cash Flow Data----------------
    const report_date_CF = arrayDataJSON[fileNo][80].slice(1);
    // console.log("Report Dates CF: ",report_date_CF);

    const cash_from_operating_activity_CF = arrayDataJSON[fileNo][81].slice(1);
    // console.log("Cash from Operating Activity CF: ",cash_from_operating_activity_CF);

    const cash_from_investing_activity_CF = arrayDataJSON[fileNo][82].slice(1);
    // console.log("Cash from Investing Activity CF: ",cash_from_investing_activity_CF);

    const cash_from_financing_activity_CF = arrayDataJSON[fileNo][83].slice(1);
    // console.log("Cash from Financing Activity CF: ",cash_from_financing_activity_CF);

    const net_cash_flow_CF = arrayDataJSON[fileNo][84].slice(1);
    // console.log("Net Cash Flow CF: ",net_cash_flow_CF);

    // -----Intialize------

    // Finanacial Year Arrays
    chart_FinancialYear_PL = [];

    // Indian Financial Year Quarter Arrays
    chart_FinancialYear_Q = [];

    // Yearly Sales Arrays
    chart_sales_PL = [];

    // Yearly Sales Growth Arrays
    chart_sales_growth_PL = [null];

    // Quarterly Sales Arrays
    chart_sales_Q = [];

    // Quarterly Sales Growth Arrays
    chart_sales_growth_Q = [null, null, null, null];

    // chart_gross_margin_PL Array
    chart_gross_margin_PL = [];

    // chart_gross_margin_PL Array
    chart_operating_profit_margin_PL = [];

    // chart_net_profit_margin_PL Array
    chart_net_profit_margin_PL = [];

    // Return on Equity
    chart_return_on_equity_BS = [null];

    // chart_net_profit_growth_PL Array
    chart_net_profit_growth_PL = [null];

    // Operating Profit PL
    chart_operating_profit_PL = [];

    // Net Profit PL
    chart_net_profit_PL = [];

    // Debtor Days BS
    chart_debtor_days_BS = [];

    // Inventory Days
    chart_inventory_days_BS = [];

    // Cash from ops
    chart_cash_from_operations = [];

    // Cash from fin
    chart_cash_from_financing = [];

    //cash from inv
    chart_cash_from_investing = [];

    //net cash flow
    chart_net_cash_flow = [];

    //Debt
    chart_debt_bs = [];

    //Debt equity Ratio
    chart_debt_equity_bs = [];

    //Stock Growth
    chart_stock_growth_PL = [null];

    //Dividend yield
    chart_dividend_yield_PL = [];

    // Quartely Operating Margin
    chart_quartely_operating_margin = [];

    // Quartely Net Margin
    chart_quartely_net_margin = [];


    // ------Calculate-------

    // Simple For loop for direct access
    for(let i=0; i<report_date_PL.length; i++)
    {
        // console.log("Index:",i);

        // FY Date
        const FYdate = excelDateToFY(report_date_PL[i]);
        // console.log("FY Date:",FYdate);

        chart_FinancialYear_PL.push(FYdate);

        // Quarterly Date
        const IndianFYQuarter = excelDateToIndianFYQuarter(report_date_Q[i]);
        // console.log("Indian FY Quarter:",IndianFYQuarter);

        chart_FinancialYear_Q.push(IndianFYQuarter);

        // Yearly Sales
        const sales = sales_PL[i];
        // console.log("Sales:",sales);

        chart_sales_PL.push(Math.round(sales));

        // Quarterly Sales
        const salesQ = sales_Q[i];
        // console.log("Sales Q:",salesQ);

        chart_sales_Q.push(Math.round(salesQ));   
        
        // Gross Margin PL Calculation
        const gross_profit = sales - raw_material_cost_PL[i] + change_in_inventory_PL[i];
        const gross_profit_margin = (gross_profit*100)/sales

        chart_gross_margin_PL.push(parseFloat(gross_profit_margin.toFixed(2)));

        // Operating Profit Margin PL Calculation
        // const Operating_profit = gross_profit - power_and_fuel_PL[i] - other_mfr_exp_PL[i] - employee_cost_PL[i] - selling_and_admin_PL[i] - other_expenses_PL[i];
        const Operating_profit = profit_before_tax_PL[i] + interest_PL[i] + depreciation_PL[i] - other_income_PL[i];
        const Operating_profit_Margin = (Operating_profit*100)/sales;
        
        chart_operating_profit_margin_PL.push(parseFloat(Operating_profit_Margin.toFixed(2)));

        // Net Profit Margin PL Calculation
        const net_profit = net_profit_PL[i];
        const net_profit_margin = (net_profit*100)/sales;

        chart_net_profit_margin_PL.push(parseFloat(net_profit_margin.toFixed(2)));

        // Operating Profit PL
        chart_operating_profit_PL.push(Math.round(Operating_profit));

        // Net Profit PL
        chart_net_profit_PL.push(Math.round(net_profit));

        // Debtor Days
        const debtor_days = (receivables_BS[i] / sales) * 365;
        chart_debtor_days_BS.push(Math.round(debtor_days));

        // Inventory Days
        const inventory_days = (inventory_BS[i]/(raw_material_cost_PL[i]-change_in_inventory_PL[i]))*365
        chart_inventory_days_BS.push(Math.round(inventory_days));

        // Cash from OPs
        chart_cash_from_operations.push(Math.round(cash_from_operating_activity_CF[i]));

        //Cash from Investing Activty
        chart_cash_from_investing.push(Math.round(cash_from_investing_activity_CF[i]));

        //Cash from Finance Activity
        chart_cash_from_financing.push(Math.round(cash_from_financing_activity_CF[i]));

        //Net cash flow
        chart_net_cash_flow.push(Math.round(net_cash_flow_CF[i]));

        // Debt
        chart_debt_bs.push(Math.round(borrowings_BS[i]));

        // Debt/Equity
        const debt_equity = borrowings_BS[i]/(equity_share_capital_BS[i] + reserves_BS[i]);
        chart_debt_equity_bs.push(parseFloat(debt_equity.toFixed(2)));

        // Dividend yield
        const Dividend_yield = (dividend_amount_PL[i]/net_profit)*100;
        chart_dividend_yield_PL.push(parseFloat(Dividend_yield.toFixed(2)));

        // Quartely OPM
        const quartely_operating_profit = operating_profit_Q[i];
        const quartely_operating_profit_margin = quartely_operating_profit*100/salesQ;

        chart_quartely_operating_margin.push(parseFloat(quartely_operating_profit_margin.toFixed(2)));

        // Quartely NPM
        const quartely_net_profit = net_profit_Q[i];
        const quartely_net_profit_margin = quartely_net_profit*100/salesQ;

        chart_quartely_net_margin.push(parseFloat(quartely_net_profit_margin.toFixed(2)));
    }


    // Growth Calculations
    // Sales YOY growth calculation
    for(let i=0; i<report_date_PL.length; i++)
    {
        // console.log("Index:",i);

        if (i==0)
        {
            // First entry, no growth calculation
        }
        else
        {
            // SALES GROWTH CALC PL
            const sales_growth = ((sales_PL[i] - sales_PL[i-1]) / sales_PL[i-1]) * 100;
            // console.log("Sales YOY Growth:",sales_growth);

            chart_sales_growth_PL.push(parseFloat(sales_growth.toFixed(2)));

            // Return on Equity Calc
            const avg_shareholders_equity = (equity_share_capital_BS[i-1] + equity_share_capital_BS[i] + reserves_BS[i-1] + reserves_BS[i])/2
            const return_on_equity = net_profit_PL[i] * 100/avg_shareholders_equity;

            chart_return_on_equity_BS.push(parseFloat(return_on_equity.toFixed(2)));

            // Net Profit growth PL
            const net_profit_growth = ((net_profit_PL[i] - net_profit_PL[i - 1]) / Math.abs(net_profit_PL[i - 1])) * 100;

            // console.log("Net Profit YOY Growth:",sales_growth);

            chart_net_profit_growth_PL.push(parseFloat(net_profit_growth.toFixed(2)));

            // Return 
            const stock_growth = ((price[i] - price[i-1]) / price[i-1]) * 100;

            chart_stock_growth_PL.push(parseFloat(stock_growth.toFixed(2)));
        }
    }

    // Sales QOQ growth calculation
    for(let i=0; i<report_date_Q.length; i++)
    {
        // console.log("Index:",i);
        if (i<4)
        {
            // First four entries, no growth calculation
        }   
        else
        {
            // const growth_q = (((sales_Q[i]-sales_Q[i-4])/sales_Q[i-4])*100).toFixed(1);
            chart_sales_growth_Q.push(parseFloat((((sales_Q[i]-sales_Q[i-4])/sales_Q[i-4])*100).toFixed(1)));
        }
    }

    // Store in chartArratDataJson

    // Legend
    chartArrayDataJson[fileNo]["Legend"] = chart_company_name;

    // Financial Year PL
    chartArrayDataJson[fileNo]["FinancialYear_PL"] = chart_FinancialYear_PL;

    // Sales PL
    chartArrayDataJson[fileNo]["Sales_PL"] = chart_sales_PL;

    // Sales Growth PL
    chartArrayDataJson[fileNo]["Sales_Growth_PL"] = chart_sales_growth_PL;

    // Gross Margin PL
    chartArrayDataJson[fileNo]["Gross_Margin_PL"] = chart_gross_margin_PL;

    // Ebitda Margin PL
    chartArrayDataJson[fileNo]["Operating_Profit_Margin_PL"] = chart_operating_profit_margin_PL;

    // Net Profit Margin PL
    chartArrayDataJson[fileNo]["Net_Profit_Margin_PL"] = chart_net_profit_margin_PL;

    // Return on Equity
    chartArrayDataJson[fileNo]["Return_On_Equity_BS"] = chart_return_on_equity_BS;

    // Net Profit Growth PL
    chartArrayDataJson[fileNo]["Net_Profit_Growth_PL"] = chart_net_profit_growth_PL;

    // Ebitda PL
    chartArrayDataJson[fileNo]["Operating_Profit_PL"] = chart_operating_profit_PL;
    
    // Net Profit Growth PL
    chartArrayDataJson[fileNo]["Net_Profit_PL"] = chart_net_profit_PL; 
    
    // Debtor Days
    chartArrayDataJson[fileNo]["Debtor_Days_BS"] = chart_debtor_days_BS;

    // Inventory Days
    chartArrayDataJson[fileNo]["Inventory_Days_BS"] = chart_inventory_days_BS;

    // Cssh from ops
    chartArrayDataJson[fileNo]["Cash_from_Operations_CF"] = chart_cash_from_operations;

    // Cssh from fin
    chartArrayDataJson[fileNo]["Cash_from_Financing_CF"] = chart_cash_from_financing;

    // Cssh from inv
    chartArrayDataJson[fileNo]["Cash_from_Investing_CF"] = chart_cash_from_investing;

    // Cssh from ops
    chartArrayDataJson[fileNo]["Net_Cash_Flow_CF"] = chart_net_cash_flow;

    // Debt
    chartArrayDataJson[fileNo]["Debt_BS"] = chart_debt_bs;

    // Debt/Equity
    chartArrayDataJson[fileNo]["Debt_Equity_BS"] = chart_debt_equity_bs;

    // Stocks Price return
    chartArrayDataJson[fileNo]["Returns"] = chart_stock_growth_PL;

    // Dividend Yield
    chartArrayDataJson[fileNo]["Dividend_Yield_PL"] = chart_dividend_yield_PL;

    // Indian Financial Year Quarter Q
    chartArrayDataJson[fileNo]["IndianFYQuarter_Q"] = chart_FinancialYear_Q;

    // Sales Q
    chartArrayDataJson[fileNo]["Sales_Q"] = chart_sales_Q;

    // Sales Growth Q
    chartArrayDataJson[fileNo]["Sales_Growth_Q"] = chart_sales_growth_Q;

    // Quartely Operating Margin
    chartArrayDataJson[fileNo]["Quartely_OPM"] = chart_quartely_operating_margin; 

    // Net Profit Margin
    chartArrayDataJson[fileNo]["Quartely_NPM"] = chart_quartely_net_margin;
}