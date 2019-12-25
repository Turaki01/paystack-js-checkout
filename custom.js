// register user model
const user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    organization: '',
    designation: ''
}

//variables for the register form and confirmation
const register_form = document.querySelector('#form-section');
const confirmation = document.querySelector('#confirmation');


//paystack callback function
const payOutWithPayStack = function () {
    var handler = PaystackPop.setup({
        key: 'pk_test_beeb14d152d4660cf9d84c913145528f6363df95',
        email: user.email,
        amount: 500000,
        currency: "NGN",
        metadata: {
            custom_fields: [
                {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: user.phoneNumber,
            }
        ]
        },
        callback: function (response) {
            alert('success. transaction ref is ' + response.reference);
            window.location = 'https://hrexpo2020.7thavenue.com.ng/'
        },
        onClose: function () {
            alert('window closed');
        }
    });
    handler.openIframe();
};


// event listener on the form
document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (e) {
        // assigning values to the model from the form
        user.firstName = e.target.elements.firstName.value;
        user.lastName = e.target.elements.lastName.value;
        user.email = e.target.elements.email.value;
        user.phoneNumber = e.target.elements.phoneNumber.value;
        user.organization = e.target.elements.organization.value;
        user.designation = e.target.elements.designation.value;

        // hiding and showing confirmation page
        register_form.classList.add('d-none');
        register_form.classList.remove('d-block')
        confirmation.classList.remove('d-none');
        confirmation.classList.add('d-block')
        
    }

    // payOutWithPayStack();
});


//function to make payment
const makePayment = function () {
    payOutWithPayStack();
}


//function to cancel payment request
const cancelPayment = function() {
    register_form.classList.remove('d-none');
    register_form.classList.add('d-block');
    confirmation.classList.add('d-none');
    confirmation.classList.remove('d-block')
}