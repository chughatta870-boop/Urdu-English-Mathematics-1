// ===============================
// One Class Learning App
// script.js
// ===============================

// Subject Tabs
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));
        contents.forEach(section => section.classList.remove("active"));

        tab.classList.add("active");

        const target = document.getElementById(tab.dataset.tab);
        target.classList.add("active");
    });
});

// Lesson Open
function openLesson(title){
    alert("Opening: " + title);
}

// Search Lessons
const search = document.getElementById("search");

search.addEventListener("keyup", function(){

    const value = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(value)){
            card.style.display="block";
        }else{
            card.style.display="none";
        }

    });

});

// Dark Mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeBtn.innerHTML="☀ Light Mode";
        localStorage.setItem("theme","dark");
    }else{
        themeBtn.innerHTML="🌙 Dark Mode";
        localStorage.setItem("theme","light");
    }

});

// Load Theme
if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark");
    themeBtn.innerHTML="☀ Light Mode";
}

// Progress Counter
let opened = Number(localStorage.getItem("openedLessons")) || 0;

function saveProgress(){

    opened++;

    localStorage.setItem("openedLessons",opened);

}

// Update Lesson Function
function openLesson(title){

    saveProgress();

    alert(
        "Lesson: " + title +
        "\n\nCompleted Lessons: " + opened
    );

}

// PWA Install
let deferredPrompt;

const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt",(e)=>{

    e.preventDefault();

    deferredPrompt=e;

    installBtn.hidden=false;

});

installBtn.addEventListener("click",async()=>{

    if(deferredPrompt){

        deferredPrompt.prompt();

        deferredPrompt=null;

        installBtn.hidden=true;

    }

});

// Register Service Worker
if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("sw.js");

    });

}
