const money = document.getElementById("money");
const respect = document.getElementById("respect");
const happiness = document.getElementById("happiness");
const text = document.getElementById("text");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const weed = document.getElementById("weed");
const btnSmoke = document.getElementById("getHigh");
const container = document.getElementById("gameContainer");
const gameArea = document.getElementById("gameArea");
const btnHit = document.getElementById("hit");   

let moneyValue = 0;
let respectValue = 0;
let happinessValue = 0;
let weedValue = 0;
let drinksValue = 0;
const shoes = ["j1 jordans", "j2 jordans"," j3 jordans"," j4 jordans"," j5 jordans"];
let shoesValue = 0;
let currentShoes = [];
btnSmoke.style.display = "none";
btnHit.style.display = "none";
const locations = [{
    name : "Home",
    "button text": ["Store","Work","Bar"],
    "button functions":[goStore,goWork,goChicks],
    text:"Welcome to the Ghetto Yuth Life Simulator! Click the buttons below to start your adventure." ,
    "background image": 'home.png'
},
{
name: "store",
"button text": ["Home","Buy weed","Buy shoes"],
"button functions":[goHome, buyWeed, buyShoes],
text: "Welcome to the store! You can buy weed or shoes here. Happy shopping!",
"background image": 'store.png'
},
{
name: "work",
"button text":["Home","work in the fields","steal"],
"button functions":[goHome,workInFields,steal],
text :"You are at work, you can work in the fields or steal from your boss!",
"background image": 'work.png'
},
{
name: "Chicks", 
"button text": ["Home", "Buy drinks", "Chat with chicks"],
"button functions": [goHome, buyDrinks, kiss],
text: "You are at the club, you can buy drinks or dance with chicks!",
"background image": 'bar.png'
}
]
function update(locations){
    btn1.innerText = locations["button text"][0];
    btn2.innerText = locations["button text"][1];
    btn3.innerText = locations["button text"][2];
    text.innerText = locations.text;
    btn1.onclick = locations["button functions"][0];
    btn2.onclick = locations["button functions"][1];
    btn3.onclick = locations["button functions"][2];
    container.style.backgroundImage = `url(${locations["background image"]})`;
    container.style.backgroundSize = "cover";
    gameArea.style.backgroundImage = `url(${locations["background image"]})`;
    gameArea.style.backgroundSize = "cover";
}
function resetDrinks(){
    drinksValue = 0;
}
function goHome(){
    update(locations[0]);
    resetDrinks(); // Reset drinks value when going home
}

function goStore(){
    update(locations[1]);
    resetDrinks(); // Reset drinks value when going to the store
}

function goWork(){
    update(locations[2]);
    resetDrinks();
    const randomIndex =Math.floor(Math.random() * 20);
    if(randomIndex>15){
        btnSmoke.style.display = "block"; // Show the smoke button if the random index is greater than 15
        btnSmoke.onclick = function() {
            if (weedValue > 0) {
                weedValue -= 1;
                happinessValue += 10; // Smoking weed increases happiness
                weed.innerText = `Weed: ${weedValue}`;
                happiness.innerText = `Happiness: ${happinessValue}`;
                text.innerText = "You smoked some weed! Your happiness increased.";
            } else {
                text.innerText = "You don't have any weed to smoke!";
            }
            btnSmoke.style.display = "none"; // Hide the button after smoking
        };
    }
}

function goChicks(){
    update(locations[3]);
    const randomIndex = Math.floor(Math.random() * 20);
    if (randomIndex > 15) {
        btnHit.style.display = "block"; // Show the hit button if the random index is greater than 15
        btnHit.onclick = function() {
            if (moneyValue >= 100) {
                respectValue -= 10; // Hitting reduces respect
                happinessValue += 100; 
                moneyValue -=100;
                respect.innerText = `Respect: ${respectValue}`;
                happiness.innerText = `Happiness: ${happinessValue}`;
                money.innerText = `Money: $${moneyValue}`;
                text.innerText = "You met a girl and she liked you and invited you over for some fun!!!";
            } else {
                text.innerText = "You too broke for this chick!";
            }
            btnHit.style.display = "none"; // Hide the button after hitting
        };
    }
}
function buyWeed(){
    if (moneyValue >= 10) {
        weedValue += 1;
        moneyValue -= 10;
        weed.innerText = `Weed: ${weedValue}`;
        money.innerText = `Money: $${moneyValue}`;
        text.innerText = `You now have ${weedValue} stars of weed `
    } else {
        text.innerText="You don't have enough money to buy weed!";
    }
}

function buyShoes(){
    if( shoesValue >= shoes.length) {
        text.innerText = "You have bought all the shoes available!";
        return;
    }
    if (moneyValue >= 50) {
        const newShoe = shoes[shoesValue];
        currentShoes.push(newShoe);
        shoesValue += 1;
        moneyValue -= 50;
        text.innerText=`You bought ${newShoe}!`;
        money.innerText = `Money: $${moneyValue}`;
    } else {
        text.innerText = "You don't have enough money to buy shoes!";
    }
}
let workIndex = 0;
function workInFields(){
    if(!workIndex){
        workIndex=1;
        text.innerText = "Your shift in Hippo Valley section 2 just started , you will be paid after your shift ends";
        const earnedMoney = Math.floor(Math.random() * 20) + 10; 
        setTimeout(()=>{
        moneyValue += earnedMoney;
        money.innerText = `Money: $${moneyValue}`;
        respectValue += 5; 
        respect.innerText = `Respect: ${respectValue}`;
        happinessValue += 5; 
        happiness.innerText = `Happiness: ${happinessValue}`;
        text.innerText=`You worked in the fields and earned $${earnedMoney}!`;
        workIndex=0;
    },10000)
    }else{
        text.innerText = "Already in shift right now!"
    }
    }
    

function steal(){
    if (respectValue < 10 || happinessValue <20) {
        alert("You don't have enough respect and happiness to steal!");
        return;
    }
    const stolenMoney = Math.floor(Math.random() * 50) + 10; // Steal between $10 and $60
    moneyValue += stolenMoney;
    money.innerText = `Money: $${moneyValue}`;
    respectValue -= 10; // Stealing reduces respect
    respect.innerText = `Respect: ${respectValue}`;
    happinessValue -= 20; // Stealing also reduces happiness
    happiness.innerText=`Happiness: ${happinessValue}`;
    text.innerText=`You stole $${stolenMoney}! But your respect and happiness has decreased.`;
}
function buyDrinks(){
    if (moneyValue >= 20) {
        drinksValue += 1;
        moneyValue -= 20;
        happinessValue += 10; // Buying drinks increases happiness
        money.innerText = `Money: $${moneyValue}`;
        happiness.innerText = `Happiness: ${happinessValue}`;
        text.innerText=`You bought a drink! Total drinks: ${drinksValue}`;
    } else {
        text.innerText="You don't have enough money to buy drinks!";
    }
}
function kiss(){
    if (drinksValue > 2) {
        happinessValue += 21; // Kissing increases happiness
        drinksValue -= 2; // Consuming a drink
        happiness.innerText = `Happiness: ${happinessValue}`;
        text.innerText = "You kissed a chick! Your happiness increased.";
    } else {
        text.innerText="You need to buy drinks before you can kiss!";
    }
}

    goHome();
