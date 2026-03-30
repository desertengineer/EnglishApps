// HomeJs.js
const repoRoot = "https://desertengineer.github.io/EnglishApps/";
const globalsUrl = `${repoRoot}0.AppGuide/AppGlobals.csv`;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
});

async function fetchGlobals() {
    try {
        const response = await fetch(globalsUrl);
        const data = await response.text();
        parseGlobals(data);
    } catch (error) {
        console.error("Error loading AppGlobals:", error);
    }
}

function parseGlobals(csvText) {
    const lines = csvText.split("\n");
    const headers = lines[0].split("\t"); // Using Tab as per your SN Screen Element example

    lines.slice(1).forEach(line => {
        // Splitting by comma or tab based on your CSV structure
        const columns = line.split(","); 
        
        if (columns.length < 5) return;

        const screen = columns[1].trim();
        const element = columns[2].trim();
        const type = columns[3].trim();
        const value = columns[4].trim();

        // Only process data for the Home screen
        if (screen === "Home") {
            applyHomeData(element, type, value);
        }
    });
}

function applyHomeData(element, type, value) {
    if (element === "Title" && type === "Heading") {
        document.getElementById("home-title").innerText = value;
    } 
    else if (element === "Banner" && type === "Image") {
        // Expecting just the filename in CSV, e.g., HomeBanner.png
        document.getElementById("home-banner").src = `${repoRoot}AppAssets/${value}`;
    }
}