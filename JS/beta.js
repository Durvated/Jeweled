let kittymode = false;
let kittybuttonshown=false;
let dev=false;

const normalVariants = [
    "jEw#lEd",
    "JEwEL%d",
    "#EwElED",
    "jEWEl%D",
    "je*ELED",
    "Je$eLeD",
    "jEwE&ed",
    "jEwE&e)"
];

const kittyVariants = [
    "Meow~1",
    "Purr&2",
    "Kitty^3",
    "Sparkle*4",
    "Gas-i8ght",
    "G&$3K33P",
    "G1RL8055"
];

let id = 0;
let currentVariants;

const title = document.getElementById("chalkTitle");

setInterval(() => {
    if(kittymode) {currentVariants = kittyVariants; }else{currentVariants=normalVariants;}
    id = (id + 1) % currentVariants.length;
    title.textContent = currentVariants[id];
    title.setAttribute('data-text', currentVariants[id]);
}, 120);

//chalkboard title


//clicker
const h1 = document.getElementById('beta-disclaimer-h1');
const body = document.getElementById('body');
let bloodrain=false;
h1.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'color') {
        console.log('Color transition finished!');
        bloodrain = !bloodrain;
        document.body.style.background = bloodrain ? 'white' : '';
        document.querySelectorAll('.star').forEach(star => {
            if (rainbow) {
                const hue = Math.floor(Math.random() * 360);
                star.style.background = `hsl(${hue}, 100%, 60%)`;
            } else if (bloodrain) {
                star.style.background = 'red';
            } else {
                star.style.background = 'white';
            }
        });
    }
});
//betaanimstarf
const starControl = document.getElementById('starControl');
const rainbowButton = document.getElementById('rainbowStars');
const interactiveButton = document.getElementById('interactiveStars');
const starCountLogger=document.getElementById('starCountLogger');
const starsBg = document.querySelector('.stars-bg');
let starCount = document.querySelectorAll('.star').length;
let mouseX = 0;
let mouseY = 0;
let starsActive = false;
let starsInterval = null;
let rainbow=false;
let interactive = false;
let logging=false;

function checkStars(){
    if(logging===true){
        console.log("Number of stars:", starCount);
    }
    starCount = document.querySelectorAll('.star').length;
    if (starCount > 2000){
        document.querySelectorAll('.star').forEach(star => star.remove());
    }
}

function createStar() {
    checkStars();
    if (!starsActive) return;
    let star;

    if (kittymode) {
        star = document.createElement('img');
        star.src = 'SRC/cat.png';
        star.classList.add('star');
        star.style.position = 'absolute';
    } else {
        star = document.createElement('div');
        star.classList.add('star');
    }
    star.classList.add('star');
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = '-10px';
    const size = kittymode ? Math.random() * 20 + 20 : Math.random() * 2 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.opacity = Math.random() * 0.5 + 0.5;
    const duration = Math.random() * 2 + 2;
    star.style.animationDuration = duration + 's';
    if(kittymode){
        star.style.filter = 'drop-shadow(0 0 10px pink) drop-shadow(0 0 20px purple)';
    }
    else if (bloodrain) {
        star.style.background = 'red';
        star.style.boxShadow = "0 0 15px 6px rgba(255, 0, 0, 0.8), 0 0 30px 10px rgba(180, 0, 0, 0.4)";
    } else if (rainbow) {
        const hue = Math.floor(Math.random() * 360);
        star.style.background = `hsl(${hue}, 100%, 60%)`;
        star.style.boxShadow = "0 0 7px 2px white";
    } else {
        star.style.background = 'white';
        star.style.boxShadow = "0 0 7px 2px white";
    }
    starsBg.appendChild(star);
    star.addEventListener('animationend', () => star.remove());
}

