console.log('Happy developing ✨')
//entirely based off this line^
const sparkleContainer = document.querySelector('.sparkle-container');


function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');


    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.left = `${Math.random() * 100}vw`;


    sparkleContainer.appendChild(sparkle);


    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}


setInterval(createSparkle, 200);




document.addEventListener("mousemove", (e) => {
    let intensity = 20;
    let x = (e.clientX / window.innerWidth - 0.5) * intensity; // Adjust intensity
    let y = (e.clientY / window.innerHeight - 0.5) * intensity;

    document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
});


