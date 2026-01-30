# 📊 ChartScreener

> **Professional Financial Data Visualization Dashboard**  
> Transform Excel data from Screener.in into stunning, interactive comparative charts

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.javascript.com/)
[![Plotly](https://img.shields.io/badge/Plotly.js-3.3.0-blue.svg)](https://plotly.com/javascript/)

---

## 🎯 Overview

ChartScreener is a powerful, client-side financial data visualization tool that enables investors and analysts to compare multiple companies side-by-side through 22 comprehensive financial charts. Simply upload Excel files from Screener.in and instantly generate beautiful, interactive visualizations.

### ✨ Key Features

- **📈 22 Professional Charts** - Comprehensive financial metrics coverage
- **🔄 Multi-Company Comparison** - Compare up to 4 companies simultaneously
- **⚡ Real-time Processing** - Instant chart generation in your browser
- **🎨 Interactive Visualizations** - Powered by Plotly.js with zoom, pan, and hover details
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔒 Privacy First** - All processing happens locally, no data leaves your browser
- **🎭 Dark Mode UI** - Professional, eye-friendly interface
- **💾 No Backend Required** - Pure client-side application

---

## 📸 Screenshots

### Dashboard Overview
*Upload your Excel files and instantly see all 22 financial charts*

### Interactive Charts
*Zoom, pan, and explore detailed financial trends*

### Mobile Responsive
*Full functionality on any device*

---

## 🚀 Quick Start

### Prerequisites

All you need is a modern web browser (Chrome, Firefox, Safari, or Edge). No installation required!

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/chartscreener.git
   cd chartscreener
   ```

2. **Open the Application**
   ```bash
   # Simply open index.html in your browser
   # Or serve it with any local server:
   
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```

3. **Upload Data**
   - Visit [Screener.in](https://www.screener.in)
   - Search for companies you want to analyze
   - Download the Excel file for each company
   - Upload up to 4 Excel files to ChartScreener
   - Click "Generate" to create your charts!

---

## 📊 Available Charts

### Income Statement Analysis
| Chart | Description | Type |
|-------|-------------|------|
| **Revenue Trend** | Total sales over the years | Bar |
| **Sales Growth** | Year-over-year sales growth percentage | Line |
| **Gross Margin** | Profitability after raw material costs | Line |
| **Operating Profit Margin** | Core business profitability | Line |
| **Net Profit Margin** | Bottom-line profitability | Line |
| **Operating Profit** | Absolute operating profit values | Bar |
| **Net Profit Growth** | Year-over-year profit growth | Line |

### Balance Sheet Analysis
| Chart | Description | Type |
|-------|-------------|------|
| **Return on Equity** | Shareholder value creation efficiency | Line |
| **Debtor Days** | Average collection period | Bar |
| **Inventory Days** | Inventory turnover efficiency | Bar |
| **Debt Levels** | Total borrowings over time | Bar |
| **Debt/Equity Ratio** | Financial leverage analysis | Bar |

### Cash Flow Analysis
| Chart | Description | Type |
|-------|-------------|------|
| **Cash from Operations** | Operating cash generation | Bar |
| **Cash from Investing** | Investment activities | Bar |
| **Cash from Financing** | Financing activities | Bar |
| **Net Cash Flow** | Total cash position changes | Bar |

### Market Performance
| Chart | Description | Type |
|-------|-------------|------|
| **Stock Returns** | Price appreciation over time | Bar |
| **Dividend Payout** | Dividend distribution trends | Line |

### Quarterly Metrics
| Chart | Description | Type |
|-------|-------------|------|
| **Quarterly Revenue** | Recent quarterly sales | Bar |
| **Quarterly Sales Growth** | Quarter-over-quarter growth | Line |
| **Quarterly OPM** | Operating margin trends | Line |
| **Quarterly NPM** | Net profit margin trends | Line |

---

## 🎨 Features in Detail

### Smart Data Processing
- **Automatic Field Detection** - Intelligently parses Screener.in Excel format
- **Data Validation** - Ensures data integrity before visualization
- **Missing Data Handling** - Gracefully handles incomplete datasets
- **Common Period Alignment** - Only shows years where all companies have data

### Interactive Charts
- **Zoom & Pan** - Explore data in detail
- **Hover Information** - See exact values on hover
- **Legend Toggle** - Show/hide specific companies
- **Fullscreen Mode** - Expand any chart for detailed analysis
- **Export Capabilities** - Download charts as images

### Professional UI/UX
- **Drag & Drop Upload** - Easy file management
- **Visual Feedback** - Upload status indicators
- **Info Overlays** - Formula explanations for each metric
- **Responsive Layout** - Adapts to any screen size
- **Keyboard Navigation** - Full accessibility support

---

## 🛠️ Technical Architecture

### Technology Stack

```
Frontend
├── HTML5 - Semantic markup
├── CSS3 - Modern styling with Flexbox/Grid
├── JavaScript (ES6+) - Application logic
│
Libraries
├── Plotly.js 3.3.0 - Chart rendering
├── SheetJS (XLSX) - Excel file parsing
└── Google Fonts - Typography
```

### File Structure

```
chartscreener/
│
├── index.html              # Main HTML file
│
├── CSS/
│   ├── style.css          # Global styles
│   ├── navbar.css         # Navigation styles
│   ├── fileUpload.css     # Upload interface
│   ├── charts.css         # Chart container styles
│   └── footer.css         # Footer styles
│
├── JS/
│   ├── script.js          # Main application logic
│   ├── fileUpload.js      # File handling & upload
│   ├── parse.js           # Excel parsing & data extraction
│   ├── charts.js          # Chart creation & rendering
│   ├── navbar.js          # Navigation functionality
│   ├── initialData.js     # Default/demo data
│   └── Utils.js           # Utility functions
│
├── Assets/
│   ├── logo-dark.svg      # Application logo
│   └── fevicon.png        # Browser favicon
│
└── Libraries/
    ├── plotly-3.3.0.min.js
    └── xlsx.full.min.js
```

### Key Components

#### 1. Data Pipeline
```javascript
Excel Upload → XLSX Parser → Data Extraction → 
  Data Transformation → Chart Configuration → Plotly Rendering
```

#### 2. Chart System
- **Configuration-Driven**: Single source of truth for all charts
- **Modular Design**: Separate functions for bar and line charts
- **Dynamic Scaling**: Auto-adjusts Y-axis based on data range
- **Color Coding**: Consistent colors across all visualizations

#### 3. State Management
```javascript
window.chartArrayDataJson = {
  company1: { /* all financial data */ },
  company2: { /* all financial data */ },
  company3: { /* all financial data */ },
  company4: { /* all financial data */ }
}
```

---

## 🔧 Customization

### Adding New Charts

1. **Define Chart Configuration** (in `charts.js`):
```javascript
'chartN': {
    type: "bar",                    // or "line"
    xKey: "FinancialYear_PL",       // X-axis data key
    yKey: "YourMetric_PL",          // Y-axis data key
    title: "Your Chart Title",      // Display title
    dataLimit: -5                   // Show last 5 years
}
```

2. **Add HTML Container** (in `index.html`):
```html
<div class="chart-card">
    <button class="info-btn" onclick="toggleInfo(this)">ℹ️</button>
    <button class="open-btn" onclick="openChart('chartN')">⛶</button>
    <div class="chart" id="chartN"></div>
    <div class="info-overlay">
        <div class="info-content">
            <h3>Your Chart Title</h3>
            <p>Description and formula</p>
        </div>
    </div>
</div>
```

### Customizing Colors

Modify the color palette in `charts.js`:
```javascript
const colors = [
    "rgb(238, 75, 43)",   // Company 1
    "rgb(31, 192, 255)",  // Company 2
    "rgb(234, 179, 8)",   // Company 3
    "rgb(34, 197, 94)"    // Company 4
];
```

### Adjusting Data Limits

Change how many years/quarters to display:
```javascript
dataLimit: -5  // Last 5 periods
dataLimit: -10 // Last 10 periods
dataLimit: null // All available data
```

---

## 📚 Data Format Requirements

### Excel File Structure

ChartScreener expects Excel files from Screener.in with these sheets:

- **Profit & Loss** - Income statement data
- **Balance Sheet** - Balance sheet metrics
- **Cash Flows** - Cash flow statements
- **Quarters** - Quarterly financial data
- **Ratios** - Financial ratios and metrics

### Supported Data Fields

```javascript
// Income Statement
Sales_PL, Sales_Growth_PL, Gross_Margin_PL,
Operating_Profit_PL, Operating_Profit_Margin_PL,
Net_Profit_PL, Net_Profit_Margin_PL, Net_Profit_Growth_PL

// Balance Sheet
Reserves_BS, Equity_Capital_BS, Borrowings_BS,
Debt_Equity_BS, Return_On_Equity_BS,
Debtor_Days_BS, Inventory_Days_BS

// Cash Flow
Cash_from_Operations_CF, Cash_from_Investing_CF,
Cash_from_Financing_CF, Net_Cash_Flow_CF

// Market Metrics
Stock_Price, Returns, Dividend_Yield_PL

// Quarterly
Sales_Q, Sales_Growth_Q, Quarterly_OPM, Quarterly_NPM
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
1. Check existing issues first
2. Create a detailed bug report with:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Sample data (if applicable)

### Suggesting Features
1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide mockups or examples if possible

### Submitting Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Krish Mehta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Krish Mehta** ([@DataInvestor_](https://x.com/DataInvestor_))

- Twitter: [@DataInvestor_](https://x.com/DataInvestor_)
- Email: datainvestorinfo@gmail.com
- GitHub: [@KrishMehta2004](https://github.com/KrishMehta2004)

---

## 🙏 Acknowledgments

- **Screener.in** - For providing excellent financial data
- **Plotly.js** - For the amazing charting library
- **SheetJS** - For Excel parsing capabilities
- **Community** - For feedback and contributions

---

## ⚠️ Disclaimer

This tool is for educational and informational purposes only. It is not affiliated with Screener.in or any financial institution. Always conduct your own research and consult financial advisors before making investment decisions.

---

## 🔮 Roadmap

### Upcoming Features
- [ ] PDF Export functionality
- [ ] Custom chart builder
- [ ] Data filtering and sorting
- [ ] Comparison annotations
- [ ] Historical data caching
- [ ] Peer comparison groups
- [ ] Advanced technical indicators
- [ ] Multi-language support

---

## 💡 Tips & Tricks

### Best Practices
1. **Data Quality**: Ensure Excel files are up-to-date from Screener.in
2. **Company Selection**: Compare companies in similar industries for meaningful insights
3. **Time Periods**: Use consistent time periods across all companies
4. **Chart Analysis**: Use fullscreen mode for detailed trend analysis

### Performance Optimization
- Clear browser cache if charts don't load properly
- Close unused browser tabs for better performance
- Use latest browser versions for optimal experience

### Troubleshooting
- **Charts not appearing**: Check browser console for errors
- **Upload failing**: Verify Excel file format and structure
- **Slow performance**: Reduce number of companies or data points

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/chartscreener/issues)
- **Email**: datainvestorinfo@gmail.com
- **Twitter**: [@DataInvestor_](https://x.com/DataInvestor_)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Made with ❤️ by Krish Mehta**

[Report Bug](https://github.com/yourusername/chartscreener/issues) · [Request Feature](https://github.com/yourusername/chartscreener/issues) · [Documentation](https://github.com/yourusername/chartscreener/wiki)

</div>