starControl.addEventListener('click', function() {
    if (starsActive) {
        starsActive = false;
        clearInterval(starsInterval);
        document.querySelectorAll('.star').forEach(star => star.remove());
    } else {
        starsActive = true;
        for (let i = 0; i < 70; i++) createStar();
        starsInterval = setInterval(createStar, 20);
    }
    if (starsActive) {
        starControl.textContent = "Stop";
    } else {starControl.textContent = "Start";}
});

rainbowButton.addEventListener('click', function() {
rainbow = !rainbow;
});

starCountLogger.addEventListener('click', function() {
    logging = !logging;
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        document.querySelectorAll('.star').forEach(star => star.remove());
    }
});
//stars
const realProxyDiv=document.getElementById('realProxyDiv');
const chalkboard = document.getElementById('chalkboard');
const starsButton = document.getElementById('starsButton');
const proxyButton = document.getElementById('proxyButton');
const gameButton = document.getElementById('gamesButton');
const appsButton = document.getElementById('appsButton');
const settingsButton = document.getElementById('settingsButton');
const moreButton = document.getElementById('moreButton');
const catsButton = document.getElementById('catsButton');
const proxyScreen= document.getElementById('proxyScreen');
const starsScreen= document.getElementById('starControlScreen');
const gameScreen= document.getElementById('gameScreen');
const appsScreen= document.getElementById('appsScreen');
const settingsScreen= document.getElementById('settingsScreen');
const moreScreen= document.getElementById('moreScreen');
const catsScreen= document.getElementById('catsScreen');
const screens=[moreScreen, settingsScreen, gameScreen, appsScreen, proxyScreen, catsScreen, starsScreen];
const kittybutton =  document.getElementById('kittymodetoggle');
let currentScreen=catsScreen;


function checkScreen(currentScreen){
    let temporaryList=[];
for (let i=0; i<screens.length; i++){
    if (currentScreen === screens[i]){
        for (let j=0; j<temporaryList.length; j++){
            temporaryList[j].style.display="none";
        }

        for (let k=i+1; k<screens.length; k++){
            screens[k].style.display="none";
        }
        currentScreen.style.display="block";
    }else{
        temporaryList.push(screens[i]);
    }
}
temporaryList=[];
    if (currentScreen === gameScreen) {
        chalkboard.classList.add('scrollable');
    } else { if (currentScreen === proxyScreen) {
        realProxyDiv.style.display="none";
    }else
        chalkboard.classList.remove('scrollable');
    }
}
starsButton.addEventListener("click", function() {
    checkScreen(starsScreen);
    if(kittybuttonshown){
        kittybuttonshown=true;
        kittybutton.style.display="block";
    }else{
        kittybutton.style.display="none";
    }
});

gameButton.addEventListener("click", function() {
    checkScreen(gameScreen);
});

proxyButton.addEventListener("click", function() {
    checkScreen(proxyScreen);
});

appsButton.addEventListener("click", function() {
    checkScreen(appsScreen);
});

settingsButton.addEventListener("click", function() {
    checkScreen(settingsScreen);
});

moreButton.addEventListener("click", function() {
    checkScreen(moreScreen);
    catsScreen.style.display="none";
});

catsButton.addEventListener("click", function() {
    checkScreen(catsScreen);
    if(dev===true) {
        document.getElementById("coolbuttonscat").style.display = "block";
    }else{
         document.getElementById("coolbuttonscat").style.display="none";
        }
    fixer();
});
//change screen

const searchInput = document.getElementById('gameSearch');

searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();        //grabs input, sets to filter
    const gameContainers = document.querySelectorAll('.button-container');  //all games queried
    gameContainers.forEach(container => {   //for each game
        const title = container.querySelector('p').innerText.toLowerCase();     //sets title to each game name selecting all P elements and putting them to lc

        if (title.includes(filter)) {         //if title includes searchbar
            container.style.display = '';           //set show, but nothing specific, since it goes back to original?(i think)
        } else {
            container.style.display = 'none';  //set no
        }
    });
});
//gameSearch
const passwordHash = "9c1b5a143dc0d0d9976cfb53bd6903ed"; // your MD5 hash

