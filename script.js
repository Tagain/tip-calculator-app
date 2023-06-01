window.onload = function() {
    // Reset the input values
    document.getElementById("bill-amount").value = "";
    document.getElementById("people-number").value = "";
    document.getElementById("custom-tip").value = "";
    
    // Reset the result elements
    document.getElementById("tip-amount").textContent = "0.00";
    document.getElementById("total-amount").textContent = "0.00";
};


const billInput = document.querySelector(".bill-amount");
const peopleInput = document.querySelector(".people-number");
const tips = document.querySelectorAll(".tip");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const resetBtn = document.querySelector(".reset");
const tipCustom = document.querySelector(".custom-tip");
const error = document.querySelector(".error");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function (val) {
    val.addEventListener("click", handleClick);
});
resetBtn.addEventListener("click", reset);
tipCustom.addEventListener("input", tipInputFun);


billInput.value = "";
peopleInput.value = "";
tipPerPerson.innerHTML = (0.0).toFixed(2);
totalPerPerson.innerHTML = (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 0;
let tipValue = 0;

function billInputFun() {
    billValue = parseFloat(billInput.value);
    calculateTip();
}

function tipInputFun() {
    tipValue = parseFloat(tipCustom.value / 100);

    tips.forEach(function (val) {
        val.classList.remove("active");
    });
    calculateTip();
}

function peopleInputFun() {
    peopleValue = parseFloat(peopleInput.value);

    if (peopleValue < 1) {
        error.style.display = "block";
        peopleInput.classList.add("error-input");
        tipPerPerson.innerHTML = (0.0).toFixed(2);
        totalPerPerson.innerHTML = (0.0).toFixed(2);
    } else {
        error.style.display = "none";
        peopleInput.classList.remove("error-input");
        calculateTip();
    }
}

function handleClick(event) {
    tips.forEach(function (val) {
        val.classList.remove("active");
        if (event.target.innerHTML == val.innerHTML) {
        val.classList.add("active");
        tipValue = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue / peopleValue) + tipAmount;
        tipPerPerson.innerHTML = tipAmount.toFixed(2);
        totalPerPerson.innerHTML = total.toFixed(2);
    }
}

function reset() {
    billInput.value = "";
    billInputFun();
    peopleInput.value = "";
    peopleInputFun();
    tipCustom.value = "";
    tipPerPerson.innerHTML = (0.0).toFixed(2);
    totalPerPerson.innerHTML = (0.0).toFixed(2);
}