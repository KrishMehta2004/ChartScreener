function excelDateToFY(excelSerial) {

    // console.log("Converting Excel Date Serial:", excelSerial);

    // If undefined or null, return empty string
    if (excelSerial === undefined || excelSerial === null) {
        // console.log("Input is undefined or null. Returning empty string.");
        return null;
    }

    const excelEpochOffset = 25569;
    const msPerDay = 86400 * 1000;

    const jsDate = new Date((excelSerial - excelEpochOffset) * msPerDay);

    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;

    const fyStartYear = month >= 4 ? year : year - 1;
    return `FY${String(fyStartYear + 1).slice(-2)}`;
}

function excelDateToIndianFYQuarter(excelSerial) {

    // console.log("Converting Excel Date Serial:", excelSerial);

    // If undefined or null, return empty string
    if (excelSerial === undefined || excelSerial === null) {
        // console.log("Input is undefined or null. Returning empty string.");
        return null;
    }

    const excelEpochOffset = 25569;
    const msPerDay = 86400 * 1000;

    const jsDate = new Date((excelSerial - excelEpochOffset) * msPerDay);

    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1;

    const fyStartYear = month >= 4 ? year : year - 1;

    let quarter, fyYear;

    if (month >= 4 && month <= 6) {
        quarter = "Q1";
        fyYear = year + 1;
    } else if (month >= 7 && month <= 9) {
        quarter = "Q2";
        fyYear = year + 1;
    } else if (month >= 10 && month <= 12) {
        quarter = "Q3";
        fyYear = year + 1;
    } else {
        quarter = "Q4";
        fyYear = year;
    }

    return `${quarter} FY${String(fyStartYear + 1).slice(-2)}`;
}

function calcCAGR(start, end, years) {
    if (!start || !end || start <= 0 || years <= 0) return null;
    return parseFloat(((Math.pow(end / start, 1 / years) - 1) * 100).toFixed(2));
}
