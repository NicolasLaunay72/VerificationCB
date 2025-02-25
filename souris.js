document.addEventListener("DOMContentLoaded", () => {
    // Supprime les curseurs existants
    document.querySelectorAll(".custom-cursor, .cursor-trail").forEach(el => el.remove());

    // Création du curseur principal
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);

    // Création des particules de traînée
    const trailElements = [];
    for (let i = 0; i < 10; i++) {
        const trail = document.createElement("div");
        trail.classList.add("cursor-trail");
        document.body.appendChild(trail);
        trailElements.push(trail);
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        requestAnimationFrame(() => {
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });
    });

    // Effet de traînée en décalant progressivement les éléments
    function updateTrail() {
        for (let i = trailElements.length - 1; i > 0; i--) {
            trailElements[i].style.left = trailElements[i - 1].style.left;
            trailElements[i].style.top = trailElements[i - 1].style.top;
        }
        if (trailElements.length > 0) {
            trailElements[0].style.left = `${mouseX}px`;
            trailElements[0].style.top = `${mouseY}px`;
        }
        requestAnimationFrame(updateTrail);
    }
    updateTrail();

    document.querySelectorAll("input, textarea").forEach((element) => {
        element.addEventListener("focus", () => cursor.classList.add("cursor-text"));
        element.addEventListener("blur", () => cursor.classList.remove("cursor-text"));
    });

    document.body.style.cursor = "none";
});
