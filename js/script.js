/*
* Treehouse Techdegree:
* FSJS Project 3 - Interactive Form
* Author: Alex Hipolito
* GitHub: @alexhippo
*/

// Initial focus on Name field when you load the page
const nameField = document.getElementById('name');
nameField.focus();

// Job Role
const otherJobRole = document.getElementById('other-job-role');
const title = document.getElementById('title');

title.addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// T-Shirt - Color and Design
const tshirtColor = document.getElementById('color');
const tshirtDesign = document.getElementById('design');
tshirtColor.setAttribute('disabled', 'true');

const selectColorOption = document.createElement('option');
selectColorOption.innerText = 'Please select a t-shirt color'
tshirtColor.insertBefore(selectColorOption, document.querySelector('#color option'));
selectColorOption.hidden = true;

tshirtDesign.addEventListener('change', (event) => {
    tshirtColor.removeAttribute('disabled');
    selectColorOption.setAttribute('selected', true);
    tshirtColor.querySelectorAll('option');

    // Hide all t-shirt colours at first
    // Ensure all t-shirt colours are not selected
    for (let i = 0; i < tshirtColor.length; i++) {
        tshirtColor[i].hidden = true;
        tshirtColor[i].removeAttribute('selected');
    };

    const chosenDesign = event.target.value;
    const chosenDesignTshirtColors = tshirtColor.querySelectorAll(`option[data-theme="${chosenDesign}"]`);
    for (let i = 0; i < chosenDesignTshirtColors.length; i++) {
        chosenDesignTshirtColors[i].hidden = false;
    };
});

// Register for Activities
const activities = document.getElementById('activities-box');
const activitiesCost = document.getElementById('activities-cost');
const activitiesCheckboxes = document.querySelectorAll('input[type="checkbox"]');
let totalCost = parseInt(activitiesCost.innerText.split(': $')[1]);
let totalActivities = 0;

// Check for any activity conflicts. 
// For example: attendee cannot attend both the Node.js and Build Tools workshop at the same time (Tuesday 1pm - 4pm).
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
    if (!isRegisteredForActivities()) {
        event.preventDefault();
        applyNotValidStyles(activities);
    } else {
        applyValidStyles(activities);
    }
    activitiesCost.innerText = `Total: $${totalCost}`;
});

// Accessibility of Activities Fieldset
// Note: Checkbox can be checked/unchecked via space bar
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener('focus', (event) => {
        const checkbox = event.target;
        const checkboxLabel = checkbox.parentElement;
        checkboxLabel.classList.add('focus');
    });

    // Real-time error messaging for Activities Fieldset
    activitiesCheckboxes[i].addEventListener('blur', (event) => {
        const checkbox = event.target;
        const checkboxLabel = checkbox.parentElement;
        checkboxLabel.classList.remove('focus');
        fieldValidation(activities, event);
    });
}

// Payment Info
const payment = document.getElementById('payment');
const paymentOptions = document.querySelectorAll('#payment option');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

