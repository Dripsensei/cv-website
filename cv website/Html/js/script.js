window.onload = function () {
    console.log("Hello from Javascript")

    let form = document.getElementById("submit"); // gets the things in the form 
    let email_pass1 = form.email;
    let email_pass2 = form.confirm_email;

}

// Basically checks if the email and date are valid and then they can submit the form
function validateForm(){
    if (!checkEmails()){
        return false
    }
    if (!checkDate()){
        return false
    }

    return true
}

function checkEmails(){
    let form = document.getElementById("submit");
    let email_pass1 = form.email;
    let email_pass2 = form.confirm_email;

    if(email_pass1.value !== email_pass2.value){
        alert("Emails do not match ");
        return false
    } // Checks if the emails match each other
    return true;

}

function checkDate(){
   let form = document.getElementById("submit"); 
   let startDateValue = form.start_date.value;
   let durationValue = form.duration.value;
// Checks wether the 2 values are empty
   if (startDateValue === ""  ||  durationValue === ""){
    alert("Please select a start date and duration");
    return false;
   }

   let startDate = new Date(startDateValue);
    let tommorow = new Date();
    tommorow.setHours(0, 0, 0, 0);
    tommorow.setDate(tommorow.getDate() + 1);

    // Checks date is 1 day in the future
    if (startDate < tommorow) {
        alert("Start date has to be 1 day in the future");
        return false;
    }

    // Checks duration is valid
    if (durationValue < 1) {
        alert("Duration must be at least 1 day");
        return false;
    }

    return true;
}

function showConfirmation(event) {
  event.preventDefault(); // stops the form from submitting so we can show the pop up first
  let form = document.getElementById("submit");
  
  
  if (!validateForm()) {
    return false; // Stops if the validation fails 
  }
  
  // Gets the form values for the confirmation popup
  let fullname = form.fullname.value;
  let email = form.email.value;
  let phone = form.phonenumber.value;
  
  // Gets the radio button value for contact preference
  let contactRadio = form.rdo;
  let contactPref = 'Not specified';
  for (let i = 0; i < contactRadio.length; i++) {
    if (contactRadio[i].checked) {
      contactPref = contactRadio[i].value;
      break;
    }
  }
  
  // Gets the textarea value
  let enquiry = form["user-input"].value;
  
  // Gets the date and duration
  const startDateInput = form.start_date.value;
  let startDate = '';
  if (startDateInput) {
    startDate = startDateInput.value;
  }
 let duration = form.duration.value;
  
  // Formats the date for display
  let showDate = startDate;
  if (startDate) {
    try {
      let dateObj = new Date(startDate);
      showDate = dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      displayDate = startDate; // Uses the startDate value if formatting fails
    }
  } else {
    displayDate = 'Not specified';
  }
  
  // Makes the input text 150 characters for the confirmation popup and checks if theres nothing in the text area
  let showEnquiry = enquiry;
  if (enquiry && enquiry.length > 150) {
    showEnquiry = enquiry.substring(0, 150) + '...';
  } else if (!enquiry || !enquiry.trim()) {
    showEnquiry = 'Not provided';
  }
  
  // Creates confirmation message with my email
  let message = "COMMISSION REQUEST\n\n" +
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
"TO: 240233187@aston.ac.uk (Takunda Mudzinganyama)\n\n" +
"FROM: " + (fullname || 'Not provided') + "\n" +
"EMAIL: " + (email || 'Not provided') + "\n" +
"PHONE: " + (phone || 'Not provided') + "\n\n" +
"How to contact you: " + contactPref + "\n\n" +
"Specific enquiry:\n" + showEnquiry + "\n\n" +
"Timeline:\n" +
"Start Date: " + showDate + "\n" +
"Duration: " + (duration || 'Not specified') + " days\n" +
"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n" +
"Send this commission\n" +
"Click OK to send.";

  
  // Shows the confirmation popup
  let userConfirmed = confirm(message);
  
  if (userConfirmed) {
    // User confirmed - submit the form normally
    // The form action will handle the submission
    return true;
  } else {
    // User cancelled - don't submit
    alert('Commission request not sent. You can make changes if needed.');
    return false;
  }
}