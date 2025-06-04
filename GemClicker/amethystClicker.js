const amethyst = document.getElementById('amethyst');
const shardCount = document.getElementById('shardCount');
const cpsDisplay = document.getElementById('cpsDisplay');let shards = 0;
const minerButton = document.getElementById('minerButton');
const upgradeMinerButton = document.getElementById('upgradeMinerButton');
const minerUpgradeCost = 30;
const upgrades=[];
const achievements=[];
const upgradesDescriptions=[];
const achievementsDescriptions=[];
let cps = 0;
let miner = 15;
let minerCPS = 1;
let minerCount = 0;


amethyst.addEventListener('click', () => {
    shards += 1;
    updateScreen();
});

upgradeMinerButton.addEventListener('click', () => {
    if(shards >= minerUpgradeCost) {
        shards -= minerUpgradeCost;
        minerCPS += 1;
        upgradeMinerButton.style.display = 'none';
        updateScreen();
    }
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
