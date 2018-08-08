let index = 1;
let cartItems = [];
$(function () {
    if($.cookie("cart")){
        cartItems=JSON.parse($.cookie("cart"));
    }
    
    console.log(cartItems);
    $.get(
        '/api/menu/',
        function (items) {
            //console.log(para.text());
            //para.text(items);
            let category = $('#categories');
            category.empty();
            for (i of items) {
                if (i.id == 1) {
                    category.append(`
                   <li class="list-group-item active" onclick="showproducts(this,'${i.id}')">${i.name}</li>
                `)
                } else {
                    category.append(`
                   <li class="list-group-item" onclick="showproducts(this,'${i.id}')">${i.name}</li>
                `)
                }
            }
            getproducts(1);
            console.log(items);
        }
    )
})

function showproducts(listItem, id) {
    console.log(id);

    $(listItem).parent("#categories").children('.active').removeClass("active");
    //console.log($(listItem).parent("#categories").children('.active'));
    $(listItem).closest("li").addClass("active");
    getproducts(id);

}

function getproducts(id) {
    $.get(
        `/api/product/${id}`,
        function (items) {
            let product = $('#prod');
            product.empty();
            for (let i = 0; i < items.length; i += 2) {
                if (i + 1 < items.length) {
                    product.append(`<div class="row">
                                <div class="col-6">
                                    <div class="card" style="width: 18rem;" id="item${items[i].id}">
                                        <img class="card-img-top" src="${items[i].imageUrl}" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${items[i].name}</h5>
                                            <p class="card-text">${items[i].price}</p>
                                            <div>
                                               <button class="btn btn-primary" onclick="addTOCart(this)">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="card" style="width: 18rem;" id="item${items[i+1].id}">
                                        <img class="card-img-top" src="${items[i+1].imageUrl}" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${items[i+1].name}</h5>
                                            <p class="card-text">${items[i+1].price}</p>
                                            <div>
                                               <button class="btn btn-primary" onclick="addTOCart(this)">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
                } else {
                    product.append(`<div class="row">
                    <div class="col-6">
                        <div class="card" style="width: 18rem;" id="item${items[i].id}">
                            <img class="card-img-top" src="${items[i].imageUrl}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${items[i].name}</h5>
                                <p class="card-text">${items[i].price}</p>
                                <div>
                                   <button class="btn btn-primary" onclick="addTOCart(this)">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`);

                }

            }
        }
    );
}

function addTOCart(item) {
    let parent=$(item).parent().parent().parent();
    let id = parent.attr('id');
    //console.log(id);
    let exist=false;
    for(let i=0;i<cartItems.length;i++){
        if(cartItems[i].id===id){
            cartItems[i].count++;
            exist=cartItems[i].count;
            break;
        }
    }
    if(!exist){
        cartItems.push({
            id: id,
            imageUrl:parent.children('.card-img-top').attr('src'),
            name:$(item).parent().parent().children('.card-title').text(),
            price:$(item).parent().parent().children('.card-text').text(),
            count: 1
        });
    }
    
    //console.log(cartItems);
    if(!exist){
        $(item).parent().empty().append(`<button class="btn btn-secondary" onclick="removeitem(this)">-</button>
                                     <span class="inline">${1} item added</span>
                                     <button class="btn btn-secondary" onclick="additem(this)">+</button>`);
    }
    else{
        $(item).parent().empty().append(`<button class="btn btn-secondary" onclick="removeitem(this)">-</button>
                                          <span class="inline">${exist} item added</span>
                                          <button class="btn btn-secondary" onclick="additem(this)">+</button>`);
    }
    
    $.cookie("cart", JSON.stringify(cartItems));
}

function removeitem(item) {
    let id = $(item).parent().parent().parent().attr('id');
    //console.log($(item).parent().children('.inline').text('New Text'))
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            if (cartItems[i].count === 1) {
                $(item).parent().empty().append(`<button class="btn btn-primary" onclick="addTOCart(this)">Add to Cart</button>`);
                cartItems.splice(i, 1);
            } else {
                cartItems[i].count--;
                $(item).parent().children('.inline').text(`${cartItems[i].count} item added`)
            }
            break;
        }
    }
    $.cookie("cart", JSON.stringify(cartItems));
}

function additem(item) {
    let id = $(item).parent().parent().parent().attr('id');
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            cartItems[i].count++;
            $(item).parent().children('.inline').text(`${cartItems[i].count} item added`)
            break;
        }
    }
    $.cookie("cart", JSON.stringify(cartItems));
}
