/**
 * HomeJs.js - Logic for English Language Fun Homepage
 * Handles: CSV Data Fetching, Dynamic UI Rendering, and Animated Translations
 */

const repoRoot = "https://desertengineer.github.io/EnglishApps/";
const globalsUrl = `${repoRoot}0.AppGuide/AppGlobals.csv`;

// Hard-coded translations for the animated Language Trigger
const translations = [
    { text: "Choose a language to start", color: "#2c3e50", bg: "#ecf0f1" },
    { text: "اختر لغة للبدء", color: "#ffffff", bg: "#27ae60" }, // Arabic - Green
    { text: "शुरू करने के लिए एक भाषा चुनें", color: "#ffffff", bg: "#e67e22" }, // Hindi - Saffron
    { text: "选择一种语言开始", color: "#ffffff", bg: "#c0392b" }, // Chinese - Red
    { text: "Elija un idioma para comenzar", color: "#ffffff", bg: "#2980b9" }, // Spanish - Blue
    { text: "Escolha um idioma para começar", color: "#2c3e50", bg: "#f1c40f" }, // Portuguese - Yellow
    { text: "Выберите язык, чтобы начать", color: "#ffffff", bg: "#34495e" }, // Russian - Dark Blue
    { text: "শুরু করতে একটি ভাষা নির্বাচন করুন", color: "#ffffff", bg: "#16a085" }, // Bengali - Teal
    { text: "شروع کرنے کے لیے ایک زبان منتخب کریں", color: "#ffffff", bg: "#006400" }, // Urdu - Dark Green
    { text: "Choisissez une langue pour commencer", color: "#2c3e50", bg: "#dcdde1" }  // French - Light Gray
];

let currentTransIndex = 0;
let triggerInterval;

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
});

/**
 * Fetches the central CSV configuration file
 */
async function fetchGlobals() {
    try {
        const response = await fetch(globalsUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const csvText = await response.text();
        processCsvData(csvText);
    } catch (error) {
        console.error("Error loading AppGlobals.csv:", error);
        // Fallback title if CSV fails
        document.getElementById("home-title").innerText = "English Language Fun";
    }
}

/**
 * Parses CSV and triggers UI updates
 */
function processCsvData(csvText) {
    const lines = csvText.split(/\r?\n/);
    const container = document.getElementById("flag-container");
    
    // Language codes mapped to Lang1-Lang9 sequence in CSV
    const langCodes = ["ar", "bn", "es", "fr", "hi", "pt", "ru", "ur", "zh"];

    lines.slice(1).forEach((line) => {
        const columns = line.split(",");
        if (columns.length < 5) return;

        const [sn, screen, element, type, value] = columns.map(c => c.trim());

        if (screen === "Home") {
            // 1. Update Title
            if (element === "Title") {
                document.getElementById("home-title").innerText = value;
            }
            // 2. Update Banner Image
            else if (element === "Banner") {
                document.getElementById("home-banner").src = value;
            }
            // 3. Set initial Trigger Text and start animation
            else if (element === "Language Trigger") {
                const triggerElem = document.getElementById("lang-trigger");
                triggerElem.innerText = value;
                startTriggerAnimation();
            }
            // 4. Generate Language Buttons (Lang1 - Lang9)
            else if (element.startsWith("Lang")) {
                const langIndex = parseInt(element.replace("Lang", "")) - 1;
                if (langCodes[langIndex]) {
                    renderFlagButton(value, langCodes[langIndex], container);
                }
            }
        }
    });
}

/**
 * Injects a flag button into the grid
 */
function renderFlagButton(imgUrl, langCode, container) {
    const anchor = document.createElement("a");
    // Replace 'next_section_url' with your actual AppCreator24 section URL or ID
    anchor.href = `next_section_url?lang=${langCode}`; 
    anchor.className = "language-btn";

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = langCode;

    const label = document.createElement("span");
    label.innerText = getLanguageName(langCode);
    label.style.marginTop = "5px";

    anchor.appendChild(img);
    anchor.appendChild(label);
    container.appendChild(anchor);
}

/**
 * Cycles through the 'translations' array with fade effects
 */
function startTriggerAnimation() {
    const triggerElem = document.getElementById("lang-trigger");
    if (!triggerElem) return;

    // Clear existing interval if any
    if (triggerInterval) clearInterval(triggerInterval);

    triggerInterval = setInterval(() => {
        // Start Fade Out
        triggerElem.style.opacity = "0";

        setTimeout(() => {
            // Change content while invisible
            currentTransIndex = (currentTransIndex + 1) % translations.length;
            const item = translations[currentTransIndex];
            
            triggerElem.innerText = item.text;
            triggerElem.style.color = item.color;
            triggerElem.style.backgroundColor = item.bg;

            // Start Fade In
            triggerElem.style.opacity = "1";
        }, 500); 
    }, 3000); // Transitions every 3 seconds
}

/**
 * Helper to display full language names under flags
 */
function getLanguageName(code) {
    const names = {
        "ar": "Arabic", "bn": "Bengali", "es": "Spanish", 
        "fr": "French", "hi": "Hindi", "pt": "Portuguese", 
        "ru": "Russian", "ur": "Urdu", "zh": "Chinese"
    };
    return names[code] || code.toUpperCase();
}