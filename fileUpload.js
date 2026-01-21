// Stores keys of file input
const filesState = {};

// Stores entire XLSX file
const arrayDataJSON = {}; 

document.addEventListener("DOMContentLoaded", () => {
    const fileWrappers = document.querySelectorAll(".file-card-wrapper");

    fileWrappers.forEach((wrapper) => {
        requestAnimationFrame(() => {
            wrapper.classList.add("animate-in");
        });
    });

    //Add event click listener for id input file 1
    const fileInputBox1 = document.getElementById("input-file-1");
    const fileInput1 = document.getElementById("file-1");
    const card = document.getElementById("input-file-1");


    if (fileInputBox1) {
        fileInputBox1.addEventListener("click", () => {
            console.log("File Input 1 clicked");
            fileInput1.click();
            // Open file input dialog
        });
    }

    //Add event listener for button gbrowse
    const browseButton1 = document.getElementById("btn-upload-1");
    if (browseButton1) {
        browseButton1.addEventListener("click", () => {
            console.log("Browse button 1 clicked");
            fileInput1.click();
        });
    }

    //Add file drag and drop functionality
    fileInputBox1.addEventListener("dragover", (event) => {
        event.preventDefault();
        fileInputBox1.classList.add("dragover");
    });

    fileInput1.addEventListener("change", (event) => {
        const file = event.target.files[0];

        // If file is empty then
        if (!file) return;

        filesState[1] = file;
        fileInput1.disabled = true;

        // Check file is from screener.in
        checkFileInput(file, 1);
        console.log(`User uploaded Excel`);
    });

    // Drag events
    card.addEventListener("dragover", e => {
        e.preventDefault();
        card.classList.add("drag-over");
    });

    card.addEventListener("drop", e => {
        e.preventDefault();
        card.classList.remove("drag-over");
        const file = e.dataTransfer.files[0];

        // If file is empty then
        if (!file) return;

        filesState[1] = file;
        fileInput1.disabled = true;

        // Check file is from screener.in
        checkFileInput(file, 1);
        console.log(`User uploaded Excel`);

    });

    const dltbtn1 = document.getElementById("remove_1");

    dltbtn1.addEventListener("click", () => {
        console.log("Delete button 1 clicked");
        if (!filesState[1]) return;

        fileInput1.value = "";
        fileInput1.disabled = false;

        delete filesState[1];
        delete arrayDataJSON[1];  

        console.log("Deleted file 1 from state:", filesState);
        card.classList.remove("uploaded");

        card.querySelector(".company-label").textContent = "Company 1";
        card.querySelector(".upload-hint").textContent = "Click to browse or drop XLSX here";
    });
});

// Check if file is from screener.in
function checkFileInput(file, fileNo) {

    const reader = new FileReader()

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);

        // Read workbook
        const workbook = XLSX.read(data, { type: 'array' });

        // Get all the sheet names in an array
        const sheetNames = workbook.SheetNames;
        console.log(sheetNames)

        // Check if lenth is 6 and last sheet name is Data Sheet
        if (sheetNames.length === 6 && sheetNames[5] === "Data Sheet") {

            console.log("Valid Screener.in File");

            // Call function to set UI state
            const card = document.getElementById(`input-file-${fileNo}`);
            setUploadedState(card, file.name);

            // const sheetName = sheetNames[5];
            const worksheet = workbook.Sheets["Data Sheet"];

            const arrayData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            // console.log("Array Data:", arrayData);

            arrayDataJSON[fileNo] = arrayData;
            console.log("Stored JSON:", arrayDataJSON);
        }

        else {

            alert("Please upload valid Screener.in Excel File");
            document.getElementById(`file-${fileNo}`).disabled = false;

            document.getElementById(`file-${fileNo}`).value = "";
            delete filesState[fileNo];
            return;
        }
    }

    reader.onerror = (err) => console.error("File read error", err);
    reader.readAsArrayBuffer(file);
}

// Upload UI state
function setUploadedState(card, fileName) {
    card.classList.add("uploaded");

    //remove .xlsx in fileName
    const dotIndex = fileName.lastIndexOf(".");
    const cleanFileName = fileName.substring(0, dotIndex);
    card.querySelector(".company-label").textContent = cleanFileName;
    card.querySelector(".upload-hint").textContent = "";
}