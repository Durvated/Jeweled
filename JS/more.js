let isAnimating = true;

class MovingButton {
    constructor(element) {
        this.element = element;
        this.x = Math.random() * (window.innerWidth - element.offsetWidth);
        this.y = Math.random() * (window.innerHeight - element.offsetHeight);
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x <= 0 || this.x + this.element.offsetWidth >= window.innerWidth) {
            this.vx *= -1;
        }
        if (this.y <= 0 || this.y + this.element.offsetHeight >= window.innerHeight) {
            this.vy *= -1;
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

const buttons = document.querySelectorAll('.moving-btn');
const movingButtons = Array.from(buttons).map(btn => new MovingButton(btn));

function animate() {
    if (isAnimating) {
        movingButtons.forEach(btn => btn.move());
        requestAnimationFrame(animate);
    }
}

animate();

function checkCollisions() {
    if (isAnimating) {
        for (let i = 0; i < movingButtons.length; i++) {
            for (let j = i + 1; j < movingButtons.length; j++) {
                const btn1 = movingButtons[i];
                const btn2 = movingButtons[j];

                if (isColliding(btn1, btn2)) {
                    // Swap velocities for a simple bounce effect
                    [btn1.vx, btn2.vx] = [btn2.vx, btn1.vx];
                    [btn1.vy, btn2.vy] = [btn2.vy, btn1.vy];
                }
            }
        }
    }
}

function isColliding(btn1, btn2) {
    return !(btn1.x + btn1.element.offsetWidth < btn2.x ||
        btn1.x > btn2.x + btn2.element.offsetWidth ||
        btn1.y + btn1.element.offsetHeight < btn2.y ||
        btn1.y > btn2.y + btn2.element.offsetHeight);
}

setInterval(checkCollisions, 100); // Check for collisions every 100ms

let stop = document.querySelector('.stop-moving-btnmoving-btn');
stop.addEventListener('click', () => {
    isAnimating = !isAnimating;
    if (isAnimating) {
        animate();
        stop.textContent = 'Stop';
    } else {
        stop.textContent = 'Start';
    }
});
