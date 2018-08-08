let email, password;
$(function () {
    email = $('#inputEmail');
    emailFeedback= $('#emailFeedback');
    password = $('#inputPassword');
    email.on('input', function () {
        //console.log(name.val());
        email.removeClass("is-invalid");
    });
    email.focusout('input', function () {
        if (email.val().length == 0) {
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
        if (password.val().length == 0) {
            password.addClass("is-invalid");
        }
    });
})


function login() {
    if(email.val().length==0){
        emailFeedback.text('Enter the Email!');
        email.addClass("is-invalid");
    }
    if(password.val().length==0){
        password.addClass("is-invalid");
    }
    if (isEmail(email.val()) && password.val().length>8) {
        console.log(email.val());
        console.log(password.val());
        $.post(
            '/login', {
                username: email.val(),
                password: password.val(),
            },
            function (items) {
                console.log(items);
                if (!items) {
                    alert("Username \ password is wrong")

                } else {
                    var url = "http://localhost:2400/";
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