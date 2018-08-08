let cartItems = [];
let cartDetails;
let name,address1,address2,city;
let orderDetail="";
let submit={
    name:false,
    address1:false,
    address2:false,
    city:false
}
$(function () {
    name=$('#name');
    address1=$('#address1')
    address2=$('#address2')
    city=$('#city')
    if ($.cookie("cart")) {
        cartItems = JSON.parse($.cookie("cart"));
    }
    if (cartItems.length === 0) {
        var url = "http://localhost:2400/";
        $(location).attr('href', url);
    }
    cartDetails = $('#cartDetails');
    cartDetails.empty();
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        cartDetails.append(`<tr>
                    <td>${cartItems[i].count} x ${cartItems[i].name}</td>
                    <td>${cartItems[i].count*cartItems[i].price}</td>
         </tr>`)
        total += cartItems[i].count * cartItems[i].price;
        orderDetail+=cartItems[i].count+"x"+cartItems[i].name+"   ";
    }
    cartDetails.append(`<tr>
                    <td><strong>Total</strong></td>
                    <td>${total}</td>
         </tr>`);

    name.on('input', function () {
        name.removeClass("is-invalid");
    });
    name.focusout('input', function () {
        if (name.val().length == 0) {
            name.addClass("is-invalid");
        }
    });

    address1.on('input', function () {
        address1.removeClass("is-invalid");
    });
    address1.focusout('input', function () {
        if (address1.val().length == 0) {
            address1.addClass("is-invalid");
        }
    });

    address2.on('input', function () {
        address2.removeClass("is-invalid");
    });
    address2.focusout('input', function () {
        if (address2.val().length == 0) {
            address2.addClass("is-invalid");
        }
    });

    city.on('input', function () {
        city.removeClass("is-invalid");
    });
    city.focusout('input', function () {
        if (city.val().length == 0) {
            city.addClass("is-invalid");
        }
    });

});

function saveProduct(){
    if(name.val().length >0){
        submit.name=true;
    }
    else{
        submit.name=false;
        name.addClass("is-invalid");
    }

    if(address1.val().length >0){
        submit.address1=true;
    }
    else{
        submit.address1=false;
        address1.addClass("is-invalid");
    }

    if(address2.val().length >0){
        submit.address2=true;
    }
    else{
        submit.address2=false;
        address2.addClass("is-invalid");
    }

    if(city.val().length >0){
        submit.city=true;
    }
    else{
        submit.city=false;
        city.addClass("is-invalid");
    }
    if(submit.name && submit.address1 && submit.address2 && submit.city){
        $.post(
            '/api/order/',
            {name:name.val(),
             address:address1.val()+address2.val(),
             city:city.val(),
             orderDetails:orderDetail},
            function(items){
                console.log(items);
                var url = "http://localhost:2400";
                $(location).attr('href',url);
            }        ) 
    }
    console.log(submit);
}