/*
* Treehouse Techdegree:
* FSJS Project 3 - Interactive Form
* Author: Alex Hipolito
* GitHub: @alexhippo
*/

// Initial focus on name field when you load the page
const nameField = document.getElementById('name');
nameField.focus();

// Job Role
const otherJobRole = document.getElementById('other-job-role');
const title = document.getElementById('title');
// @to-do: Ensure this is hidden from the start
otherJobRole.style.visibility = 'hidden';

title.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherJobRole.style.visibility = 'visible';
    } else {
        otherJobRole.style.visbility = 'hidden';
    }
});

// T-Shirt Info - Color and Design
const tshirtColor = document.getElementById('color');
const tshirtDesign = document.getElementById('design');
tshirtColor.setAttribute('disabled', 'true');

tshirtDesign.addEventListener('change', (event) => {
    tshirtColor.removeAttribute('disabled');
    tshirtColor.querySelectorAll('option');
    for (let i = 0; i < tshirtColor.length; i++) {
        tshirtColor[i].hidden = true;
    };

    const chosenDesign = event.target.value;
    const tshirtColors = tshirtColor.querySelectorAll(`option[data-theme="${chosenDesign}"]`);
    for (let i = 0; i < tshirtColors.length; i++) {
        tshirtColors[i].hidden = false;
    };
});

// Register for Activities
const activities = document.getElementById('activities-box');
const activitiesCost = document.getElementById('activities-cost');
const activitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let totalCost = parseInt(activitiesCost.innerText.split(': $')[1]);
let totalActivities = 0;

// Check for any conflicts. 
// e.g. attendee cannot attend both the Node.js and Build Tools workshop at the same time (Tuesday 1pm - 4pm).
function checkActivityConflicts(activity, checked) {
    const chosenEventDayAndTime = activity.dataset.dayAndTime;
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        let eventDayAndTime = activitiesCheckboxes[i].dataset.dayAndTime;
        if ((chosenEventDayAndTime === eventDayAndTime) &&
            (activity.nextElementSibling.innerText != activitiesCheckboxes[i].nextElementSibling.innerText)) {
            if (checked) {
                activitiesCheckboxes[i].setAttribute('disabled', 'true');
                activitiesCheckboxes[i].parentElement.classList.add('disabled');
            } else {
                activitiesCheckboxes[i].removeAttribute('disabled');
                activitiesCheckboxes[i].parentElement.classList.remove('disabled');
            }
        }
    }
}

activities.addEventListener('change', (event) => {
    let cost = parseInt(event.target.dataset.cost);
    if (event.target.checked) {
        totalCost += cost;
        totalActivities++;
        if (event.target.dataset.dayAndTime) {
            checkActivityConflicts(event.target, true);
        }
    } else {
        totalCost -= cost;
        totalActivities--;
        if (event.target.dataset.dayAndTime) {
            checkActivityConflicts(event.target, false);
        }
    }
    activitiesCost.innerText = `Total: $${totalCost}`;
});

// Payment Info
const payment = document.getElementById('payment');
const paymentOptions = document.querySelectorAll('#payment option');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

for (let i = 0; i < paymentOptions.length; i++) {
    if (paymentOptions[i].value === 'credit-card') {
        paymentOptions[i].setAttribute('selected', 'true');
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    }
};

payment.addEventListener('change', (event) => {
    if (event.target.value === 'credit-card') {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'block';
    } else if (event.target.value === 'paypal') {
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
        paypal.style.display = 'block';
    } else if (event.target.value === 'bitcoin') {
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
        bitcoin.style.display = 'block';
    }
});

// Form validation
const form = document.querySelector('form');
const emailField = document.getElementById('email');

function isValidName(name) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
};

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isRegisteredForActivities() {
    return totalActivities > 0;
}

const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const expMonth = document.getElementById('exp-month');
const expYear = document.getElementById('exp-year');

// CC Number must contain 13 - 16 digits with no dashes or spaces
function isValidCreditCardNumber(number) {
    return /^\d{13,16}$/.test(number.value);
}
// Zip code field must contain a 5 digit number
function isValidZipCode(zip) {
    return /^\d{5}$/.test(zip.value);
}

// CVV field must contain a 3 digit number
function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv.value);
}

// Expiration date and Expiration year must be filled in
function isValidExpirationDate() {
    return expMonth.value > 0 && expYear.value >= "2021";
}

function applyNotValidStyles(field) {
    field.parentElement.classList.add('not-valid');
    field.parentElement.classList.remove('valid');
    field.parentElement.lastElementChild.style.display = 'block'; //display hint
}

function applyValidStyles(field) {
    field.parentElement.classList.add('valid');
    field.parentElement.classList.remove('not-valid');
    field.parentElement.lastElementChild.style.display = 'none';
}

form.addEventListener('submit', (e) => {
    if (!isValidName(nameField.value)) {
        e.preventDefault();
        applyNotValidStyles(nameField);
    } else {
        applyValidStyles(nameField);
    }

    if (!isValidEmail(emailField.value)) {
        e.preventDefault();
        applyNotValidStyles(emailField);
    } else {
        applyValidStyles(emailField);
    }

    if (!isRegisteredForActivities()) {
        e.preventDefault();
        applyNotValidStyles(activities);
    } else {
        applyValidStyles(activities);
    }

    if (payment.value === 'credit-card') {
        if (!isValidCreditCardNumber(creditCardNumber)) {
            e.preventDefault();
            applyNotValidStyles(creditCardNumber);
        } else {
            applyValidStyles(creditCardNumber);
        }

        if (!isValidZipCode(zipCode)) {
            e.preventDefault();
            applyNotValidStyles(zipCode);
        } else {
            applyValidStyles(zipCode);
        }

        if (!isValidCVV(cvv)) {
            e.preventDefault();
            applyNotValidStyles(cvv);
        } else {
            applyValidStyles(cvv);
        }

        // not sure if I need this for now
        // if (!isValidExpirationDate()) {
        //     e.preventDefault();
        //     expMonth.parentElement.classList.add('not-valid');
        //     expYear.parentElement.classList.add('not-valid');
        //     expMonth.parentElement.classList.remove('valid');
        //     expYear.parentElement.classList.remove('valid');
        // } else {
        //     expMonth.parentElement.classList.remove('not-valid');
        //     expYear.parentElement.classList.remove('not-valid');
        //     expMonth.parentElement.classList.add('valid');
        //     expYear.parentElement.classList.add('valid');
        // }
    }
});

// Accessibility
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener('focus', (event) => {
        const checkbox = event.target;
        const checkboxLabel = checkbox.parentElement;
        checkboxLabel.classList.add('focus');
    });

    activitiesCheckboxes[i].addEventListener('blur', (event) => {
        const checkbox = event.target;
        const checkboxLabel = checkbox.parentElement;
        checkboxLabel.classList.remove('focus');
    })
}
