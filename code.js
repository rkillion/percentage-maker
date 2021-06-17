const category = {hold: false,title: "category",percentage: 0};
let allCategories = [];
newCategory(0);
addListeners(document.getElementById("category0"));

function newCategory(number) {
    let defaultStart = Object.create(category);
    defaultStart.hold = false;
    defaultStart.title = `Category${number}`;
    defaultStart.percentage = getNewPercentage();
    allCategories = [...allCategories,defaultStart];
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
    console.log(`Changeable fill percent is ${changeableFillPercent}`);
    console.log(`Number of held elements is ${numberOfHeldElements}`);
    let percentAvailable = changeableFillPercent/(allCategories.length+1-numberOfHeldElements);
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
    let newVal = parseInt(event.target.value);
    let target = event.target.parentElement.id.slice(-1);
    allCategories[target].percentage = newVal;
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
    percent.value = allCategories[orderNum].percentage;
    listElement.appendChild(percent);
    addListeners(listElement);
}