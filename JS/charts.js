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

const config = {
  responsive: false,
  displayModeBar: false,
  modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'],
  displaylogo: false
};

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
    
    // Plotly.newPlot(id, traces, layout, config);
    document.getElementById(id).textContent = "Hello World";

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
    
    console.log("Sorted Years", sortedYears);

    // Create a trace for each company
    const traces = Object.keys(chartArrayDataJson).map((key, index) => {
        const companyData = chartArrayDataJson[key];
        const sales = dataLimit ? companyData[yKey].slice(-dataLimit) : companyData[yKey];
        const years = dataLimit ? (companyData[xKey].slice(-dataLimit) || []) : (companyData[xKey] || []);

        return {
            x: years,
            y: sales,
            name: companyData.Legend,
            type: "bar",
            text: sales,
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

    const maxY = Math.max(
        ...Object.values(chartArrayDataJson).flatMap(c => {
            return dataLimit ? c[yKey].slice(-dataLimit) : c[yKey];
        })
    );

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
