/**
 * ActivitiesJs.js - Localization Logic
 */

const translations = {
    "ar": { welcome: "أهلاً بك!", learn: "تعلم", watch: "فيديوهات", test: "تمارين", games: "ألعاب" },
    "bn": { welcome: "স্বাগতম!", learn: "শিখুন", watch: "ভিডিও", test: "অনুশীলন", games: "খেলা" },
    "es": { welcome: "¡Bienvenido!", learn: "Aprender", watch: "Videos", test: "Ejercicios", games: "Juegos" },
    "fr": { welcome: "Bienvenue!", learn: "Apprendre", watch: "Vidéos", test: "Exercices", games: "Jeux" },
    "hi": { welcome: "स्वागत है!", learn: "सीखें", watch: "वीडियो", test: "अभ्यास", games: "खेल" },
    "pt": { welcome: "Bem-vindo!", learn: "Aprender", watch: "Vídeos", test: "Exercícios", games: "Jogos" },
    "ru": { welcome: "Добро пожаловать!", learn: "Учить", watch: "Видео", test: "Упражнения", games: "Игры" },
    "ur": { welcome: "خوش آمدید!", learn: "سیکھیں", watch: "ویڈیوز", test: "مشقیں", games: "کھیل" },
    "zh": { welcome: "欢迎！", learn: "学习", watch: "视频", test: "练习", games: "游戏" }
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get language from LocalStorage (Saved in HomeJs.js)
    const lang = localStorage.getItem("userLanguage") || "ar"; // Default to Arabic if empty
    
    // 2. Apply Translations
    const data = translations[lang];
    if (data) {
        document.getElementById("welcome-msg").innerText = data.welcome;
        document.getElementById("txt-learn").innerText = data.learn;
        document.getElementById("txt-watch").innerText = data.watch;
        document.getElementById("txt-test").innerText = data.test;
        document.getElementById("txt-games").innerText = data.games;
    }

    initMenu();
});

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