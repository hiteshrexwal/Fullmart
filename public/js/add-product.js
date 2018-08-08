let name, price, img, card, imagecard, namecard, pricecard,category,exist, file;
let valid=false;
let submit={
    name:false,
    price:false,
    img:false,
    category:false
}
$(function () {
    imagecard = $('#imageDetail');
    namecard = $('#nameDetail');
    pricecard = $('#priceDetail');
    category = $('#category');
    imagecard.empty();
    namecard.empty();
    pricecard.empty();
    $('')
    $.get(
        '/api/menu/',
        function (items) {
            //console.log(items);
            
            //console.log(category);
            category.empty();
            category.append('<option selected>Choose...</option>');
            for (let i = 0; i < items.length; i++) {
                category.append($('<option>', {
                    value: i + 1,
                    text: items[i].name
                }));
                //console.log(items[i].name)
            }
        }
    )
     name = $('#name');
     price = $('#price');
     img = $('#img');
    name.on('input', function () {
        //console.log(name.val());
        namecard.text(name.val());
        name.removeClass("is-invalid");
    });
    name.focusout('input', function () {
        if (name.val().length == 0) {
            name.addClass("is-invalid");
        }
    });
    price.on('input', function () {
        //console.log(name.val());
        if (price.val().length == 0) {
            pricecard.text('');
        } else {
            pricecard.text(`Rs. ${price.val()}`);
        }
        price.removeClass("is-invalid");

    });
    price.focusout('input', function () {
        if (price.val().length == 0) {
            price.addClass("is-invalid");
        }
    });

    /*img.focusout('input', function () {
        //console.log(url.val());
        if($("#file").val() == ''){
        }
        if (url.val().length == 0) {
            url.addClass("is-invalid");
        }
        imagecard.empty();
        imagecard.append(`<img class="card-img-top" src="${url.val()}" alt="Product image" id="image">`);
        // Sample usage
        var imageUrl = `http://localhost:2400${url.val()}`;
        imageExists(imageUrl, function (exists) {
            exist=exists;
            if(!exists){
                url.addClass("is-invalid");
            }
        });

    });
    url.on('input', function () {
        url.removeClass("is-invalid");
    });*/

    category.focusout('input', function () {
        //console.log(category.val());
        if(category.val()>0){
            category.removeClass("is-invalid");
            console.log("Seleted");
        }
        else{
            console.log("Not Seleted");
            category.addClass("is-invalid");
        }
    });

    $('input[type="file"]').change(function(e){
        file = e.target.files[0];
        let ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
        for(let i=0;i<3;i++){
            if(file.type===ValidImageTypes[i]){
                readURL(this);
                valid=true;
                break;
            }
        }
        if(!valid){
            $('#imageFeedback').text('Please add an image file');
            img.addClass("is-invalid");
        }else{
            img.removeClass("is-invalid");
        }


    });


})
function readURL(input) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        imagecard.empty();
        imagecard.append(`<img class="card-img-top" src="${e.target.result}" alt="Product image" id="image">`);
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }

function saveProduct(){
    if(name.val().length >0){
        submit.name=true;
    }
    else{
        submit.name=false;
        name.addClass("is-invalid");
    }

    if(price.val().length >0 && !isNaN(price.val())){
        //console.log(isNaN(price.val()));
        submit.price=true;
    }
    else{
        if(isNaN(price.val())){
            $('#price-valid').text("The price is not a no!");
        }
        else{
            $('#price-valid').text("Enter price!");
        }
        submit.price=false;
        price.addClass("is-invalid");
    }

    if(img.val() == ''){
        submit.img=false;
        $('#imageFeedback').text('Select Image File');
        img.addClass("is-invalid");
    }
    else{
        if(valid){
            submit.img=true;
            img.removeClass("is-invalid");
        }
        else{
            submit.img=false;
        }
        
    }

    if(category.val()>0){
        submit.category=true;
    }
    else{
        submit.category=false;
        category.addClass("is-invalid");
    }
    if(submit.name && submit.price && submit.img && submit.category){
        var formData = new FormData();
        formData.append('productimage',file);
        console.log(formData.get('productimage'));
        console.log(file);
        $.ajax({
            url: 'http://localhost:2400/api/upload/',
            data: formData,
            processData: false,
            type: 'POST',
            contentType: false,
            success: function(r){
                console.log(r)
                $.post(
                    '/api/product/',
                    {name:name.val(),
                     price:price.val(),
                     imageUrl:`/assests/${r}`,
                     menuId:category.val()},
                    function(items){
                        console.log(items);
                        var url = "http://localhost:2400";
                        $(location).attr('href',url);
                    }        ) 
            },
            error: function (e) {
                console.log("some error", e);
            }
        });
        
    }
    console.log(submit);
}