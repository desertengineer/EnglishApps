const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    const langCol = localStorage.getItem("userLanguage") || "EnText";
    
    fetch(globalsUrl).then(res => res.text()).then(csv => {
        const lines = csv.split(/\r?\n/).filter(l => l.trim() !== "").map(l => l.split(",").map(c => c.trim()));
        const headers = lines[0];
        const colIdx = headers.indexOf(langCol);
        const grid = document.getElementById("activities-grid");

        lines.forEach(row => {
            if (row[1] === "Activities") {
                if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
                if (row[4] === "welcome-msg") document.getElementById("welcome-msg").innerText = row[colIdx];
                
                if (row[2] === "ActivityLink") {
                    const activityEn = row[7]; 
                    const activityTrans = row[colIdx];
                    
                    const card = document.createElement("a");
                    card.href = `go:${activityEn}`;
                    card.className = "activity-card";
                    
                    let emoji = "📚";
                    if(activityEn === "Practice") emoji = "✍️";
                    if(activityEn === "Videos") emoji = "📺";
                    if(activityEn === "Games") emoji = "🎮";

                    card.innerHTML = `
                        <div class="activity-icon-box">${emoji}</div>
                        <span style="color:white; font-weight:bold; text-shadow:1px 1px 2px #000;">
                            ${activityTrans}
                        </span>`;
                    grid.appendChild(card);
                }
            }
        });
    });
});