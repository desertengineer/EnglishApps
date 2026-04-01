const globalsUrl = "https://desertengineer.github.io/EnglishApps/0.AppGuide/AppGlobals.csv";

document.addEventListener("DOMContentLoaded", () => {
    const langCol = localStorage.getItem("userLanguage") || "EnText";
    
    fetch(globalsUrl).then(res => res.text()).then(csv => {
        const lines = csv.split(/\r?\n/).filter(l => l.trim() !== "").map(l => l.split(",").map(c => c.trim()));
        const headers = lines[0];
        const colIdx = headers.indexOf(langCol);
        const grid = document.getElementById("categories-grid");
        
        lines.forEach(row => {
            if (row[1] === "Categories") {
                if (row[2] === "Background") document.body.style.backgroundImage = `url('${row[6]}')`;
                if (row[4] === "categories-title") document.getElementById("categories-title").innerText = row[colIdx];
                if (row[2] === "Mix categories option") document.getElementById("mix-label").innerText = row[colIdx];
                
                if (row[2] === "Category Link") {
                    const engName = row[7]; 
                    const transName = row[colIdx];
                    
                    // Find icon URL from 'Category Image' rows
                    const imgRow = lines.find(r => r[2] === "Category Image" && r[7].toLowerCase() === (engName + ".png").toLowerCase());
                    const iconUrl = imgRow ? imgRow[6] + imgRow[7] : "";

                    const card = document.createElement("a");
                    card.href = "go:Activities";
                    card.className = "category-card";
                    card.onclick = () => {
                        const isMixed = document.getElementById("mix-checkbox").checked;
                        localStorage.setItem("selectedCategory", isMixed ? "Mixed" : engName);
                    };

                    card.innerHTML = `<img src="${iconUrl}"><span>${transName}</span>`;
                    grid.appendChild(card);
                }
            }
        });
    });
});