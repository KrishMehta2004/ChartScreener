function toggleInfo(el) {
    const card = el.closest('.chart-card');
    const overlay = card.querySelector('.info-overlay');
    overlay.classList.toggle('active');
    card.classList.toggle('info-open');
}

const colors = [
  "rgb(255, 49, 49)",
  "rgb(31, 81, 255)",
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
    return periods.sort((a, b) => {
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
            title: "Revenue Trend (Rs. in Crores)" 
        },
        { 
            id: "chart2", 
            type: "line", 
            xKey: "FinancialYear_PL", 
            yKey: "Sales_Growth_PL", 
            title: "Sales Growth Trend (%)" 
        },
        { 
            id: "chart3", 
            type: "bar", 
            xKey: "IndianFYQuarter_Q", 
            yKey: "Sales_Q", 
            title: "Quartely Revenue Trend (Rs. in Crores)" 
        },
        { 
            id: "chart4", 
            type: "line", 
            xKey: "IndianFYQuarter_Q", 
            yKey: "Sales_Growth_Q", 
            title: "Quartely Sales Growth Trend (%)" 
        }
    ];

    // Create each chart
    chartConfigs.forEach(chartConfig => {
        createChart(chartConfig);
    });
}

// Generic chart creator
function createChart({ id, type, xKey, yKey, title }) {
    let traces, layout;
    
    if (type === "bar") {
        ({ traces, layout } = createBarChart(xKey, yKey, title));
    } else if (type === "line") {
        ({ traces, layout } = createLineChart(xKey, yKey, title));
    }
    
    Plotly.newPlot(id, traces, layout, config);
}

// Reusable bar chart creator
function createBarChart(xKey, yKey, title) {
    console.log("Creating Bar Chart with Y:", yKey, "X:", xKey);

    // Collect all unique years from all companies and sort them
    const allYears = new Set();
    Object.keys(chartArrayDataJson).forEach(key => {
        const years = chartArrayDataJson[key][xKey].slice(-5);
        years.forEach(year => allYears.add(year));
    });
    const sortedYears = Array.from(allYears).sort();

    const maxY = Math.max(
        ...Object.values(chartArrayDataJson).flatMap(c => c[yKey].slice(-5))
    );

    // Create a trace for each company
    const traces = Object.keys(chartArrayDataJson).map((key, index) => {
        const companyData = chartArrayDataJson[key];
        const sales = companyData[yKey].slice(-5);
        const years = companyData[xKey].slice(-5) || [];

        // Create a map of year to sales value
        const yearToSales = {};
        years.forEach((year, i) => {
            yearToSales[year] = sales[i];
        });

        // Align data to sorted years (null for missing years)
        const alignedSales = sortedYears.map(year => yearToSales[year] || null);
        const formattedSales = alignedSales.map(value => 
            value ? value.toLocaleString("en-IN", { 
                minimumFractionDigits: 1, 
                maximumFractionDigits: 1 
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
        autosize: true,
        paper_bgcolor: "#2d2d2d",
        plot_bgcolor: "#2d2d2d",
        barcornerradius: 8,
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

// Reusable line chart creator
function createLineChart(xKey, yKey, title) {
    console.log("Creating Line Chart with Y:", yKey, "X:", xKey);

    // Get the last 5 financial years from first company (assuming all have same years)
    const firstCompanyKey = Object.keys(chartArrayDataJson)[0];
    const xValues = chartArrayDataJson[firstCompanyKey][xKey].slice(-5);

    // Build line traces for each company
    const traces = Object.keys(chartArrayDataJson).map((key, index) => {
        const companyData = chartArrayDataJson[key];
        const yValues = companyData[yKey].slice(-5);
        
        return {
            x: xValues,
            y: yValues,
            name: companyData.Legend,
            type: "scatter",
            mode: "lines+markers",
            cliponaxis: false,
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

    // Create annotations for all data points with smart positioning
    const annotations = [];
    
    xValues.forEach((xVal, pointIndex) => {
        // Collect all values at this x-position across all companies
        const pointsAtX = Object.keys(chartArrayDataJson).map((key, companyIndex) => {
            const yValue = chartArrayDataJson[key][yKey].slice(-5)[pointIndex];
            return {
                value: yValue,
                companyIndex: companyIndex,
                x: xVal
            };
        });
        
        // Sort by value (descending)
        pointsAtX.sort((a, b) => b.value - a.value);
        
        // Determine if values are close
        const valueRange = pointsAtX[0].value - pointsAtX[pointsAtX.length - 1].value;
        const useAlternating = valueRange < 15;
        
        pointsAtX.forEach((point, rank) => {
            let yanchor, yshift;
            
            if (useAlternating) {
                // Alternate: top, bottom, top, bottom
                if (rank % 2 === 0) {
                    yanchor = 'bottom';
                    yshift = 10;
                } else {
                    yanchor = 'top';
                    yshift = -10;
                }
            } else {
                // Position based on relative position
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
    });

    // Calculate min and max Y for scaling
    const allYValues = Object.values(chartArrayDataJson).flatMap(c => c[yKey].slice(-5));
    const maxY = Math.max(...allYValues);
    const minY = Math.min(...allYValues);
    const yPadding = (maxY - minY) * 0.2;

    const layout = {
        autosize: true,
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