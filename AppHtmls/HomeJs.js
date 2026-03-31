/**
 * HomeJs.js - Fixed to ensure Banner and Flags display
 */
const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
    initHamburger();
});

async function fetchGlobals() {
    try {
        const res = await fetch(globalsUrl);
        const csv = await res.text();
        processHome(csv);
    } catch (e) { 
        console.error("CSV Load Error:", e); 
    }
}

function processHome(csv) {
    // Split by line and then by comma, trimming whitespace from every cell
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== "").map(l => l.split(",").map(cell => cell.trim()));
    const container = document.getElementById("flag-container");
    
    // Clear container to prevent duplicates
    if (container) container.innerHTML = '';

    // Step 1: Apply Page-Level Assets (Background, Title, Banner)
    lines.forEach(row => {
        if (row[1] === "Home") {
            if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
            if (row[4] === "home-title") document.getElementById("home-title").innerText = row[7];
            if (row[4] === "home-banner") {
                const banner = document.getElementById("home-banner");
                if (banner) {
                    banner.src = row[6];
                    banner.style.display = "block"; // Ensure it's visible
                }
            }
            if (row[4] === "lang-trigger") document.getElementById("lang-trigger").innerText = row[7];
        }
    });

    // Step 2: Generate Flags
    // We map the 9 languages from rows 20-28 in your CSV
    const flags = lines.filter(row => row[1] === "Home" && row[2] === "Language Flag");
    
    flags.forEach(flagRow => {
        // Extract language code from URL (e.g., .../Ar.png -> ar)
        const urlParts = flagRow[6].split('/');
        const fileName = urlParts[urlParts.length - 1];
        const langCode = fileName.split('.')[0].toLowerCase();
        
        renderFlag(langCode, flagRow[6], container);
    });
}

function renderFlag(code, flagUrl, container) {
    const langCol = code.charAt(0).toUpperCase() + code.slice(1) + "Text"; // e.g., "ArText"
    
    const anchor = document.createElement("a");
    anchor.href = "go:Categories"; 
    anchor.className = "language-btn";
    anchor.onclick = () => localStorage.setItem("userLanguage", langCol);

    anchor.innerHTML = `
        <img src="${flagUrl}" alt="${code}">
        <span>${getNativeName(code)}</span>
    `;
    container.appendChild(anchor);
}

function getNativeName(code) {
    const names = {
        "ar":"العربية", "bn":"বাংলা", "es":"Español", "fr":"Français", 
        "hi":"हिन्दी", "pt":"Português", "ru":"Русский", "ur":"اردو", "zh":"中文"
    };
    return names[code] || code.toUpperCase();
}

function initHamburger() {
    const btn = document.getElementById("hamburger-menu");
    const menu = document.getElementById("dropdown-menu");
    if(btn && menu) {
        btn.onclick = (e) => {
            e.stopPropagation();
            menu.classList.toggle("show");
        };
        document.onclick = () => menu.classList.remove("show");
    }
}