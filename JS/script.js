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