document.getElementById('loginButton').addEventListener('click', function() {
    const input = document.getElementById('proxyPassword').value;
    const inputHash = CryptoJS.MD5(input).toString();
    if (inputHash === passwordHash) {
        alert("!!hi!!");
        document.getElementById('realProxyDiv').style.display = "block";
        document.getElementById('wipProxyScreen').style.display = "none";
    } else {
        alert("Wrong password!");
    }
});
//paswordd

const presetsButton = document.getElementById('presetCloaks');
const presetsBox = document.getElementById('presetsBox');
const googlePresetButton = document.getElementById('googlePreset');
const edgePresetButton = document.getElementById('edgePreset');
const classlinkPresetButton = document.getElementById('classlinkPreset');
const classroomPresetButton = document.getElementById('classroomPreset');
let presetsShown=false;

presetsButton.addEventListener("click", function() {
    presetsShown=!presetsShown;
    if (presetsShown) {
        presetsBox.style.display = 'block';
    } else{
        presetsBox.style.display = 'none';
    }
});

// stolenn!!
document.getElementById('changeName').onclick = function() {
    var newTitle = document.getElementById('titleCloak').value;
    if(newTitle) document.title = newTitle;
};


document.getElementById('changeLogo').onclick = function() {
    var logoUrl = document.getElementById('imageCloak').value;
    if(logoUrl) {
        // Try to find an existing favicon <link>, else create one
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = logoUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    }
};
//valor!!'
googlePresetButton.addEventListener("click", function() {
    document.title = "Google";
    document.getElementById('favicon').setAttribute('href', 'SRC/Icons/chrome_browser_logo_icon_153007 (1).ico');
})

edgePresetButton.addEventListener("click", function() {
    document.title = "Microsoft Edge";
    document.getElementById('favicon').setAttribute('href', 'SRC/Icons/edge_browser_logo_icon_152998.ico');
})

classlinkPresetButton.addEventListener("click", function() {
    document.title = "Classlink";
    document.getElementById('favicon').setAttribute('href', 'SRC/Icons/ClassLink-Cloud-White-OL_DS.svg');
})

classroomPresetButton.addEventListener("click", function() {
    document.title = "Google Classroom";
    document.getElementById('favicon').setAttribute('href', 'SRC/Icons/icons8-google-classroom-120.png');
})
//presets and cloaking


const pointRequirementBase = 100;
const achievement=document.getElementById('achievement');
const achievementDescription = document.getElementById('achievementDescription');
let points = 0;
let level = 1;
let pointRequirement = pointRequirementBase*level*1.35;
let badgeShown = false;
let firstBadge= false;
let secondBadge = false;
let thirdBadge = false;
let fourthBadge = false;
let fifthBadge = false;
let sixthBadge = false;
let increaseAmountMulti=2.75

function addPoints(amount) {
    points += amount;
    document.getElementById('points').textContent = "Points: " + points;
    let progressPercent = Math.min((points / pointRequirement) * 100, 100);
    document.getElementById('progress').style.width = progressPercent + "%";
    achievements();
    levels();
    fixer();
}

