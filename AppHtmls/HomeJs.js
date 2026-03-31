/**
 * HomeJs.js - Restored Animation & CSV Data Integration
 */
const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";
let translationData = { title: [], trigger: [] };
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
    initHamburger();
});

async function fetchGlobals() {
    try {
        const res = await fetch(globalsUrl);
        const csv = await res.text();
        processHome(csv);
        // Start the rotation after data is loaded
        setInterval(rotateTexts, 3000); 
    } catch (e) { 
        console.error("CSV Load Error:", e); 
    }
}

function processHome(csv) {
    const lines = csv.split(/\r?\n/).filter(line => line.trim() !== "").map(l => l.split(",").map(cell => cell.trim()));
    const container = document.getElementById("flag-container");
    if (container) container.innerHTML = '';

    lines.forEach(row => {
        if (row[1] === "Home") {
            // Background
            if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
            
            // Banner
            if (row[4] === "home-banner") {
                const banner = document.getElementById("home-banner");
                if (banner) { banner.src = row[6]; banner.style.display = "block"; }
            }

            // Capture all translations for Title (Columns 7 to 16)
            if (row[4] === "home-title") {
                translationData.title = row.slice(7, 17).filter(t => t !== "");
                document.getElementById("home-title").innerText = translationData.title[0];
            }

            // Capture all translations for Language Trigger (Columns 7 to 16)
            if (row[4] === "lang-trigger") {
                translationData.trigger = row.slice(7, 17).filter(t => t !== "");
                document.getElementById("lang-trigger").innerText = translationData.trigger[0];
            }
        }
    });

    // Flags Generation
    const flags = lines.filter(row => row[1] === "Home" && row[2] === "Language Flag");
    flags.forEach(flagRow => {
        const urlParts = flagRow[6].split('/');
        const langCode = urlParts[urlParts.length - 1].split('.')[0].toLowerCase();
        renderFlag(langCode, flagRow[6], container);
    });
}

function rotateTexts() {
    const titleElem = document.getElementById("home-title");
    const triggerElem = document.getElementById("lang-trigger");

    currentIndex = (currentIndex + 1) % translationData.title.length;

    if (titleElem && translationData.title.length > 0) {
        titleElem.style.opacity = 0;
        setTimeout(() => {
            titleElem.innerText = translationData.title[currentIndex];
            titleElem.style.opacity = 1;
        }, 500);
    }

    if (triggerElem && translationData.trigger.length > 0) {
        triggerElem.style.opacity = 0;
        setTimeout(() => {
            triggerElem.innerText = translationData.trigger[currentIndex];
            triggerElem.style.opacity = 1;
        }, 500);
    }
}

function renderFlag(code, flagUrl, container) {
    const langCol = code.charAt(0).toUpperCase() + code.slice(1) + "Text";
    const anchor = document.createElement("a");
    anchor.href = "go:Categories"; 
    anchor.className = "language-btn";
    anchor.onclick = () => localStorage.setItem("userLanguage", langCol);
    anchor.innerHTML = `<img src="${flagUrl}" alt="${code}"><span>${getNativeName(code)}</span>`;
    container.appendChild(anchor);
}

function getNativeName(code) {
    const names = {"ar":"العربية","bn":"বাংলা","es":"Español","fr":"Français","hi":"हिन्दी","pt":"Português","ru":"Русский","ur":"اردو","zh":"中文"};
    return names[code] || code.toUpperCase();
}

function initHamburger() {
    const btn = document.getElementById("hamburger-menu");
    const menu = document.getElementById("dropdown-menu");
    if(btn && menu) {
        btn.onclick = (e) => { e.stopPropagation(); menu.classList.toggle("show"); };
        document.onclick = () => menu.classList.remove("show");
    }
}