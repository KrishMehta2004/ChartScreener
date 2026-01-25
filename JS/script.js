// Load the initial Chart Data Json

window.chartArrayDataJson = initialChartDataJson;

if (window.initialChartDataJson && Object.keys(window.initialChartDataJson).length > 0) {
    createAllCharts();
}