// Global state management
// Stores file references for each input slot (1-4)
const filesState = {};

// Stores parsed XLSX data as JSON arrays for each file
const arrayDataJSON = {}; 

createAllCharts();
/**
 * Initialize all file upload functionality when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
    // Animate file cards on page load
    initializeAnimations(); 
    
    // Setup all 4 file input cards
    for (let i = 1; i <= 4; i++) {
        setupFileCard(i);
    }
    
    // Setup control buttons
    setupControlButtons();
});

/**
 * Add entrance animations to file cards
 */
function initializeAnimations() {
    const fileWrappers = document.querySelectorAll(".file-card-wrapper");
    fileWrappers.forEach((wrapper) => {
        requestAnimationFrame(() => {
            wrapper.classList.add("animate-in");
        });
    });
}

/**
 * Setup a single file input card with all event listeners
 * @param {number} cardNumber - The card number (1-4)
 */
function setupFileCard(cardNumber) {
    // Get DOM elements
    const fileInputBox = document.getElementById(`input-file-${cardNumber}`);
    const fileInput = document.getElementById(`file-${cardNumber}`);
    const browseButton = document.getElementById(`btn-upload-${cardNumber}`);
    const deleteButton = document.getElementById(`remove_${cardNumber}`);
    
    // Validate elements exist
    if (!fileInputBox || !fileInput || !browseButton || !deleteButton) {
        console.warn(`File card ${cardNumber} elements not found`);
        return;
    }
    
    // Click on card triggers file selection
    fileInputBox.addEventListener("click", () => {
        console.log(`File Input ${cardNumber} clicked`);
        fileInput.click();
    });
    
    // Browse button triggers file selection
    browseButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click from firing
        console.log(`Browse button ${cardNumber} clicked`);
        fileInput.click();
    });
    
    // Handle file selection via input
    fileInput.addEventListener("change", (event) => {
        handleFileSelection(event.target.files[0], cardNumber);
    });
    
    // Handle drag over event
    fileInputBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        fileInputBox.classList.add("drag-over");
    });
    
    // Handle drag leave event
    fileInputBox.addEventListener("dragleave", (e) => {
        e.preventDefault();
        fileInputBox.classList.remove("drag-over");
    });
    
    // Handle file drop
    fileInputBox.addEventListener("drop", (e) => {
        e.preventDefault();
        fileInputBox.classList.remove("drag-over");
        handleFileSelection(e.dataTransfer.files[0], cardNumber);
    });
    
    // Handle delete button
    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent card click from firing
        handleFileDelete(cardNumber);
    });
}

/**
 * Process selected or dropped file
 * @param {File} file - The file object
 * @param {number} cardNumber - The card number
 */
function handleFileSelection(file, cardNumber) {
    // Validate file exists
    if (!file) {
        console.warn(`No file selected for card ${cardNumber}`);
        return;
    }
    
    // Store file reference
    filesState[cardNumber] = file;
    
    // Disable input to prevent re-selection
    const fileInput = document.getElementById(`file-${cardNumber}`);
    fileInput.disabled = true;
    
    // Validate and process the file
    validateScreenerFile(file, cardNumber);
    console.log(`User uploaded Excel to card ${cardNumber}:`, file.name);
}

/**
 * Validate that the uploaded file is a valid Screener.in Excel file
 * @param {File} file - The file to validate
 * @param {number} cardNumber - The card number
 */
function validateScreenerFile(file, cardNumber) {
    const reader = new FileReader();
    
    reader.onload = function (e) {
        try {
            // Parse Excel file
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get sheet names
            const sheetNames = workbook.SheetNames;
            console.log(`Card ${cardNumber} sheet names:`, sheetNames);
            
            // Validate file structure (must have 6 sheets with "Data Sheet" as the last one)
            if (sheetNames.length === 6 && sheetNames[5] === "Data Sheet") {
                console.log(`Valid Screener.in file for card ${cardNumber}`);
                
                // Extract data from "Data Sheet"
                const worksheet = workbook.Sheets["Data Sheet"];
                const arrayData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                
                // Store parsed data
                arrayDataJSON[cardNumber] = arrayData;
                console.log(`Card ${cardNumber} data stored:`, arrayData.length, "rows");
                
                // Update UI to show success
                const card = document.getElementById(`input-file-${cardNumber}`);
                setUploadedState(card, file.name);
                
            } else {
                // Invalid file structure
                handleInvalidFile(cardNumber, "Please upload valid Screener.in Excel File");
            }
            
        } catch (error) {
            console.error(`Error parsing file for card ${cardNumber}:`, error);
            handleInvalidFile(cardNumber, "Error reading file. Please try again.");
        }
    };
    
    reader.onerror = (err) => {
        console.error(`File read error for card ${cardNumber}:`, err);
        handleInvalidFile(cardNumber, "Error reading file. Please try again.");
    };
    
    // Read file as array buffer
    reader.readAsArrayBuffer(file);
}

/**
 * Handle invalid file upload
 * @param {number} cardNumber - The card number
 * @param {string} message - Error message to display
 */
function handleInvalidFile(cardNumber, message) {
    alert(message);
    
    // Reset file input
    const fileInput = document.getElementById(`file-${cardNumber}`);
    fileInput.disabled = false;
    fileInput.value = "";
    
    // Clear state
    delete filesState[cardNumber];
    delete arrayDataJSON[cardNumber];
}

