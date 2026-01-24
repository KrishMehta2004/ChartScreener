function toggleInfo(el) {
    const card = el.closest('.chart-card');
    const overlay = card.querySelector('.info-overlay');
    overlay.classList.toggle('active');
    card.classList.toggle('info-open');
}

const colors = [
  "rgb(255, 49, 49)",
  "rgb(31, 192, 255)",
  "rgb(234, 179, 8)",
  "rgb(34, 197, 94)"
];

const text_colors = [
  "rgb(255, 92, 92)",
  "rgb(31, 192, 255)",
  "rgb(234, 179, 8)",
  "rgb(34, 197, 94)"
];

const config = {
  responsive: false,
  displayModeBar: false,
  modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false
};

// Helper function to parse and sort quarterly/yearly data
function parseFinancialPeriod(period) {
    // Handle null/undefined values
    if (period === null || period === undefined) {
        return 0;
    }
    
    const str = period.toString().toUpperCase().trim();
    
    // Check if it's quarterly format (Q1 FY24, Q2 FY25, etc.)
    const quarterMatch = str.match(/Q(\d)\s*FY(\d{2})/);
    if (quarterMatch) {
        const quarter = parseInt(quarterMatch[1]);
        const year = parseInt(quarterMatch[2]);
        // Convert to sortable number: year * 10 + quarter
        // Q1 FY24 = 241, Q2 FY24 = 242, Q1 FY25 = 251
        return year * 10 + quarter;
    }
    
    // Check if it's yearly format (FY24, FY2024, 2024, etc.)
    const yearMatch = str.match(/(?:FY)?(\d{2,4})/);
    if (yearMatch) {
        let year = parseInt(yearMatch[1]);
        // Convert 2-digit to 4-digit if needed
        if (year < 100) {
            year = year + (year < 50 ? 2000 : 1900);
        }
        return year * 10; // Multiply by 10 to align with quarterly system
    }
    
    // Fallback: return 0 if format not recognized
    return 0;
}

// Sort financial periods correctly
function sortFinancialPeriods(periods) {
    // Filter out null/undefined values before sorting
    return periods
        .filter(p => p !== null && p !== undefined)
        .sort((a, b) => {
            return parseFinancialPeriod(a) - parseFinancialPeriod(b);
        });
}
// Main chart creation orchestrator
function createAllCharts() {
    console.log("Creating all charts with data:", window.chartArrayDataJson);

    // Define chart configurations
    const chartConfigs = [
        { 
            id: "chart1", 
            type: "bar", 
            xKey: "FinancialYear_PL", 
            yKey: "Sales_PL", 
            title: "Revenue Trend (Rs. in Crores)",
            dataLimit: 5
        },
        { 
            id: "chart2", 
            type: "line", 
            xKey: "FinancialYear_PL", 
            yKey: "Sales_Growth_PL", 
            title: "Sales Growth Trend (%)",
            dataLimit: 5
        },
        { 
            id: "chart3", 
            type: "bar", 
            xKey: "IndianFYQuarter_Q", 
            yKey: "Sales_Q", 
            title: "Quartely Revenue Trend (Rs. in Crores)",
            dataLimit: 5
        },
        { 
            id: "chart4", 
            type: "line", 
            xKey: "IndianFYQuarter_Q", 
            yKey: "Sales_Growth_Q", 
            title: "Quartely Sales Growth Trend (%)",
            dataLimit: 5
        }
    ];

    // Create each chart
    chartConfigs.forEach(chartConfig => {
        createChart(chartConfig);
    });
}

// Generic chart creator
function createChart({ id, type, xKey, yKey, title, dataLimit }) {
    let traces, layout;
    
    if (type === "bar") {
        ({ traces, layout } = createBarChart(xKey, yKey, title, dataLimit));
    } else if (type === "line") {
        ({ traces, layout } = createLineChart(xKey, yKey, title, dataLimit));
    }
    
    Plotly.newPlot(id, traces, layout, config);
}

