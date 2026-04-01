const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    const langCol = localStorage.getItem("userLanguage") || "EnText";
    
    fetch(globalsUrl).then(res => res.text()).then(csv => {
        // Clean and trim all data from CSV
        const lines = csv.split(/\r?\n/).filter(l => l.trim() !== "").map(l => l.split(",").map(c => c.trim()));
        const headers = lines[0];
        const colIdx = headers.indexOf(langCol);
        const grid = document.getElementById("activities-grid"); 

        if (!grid) return;
        grid.innerHTML = ""; 

        lines.forEach(row => {
            if (row[1] === "Activities") {
                if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
                if (row[4] === "welcome-msg") document.getElementById("welcome-msg").innerText = row[colIdx];
                
                if (row[2] === "ActivityLink") {
                    const activityEn = row[7]; // Uses trimmed English key (e.g., "Practice")
                    const activityTrans = row[colIdx]; // Translated text from your CSV column
                    
                    const card = document.createElement("a");
                    card.href = `go:${activityEn}`;
                    card.className = "activity-card";
                    
                    // Map English reference to Emoji
                    let emoji = "📚";
                    if(activityEn === "Practice") emoji = "✍️";
                    if(activityEn === "Videos") emoji = "📺";
                    if(activityEn === "Games") emoji = "🎮";

                    card.innerHTML = `
                        <div class="icon-box" style="font-size:45px; margin-bottom:10px;">${emoji}</div>
                        <span style="color:white; font-size:18px; font-weight:bold; text-shadow:2px 2px 4px #000;">
                            ${activityTrans}
                        </span>`;
                    grid.appendChild(card);
                }
            }
        });
    });
});