function achievements(){
    const badgeWrapper = document.getElementById('badgeWrapper');
    if (points >= 10 && !firstBadge) {
        badgeWrapper.classList.add('show'); //slide u
        badgeShown = true;
        firstBadge = true;
        increaseAmountMulti+=4;

    } else if (points >= 20 && firstBadge) {
        badgeWrapper.classList.remove('show'); //slide d
        badgeShown = false;
    }

    if(level===10 && !secondBadge){
        achievement.textContent="Level 10!"
        achievementDescription.textContent="1000 More cat pictures unlocked!!!"
        badgeWrapper.classList.add('show');
        secondBadge = true;
        badgeShown = true;
        increaseAmountMulti+=20;
    } else if (level===11) {
        badgeWrapper.classList.remove('show');
        badgeShown = false;
    }
    if(level===20 && !thirdBadge){
        achievement.textContent="Level 20!"
        achievementDescription.textContent="2000 More cat pictures unlocked!!!"
        badgeWrapper.classList.add('show');
        thirdBadge = true;
        badgeShown = true;
        increaseAmountMulti+=500;
    } else if (level===21) {
        badgeWrapper.classList.remove('show');
        badgeShown = false;
    }
    if(level===30 && !fourthBadge){
        achievement.textContent="Level 30!"
        achievementDescription.textContent="2000 More cat pictures unlocked!!!"
        badgeWrapper.classList.add('show');
        fourthBadge = true;
        badgeShown = true;
        increaseAmountMulti+=2000;
    } else if (level===31) {
        badgeWrapper.classList.remove('show');
        badgeShown = false;
    }
    if(level===40 && !fifthBadge){
        achievement.textContent="Level 40!"
        achievementDescription.textContent="2000 More cat pictures unlocked!!!"
        badgeWrapper.classList.add('show');
        fifthBadge = true;
        badgeShown = true;
        increaseAmountMulti+=20000;
    } else if (level===41) {
        badgeWrapper.classList.remove('show');
        badgeShown = false;
    }
    if(level===50 && !sixthBadge){
        achievement.textContent="Level !kitty!"
        achievementDescription.textContent="ALL 10K CAT PICS UNLOCKED!! kittymode activated!!"
        badgeWrapper.classList.add('show');
        sixthBadge = true;
        badgeShown = true;
        kittymode=true;
        kittybuttonshown=true;
        increaseAmountMulti+=100000;
    } else if (level===51) {
        badgeWrapper.classList.remove('show');
        badgeShown = false;
    }
}


function levels(){
    const lvlPart1 = document.getElementById("lvlPart1");
    const lvlPart2 = document.getElementById("lvlPart2");
    lvlPart1.textContent = (level).toString();
    lvlPart2.textContent = (level+1).toString();

    if (points>pointRequirement) {
        level++;
        points = 0;
        let levelExponent = 1.4 - (Math.min(level, 50) / 100); // starts at 1.4, down to 0.9 at level 50
        pointRequirement = Math.floor(pointRequirementBase * Math.pow(level, levelExponent + (prestiges * 0.02)) * (increaseAmountMulti / 10));
        document.getElementById('points').textContent = "Points: 0";
    }
}
//clicker
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
//robbed fucntion, ty mdn

const catButton = document.getElementById('catButton');
let img = document.getElementById('catImage');

catButton.addEventListener("click", function() {
    catsClickedThrough+=1;
    chooseCat();
    img.width = 400;
    img.height = 300;
    fixer();
})

function chooseCat(){
    let catList=[];
    let limit;
    let number;
    if (prestiges >= 10 && MemoriesRidden) {
        limit = 248474;
    }else if(prestiges>=10){
        limit = 100000;
    }else if(prestiges>=1){
        limit = 30000;
    } else if (level <= 9){
        limit = 999;
    } else if (level < 20){
        limit = 1999;
    } else if (level < 30){
        limit = 3999;
    } else if (level < 40){
        limit = 5999;
    } else if (level < 50){
        limit = 7999;
    } else if (level < 100) {
        limit = 10000;
    }

    for(let i = 0; i < limit; i++){
        catList.push("cat_"+i+".png");
    }
    number = getRandomIntInclusive(0, limit-1);
    document.getElementById('catImage').src = 'SRC/cats/'+catList[number];
    console.log(number);

}

function loadCustomCat(number){
    document.getElementById('catImage').src = 'SRC/cats/cat_'+number+'.png';
    img.width = 400;
    img.height = 300;
}

