let amethyst = document.getElementById('amethyst');
let shards = 0;
let cps = 0;
let minerButton= document.getElementById('minerButton');
let miner = 15;
let minerCPS = 1;
let minerCount = 0;
minerButton.addEventListener('click', () => {
    if(shards>= miner){
        shards-=miner;
        minerCount+=1
        miner*=1.05;
        updateScreen()
    }
})
amethyst.addEventListener('click', () => {
    shards+=1;
    shardCount.textContent = shards;
    updateScreen()
})
function spsSetter(){
for (let i = 0; i <= minerCount; i++){}
cps+=minerCPS
    return cps
}
function updateScreen(){
    spsSetter()
}

const interval = setInterval(() => {
    shards+=cps;
}, 1000);
