window.onload = function () {
    console.log("Hello from Javascript")

    let form = document.getElementById("submit");
    let email_pass1 = form.email;
    let email_pass2 = form.confirm_email;

}


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
    }
    return true;

}

function checkDate(){
   let form = document.getElementById("submit"); 
   let startDateValue = form.start_date.value;
   let durationValue = form.duration.value;

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
  event.preventDefault(); // stops the form from submitting immediately
  
  
  if (!validateForm()) {
    return false; // Stops if the validation fails 
  }
  
  // Get the form values for the confirmation popup
  const fullname = document.querySelector('input[name="fullname"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="phonenumber"]').value;
  
  // Gets the radio button value for contact preference
  const contactRadio = document.querySelector('input[name="rdo"]:checked');
  const contactPref = contactRadio ? contactRadio.value : 'Not specified';
  
  // Gets the textarea value
  const enquiry = document.querySelector('textarea[name="user-input"]').value;
  
  // Gets the date and duration
  const startDateInput = document.querySelector('input[name="start_date"]');
  const startDate = startDateInput ? startDateInput.value : '';
  const duration = document.querySelector('input[name="duration"]').value;
  
  // Formats the date for display
  let displayDate = startDate;
  if (startDate) {
    try {
      const dateObj = new Date(startDate);
      displayDate = dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      displayDate = startDate; // Use raw value if formatting fails
    }
  } else {
    displayDate = 'Not specified';
  }
  
  // Truncate long enquiry for the popup
  let displayEnquiry = enquiry;
  if (enquiry && enquiry.length > 100) {
    displayEnquiry = enquiry.substring(0, 100) + '...';
  } else if (!enquiry || !enquiry.trim()) {
    displayEnquiry = 'Not provided';
  }
  
  // Create confirmation message with your email
  const message = `📋 COMMISSION REQUEST SUMMARY\n
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TO: 240233187@aston.ac.uk (Takunda Mudzinganyama)

FROM: ${fullname || 'Not provided'}
EMAIL: ${email || 'Not provided'}
PHONE: ${phone || 'Not provided'}

CONTACT PREFERENCE: ${contactPref}

ENQUIRY:
${displayEnquiry}

TIMELINE:
Start Date: ${displayDate}
Duration: ${duration || 'Not specified'} days
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Send this commission request to Takunda?
Click OK to send, Cancel to review.`;
  
  // Show confirmation popup
  const userConfirmed = confirm(message);
  
  if (userConfirmed) {
    // User confirmed - submit the form normally
    // Your form action will handle the submission
    return true;
  } else {
    // User cancelled - don't submit
    alert('Commission request not sent. You can make changes if needed.');
    return false;
  }
}