/**
 * Update card UI to show uploaded state
 * @param {HTMLElement} card - The card element
 * @param {string} fileName - Name of the uploaded file
 */
function setUploadedState(card, fileName) {
    // Add uploaded class for styling
    card.classList.add("uploaded");
    
    // Remove file extension from display name
    const dotIndex = fileName.lastIndexOf(".");
    const cleanFileName = dotIndex > 0 ? fileName.substring(0, dotIndex) : fileName;
    
    // Update card labels
    card.querySelector(".company-label").textContent = cleanFileName;
    card.querySelector(".upload-hint").textContent = "File uploaded successfully";
}

/**
 * Handle file deletion
 * @param {number} cardNumber - The card number
 */
function handleFileDelete(cardNumber) {
    console.log(`Delete button ${cardNumber} clicked`);
    
    // Check if file exists
    if (!filesState[cardNumber]) {
        console.warn(`No file to delete for card ${cardNumber}`);
        return;
    }
    
    // Reset file input
    const fileInput = document.getElementById(`file-${cardNumber}`);
    fileInput.value = "";
    fileInput.disabled = false;
    
    // Clear state
    delete filesState[cardNumber];
    delete arrayDataJSON[cardNumber];
    delete window.chartArrayDataJson[cardNumber];

    // Create charts after parsing
    if (window.chartArrayDataJson && Object.keys(window.chartArrayDataJson).length > 0) {
        createAllCharts();
    }

    else {
        clearAllCharts();
    }

    console.log(`Deleted file from card ${cardNumber}. Remaining files:`, Object.keys(filesState));
    
    // Reset card UI
    const card = document.getElementById(`input-file-${cardNumber}`);
    card.classList.remove("uploaded");
    card.querySelector(".company-label").textContent = `Company ${cardNumber}`;
    card.querySelector(".upload-hint").textContent = "Click to browse or drop XLSX here";
}

/**
 * Setup Generate and Clear buttons (desktop and mobile)
 */
function setupControlButtons() {
    // Desktop buttons
    const generateBtn = document.getElementById("generate");
    const clearBtn = document.getElementById("clear");
    
    // Mobile buttons
    const generateBtnMobile = document.getElementById("generate-mobile");
    const clearBtnMobile = document.getElementById("clear-mobile");
    
    // Generate button handlers
    if (generateBtn) {
        generateBtn.addEventListener("click", handleGenerate);
    }
    if (generateBtnMobile) {
        generateBtnMobile.addEventListener("click", handleGenerate);
    }
    
    // Clear button handlers
    if (clearBtn) {
        clearBtn.addEventListener("click", handleClearAll);
    }
    if (clearBtnMobile) {
        clearBtnMobile.addEventListener("click", handleClearAll);
    }
}

/**
 * Handle Generate button click
 */
function handleGenerate() {
    console.log("Generate button clicked");
    
    // Check if at least one file is uploaded
    const uploadedFiles = Object.keys(filesState);
    
    if (uploadedFiles.length === 0) {
        alert("Please upload at least one file before generating");
        return;
    }
    
    console.log(`Generating with ${uploadedFiles.length} file(s):`, uploadedFiles);
    console.log("Available data:", arrayDataJSON);
    
    // Parse the arrayDataJSON
    parseAllFiles(arrayDataJSON);

    // Create charts after parsing
    createAllCharts();

}

/**
 * Clear all uploaded files
 */
function handleClearAll() {
    console.log("Clear all button clicked");
    
    // Confirm action if files exist
    const uploadedFiles = Object.keys(filesState);
    if (uploadedFiles.length === 0) {
        console.log("No files to clear");
        return;
    }
    
    if (!confirm(`Are you sure you want to clear all ${uploadedFiles.length} file(s)?`)) {
        return;
    }
    
    // Clear all files
    for (let i = 1; i <= 4; i++) {
        if (filesState[i]) {
            const fileInput = document.getElementById(`file-${i}`);
            fileInput.value = "";
            fileInput.disabled = false;
            
            // Clear state
            delete filesState[i];
            delete arrayDataJSON[i];
            delete window.chartArrayDataJson[i];

            console.log(`Deleted file from card ${i}. Remaining files:`, Object.keys(filesState));
            
            // Reset card UI
            const card = document.getElementById(`input-file-${i}`);
            card.classList.remove("uploaded");
            card.querySelector(".company-label").textContent = `Company ${i}`;
            card.querySelector(".upload-hint").textContent = "Click to browse or drop XLSX here";
        }
    }
    
    clearAllCharts();
    console.log("All files cleared");

}

function clearAllCharts() {
    // Implement chart clearing logic here
    console.log("Clearing all charts");
    
    // Assign id chart1 = ""
    for (let i = 1; i <= 29; i++) {
        const el = document.getElementById(`chart${i}`);
        if (el) {
            el.innerHTML = "";
        }
    }

}

const generateBtn = document.getElementById("generate");

generateBtn.addEventListener("click", () => {
  const front = generateBtn.querySelector(".front");

  // show loader
  front.classList.add("loading");

  // simulate work (replace with real logic)
  setTimeout(() => {
    front.classList.remove("loading");
  }, 1200); // snaps back
});
