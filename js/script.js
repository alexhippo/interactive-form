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
const activities = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let totalCost = parseInt(activitiesCost.innerText.split(': $')[1]);
let totalActivities = 0;

activities.addEventListener('change', (event) => {
    let cost = parseInt(event.target.dataset.cost);
    if (event.target.checked) {
        totalCost += cost;
        totalActivities++;
    } else {
        totalCost -= cost;
        totalActivities--;
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

function isValidCreditCard() {
    const creditCardNumber = document.getElementById('cc-num');
    const zipCode = document.getElementById('zip');
    const cvv = document.getElementById('cvv');
    const expMonth = document.getElementById('exp-month');
    const expYear = document.getElementById('exp-year');

    // CC Number must contain 13 - 16 digits with no dashes or spaces
    function isValidCreditCardNumber(number) {
        if (/^\d{13,16}$/.test(number.value)) {
            number.nextElementSibling.style.display = 'none';
            return true;
        } else {
            number.nextElementSibling.style.display = 'block';
            return false;
        }
    }
    // Zip code field must contain a 5 digit number
    function isValidZipCode(zip) {
        if (/^\d{5}$/.test(zip.value)) {
            zip.nextElementSibling.style.display = 'none';
            return true;
        } else {
            zip.nextElementSibling.style.display = 'block';
            return false;
        }
    }

    // CVV field must contain a 3 digit number
    function isValidCVV(cvv) {
        if (/^\d{3}$/.test(cvv.value)) {
            cvv.nextElementSibling.style.display = 'none';
            return true;
        } else {
            cvv.nextElementSibling.style.display = 'block';
            return false;
        }
    }

    // Expiration date and Expiration year must be filled in
    function isValidExpirationDate() {
        return expMonth.value > 0 && expYear.value >= "2021";
    }

    return isValidCreditCardNumber(creditCardNumber) &&
        isValidZipCode(zipCode) &&
        isValidCVV(cvv) &&
        isValidExpirationDate();
};


form.addEventListener('submit', (e) => {
    if (!isValidName(nameField.value)) {
        e.preventDefault();
        document.getElementById('name-hint').style.display = 'block';
    }

    if (!isValidEmail(emailField.value)) {
        e.preventDefault();
        document.getElementById('email-hint').style.display = 'block';
    }

    if (!isRegisteredForActivities()) {
        e.preventDefault();
        console.log(totalActivities);
        document.getElementById('activities-hint').style.display = 'block';
    }

    if (!isValidCreditCard()) {
        e.preventDefault();
    }
})