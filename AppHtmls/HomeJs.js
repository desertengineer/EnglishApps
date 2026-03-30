/**
 * HomeJs.js - Final Combined Logic
 * Handles: CSV Fetching, Dual Animations, and Hamburger Menu Toggle
 */

const repoRoot = "https://desertengineer.github.io/EnglishApps/";
const globalsUrl = `${repoRoot}0.AppGuide/AppGlobals.csv`;

const titleTranslations = [
    "English Words Fun", "متعة الكلمات الإنجليزية", "ইংরেজি শব্দের মজা",
    "Diversión con palabras", "Mots Anglais Amusants", "अंग्रेजी शब्दों का मज़ा",
    "Diversão com Palavras", "Веселые английские слова", "انگریزی الفاظ کا مزہ", "英语单词趣味"
];

const triggerTranslations = [
    { text: "Choose a language to start", color: "#2c3e50", bg: "#ffffff" },
    { text: "اختر لغة للبدء", color: "#ffffff", bg: "#27ae60" },
    { text: "শুরু করতে একটি ভাষা নির্বাচন করুন", color: "#ffffff", bg: "#16a085" },
    { text: "Elija un idioma para comenzar", color: "#ffffff", bg: "#2980b9" },
    { text: "Choisissez une langue pour commencer", color: "#2c3e50", bg: "#dcdde1" },
    { text: "शुरू کرنے के लिए एक भाषा चुनें", color: "#ffffff", bg: "#e67e22" },
    { text: "Escolha um idioma para começar", color: "#2c3e50", bg: "#f1c40f" },
    { text: "Выберите язык, чтобы начать", color: "#ffffff", bg: "#34495e" },
    { text: "شروع کرنے کے لیے ایک زبان منتخب کریں", color: "#ffffff", bg: "#006400" },
    { text: "选择一种语言开始", color: "#ffffff", bg: "#c0392b" }
];

let titleIdx = 0;
let triggerIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
    initMenuLogic();
});

async function fetchGlobals() {
    try {
        const response = await fetch(globalsUrl);
        const csvText = await response.text();
        processCsvData(csvText);
        startTitleAnimation();
        startTriggerAnimation();
    } catch (error) {
        console.error("CSV Error:", error);
    }
}

function processCsvData(csvText) {
    const lines = csvText.split(/\r?\n/);
    const container = document.getElementById("flag-container");
    const langCodes = ["ar", "bn", "es", "fr", "hi", "pt", "ru", "ur", "zh"];

    lines.slice(1).forEach((line) => {
        const columns = line.split(",");
        if (columns.length < 5) return;
        const [sn, screen, element, type, value] = columns.map(c => c.trim());

        if (screen === "Home") {
            if (element === "Banner") document.getElementById("home-banner").src = value;
            if (element.startsWith("Lang")) {
                const idx = parseInt(element.replace("Lang", "")) - 1;
                if (langCodes[idx]) renderFlagButton(value, langCodes[idx], container);
            }
        }
    });
}

function startTitleAnimation() {
    const titleElem = document.getElementById("home-title");
    setInterval(() => {
        titleElem.style.opacity = "0";
        setTimeout(() => {
            titleIdx = (titleIdx + 1) % titleTranslations.length;
            titleElem.innerText = titleTranslations[titleIdx];
            titleElem.style.opacity = "1";
        }, 600);
    }, 4500);
}

function startTriggerAnimation() {
    const triggerElem = document.getElementById("lang-trigger");
    setInterval(() => {
        triggerElem.style.opacity = "0";
        setTimeout(() => {
            triggerIdx = (triggerIdx + 1) % triggerTranslations.length;
            const item = triggerTranslations[triggerIdx];
            triggerElem.innerText = item.text;
            triggerElem.style.color = item.color;
            triggerElem.style.backgroundColor = item.bg;
            triggerElem.style.opacity = "1";
        }, 600);
    }, 3200);
}

function renderFlagButton(imgUrl, langCode, container) {
    const anchor = document.createElement("a");
    // Update 'next_section_url' as needed for your AppCreator24 navigation
    anchor.href = `next_section_url?lang=${langCode}`; 
    anchor.className = "language-btn";

    // Get the native name (e.g., 'Español' instead of 'ES')
    const nativeName = getNativeName(langCode);

    anchor.innerHTML = `
        <img src="${imgUrl}" alt="${langCode}">
        <span>${nativeName}</span>
    `;
    container.appendChild(anchor);
}
/**
 * Returns the language name in its own native script
 */
function getNativeName(code) {
    const nativeNames = {
        "ar": "العربية",
        "bn": "বাংলা",
        "es": "Español",
        "fr": "Français",
        "hi": "हिन्दी",
        "pt": "Português",
        "ru": "Русский",
        "ur": "اردو",
        "zh": "中文"
    };
    return nativeNames[code] || code.toUpperCase();
}

// Menu Toggle Logic
function initMenuLogic() {
    document.addEventListener("click", (e) => {
        const menu = document.getElementById("dropdown-menu");
        const btn = document.getElementById("hamburger-menu");
        if (btn.contains(e.target)) {
            menu.classList.toggle("show");
        } else if (!menu.contains(e.target)) {
            menu.classList.remove("show");
        }
    });
}

function menuCommand(cmd) {
    console.log("Action: " + cmd);
    document.getElementById("dropdown-menu").classList.remove("show");
}