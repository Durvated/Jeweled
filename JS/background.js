document.addEventListener("mousemove", (e) => {
    let intensity = 20;
    let x = (e.clientX / window.innerWidth - 0.5) * intensity; // Adjust intensity
    let y = (e.clientY / window.innerHeight - 0.5) * intensity;

    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});

function back(){
    window.location.href = "/index.html";
}