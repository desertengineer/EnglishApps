/**
 * HomeJs.js - Dual Animation Engine
 * Fetches from AppGlobals.csv and cycles translations
 */

const repoRoot = "https://desertengineer.github.io/EnglishApps/";
const globalsUrl = `${repoRoot}0.AppGuide/AppGlobals.csv`;

// 1. Title Translations
const titleTranslations = [
    "English Words Fun",
    "متعة الكلمات الإنجليزية", 
    "ইংরেজি শব্দের মজা",
    "Diversión con palabras",
    "Mots Anglais Amusants",
    "अंग्रेजी शब्दों का मज़ा",
    "Diversão com Palavras",
    "Веселые английские слова",
    "انگریزی الفاظ کا مزہ",
    "英语单词趣味"
];

// 2. Trigger Translations with distinct colors
const triggerTranslations = [
    { text: "Choose a language to start", color: "#2c3e50", bg: "#ffffff" },
    { text: "اختر لغة للبدء", color: "#ffffff", bg: "#27ae60" },
    { text: "শুরু করতে একটি ভাষা নির্বাচন করুন", color: "#ffffff", bg: "#16a085" },
    { text: "Elija un idioma para comenzar", color: "#ffffff", bg: "#2980b9" },
    { text: "Choisissez une langue pour commencer", color: "#2c3e50", bg: "#dcdde1" },
    { text: "शुरू करने के लिए एक भाषा चुनें", color: "#ffffff", bg: "#e67e22" },
    { text: "Escolha um idioma para começar", color: "#2c3e50", bg: "#f1c40f" },
    { text: "Выберите язык, чтобы начать", color: "#ffffff", bg: "#34495e" },
    { text: "شروع کرنے کے لیے ایک زبان منتخب کریں", color: "#ffffff", bg: "#006400" },
    { text: "选择一种语言开始", color: "#ffffff", bg: "#c0392b" }
];

let titleIdx = 0;
let triggerIdx = 0;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
});

async function fetchGlobals() {
    try {
        const response = await fetch(globalsUrl);
        const csvText = await response.text();
        processCsvData(csvText);
        
        // Start Animations
        startTitleAnimation();
        startTriggerAnimation();
    } catch (error) {
        console.error("CSV Fetch Error:", error);
        document.getElementById("home-title").innerText = "English Words Fun";
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
    }, 4500); // Cycles every 4.5s
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
    }, 3200); // Cycles every 3.2s
}

function renderFlagButton(imgUrl, langCode, container) {
    const anchor = document.createElement("a");
    // Link to the next section (replace 'next_section_url' when ready)
    anchor.href = `next_section_url?lang=${langCode}`; 
    anchor.className = "language-btn";
    anchor.innerHTML = `
        <img src="${imgUrl}" alt="${langCode}">
        <span>${langCode.toUpperCase()}</span>
    `;
    container.appendChild(anchor);
}
// Add this inside your DOMContentLoaded or as a standalone script
document.addEventListener("click", (event) => {
    const menu = document.getElementById("dropdown-menu");
    const btn = document.getElementById("hamburger-menu");

    // Toggle menu on button click
    if (btn.contains(event.target)) {
        menu.classList.toggle("show");
    } 
    // Close menu if user clicks outside of it
    else if (!menu.contains(event.target)) {
        menu.classList.remove("show");
    }
});

/**
 * Handle Menu Commands
 * You can link these to AppCreator24 sections or external URLs
 */
function menuCommand(cmd) {
    console.log("Command selected:", cmd);
    // Example: if(cmd === 'Privacy') { window.location.href = 'your_privacy_url'; }
    
    // Close menu after selection
    document.getElementById("dropdown-menu").classList.remove("show");
}