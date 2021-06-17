const category = {hold: "off",title: "category",percentage: 0};
let changeableFillPercent;
let defaultStart = Object.create(category);
defaultStart.hold = "off";
defaultStart.title = "Category";
defaultStart.percentage = 100;
let allCategoriees = [defaultStart];
addListeners(document.getElementById("categoryList").firstChild.nextSibling,0);

function changeDetail(reference,property,value) {
    allCategoriees[reference][property] = value;
    console.log(`Changed ${allCategoriees[reference].title} ${property} to ${value}.`)
}

function addListeners(object,reference) {
    object.firstChild.addEventListener("input",changeDetail(reference,"hold",this.value));
    object.firstChild.nextSibling.addEventListener("input",changeDetail(reference,"title",this.value));
    object.firstChild.nextSibling.nextSibling.addEventListener("input",changeDetail(reference,"percentage",this.value));
}

function addNew() {
    x = document.getElementById("categoryList").firstChild.nextSibling.firstChild.nextSibling.value;
    //x = document.getElementById("categoryList").firstChild.nextSibling;
    alert(x);
}