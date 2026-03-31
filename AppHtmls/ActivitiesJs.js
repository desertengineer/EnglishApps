/**
 * ActivitiesJs.js - Integrated Logic for Activities Selection
 */
const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    const langCol = localStorage.getItem("userLanguage") || "EnText";
    const headers = ["SN", "Screen", "Role", "Tag", "Id", "href", "src", "EnText", "ZhText", "HiText", "EsText", "ArText", "FrText", "BnText", "PtText", "RuText", "UrText"];
    const colIdx = headers.indexOf(langCol);

    fetch(globalsUrl).then(res => res.text()).then(csv => {
        const lines = csv.split(/\r?\n/).map(l => l.split(",").map(cell => cell.trim()));
        const grid = document.getElementById("activities-grid");

        lines.forEach(row => {
            if (row[1] === "Activities") {
                // Set Background from CSV
                if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
                // Set Localized Title (What's Next?)
                if (row[4] === "welcome-msg") document.getElementById("welcome-msg").innerText = row[colIdx];
                
                // Render Activity Links
                if (row[2] === "ActivityLink") {
                    const activityEn = row[7]; 
                    const activityTrans = row[colIdx];
                    
                    const card = document.createElement("a");
                    card.href = `go:${activityEn}`;
                    card.className = "activity-card";
                    
                    // Assign Emojis/Icons based on the English Name
                    let emoji = "📚"; // Default Learn
                    if(activityEn === "Practice") emoji = "✍️";
                    if(activityEn === "Videos") emoji = "📺";
                    if(activityEn === "Games") emoji = "🎮";

                    card.innerHTML = `<div class="icon">${emoji}</div><span>${activityTrans}</span>`;
                    grid.appendChild(card);
                }
            }
        });
    });
});