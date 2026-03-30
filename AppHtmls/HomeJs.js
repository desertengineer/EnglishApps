// HomeJs.js
const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    fetchGlobals();
});

async function fetchGlobals() {
    try {
        const response = await fetch(globalsUrl);
        const csvText = await response.text();
        parseAndRender(csvText);
    } catch (error) {
        console.error("Failed to load AppGlobals:", error);
    }
}

function parseAndRender(csvText) {
    const lines = csvText.split("\n");
    const container = document.getElementById("flag-container");
    
    // Define the language codes for the 9 buttons to pass to the next section
    const langCodes = ["ar", "bn", "es", "fr", "hi", "pt", "ru", "ur", "zh"];

    lines.slice(1).forEach((line, index) => {
        const columns = line.split(",");
        if (columns.length < 5) return;

        const [sn, screen, element, type, value] = columns.map(c => c.trim());

        if (screen === "Home") {
            // 1. Handle Title
            if (element === "Title") {
                document.getElementById("home-title").innerText = value;
            }
            // 2. Handle Banner
            else if (element === "Banner") {
                document.getElementById("home-banner").src = value;
            }
            // 3. Handle Language Trigger Text
            else if (element === "Language Trigger") {
                document.getElementById("lang-trigger").innerText = value;
            }
            // 4. Handle Language Flags (Lang1 through Lang9)
            else if (element.startsWith("Lang")) {
                const langIndex = parseInt(element.replace("Lang", "")) - 1;
                renderFlagButton(value, langCodes[langIndex], container);
            }
        }
    });
}

function renderFlagButton(imgUrl, langCode, container) {
    const anchor = document.createElement("a");
    anchor.href = `next_section_url?lang=${langCode}`;
    anchor.className = "language-btn";

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = langCode;

    // We'll add a label below the flag based on the code
    const label = document.createElement("span");
    label.innerText = langCode.toUpperCase();

    anchor.appendChild(img);
    anchor.appendChild(label);
    container.appendChild(anchor);
}