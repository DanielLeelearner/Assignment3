/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified.
// Do any of these variables need to be initialized when the page is loaded?
// When do they need to be reset or updated?

let dayButtons = document.querySelectorAll('.day-selector li');
let fullDayButton = document.getElementById('full');
let halfDayButton = document.getElementById('half');
let clearButton = document.getElementById('clear-button');
let calculatedCostElement = document.getElementById('calculated-cost');

let clickedDays = [];

let costPerHalfDay = 20;
let costPerFullDay = 35;

let fullDayClicked = true;
let halfDayClicked = false;

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!

function handleDayButtonClick() {
    let dayButton = this;
    if (dayButton.classList.contains('clicked')) {
        clickedDays = clickedDays.filter(function(clickedDay) {
        return clickedDay != dayButton;
    })
    dayButton.classList.remove('clicked');
    } 
    else {
        clickedDays.push(dayButton);
        dayButton.classList.add('clicked');
    }  
    calculatedCostElement.innerHTML = calculateTotalCost();
}

dayButtons.forEach(function(dayButton) {
    dayButton.addEventListener('click', handleDayButtonClick);
})


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function handleClearButtonClick() {
    dayButtons.forEach(function(dayButton) {
    dayButton.classList.remove('clicked');
    })
    clickedDays = [];
    calculatedCostElement.innerHTML = calculateTotalCost();
}

clearButton.addEventListener('click', handleClearButtonClick);


/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

function handleHalfDayButtonClick() {
    halfDayButton.classList.add('clicked');
    fullDayButton.classList.remove('clicked');
    halfDayClicked = true;
    fullDayClicked = false;
    calculatedCostElement.innerHTML = calculateTotalCost();
}

halfDayButton.addEventListener('click', handleHalfDayButtonClick);


function handleFullDayButtonClick() {
    fullDayButton.classList.add('clicked');
    halfDayButton.classList.remove('clicked');
    halfDayClicked = false;
    fullDayClicked = true;
    calculatedCostElement.innerHTML = calculateTotalCost();
}

fullDayButton.addEventListener('click', handleFullDayButtonClick);


/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateTotalCost() {
    let dayLength = 0;
    dayButtons.forEach(function(dayButton) {                        // or using let dayLength = clickedDays.length
    if (dayButton.classList.contains('clicked')) {
        dayLength += 1;
    }
    })
    if (halfDayClicked) {
        return dayLength * costPerHalfDay;
    } 
    else if (fullDayClicked) {
        return dayLength * costPerFullDay;
    }
}