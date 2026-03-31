/**
 * HomeJs.js - Integrated Logic for Home Screen
 */
const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
});

async function fetchGlobals() {
    try {
        const res = await fetch(globalsUrl);
        const csv = await res.text();
        processHome(csv);
    } catch (e) { console.error("CSV Load Error:", e); }
}

function processHome(csv) {
    const lines = csv.split(/\r?\n/).map(l => l.split(",").map(cell => cell.trim()));
    const container = document.getElementById("flag-container");
    const langCodes = ["Ar", "Bn", "Es", "Fr", "Hi", "Pt", "Ru", "Ur", "Zh"];

    lines.forEach((row, index) => {
        if (row[1] === "Home") {
            // Set Background
            if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
            
            // Set Titles/Banners
            if (row[4] === "home-title") document.getElementById("home-title").innerText = row[7];
            if (row[4] === "home-banner") document.getElementById("home-banner").src = row[6];
            if (row[4] === "lang-trigger") document.getElementById("lang-trigger").innerText = row[7];

            // Render Language Selection Grid
            if (row[2] === "Language Link") {
                // Find matching flag image by looking ahead in the CSV (Rows 20-28)
                const linkIdx = lines.filter((r, i) => i < index && r[2] === "Language Link").length;
                const langCode = langCodes[linkIdx];
                const flagRow = lines.find(r => r[2] === "Language Flag" && r[6].includes(`/${langCode}.png`));
                
                if (flagRow) {
                    renderFlag(langCode, flagRow[6], container);
                }
            }
        }
    });
}

function renderFlag(code, flagUrl, container) {
    const langCol = code + "Text"; // e.g., "ArText"
    const anchor = document.createElement("a");
    anchor.href = "go:Categories"; 
    anchor.className = "language-btn";
    anchor.onclick = () => localStorage.setItem("userLanguage", langCol);

    anchor.innerHTML = `<img src="${flagUrl}"><span>${getNativeName(code.toLowerCase())}</span>`;
    container.appendChild(anchor);
}

function getNativeName(code) {
    const names = {"ar":"العربية","bn":"বাংলা","es":"Español","fr":"Français","hi":"हिन्दी","pt":"Português","ru":"Русский","ur":"اردو","zh":"中文"};
    return names[code] || code.toUpperCase();
}