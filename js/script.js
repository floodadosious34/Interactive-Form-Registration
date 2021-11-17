
// Section #3. Name Input to go into focus on load
document.getElementById('name').focus();

// Section #4. Job Role section. Make other text box hidden on default. Only appear when other selection is chosen.
const otherField = document.getElementById('other-job-role');
otherField.style.display = 'none';
const jobField = document.getElementById('title');

jobField.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherField.style.display = 'block';
    } else {
        otherField.style.display = 'none';
    }
});

// Section #5. T-shir info section. Disable color options until design is chosen. Make sure the color option display according to the selected design.
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const colorOptions = document.querySelectorAll('#color option');
console.log(designSelect);

colorSelect.disabled = true;

designSelect.addEventListener('change', (e) => {
    colorSelect.disabled = false;
   for (let i=0; i < colorSelect.length; i++) {
       const options = colorOptions[i];
       const chosen = e.target.value;
       if (chosen !== options.dataset.theme) {
            options.hidden = true;
       } else {
           options.selected = true;
           options.hidden = false;
       }
   }
    
});

// Section #6 Program the fieldset register for activities to listen for checked boxes and update total cost element

const selection = document.getElementById('activities');
const checkboxes = document.querySelectorAll('.activities input');
const totalElement = document.getElementById('activities-cost');

selection.addEventListener('change', e => {
    const clicked = e.target;
    const clickedPrice = clicked.getAttribute('data-cost');
    const clickedType = clicked.getAttribute('name');
    let total = 0;
    
    for (let i = 0; i < checkboxes.length; i++) {
        const price = checkboxes[i].getAttribute('data-cost');
        const name = checkboxes[i].getAttribute('name');
        const checker = checkboxes[i].checked;
        if (checker) {
            total += parseInt(price);
            console.log(total);
        }
    }
    console.log(total);
    totalElement.textContent = `Total: $${total}`
})

// // Section #7 Credit Card payment option should be selected by default and options not
// // connected to it should be hidden.


const paymentMethods = ['credit-card', 'paypal', 'bitcoin'];

const paymentOptions = document.getElementById('payment');
paymentOptions.options[1].selected = true;

paymentMethods.filter(method => method != 'credit-card').forEach(method => document.querySelector(`#${method}`).style.display = 'none');

paymentOptions.addEventListener('change', function () {
    document.querySelector(`#${this.value}`).style.display = 'block';
    paymentMethods.filter(method => method != this.value).forEach(method => document.querySelector(`#${method}`).style.display = 'none');
});

// Section #8 Form Validation

const form = document.querySelector('form');
const nameElement = document.querySelector('#name');
const email = document.querySelector('#email');
const activitiesFieldset = document.querySelector('#activities legend');
const expMonth = document.getElementById('exp-month')
const expYear = document.getElementById('exp-year');
const ccNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvvNumber = document.querySelector('#cvv');

let activitiesTotal = 0;

selection.addEventListener('change', e => {
    (e.target.checked) ? activitiesTotal++ : activitiesTotal--;
});

const nameValidator = () => {
    const nameValue = nameElement.value;
    const nameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    return nameValid;
};

const emailValidator = () => {
    const emailValue = email.value;
    const emailValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailValid;
};

const activitiesValidator = () => {
    const activitiesValid = activitiesTotal > 0;
    return activitiesValid;
};

function expYearValidator(element) {
    if (element[0].selected) {
        element.parentElement.className = 'not-valid';
        element.parentElement.classList.remove('valid');
    } else {
        element.parentElement.className = 'valid';
        element.parentElement.classList.remove('not-valid');
    }
}

const ccNumberValidator = () => {
    const cc = ccNumber.value;
    const number = /^\d{13,16}$/.test(cc);
    if (!number) {
        validationFail(ccNumber);
    } else {
        validationPass(ccNumber);
    }
    return number;
};

const zipCodeValidator = () => {
    const zip = zipCode.value;
    const zipValid = /^\d{5}$/.test(zip);
    if (!zipValid) {
        validationFail(zipCode);
    } else {
        validationPass(zipCode);
    }
    return zipValid;
}

const cvvNumberValidator = () => {
    const cvv = cvvNumber.value;
    const cvvValid = /^\d{3}$/.test(cvv);
    if (!cvvValid) {
        validationFail(cvvNumber);
    } else {
        validationPass(cvvNumber);
    }
    return cvvValid;
}

// Helper Validation Functions
function validationFail(element) {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

function validationPass(element) {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = '';
}

// Submit form listener with call to helper functions
form.addEventListener('submit', e => {
    nameValidator();
    emailValidator();
    activitiesValidator();
   
    if (!nameValidator()) {
        e.preventDefault();
        validationFail(nameElement);
      } else {
          validationPass(nameElement);
      }

      if (!emailValidator()) {
          e.preventDefault();
          validationFail(email);
      } else {
          validationPass(email);
      }

      if (!activitiesValidator()) {
          e.preventDefault();
        validationFail(activitiesFieldset);
      } else {
         validationPass(activitiesFieldset);
      }

      if (paymentOptions.options[1].selected) {
        expYearValidator(expMonth);
        expYearValidator(expYear);
        ccNumberValidator();
        zipCodeValidator();
        cvvNumberValidator();

        if (!ccNumberValidator()) {
            e.preventDefault();
        }
        if (!zipCodeValidator()) {
            e.preventDefault();
        }
        if (!cvvNumberValidator()) {
            e.preventDefault();
        }
      }
      
});

// Section #9 Accessibility

selection.addEventListener('focus', e => {
    e.target.parentElement.className = 'focus';
}, true);

selection.addEventListener('blur', e => {
    e.target.parentElement.classList.remove('focus');
}, true);


