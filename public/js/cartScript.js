let cartItems = [];
let table;
$(function () {
    if ($.cookie("cart")) {
        cartItems = JSON.parse($.cookie("cart"));
    }
    $('#totalItem').text(`You Have ${cartItems.length} items in your Shopping Cart`);
    table = $('#table');
    console.log(cartItems);
    for (let i = 0; i < cartItems.length; i++) {
        table.append(`<tr>
                    <th scope="row"><img src=${cartItems[i].imageUrl} height="80px" width="80px" style="border-radius: 50%;"></th>
                    <td>${cartItems[i].name}</td>
                    <td id="${cartItems[i].id}">
                        <button class="btn btn-secondary" onclick="removeitem(this)">-</button>
                        <span id="noOfItem" class="inline">We have ${cartItems[i].count} items in cart</span>
                        <button class="btn btn-secondary" onclick="additem(this)">+</button>
                    </td>
                    <td>${cartItems[i].count*cartItems[i].price}</td>
            </tr>`);
    }
});
function removeitem(item) {
    let id = $(item).parent().attr('id');
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            if (cartItems[i].count === 1) {
                $(item).parent().closest('tr').remove();
                cartItems.splice(i, 1);
                $('#totalItem').text(`You Have ${cartItems.length} items in your Shopping Cart`);
            } else {
                cartItems[i].count--;
                $(item).parent().children('.inline').text(`We have ${cartItems[i].count} items in cart`)
            }
            break;
        }
    }
    $.cookie("cart", JSON.stringify(cartItems));
}

function additem(item) {
    let id = $(item).parent().attr('id');
    //console.log(id);
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            cartItems[i].count++;
            $(item).parent().children('.inline').text(`We have ${cartItems[i].count} items in cart`)
            break;
        }
    }
    $.cookie("cart", JSON.stringify(cartItems));
}

function clearCart(){
    cartItems=[];
    $('#totalItem').text(`You Have ${cartItems.length} items in your Shopping Cart`);
    $.cookie("cart", JSON.stringify(cartItems));
    table.empty();
}

function checkout(){
    if(cartItems.length===0){
        alert("Please add items to Cart");
    }
    else{
        var url = "http://localhost:2400/shipping";
        $(location).attr('href',url);

    }
}