// Reusable bar chart creator
function createBarChart(xKey, yKey, title, dataLimit) {
    console.log("Creating Bar Chart with Y:", yKey, "X:", xKey, "Limit:", dataLimit);

    // Collect all unique years from all companies and sort them
    const allYears = new Set();
    Object.keys(chartArrayDataJson).forEach(key => {
        const years = dataLimit ? chartArrayDataJson[key][xKey].slice(-dataLimit) : chartArrayDataJson[key][xKey];
        years.forEach(year => allYears.add(year));
    });
    const sortedYears = Array.from(allYears).sort();

    const maxY = Math.max(
        ...Object.values(chartArrayDataJson).flatMap(c => {
            return dataLimit ? c[yKey].slice(-dataLimit) : c[yKey];
        })
    );

    // Create a trace for each company
    const traces = Object.keys(chartArrayDataJson).map((key, index) => {
        const companyData = chartArrayDataJson[key];
        const sales = dataLimit ? companyData[yKey].slice(-dataLimit) : companyData[yKey];
        const years = dataLimit ? (companyData[xKey].slice(-dataLimit) || []) : (companyData[xKey] || []);

        // Create a map of year to sales value
        const yearToSales = {};
        years.forEach((year, i) => {
            yearToSales[year] = sales[i];
        });

        // Align data to sorted years (null for missing years)
        const alignedSales = sortedYears.map(year => yearToSales[year] || null);
        const formattedSales = alignedSales.map(value => 
            value ? value.toLocaleString("en-IN", { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
            }) : ''
        );

        return {
            x: sortedYears,
            y: alignedSales,
            name: companyData.Legend,
            type: "bar",
            text: formattedSales,
            textposition: "outside",
            cliponaxis: false,
            hoverinfo: "none",
            marker: {
                color: colors[index],
                line: {
                    color: colors[index],
                    width: 1.5
                }
            }
        };
    });

    const layout = {
        showlegend: true,
        autosize: true,
        dragmode: false,
        paper_bgcolor: "#2d2d2d",
        plot_bgcolor: "#2d2d2d",
        barcornerradius: 8,
        font: {
            family: "Roboto Condensed, sans-serif",
            size: 16,
            color: "#e0e0e0"
        },
        title: {
            text: title,
            font: { size: 20 }
        },
        xaxis: {
            tickfont: { size: 18 }
        },
        yaxis: {
            visible: false,
            range: [0, maxY * 1.1]
        },
        legend: {
            x: 0,
            y: 1.075,
            bgcolor: "#2d2d2d",
            bordercolor: "rgba(255,255,255,0)",
            font: { size: 14 },
            orientation: 'h'
        },
        barmode: "group",
        bargap: 0.18,
        bargroupgap: 0.18,
        margin: { t: 75, l: 15, r: 15, b: 45 }
    };

    return { traces, layout };
}

