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


// @todo: Refactoring required
form.addEventListener('submit', (e) => {
    if (!isValidName(nameField.value)) {
        e.preventDefault();
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.classList.remove('valid');
        nameField.parentElement.lastElementChild.style.display = 'block';
    } else {
        nameField.parentElement.classList.add('valid');
        nameField.parentElement.classList.remove('not-valid');
        nameField.parentElement.lastElementChild.style.display = 'none';
    }

    if (!isValidEmail(emailField.value)) {
        e.preventDefault();
        emailField.parentElement.classList.add('not-valid');
        emailField.parentElement.classList.remove('valid');
        emailField.parentElement.lastElementChild.style.display = 'block';
    } else {
        emailField.parentElement.classList.add('valid');
        emailField.parentElement.classList.remove('not-valid');
        emailField.parentElement.lastElementChild.style.display = 'none';
    }

    if (!isRegisteredForActivities()) {
        e.preventDefault();
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activities.lastElementChild.style.display = 'block';
    } else {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activities.lastElementChild.style.display = 'none';
    }

    if (payment.value === 'credit-card') {
        if (!isValidCreditCardNumber(creditCardNumber)) {
            e.preventDefault();
            creditCardNumber.parentElement.classList.add('not-valid');
            creditCardNumber.parentElement.classList.remove('valid');
            creditCardNumber.parentElement.lastElementChild.style.display = 'block';
        } else {
            creditCardNumber.parentElement.classList.add('valid');
            creditCardNumber.parentElement.classList.remove('not-valid');
            creditCardNumber.parentElement.lastElementChild.style.display = 'none';
        }

        if (!isValidZipCode(zipCode)) {
            e.preventDefault();
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipCode.parentElement.lastElementChild.style.display = 'block';
        } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipCode.parentElement.lastElementChild.style.display = 'none';
        }

        if (!isValidCVV(cvv)) {
            e.preventDefault();
            cvv.parentElement.classList.add('not-valid');
            cvv.parentElement.classList.remove('valid');
            cvv.parentElement.lastElementChild.style.display = 'block';
        } else {
            cvv.parentElement.classList.add('valid');
            cvv.parentElement.classList.remove('not-valid');
            cvv.parentElement.lastElementChild.style.display = 'none';
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
const activitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');

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