kittybutton.addEventListener("click", function() {
kittymode=!kittymode;
kittybuttonshown=true;
})

//kitty
const clickButton=document.getElementById("play-btn");
const catsUpgradeButton  = document.getElementById("catsUpgradeButton");
const catsAutoclickerButton  = document.getElementById("catsAutoclickerButton");
const catsAutoclickerPointsButton  = document.getElementById("catsAutoclickerPointsButton");
const catsAutoclickerFasterButton  = document.getElementById("catsAutoclickerFasterButton");
const prestigeButton = document.getElementById("prestigeButton");
const cookiesButton  = document.getElementById("cookiesButton");
const grandmaButton = document.getElementById("grandma");
const memories = document.getElementById("memories");
const prestigeBox  = document.getElementById("prestigeBox");
const memoriesConfirmationScreen  = document.getElementById("memoriesConfirmationScreen");
const memoriesContainer  = document.getElementById("memoriesContainer");
const backButtonMemories = document.getElementById("backButtonMemories");
const restartButton  = document.getElementById("restartButton");
const upgradePrice= document.getElementById("upgradePrice");
const autoBuyPrice = document.getElementById("autoBuyPrice");
const autoPointIncrease = document.getElementById("autoPointIncrease");
const autoIntervalIncrease = document.getElementById("autoIntervalIncrease");
const prestigeCost = document.getElementById("prestigeCost");
const resetButton = document.getElementById("resetButton");
const backPrestige = document.getElementById("backPrestige");
const prestigeCheck = document.getElementById("prestigeCheck");
const cookiesAmount= document.getElementById("cookiesAmount");
const lowerGrandmaIntervalButton = document.getElementById("lowerGrandmaInterval");
const grandmaIntervalPrice= document.getElementById("grandmaIntervalPrice");
const onScreenStatistics= document.getElementById("onScreenStatistics");
let cookieUpgrade=false;
let cookies=0;
let prestiges=0;
let prestigeCoins=0;
let autoclickers=0;
let autoInterval=750;
let grandmasInterval=600;
let grandmasIntervalCost=500;
let pointsPerClick=10;
let autoPointsPerClick=10;
let prestigePrice=100000;
let upgradeCost=50;
let autoClickerCost=200;
let autoClickerPointIncrease=500;
let autoClickerIntervalIncrease=1000;
let aresure=false;
let upgradesBought=0;
let autoClickersBought=0;
let clickAmount=0;
let grandmas=0;
let grandmaInterval=0;
let autosInterval=0;
let cookiesHidden=false;
let MemoriesRidden=false;
let hideGrandmasInterval=false;
let cookieModeUnknown=true;
let timeSpent=0;
let catsClickedThrough=0;
const memoriesToChange = [clickButton,
    catsUpgradeButton,
    catsAutoclickerButton,
    catsAutoclickerPointsButton,
    catsAutoclickerFasterButton,
    prestigeButton,
    cookiesButton,
    grandmaButton,
    memories,
    prestigeBox,
    memoriesConfirmationScreen,
    memoriesContainer,
    backButtonMemories,
    restartButton,
    upgradePrice,
    autoBuyPrice,
    autoPointIncrease,
    autoIntervalIncrease,
    prestigeCost,
    resetButton,
    backPrestige,
    prestigeCheck,
    cookiesAmount,
    lowerGrandmaIntervalButton,
    grandmaIntervalPrice,];
const memoriesToChangeVirtual=[
    "cookieUpgrade",
    "cookies",
    "prestigeCoins",
    "autoclickers",
    "autoInterval",
    "grandmasInterval",
    "grandmasIntervalCost",
    "pointsPerClick",
    "autoPointsPerClick",
    "prestigePrice",
    "upgradeCost",
    "autoClickerCost",
    "autoClickerPointIncrease",
    "autoClickerIntervalIncrease",
    "upgradesBought",
    "autoClickersBought",
    "grandmaInterval",
    "autosInterval",
    "hideGrandmasInterval",
];

