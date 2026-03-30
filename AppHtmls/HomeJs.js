/**
 * HomeJs.js - Integrated Logic
 * Handles: CSV Fetching, Dual Animations, Native Names, and Menu Toggle
 */

const repoRoot = "https://desertengineer.github.io/EnglishApps/";
const globalsUrl = `${repoRoot}0.AppGuide/AppGlobals.csv`;

const titleTranslations = [
    "English Words Fun", "متعة الكلمات الإنجليزية", "ইংরেজি শব্দের মজা", 
    "Diversión con palabras", "Mots Anglais Amusants", "अंग्रेजी शब्दों का मज़ा", 
    "Diversão com Palavras", "Веселые английские слова", "انگریزی الفاظ का مزہ", "英语单词趣味"
];

const triggerTranslations = [
    { text: "Choose a language to start", color: "#2c3e50", bg: "#ffffff" },
    { text: "اختر لغة للبدء", color: "#ffffff", bg: "#27ae60" },
    { text: "শুরু করতে একটি ভাষা নির্বাচন করুন", color: "#ffffff", bg: "#16a085" },
    { text: "Elija un idioma para comenzar", color: "#ffffff", bg: "#2980b9" },
    { text: "Choisissez une langue pour commencer", color: "#2c3e50", bg: "#dcdde1" },
    { text: "शुरू करने के लिए एक भाषा चुनें", color: "#ffffff", bg: "#e67e22" },
    { text: "Escolha um idioma para começar", color: "#2c3e50", bg: "#f1c40f" },
    { text: "Выберите язык, чтобы начать", color: "#ffffff", bg: "#34495e" },
    { text: "شروع کرنے کے لیے একটি ভাষা নির্বাচন করুন", color: "#ffffff", bg: "#006400" },
    { text: "选择一种语言开始", color: "#ffffff", bg: "#c0392b" }
];

let titleIdx = 0, triggerIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
    initMenu();
});

async function fetchGlobals() {
    try {
        const res = await fetch(globalsUrl);
        if (!res.ok) throw new Error('Network response was not ok');
        const csv = await res.text();
        processCsv(csv);
        startAnimations();
    } catch (e) { 
        console.error("CSV Load Error:", e); 
        // Fallback title in case of error
        document.getElementById("home-title").innerText = titleTranslations[0];
    }
}

function processCsv(csv) {
    const lines = csv.split(/\r?\n/);
    const container = document.getElementById("flag-container");
    const langCodes = ["ar", "bn", "es", "fr", "hi", "pt", "ru", "ur", "zh"];

    lines.slice(1).forEach(line => {
        const col = line.split(",").map(c => c.trim());
        if (col.length < 5 || col[1] !== "Home") return;
        
        if (col[2] === "Banner") {
            document.getElementById("home-banner").src = col[4];
        }
        if (col[2].startsWith("Lang")) {
            const idx = parseInt(col[2].replace("Lang", "")) - 1;
            if (langCodes[idx]) {
                renderFlagButton(col[4], langCodes[idx], container);
            }
        }
    });
}

function renderFlagButton(imgUrl, code, container) {
    const anchor = document.createElement("a");
    // Link to the Category Menu section
    anchor.href = `next_section_url?lang=${code}`; 
    anchor.className = "language-btn";
    anchor.innerHTML = `<img src="${imgUrl}"><span>${getNativeName(code)}</span>`;
    container.appendChild(anchor);
}

function getNativeName(code) {
    const names = {
        "ar":"العربية", "bn":"বাংলা", "es":"Español", 
        "fr":"Français", "hi":"हिन्दी", "pt":"Português", 
        "ru":"Русский", "ur":"اردو", "zh":"中文"
    };
    return names[code] || code.toUpperCase();
}

function startAnimations() {
    const t = document.getElementById("home-title");
    const g = document.getElementById("lang-trigger");

    // Title Animation Loop
    setInterval(() => {
        t.style.opacity = 0;
        setTimeout(() => {
            titleIdx = (titleIdx + 1) % titleTranslations.length;
            t.innerText = titleTranslations[titleIdx];
            t.style.opacity = 1;
        }, 600);
    }, 4500);

    // Trigger Animation Loop
    setInterval(() => {
        g.style.opacity = 0;
        setTimeout(() => {
            triggerIdx = (triggerIdx + 1) % triggerTranslations.length;
            const item = triggerTranslations[triggerIdx];
            g.innerText = item.text;
            g.style.color = item.color;
            g.style.backgroundColor = item.bg;
            g.style.opacity = 1;
        }, 600);
    }, 3200);
}

function initMenu() {
    const btn = document.getElementById("hamburger-menu");
    const menu = document.getElementById("dropdown-menu");
    
    document.addEventListener("click", (e) => {
        if (btn && btn.contains(e.target)) {
            menu.classList.toggle("show");
        } else if (menu && !menu.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
}

function menuCommand(cmd) { 
    console.log("Navigating to: " + cmd); 
    document.getElementById("dropdown-menu").classList.remove("show"); 
}