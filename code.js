const category = {hold: false,title: "category",percentage: 0};
let allCategories = [];
newCategory(0,100);
addListeners(document.getElementById("category0"));

function newCategory(number) {
    let defaultStart = Object.create(category);
    defaultStart.hold = false;
    defaultStart.title = `Category${number}`;
    defaultStart.percentage = getNewPercentage();
    allCategories = [...allCategories,defaultStart];
}

function checkFillPercent() {
    let changeableFillPercent=0;
    for (const element of allCategories) {
        if (!element.hold) {
            changeableFillPercent+=element.percentage;
        } 
    }
    return changeableFillPercent;
}

function updatePercentages(oldChangeableFillPercent,newChangeableFillPercent) {
    console.log(`Update percentages called with old fill percent at ${oldChangeableFillPercent} and the new one at ${newChangeableFillPercent}`)
    for (const element of allCategories) {
        if (!element.hold) {
            let oldValue = element.percentage;
            element.percentage = Math.round((oldValue/oldChangeableFillPercent)*newChangeableFillPercent*100)/100;
            document.getElementById(`category${allCategories.indexOf(element)}`).firstChild.nextSibling.nextSibling.value = element.percentage;
        }
    }
}

function getNewPercentage() {
    //find out what the total percent is as well, because if it's less than 100, new elements should just show the difference.
    let changeableFillPercent = allCategories.length===0 ? 100 : 0;
    let numberOfHeldElements=0;
    for (const element of allCategories) {
        if (!element.hold) {
            changeableFillPercent+=element.percentage;
        } else {
            numberOfHeldElements++;
        }
    }
    let percentAvailable = Math.round(changeableFillPercent/(allCategories.length+1-numberOfHeldElements)*100)/100;
    updatePercentages(changeableFillPercent,changeableFillPercent-percentAvailable);
    return percentAvailable;
}

function changeHold(event) {
    let newVal = event.target.checked;
    let target = event.target.parentElement.id.slice(-1);
    allCategories[target].hold = newVal;
}

function changeTitle(event) {
    let newVal = event.target.value;
    let target = event.target.parentElement.id.slice(-1);
    allCategories[target].title = newVal;
}

function changePercentage(event) {
    let alreadyHeld = event.target.parentElement.firstChild.checked;
    let target = event.target.parentElement.id.slice(-1);
    allCategories[target].hold = true;
    let oldFillPercent = checkFillPercent();
    let previousPercentage = allCategories[target].percentage;
    let newVal = parseFloat(event.target.value);
    updatePercentages(oldFillPercent,oldFillPercent-(newVal-previousPercentage));
    allCategories[target].percentage = newVal;
    if (!alreadyHeld) {
        allCategories[target].hold = false;
    }
}

function addListeners(object) {
    object.firstChild.addEventListener("input",changeHold);
    object.firstChild.nextSibling.addEventListener("input",changeTitle);
    object.firstChild.nextSibling.nextSibling.addEventListener("input",changePercentage);
}

function addNew() {
    let listElement = document.createElement("li");
    let orderNum = allCategories.length;
    newCategory(orderNum);
    listElement.id = `category${orderNum}`;
    document.getElementById("categoryList").appendChild(listElement);
    let box = document.createElement("input");
    box.type = "checkbox";
    listElement.appendChild(box);
    let title = document.createElement("input");
    title.type = "text";
    title.value = "Category"
    listElement.appendChild(title);
    let percent = document.createElement("input");
    percent.type = "number";
    percent.step = "0.01";
    percent.value = allCategories[orderNum].percentage;
    listElement.appendChild(percent);
    addListeners(listElement);
}