for (let i = 0; i < paymentOptions.length; i++) {
    if (paymentOptions[i].value === 'credit-card') {
        paymentOptions[i].setAttribute('selected', true);
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

// Form Validation Helper Functions
const form = document.querySelector('form');
const emailField = document.getElementById('email');
let errorMessage = '';

function isValidName(name) {
    return /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);
};

function isValidEmail(email) {
    if (!email) {
        errorMessage = 'Please enter in an email address.'
        return false;
    } else {
        if (!/^[^@]+@[^@.]+\.[a-z]+.[a-z]+$/i.test(email)) {
            errorMessage = 'A valid email address must contain prefix, @ symbol and domain, e.g. alex@example.com.'
            return false;
        } else {
            return true;
        }
    }
}

function isRegisteredForActivities() {
    return totalActivities > 0;
}

const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// Credit Card Number must contain 13 - 16 digits with no dashes or spaces
function isValidCreditCardNumber(number) {
    if (!number) {
        errorMessage = 'Please enter in a credit card number.'
        return false;
    } else {
        if (/^\d+\s+|\s+$/.test(number)) {
            errorMessage = 'A valid credit card number does not contain spaces.'
            return false;
        } else if (/^\D+$/.test(number)) {
            errorMessage = 'A valid credit card number does not contain letters or special characters.'
            return false;
        } else if (!/^\d{13,16}$/.test(number)) {
            errorMessage = 'A valid credit card number is between 13 and 16 digits.'
            return false;
        } else {
            return true;
        }
    }
}

// Zip code field must contain a 5 digit number
function isValidZipCode(zip) {
    if (!zip) {
        errorMessage = "Please enter in your zip code."
        return false;
    } else {
        if (!/^\d{5}$/.test(zip)) {
            errorMessage = 'A valid zip code is 5 digits.'
            return false;
        } else {
            return true;
        }
    }
}

// CVV field must contain a 3 digit number
function isValidCVV(cvv) {
    if (!cvv) {
        errorMessage = "Please enter in a valid CVV."
        return false;
    } else {
        if (!/^\d{3}$/.test(cvv)) {
            errorMessage = "A valid CVV is 3 digits. A CVV can usually be found at the back of your credit card, in the signature box."
            return false;
        } else {
            return true;
        }
    }
}

function applyNotValidStyles(field, errorMessage = '') {
    field.parentElement.classList.add('not-valid');
    field.parentElement.classList.remove('valid');
    if (errorMessage) {
        field.parentElement.lastElementChild.innerText = errorMessage;
    }
    // Display Hint/Error Message
    field.parentElement.lastElementChild.style.display = 'block';
}

function applyValidStyles(field) {
    field.parentElement.classList.add('valid');
    field.parentElement.classList.remove('not-valid');
    field.parentElement.lastElementChild.style.display = 'none';
}

function fieldValidation(field, event) {
    switch (field) {
        case nameField:
            if (!isValidName(nameField.value)) {
                event.preventDefault();
                applyNotValidStyles(field);
            } else {
                applyValidStyles(field);
            }
            break;
        case emailField:
            if (!isValidEmail(emailField.value)) {
                event.preventDefault();
                applyNotValidStyles(emailField, errorMessage);
            } else {
                applyValidStyles(emailField);
            }
            break;
        case activities:
            if (!isRegisteredForActivities()) {
                event.preventDefault();
                applyNotValidStyles(activities);
            } else {
                applyValidStyles(activities);
            }
            break;
        case creditCardNumber:
            if (!isValidCreditCardNumber(creditCardNumber.value)) {
                event.preventDefault();
                applyNotValidStyles(creditCardNumber, errorMessage);
            } else {
                applyValidStyles(creditCardNumber);
            }
            break;
        case zipCode:
            if (!isValidZipCode(zipCode.value)) {
                event.preventDefault();
                applyNotValidStyles(zipCode, errorMessage);
            } else {
                applyValidStyles(zipCode);
            }
            break;
        case cvv:
            if (!isValidCVV(cvv.value)) {
                event.preventDefault();
                applyNotValidStyles(cvv, errorMessage);
            } else {
                applyValidStyles(cvv);
            }
            break;
        default:
            throw new Error('Invalid field passed in to fieldValidation function.');
    }
}

// Real-time Validation/Error Messaging
const fieldEventListeners = ['keyup', 'blur'];
for (let i = 0; i < fieldEventListeners.length; i++) {
    nameField.addEventListener(fieldEventListeners[i], (event) => {
        fieldValidation(nameField, event);
    });

    emailField.addEventListener(fieldEventListeners[i], (event) => {
        fieldValidation(emailField, event);
    });

    creditCardNumber.addEventListener(fieldEventListeners[i], (event) => {
        fieldValidation(creditCardNumber, event);
    });

    zipCode.addEventListener(fieldEventListeners[i], (event) => {
        fieldValidation(zipCode, event);
    });

    cvv.addEventListener(fieldEventListeners[i], (event) => {
        fieldValidation(cvv, event);
    });
}

// Form Validation on Submit
form.addEventListener('submit', (event) => {
    fieldValidation(nameField, event);
    fieldValidation(emailField, event);
    fieldValidation(activities, event);
    if (payment.value === 'credit-card') {
        fieldValidation(creditCardNumber, event);
        fieldValidation(zipCode, event);
        fieldValidation(cvv, event);
    }
});