const variants = [
    "jEw#lEd",
    "JEwEL%d",
    "#EwElED",
    "jEWEl%D",
    "je*ELED",
    "Je$eLeD",
    "jEwE&ed",
    "jEwE&e)"
];
let id = 0;
const title = document.getElementById("chalkTitle");
setInterval(() => {
    id = (id + 1) % variants.length;
    title.textContent = variants[id];
    title.setAttribute('data-text', variants[id]);
}, 120);


let points = 0;
let level = 1;
const pointRequirementBase = 100;
let pointRequirement = pointRequirementBase*level*1.35;
let badgeShown = false;
let firstBadge= false;
function addPoints(amount) {
    points += amount;
    document.getElementById('points').textContent = "Points: " + points;
    let progressPercent = Math.min((points / pointRequirement) * 100, 100);
    document.getElementById('progress').style.width = progressPercent + "%";
    achievements();
    levels();
}

function achievements(){
    const badgeWrapper = document.getElementById('badgeWrapper');
    if (points >= 10 && !firstBadge) {
        badgeWrapper.classList.add('show'); //slide u
        badgeShown = true;
        firstBadge = true;
    } else if (points >= 20 && firstBadge) {
        badgeWrapper.classList.remove('show'); //slide d
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
        points=0;
        pointRequirement = pointRequirementBase*level*1.35;
    }
}