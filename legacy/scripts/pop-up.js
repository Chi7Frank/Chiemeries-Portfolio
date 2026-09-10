"use strict";

const projectCards = [
    document.getElementById("web-dev"),
    document.getElementById("graphics-design"),
    document.getElementById("research-articles"),
]

const backDrop = document.querySelector(".popup-backdrop")

const popups = Array.from(document.querySelectorAll("[data-popup]"));

const closeBtn = document.querySelectorAll(".popup-close")

function loadPopup(element) {
    const popup = popups.find(popup =>
        popup.classList.contains(element.id)
    );

    popup.classList.remove("none");
    backDrop.classList.remove("none");
}

function closePopup(){
    const popup = popups.find(popup =>
        !popup.classList.contains("none")
    );
    
    popup.classList.add("none");
    backDrop.classList.add("none");
}

projectCards.forEach(card => {
    card.addEventListener("click", () => loadPopup(card));
});

closeBtn.forEach(btn=>{
    btn.addEventListener("click", closePopup);
})