function createLineChart(xKey, yKey, title, dataLimit) {
    console.log("Creating Line Chart with Y:", yKey, "X:", xKey, "Limit:", dataLimit);

    // Collect all unique periods from all companies and sort them (filter out nulls)
    const allPeriods = new Set();
    Object.keys(chartArrayDataJson).forEach(key => {
        const periods = dataLimit ? chartArrayDataJson[key][xKey].slice(-dataLimit) : chartArrayDataJson[key][xKey];
        periods.forEach(period => {
            if (period !== null && period !== undefined) {
                allPeriods.add(period);
            }
        });
    });
    
    // Sort periods using the financial period parser
    const sortedPeriods = sortFinancialPeriods(Array.from(allPeriods));
    const xValues = dataLimit ? sortedPeriods.slice(-dataLimit) : sortedPeriods;

    // Build line traces for each company with aligned data
    const traces = Object.keys(chartArrayDataJson).map((key, index) => {
        const companyData = chartArrayDataJson[key];
        const rawYValues = dataLimit ? companyData[yKey].slice(-dataLimit) : companyData[yKey];
        const rawXValues = dataLimit ? companyData[xKey].slice(-dataLimit) : companyData[xKey];
        
        // Create a map of period to value (skip null periods)
        const periodToValue = {};
        rawXValues.forEach((period, i) => {
            if (period !== null && period !== undefined) {
                periodToValue[period] = rawYValues[i];
            }
        });
        
        // Align data to sorted periods (null for missing periods)
        const alignedYValues = xValues.map(period => periodToValue[period] !== undefined ? periodToValue[period] : null);
        
        return {
            x: xValues,
            y: alignedYValues,
            name: companyData.Legend.split(' ').slice(0, 2).join(' '),
            type: "scatter",
            mode: "lines+markers",
            cliponaxis: false,
            connectgaps: false, // Don't connect across null values
            hovertemplate: '<b>%{y:,.1f}</b><extra></extra>',
            line: { 
                color: colors[index], 
                width: 3,
                shape: 'spline'
            },
            marker: { 
                size: 8, 
                color: colors[index] 
            }
        };
    });

    // Create annotations only for non-null data points
    const annotations = [];
    
    xValues.forEach((xVal, pointIndex) => {
        // Collect all non-null values at this x-position
        const pointsAtX = [];
        Object.keys(chartArrayDataJson).forEach((key, companyIndex) => {
            const rawYValues = dataLimit ? chartArrayDataJson[key][yKey].slice(-dataLimit) : chartArrayDataJson[key][yKey];
            const rawXValues = dataLimit ? chartArrayDataJson[key][xKey].slice(-dataLimit) : chartArrayDataJson[key][xKey];
            
            const periodToValue = {};
            rawXValues.forEach((period, i) => {
                if (period !== null && period !== undefined) {
                    periodToValue[period] = rawYValues[i];
                }
            });
            
            const yValue = periodToValue[xVal];
            if (yValue !== undefined && yValue !== null) {
                pointsAtX.push({
                    value: yValue,
                    companyIndex: companyIndex,
                    x: xVal
                });
            }
        });
        
        // Sort by value (descending)
        pointsAtX.sort((a, b) => b.value - a.value);
        
        // Determine if values are close
        if (pointsAtX.length > 0) {
            const valueRange = pointsAtX[0].value - pointsAtX[pointsAtX.length - 1].value;
            const useAlternating = valueRange < 15;
            
            pointsAtX.forEach((point, rank) => {
                let yanchor, yshift;
                
                if (useAlternating) {
                    if (rank % 2 === 0) {
                        yanchor = 'bottom';
                        yshift = 10;
                    } else {
                        yanchor = 'top';
                        yshift = -10;
                    }
                } else {
                    const midPoint = pointsAtX.length / 2;
                    if (rank < midPoint) {
                        yanchor = 'bottom';
                        yshift = 10;
                    } else {
                        yanchor = 'top';
                        yshift = -10;
                    }
                }
                
                annotations.push({
                    x: point.x,
                    y: point.value,
                    text: point.value.toLocaleString("en-IN", { 
                        minimumFractionDigits: 1, 
                        maximumFractionDigits: 1 
                    }),
                    xanchor: 'center',
                    yanchor: yanchor,
                    yshift: yshift,
                    showarrow: false,
                    font: { 
                        size: 16, 
                        color: colors[point.companyIndex]
                    }
                });
            });
        }
    });

    // Calculate min and max Y for scaling (excluding nulls)
    const allYValues = [];
    Object.values(chartArrayDataJson).forEach(c => {
        const values = dataLimit ? c[yKey].slice(-dataLimit) : c[yKey];
        values.forEach(v => {
            if (v !== null && v !== undefined) allYValues.push(v);
        });
    });
    
    const maxY = Math.max(...allYValues);
    const minY = Math.min(...allYValues);
    const yPadding = (maxY - minY) * 0.2;

    const layout = {
        showlegend: true,
        autosize: true,
        dragmode: false,
        paper_bgcolor: "#2d2d2d",
        plot_bgcolor: "#2d2d2d",
        font: {
            family: "Roboto Condensed, sans-serif",
            size: 13,
            color: "#e0e0e0"
        },
        title: {
            text: title,
            font: { size: 20 }
        },
        xaxis: {
            tickfont: { size: 18 }
        },
        yaxis: {
            visible: false,
            range: [minY - yPadding, maxY + yPadding]
        },
        legend: {
            x: 0,
            y: 1.075,
            bgcolor: "#2d2d2d",
            bordercolor: "rgba(255,255,255,0)",
            font: { size: 14 },
            orientation: "h"
        },
        annotations: annotations,
        margin: { t: 75, l: 15, r: 15, b: 45 }
    };

    return { traces, layout };
}
// Store current chart info for modal
let currentModalChart = null;

function openChart(chartId) {
    console.log("Opening chart modal for:", chartId);
    const modal = document.getElementById('chartModal');
    modal.classList.add('active');

    // Map chart IDs to their configurations
    const chartMap = {
        'chart1': {
            type: "bar",
            xKey: "FinancialYear_PL",
            yKey: "Sales_PL",
            title: "Revenue Trend (Rs. in Crores) - 10 Years"
        },
        'chart2': {
            type: "line",
            xKey: "FinancialYear_PL",
            yKey: "Sales_Growth_PL",
            title: "Sales Growth Trend (%) - 10 Years"
        },
        'chart3': {
            type: "bar",
            xKey: "IndianFYQuarter_Q",
            yKey: "Sales_Q",
            title: "Quarterly Revenue Trend (Rs. in Crores) - All Quarters"
        },
        'chart4': {
            type: "line",
            xKey: "IndianFYQuarter_Q",
            yKey: "Sales_Growth_Q",
            title: "Quarterly Sales Growth Trend (%) - All Quarters"
        }
    };

    const chartConfig = chartMap[chartId];
    if (chartConfig) {
        currentModalChart = chartId;
        createChart({
            id: "modalChart",
            type: chartConfig.type,
            xKey: chartConfig.xKey,
            yKey: chartConfig.yKey,
            title: chartConfig.title,
            dataLimit: null // No limit for modal - show all data
        });
    }
}

// Close modal
function closeChartModal(event) {
    if (event.target.id === 'chartModal' || event.target.classList.contains('close')) {
        const modal = document.getElementById('chartModal');
        modal.classList.remove('active');
        Plotly.purge('modalChart');
        currentModalChart = null;
    }
}