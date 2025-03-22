let amethyst = document.getElementById('amethyst');
let shards = 0;
let cps = 0;
let miner = 15;
let minerCPS = 1;
let minerCount = 0;
amethyst.addEventListener('click', () => {
    shards+=1;
    shardCount.textContent = shards;
    updateScreen()
})
function spsSetter(){
for (let i = 0; i <= minerCount; i++){}
cps+=minerCPS
}
function updateScreen(){
    shards+=spsSetter;
}