clickButton.addEventListener("click", function(){
    addPoints(pointsPerClick);
    clickAmount++;
})
catsUpgradeButton.addEventListener("click", function(){
    if(points>=upgradeCost){
        points-=upgradeCost;
        upgradesBought++;
        if(cookieUpgrade){
            pointsPerClick+=20;
            upgradeCost*=1.5
        }else{
            pointsPerClick+=10;
            upgradeCost*=1.8
        }
        upgradePrice.textContent=" "+upgradeCost.toFixed(0)+" Points";
        fixer();
    }
})

catsAutoclickerButton.addEventListener("click", function(){
    if(points>=autoClickerCost){
        points-=autoClickerCost;
        autoClickersBought++;
        if(cookieUpgrade){
            autoclickers+=2;
            autoClickerCost*=1.5
        }else{
            autoclickers+=1;
            autoClickerCost*=1.8
        }
        autoBuyPrice.textContent=" "+autoClickerCost.toFixed(0)+" Points";
        autoclickerProcessing()
        fixer();
    }
})

catsAutoclickerPointsButton.addEventListener("click", function(){
    if(points>=autoClickerPointIncrease){
        points-=autoClickerPointIncrease;
        upgradesBought++;
        if(cookieUpgrade){
            autoPointsPerClick+=20;
            autoClickerPointIncrease*=1.5
        }else{
            autoPointsPerClick+=10;
            autoClickerPointIncrease*=1.8
        }
        autoPointIncrease.textContent=" "+autoClickerPointIncrease.toFixed(0)+" Points";
        autoclickerProcessing()
        fixer();
    }
})

catsAutoclickerFasterButton.addEventListener("click", function(){
    if(points>=autoClickerIntervalIncrease) {
        points -= autoClickerIntervalIncrease;
        upgradesBought++;
        if (cookieUpgrade) {
            autoInterval -= 15;
            autoClickerIntervalIncrease *= 1.5
        } else {
        autoInterval -= 10;
        autoClickerIntervalIncrease *= 1.8
    }
        autoIntervalIncrease.textContent=" "+autoClickerIntervalIncrease.toFixed(0)+" Points";
        fixer();
    }
})

prestigeButton.addEventListener("click", function(){
prestigeBox.style.display="block";
prestigeCost.innerHTML=prestigePrice+"Points";
})

resetButton.addEventListener("click", function(){
    if (aresure && points>=prestigePrice){
    prestigeProcess()
        prestigePrice*=Math.min(prestigePrice*1.3, 2000000);
        aresure = !aresure;
        prestigeBox.style.display="none";
    }else if(!aresure && points>=prestigePrice){
        prestigeCheck.innerText="are you sure?"
        prestigeCheck.style.color="red";
        aresure=true;
    } else if(points>=prestigePrice){
        alert("Not Enough Points!")
    }
})

backPrestige.addEventListener("click", function(){
    prestigeBox.style.display="none";
    aresure = false;
    prestigeCheck.innerText="Reset?"
})

cookiesButton.addEventListener("click", function(){
    if(prestigeCoins>=1){
        prestigeCoins-=1;
        cookieUpgrade=true;
        cookieUpgradeProcess();
        cookiesButton.style.display="none";
        cookiesHidden=true;
        cookiesAmount.style.display="block";
    }
})

grandmaButton.addEventListener("click", function(){
    if(prestigeCoins>=3){
        prestigeCoins-=3;
        grandmas++;
        grandmaProcessing();
    }
})

memories.addEventListener("click", function(){
    memoriesConfirmationScreen.style.display="block";
})

