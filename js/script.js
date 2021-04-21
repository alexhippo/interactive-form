/*
* Treehouse Techdegree:
* FSJS Project 3 - Interactive Form
* Author: Alex Hipolito
* GitHub: @alexhippo
*/

//Initial focus on name field when you load the page
document.getElementById('name').focus();

//Job Role field
//Other Job Role field should be hidden by default
const otherJobRole = document.getElementById('other-job-role');
//@to-do: Ensure this is hidden from the start
otherJobRole.style.visibility = 'hidden';
document.getElementById('title').addEventListener('change', (event) => {
    if (event.target.value === 'other') {
        otherJobRole.style.visibility = 'visible';
    } else {
        otherJobRole.style.visbility = 'hidden';
    }
});