let amethyst = document.getElementById('amethyst');
let shards = 0;
let cps = 0;
let minerButton = document.getElementById('minerButton');
let miner = 15;
let minerCPS = 1;
let minerCount = 0;

let shardCount = document.getElementById('shardCount');
let cpsDisplay = document.getElementById('cpsDisplay');

amethyst.addEventListener('click', () => {
    shards += 1;
    updateScreen();
});

minerButton.addEventListener('click', () => {
    if(shards >= miner) {
        shards -= miner;
        minerCount += 1;
        miner = Math.round(miner * 1.15); // 15% price increase
        updateScreen();
    }
});

function spsSetter() {
    cps = minerCount * minerCPS; // Each miner contributes 1 CPS
}

function updateScreen() {
    spsSetter();
    shardCount.textContent = Math.floor(shards);
    cpsDisplay.textContent = cps;
    minerButton.textContent = `Buy Miner (Cost: ${Math.round(miner)})`;
}

setInterval(() => {
    shards += cps;
    updateScreen();
}, 1000);

updateScreen();