restartButton.addEventListener("click", function() {
    if (prestigeCoins >= 10 && cookies >= 5000 && points >= 2000000) {
        prestigeCoins -= 10;
        cookies -= 5000;
        points -= 2000000;
        MemoriesRidden = true;
        memoriesConfirmationScreen.style.display="none";
        memoriesProcess();
    } else if (prestigeCoins <= 10 || cookies <= 5000 || points <= 2000000) {
    alert("You dont have enough of something.")
}
})

backButtonMemories.addEventListener("click", function(){
    memoriesConfirmationScreen.style.display="none";
})

lowerGrandmaIntervalButton.addEventListener("click", function(){
    if(cookies>=grandmasIntervalCost){
        cookies-=grandmasIntervalCost;
        grandmasIntervalCost=Math.min(grandmasIntervalCost*1.3, 20000);
        grandmaIntervalPrice.innerText=" "+grandmasIntervalCost+" Cookies!";
        if(grandmasInterval-10!==0){
            grandmasInterval-=10;
        } else{
            hideGrandmasInterval=true;
        }
    }else{
        alert("You dont have enough cookies!!")
    }
    fixer();
})
function memoriesProcess(){
    memoriesToChange.forEach(element => {
        element.style.display="none";
    });
    for (let i = 0; i < memoriesToChangeVirtual.length; i++) {
        memoriesToChangeVirtual[i] = 0;
    }

    document.getElementById("catTextHint").style.display="none";
    document.getElementById("prestigeCoinsAmount").style.display="none";
    document.getElementById("points").style.display="none";
    document.getElementById("progcontainer").style.display="none";

    if(!kittybuttonshown){
        kittybuttonshown=true;
        kittymode=true;
    }
}
function cookieUpgradeProcess(){
    setInterval(() => {
    cookies+=1;
    fixer();
    }, 1200);
    cookiesAmount.textContent="Cookies: "+cookies.toFixed(0);
}

function prestigeProcess(){
    prestiges++;
    pointsPerClick=10;
    upgradeCost=50;
    points=0;
    level=1;
    autoInterval=500;
    autoPointsPerClick=10
    autoClickerCost=200;
    autoClickerPointIncrease=500;
    autoClickerIntervalIncrease=1000;
    autoclickers=0;
    pointRequirement = pointRequirementBase*level*1.35-points;
    prestigeCoins+=1;
    fixer();
}
function autoclickerProcessing() {
    if (autosInterval) {
        clearInterval(autosInterval);
    }
    autosInterval = setInterval(() => {
        points += autoPointsPerClick * autoclickers;
        fixer();
    }, autoInterval);
}
function statistics(){
    onScreenStatistics.innerHTML = "Points Per Click: " + pointsPerClick +
        "<br>Autoclickers: " + autoclickers +
        "<br>Points Per Autoclick: " + autoPointsPerClick +
        "<br>Autoclicker Interval: " + autoInterval +
        "<br>Grandmas: " + grandmas +
        "<br>Grandmas Interval: " + grandmasInterval+
        "<br>Prestiges: " + prestiges +
        "<br>Total Clicks: " + clickAmount +
        "<br>Time Spent: " + timeSpent +
        "<br>Cats: " + catsClickedThrough;
}

function grandmaProcessing() {
    if (grandmaInterval) clearInterval(grandmaInterval);

    grandmaInterval = setInterval(() => {
        let grandmaEffect = Math.pow(grandmas, 0.95);
        let grandmaPower = 3 + Math.log(level + 1) + (prestiges * 0.5);
        let baseBoost = Math.floor(pointsPerClick * 0.3);

        let pointsGenerated = grandmaEffect * grandmaPower * Math.max( baseBoost*(autoclickers/5), 0.2);
        console.log(pointsGenerated);

        points += pointsGenerated;
        cookies += Math.floor(grandmaEffect * 1.5);
        fixer();
    }, grandmasInterval); //
}

