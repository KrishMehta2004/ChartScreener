// ============================================================================
// CHART VISUALIZATION SYSTEM
// ============================================================================
// This script creates interactive financial charts using Plotly.js
// Supports bar charts and line charts with multiple company comparisons
// ============================================================================

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

/**
 * Color palette for up to 4 companies
 * Each company gets a unique color for visual distinction
 */
const colors = [
    "rgb(255, 49, 49)",   // Company 1 - Red
    "rgb(31, 192, 255)",  // Company 2 - Blue
    "rgb(234, 179, 8)",   // Company 3 - Yellow
    "rgb(34, 197, 94)"    // Company 4 - Green
];

/**
 * Global Plotly configuration
 * Disables unnecessary toolbar elements for cleaner UI
 */
const config = {
    responsive: false,
    displayModeBar: false,
    modeBarButtonsToRemove: [
        'zoom2d', 'pan2d', 'select2d', 'lasso2d', 
        'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 
        'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'
    ],
    displaylogo: false
};

/**
 * Chart configurations - Single source of truth
 * Defines all chart types, data mappings, and display settings
 */
const CHART_CONFIGS = {
    'chart1': {
        type: "bar",
        xKey: "FinancialYear_PL",
        yKey: "Sales_PL",
        title: "Revenue Trend (Rs. in Crores)",
        dataLimit: -5
    },
    'chart2': {
        type: "line",
        xKey: "FinancialYear_PL",
        yKey: "Sales_Growth_PL",
        title: "Sales Growth Trend (%)",
        dataLimit: -5
    },
    'chart3': {
        type: "bar",
        xKey: "IndianFYQuarter_Q",
        yKey: "Sales_Q",
        title: "Quarterly Revenue Trend (Rs. in Crores)",
        dataLimit: -5
    },
    'chart4': {
        type: "line",
        xKey: "IndianFYQuarter_Q",
        yKey: "Sales_Growth_Q",
        title: "Quarterly Sales Growth Trend (%)",
        dataLimit: "Q "  
    }
};

// ============================================================================
// UI HELPER FUNCTIONS
// ============================================================================

/**
 * Toggles the information overlay for chart cards
 * @param {HTMLElement} el - The info button element that was clicked
 */
function toggleInfo(el) {
    const card = el.closest('.chart-card');
    const overlay = card.querySelector('.info-overlay');
    overlay.classList.toggle('active');
    card.classList.toggle('info-open');
}

// ============================================================================
// CHART CREATION ORCHESTRATION
// ============================================================================

/**
 * Main function to create all charts on the dashboard
 * Called when data is loaded and ready to be visualized
 */
function createAllCharts() {
    console.log("Creating all charts with data:", window.chartArrayDataJson);

    // Create each chart using the predefined configurations
    Object.entries(CHART_CONFIGS).forEach(([id, config]) => {
        createPairValues({ ...config, id });
    });
}

/**
 * Prepares X-Y data pairs from the raw data for each company
 * Routes to appropriate chart creation function based on type
 * 
 * @param {Object} chartConfig - Configuration object for the chart
 * @param {string} chartConfig.id - DOM element ID where chart will render
 * @param {string} chartConfig.type - Chart type ("bar" or "line")
 * @param {string} chartConfig.xKey - Key name for X-axis data in source
 * @param {string} chartConfig.yKey - Key name for Y-axis data in source
 * @param {string} chartConfig.title - Chart title
 * @param {number|null} chartConfig.dataLimit - Number of data points to show (negative for last N)
 */
function createPairValues(chartConfig) {
    console.log("Creating chart with config:", chartConfig);

    // Extract X-Y pairs for each company from the global data
    const xyPairs = {};
    Object.entries(window.chartArrayDataJson).forEach(([key, value]) => {
        xyPairs[key] = {
            x: value[chartConfig.xKey],
            y: value[chartConfig.yKey],
            legend: value.Legend
        };
    });

    // Route to appropriate chart creation function
    if (chartConfig.type === "bar") {
        createBarChart(chartConfig, xyPairs);
    } else if (chartConfig.type === "line") {
        createLineChart(chartConfig, xyPairs);
    }
}

// ============================================================================
// BAR CHART CREATION
// ============================================================================

/**
 * Creates a grouped bar chart with multiple companies
 * Handles data alignment, scaling, and layout
 * 
 * @param {Object} chartConfig - Chart configuration object
 * @param {Object} xyPairs - Object containing X-Y data pairs for each company
 */
