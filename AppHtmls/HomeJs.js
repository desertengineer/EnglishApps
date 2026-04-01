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
        const lines = csv.split(/\r?\n/).filter(line => line.trim() !== "").map(l => l.split(",").map(cell => cell.trim()));
        const container = document.getElementById("flag-container");
        
        lines.forEach(row => {
            if (row[1] === "Home") {
                if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
                if (row[4] === "home-title") document.getElementById("home-title").innerText = row[7];
                if (row[4] === "home-banner") {
                    const banner = document.getElementById("home-banner");
                    banner.src = row[6];
                    banner.style.display = "block";
                }
                if (row[2] === "Language Link") {
                    renderFlag(row[4], row[6], container);
                }
            }
        });
    } catch (e) { console.error("CSV Load Error:", e); }
}

function renderFlag(code, flagUrl, container) {
    const langCol = code.charAt(0).toUpperCase() + code.slice(1) + "Text"; 
    const anchor = document.createElement("a");
    anchor.href = "go:Categories"; 
    anchor.className = "language-btn";
    anchor.onclick = () => localStorage.setItem("userLanguage", langCol);
    anchor.innerHTML = `<img src="${flagUrl}"><span>${getNativeName(code)}</span>`;
    container.appendChild(anchor);
}

function getNativeName(code) {
    const names = {"ar":"العربية","bn":"বাংলা","es":"Español","fr":"Français","hi":"हिन्दी","pt":"Português","ru":"Русский","ur":"اردو","zh":"中文"};
    return names[code] || code.toUpperCase();
}

function initHamburger() {
    document.getElementById("hamburger-menu").onclick = (e) => {
        e.stopPropagation();
        document.getElementById("dropdown-menu").classList.toggle("show");
    };
    window.onclick = () => document.getElementById("dropdown-menu").classList.remove("show");
}