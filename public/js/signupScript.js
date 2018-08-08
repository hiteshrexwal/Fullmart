let email, password,firstName,lastName,confirmPassword;
$(function () {
    email = $('#inputEmail');
    emailFeedback= $('#emailFeedback');
    password = $('#inputPassword');
    firstName=$('#firstName');
    lastName=$('#lastName');
    confirmPassword=$('#confirmPassword')
    firstName.on('input', function () {
        //console.log(name.val());
        firstName.removeClass("is-invalid");
    });
    firstName.focusout('input', function () {
        if (firstName.val().length === 0) {
            firstName.addClass("is-invalid");
        }
    });
    lastName.on('input', function () {
        //console.log(name.val());
        lastName.removeClass("is-invalid");
    });
    lastName.focusout('input', function () {
        if (lastName.val().length === 0) {
            lastName.addClass("is-invalid");
        }
    });
    confirmPassword.on('input', function () {
        //console.log(name.val());
        confirmPassword.removeClass("is-invalid");
    });
    confirmPassword.focusout('input', function () {
        if (confirmPassword.val().length === 0) {
            $('#confirmFeedback').text('Enter the password again!');
            confirmPassword.addClass("is-invalid");
        }
        else if(confirmPassword.val()!==password.val()){
            $('#confirmFeedback').text('password do not match!');
            confirmPassword.addClass("is-invalid");
        }
    });
    email.on('input', function () {
        //console.log(name.val());
        email.removeClass("is-invalid");
    });
    email.focusout('input', function () {
        if (email.val().length === 0) {
            emailFeedback.text('Enter the Email!'); 
            email.addClass("is-invalid"); 
        }
        else if(!isEmail(email.val())){
            emailFeedback.text('Please enter email properly!');
            email.addClass("is-invalid");
        }
        
    });
    password.on('input', function () {
        //console.log(name.val());
        password.removeClass("is-invalid");
    });
    password.focusout('input', function () {
        if (password.val().length === 0) {
            password.addClass("is-invalid");
        }
    });
})


function login() {
    if(email.val().length===0){
        emailFeedback.text('Enter the Email!');
        email.addClass("is-invalid");
    }
    if(password.val().length===0){
        password.addClass("is-invalid");
    }
    if(firstName.val().length===0){
        firstName.addClass("is-invalid");
    }
    if(lastName.val().length===0){
        lastName.addClass("is-invalid");
    }
    if(confirmPassword.val().length===0){
        $('#confirmFeedback').text('Enter the password again!');
        confirmPassword.addClass("is-invalid");
    }
    if (isEmail(email.val()) && password.val().length>8 && firstName.val().length!==0 && lastName.val().length!==0 && confirmPassword.val()===password.val()) {
        console.log(email.val());
        console.log(password.val());
        $.post(
            '/signup', {
                username: email.val(),
                password: password.val(),
                firstname:firstName.val(),
                lastname:lastName.val()
            },
            function (data) {
                console.log(data);
                    if(data==='err'){
                       console.log('err');
                    }
                    else{
                        var url = "http://localhost:2400"+data;
                        $(location).attr('href', url);
                    }
            }
        )
    }
}

function isEmail(e) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(e);
}