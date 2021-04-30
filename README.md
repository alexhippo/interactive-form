# Interactive Form

[View the demo](http://alexhippo.github.io/interactive-form).

This project demonstrates front-end vanilla Javascript client-side validation and web accessibility techniques through an interactive registration form for a fictional Full Stack Developer Conference. This project was created as part of the [Treehouse Full Stack Javascript Techdegree](https://teamtreehouse.com/techdegree/full-stack-javascript).

## Important to note
This is a form that does not submit details to a server. Please note that in the live demo form submission may result in an error.

## Real Time Validation/Error Messages
The following mandatory fields of the form have real-time validation (i.e. validates user input as it is typed in):
- Name (on keyup and blur)
- Email (on keyup and blur)
- Activities Fieldset/Checkboxes (on change and blur)
- Credit Card Number (on keyup and blur)
- Zipcode (on keyup and blur)
- CVV (on keyup and blur)

## Conditional Error Messaging
The following mandatory fields contain conditional error messaging:
- Email:
  - If the email address field is blank - "Please enter in an email" message is displayed.
  - If the email address entered is in an invalid format - "A valid email address must contain prefix, @ symbol and domain, e.g. alex@example.com." is displayed.
- Credit Card Number (if user has selected Credit Card as their payment option):
  - If the credit card number field is blank - "Please enter in a credit card number" message is displayed.
  - If the credit card number entered contains spaces - "A valid credit card number does not contain spaces." message is displayed
  - If the credit card number entered contains letters or special characters - "A valid credit card number does not contain letters or special characters." message is displayed
  - If the credit card number entered is in an invalid format - "A valid credit card number is between 13 and 16 digits." is displayed.
- Zip Code (if user has selected Credit Card as their payment option):
  - If the zip code field is blank - "Please enter in a zip code" message is displayed.
  - If the zip code entered is in an invalid format - "A valid zip code is 5 digits." is displayed.
- CVV (if user has selected Credit Card as their payment option):
  - If the CVV field is blank - "Please enter in a CVV" message is displayed.
  - If the CVV entered is in an invalid format - "A valid CVV is 3 digits. This usually can be found at the back of your credit card, in the signature box." message is displayed.

## Getting started
### Downloading
Click on the 'Clone or download' button and select 'Download Zip.'

### Installing
Step 1: Unzip the zip file.

Step 2: Open the folder in a text editor, such as VSCode.

Using a text editor, you can view/edit the code or preview the app in a browser.