function createBarChart(chartConfig, xyPairs) {
    const pairs = Object.values(xyPairs);

    // Step 1: Find common X values across all companies
    // This ensures we only plot years/quarters where ALL companies have data
    const commonX = pairs
        .map(p => new Set(p.x))
        .reduce((acc, set) => new Set([...acc].filter(x => set.has(x))));

    if (commonX.size === 0) {
        console.warn("No common X values found for", chartConfig.title);
        return;
    }

    // Step 2: Sort X values chronologically
    const sortedCommonX = [...commonX].sort((a, b) => a - b);

    // Step 3: Apply data limit (e.g., last 5 years)
    const limit = Math.abs(chartConfig.dataLimit || sortedCommonX.length);
    const finalX = sortedCommonX.slice(-limit);

    // Step 4: Create traces (one per company)
    const traces = pairs.map((pair, index) => {
        // Map Y values to the final X values
        const y = finalX.map(xVal => {
            const i = pair.x.indexOf(xVal);
            return pair.y[i];
        });

        return {
            x: finalX,
            y,
            name: pair.legend,
            type: "bar",
            text: y,
            textposition: "outside",
            cliponaxis: false,
            hoverinfo: "none",
            marker: {
                color: colors[index % colors.length]
            }
        };
    });

    // Step 5: Calculate Y-axis range with padding
    const allYValues = pairs.flatMap(pair =>
        finalX.map(xVal => {
            const index = pair.x.indexOf(xVal);
            return pair.y[index];
        })
    );

    const maxY = Math.max(...allYValues);
    const minY = Math.min(...allYValues);
    const yPadding = Math.max(Math.abs(maxY), Math.abs(minY)) * 0.15;

    // Step 6: Define layout
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
            text: chartConfig.title,
            font: { size: 20 }
        },
        xaxis: {
            tickfont: { size: 18 },
            tickmode: 'linear',
            tick0: finalX[0],
            dtick: 1,
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
            orientation: 'h'
        },
        barmode: "group",
        bargap: 0.18,
        bargroupgap: 0.18,
        margin: { t: 75, l: 15, r: 15, b: 45 }
    };

    // Step 7: Render the chart
    Plotly.newPlot(chartConfig.id, traces, layout, config);
}

// ============================================================================
// LINE CHART CREATION
// ============================================================================

/**
 * Creates a line chart with markers and value annotations
 * Shows trends over time with smooth spline interpolation
 * 
 * @param {Object} chartConfig - Chart configuration object
 * @param {Object} xyPairs - Object containing X-Y data pairs for each company
 */
function createLineChart(chartConfig, xyPairs) {
    const pairs = Object.values(xyPairs);

    // Step 1: Find common X values across all companies
    const commonX = pairs
        .map(p => new Set(p.x))
        .reduce((acc, set) => new Set([...acc].filter(x => set.has(x))));

    if (commonX.size === 0) {
        console.warn("No common X values found for", chartConfig.title);
        return;
    }

    // Step 2: Sort X values chronologically
    const sortedCommonX = [...commonX].sort((a, b) => a - b);

    // Step 3: Apply data limit (e.g., last 5 years)
    const limit = Math.abs(chartConfig.dataLimit || sortedCommonX.length);
    const finalX = sortedCommonX.slice(-limit);

    // Step 4: Create line traces (one per company)
    const traces = pairs.map((pair, index) => {
        const y = finalX.map(xVal => {
            const i = pair.x.indexOf(xVal);
            return pair.y[i];
        });

        return {
            x: finalX,
            y,
            name: pair.legend,
            type: "scatter",
            mode: "lines+markers",
            cliponaxis: false,
            connectgaps: false,
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

    // Step 5: Create value annotations for each data point
    const annotations = [];
    pairs.forEach((pair, pairIndex) => {
        finalX.forEach((xVal) => {
            const yVal = pair.y[pair.x.indexOf(xVal)];

            // Only add annotation if value exists and is not null
            if (yVal !== null && yVal !== undefined && !isNaN(yVal)) {
                annotations.push({
                    x: xVal,
                    y: yVal,
                    text: `${yVal.toFixed(1)}%`,
                    showarrow: false,
                    font: {
                        size: 16,
                        color: colors[pairIndex % colors.length]
                    },
                    yshift: pairIndex % 2 === 0 ? 14 : -14  // Alternate positioning
                });
            }
        });
    });

    // Step 6: Define layout
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
            text: chartConfig.title,
            font: { size: 20 }
        },
        xaxis: {
            tickfont: { size: 18 },
            tickmode: 'linear',
            tick0: finalX[0],
            dtick: 1,
        },
        yaxis: {
            visible: false
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

    // Step 7: Render the chart
    Plotly.newPlot(chartConfig.id, traces, layout, config);
}

// ============================================================================
// MODAL FUNCTIONALITY
// ============================================================================

/**
 * Stores the ID of the currently opened chart in modal
 * @type {string|null}
 */
let currentModalChart = null;

/**
 * Opens a chart in fullscreen modal with all available data
 * Reuses the same configuration but removes data limits
 * 
 * @param {string} chartId - ID of the chart to open in modal
 */
function openChart(chartId) {
    console.log("Opening chart modal for:", chartId);
    
    const modal = document.getElementById('chartModal');
    modal.classList.add('active');

    // Get the base configuration
    const baseConfig = CHART_CONFIGS[chartId];
    
    if (baseConfig) {
        currentModalChart = chartId;
        
        // Create modal chart with ALL data (no limit)
        createPairValues({
            ...baseConfig,
            id: "modalChart",
            dataLimit: null,  // Show all available data
            title: baseConfig.title + " - All Data"
        });
    }
}

/**
 * Closes the chart modal and cleans up
 * Only closes if clicking outside the chart or on close button
 * 
 * @param {Event} event - Click event
 */
function closeChartModal(event) {
    if (event.target.id === 'chartModal' || event.target.classList.contains('close')) {
        const modal = document.getElementById('chartModal');
        modal.classList.remove('active');
        
        // Clean up Plotly instance to free memory
        Plotly.purge('modalChart');
        currentModalChart = null;
    }
}

// ============================================================================
// EXPORTS & INITIALIZATION
// ============================================================================

/**
 * Global functions available to HTML
 * - toggleInfo: Toggle info overlay on chart cards
 * - createAllCharts: Initialize all dashboard charts
 * - openChart: Open chart in modal
 * - closeChartModal: Close modal
 */