function fixer(){
    if(MemoriesRidden){

    } else {
        document.getElementById('points').textContent = "Points: " + points.toFixed(0);
        let progressPercent = Math.min((points / pointRequirement) * 100, 100);
        document.getElementById('progress').style.width = progressPercent + "%";
        levels();
        cookiesAmount.textContent = "Cookies: " + cookies.toFixed(0);
        if (level >= 25) {
            prestigeButton.style.display = "block";
        }
        upgradePrice.textContent = " " + upgradeCost.toFixed(0) + " Points";
        autoBuyPrice.textContent = " " + autoClickerCost.toFixed(0) + " Points";
        autoPointIncrease.textContent = " " + autoClickerPointIncrease.toFixed(0) + " Points";
        autoIntervalIncrease.textContent = " " + autoClickerIntervalIncrease.toFixed(0) + " Points";
        prestigeCost.innerHTML = prestigePrice + "Points";
        document.getElementById("prestigeCoinsAmount").textContent = "Prestige Coins: " + prestigeCoins;
        achievements();
        if (level >= 25) {
            prestigeButton.style.display = "block";
        } else {
            prestigeButton.style.display = "none";
        }
        if (prestiges >= 1 && !cookiesHidden) {
            cookiesButton.style.display = "block";
            grandmaButton.style.display = "block";
            lowerGrandmaIntervalButton.style.display = "block";
            memories.style.display = "block";
        } else if (prestiges >= 1 && cookiesHidden) {
            grandmaButton.style.display = "block";
            lowerGrandmaIntervalButton.style.display = "block";
            memories.style.display = "block";
        } else {
            cookiesButton.style.display = 'none';
            grandmaButton.style.display = "none";
            memories.style.display = "none";
            lowerGrandmaIntervalButton.style.display = "none";
        }
        if (hideGrandmasInterval) {
            lowerGrandmaIntervalButton.style.display = "none";
        }
        if (level === 100 && cookieModeUnknown) {
            alert("cookie mode, enabled!")
            cookieModeUnknown = false;
        }
        statistics();
    }
}

setInterval(() => {
timeSpent+=1;
    fixer();
}, 1000); //

//clicker oh gosd
//dev under here
const setLevelButton = document.getElementById('setLevel');
const setPointReqButton = document.getElementById('setPointReq');
const setCatButton = document.getElementById('customCatSetter');

setLevelButton.addEventListener("click", function() {
    level=prompt("Level", level);
})

setPointReqButton.addEventListener("click", function() {
    pointRequirement=prompt("requirement", pointRequirement);
})

setCatButton.addEventListener("click", function() {
    let numberToSet=prompt("cat", "356");
    loadCustomCat(numberToSet)
})

document.getElementById('devButton').addEventListener("click", function() {
kittybuttonshown=true;
dev=true;
document.getElementById('starCountLogger').style.display="block";
})
//cat
window.addEventListener('DOMContentLoaded', () => {
    starsActive = true;
    for (let i = 0; i < 70; i++) createStar();
    starsInterval = setInterval(createStar, 20);
    starControl.textContent = "Stop";
    img.width = 400;
    img.height = 300;
    document.getElementById("coolbuttonscat").style.display="none";
    document.getElementById("starCountLogger").style.display="none";
    if(level>=25) {prestigeButton.style.display="f";} else {prestigeButton.style.display="none";}
    document.getElementById("memoriesConfirmationScreen").style.display="none";
    document.getElementById("prestigeBox").style.display="none";
    cookiesButton.style.display="none"; grandmaButton.style.display="none"; memories.style.display="none";
    lowerGrandmaIntervalButton.style.display="none";
});
memoriesContainer.style.display="none";
memoriesConfirmationScreen.style.display="none";
prestigeBox.style.display="none";
fixer();
//end/Star Starting

//MAKE MEMOPRIES SHOW CC SCREEN, AFTER 60 SECONDS, GO TO CAT SCREEN | JUST THIS FOR NOW | ALL UPGRADES AND THINGS HIDDEN OTHER THEN ROLLING CATS!!!!!!!