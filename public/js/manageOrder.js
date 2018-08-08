let index = 1;
let products;
let psortorder=-1,tsortorder=-1;
let current=0;
let pageno=1;
let totalpages;
let newdata;
$(function () {
    $.get(
        '/api/order/',
        function (items) {
            //console.log(para.text());
            //para.text(items);
            products=items;
            totalpages=Math.ceil(items.length/10);
            console.log(totalpages);
            showproductTable(items);
            console.log(items);
        }
    )
    
})

function showproductTable(items){
    totalpages=Math.ceil(items.length/10);
    let producttable = $('#producttable');
    //console.log(items.length);
    let results=$('#results');
    results.empty();
    let v;
    if(current+10>items.length){
       v=items.length;
    }
    else{
        v=current+10;
    }

    results.append(`Results ${v}/${items.length}`);
    producttable.empty();
    for (let i=current;i<items.length && i<current+10;i++) {
        producttable.append(`
        <tr>
        <th scope="row">${i+1}</th>
        <td>${items[i].name}</td>
        <td>${items[i].address}</td>
        <td>${items[i].orderDetails}</td>
        </tr>
    `)
        
    }
    let page=$('#pagination');
    page.empty();
    page.append(`<li class="page-item" id="previous">
                   <a class="page-link" onclick="goback()">Previous</a>
                 </li>`);
    console.log(pageno);
    if(pageno==1){
        $('#previous').addClass('disabled');
    }
    for(let i=pageno-1;i<=totalpages && i<=pageno+3;i++){
        if(i==0)
         continue;
        if(i==pageno){
            page.append(`<li class="page-item  active">
                  <a class="page-link" onclick="goToPage(this)">${i}</a>
                 </li>`);
            continue;
        }
        page.append(`<li class="page-item">
                  <a class="page-link" onclick="goToPage(this)">${i}</a>
                 </li>`);
    }
    page.append(`<li class="page-item" id="next">
                    <a class="page-link" onclick="gonext()">Next</a>
                 </li>`);
    if(pageno==totalpages||v===0){
        $('#next').addClass('disabled');
    }
    
}

function goToPage(p){
  //console.log(p.text);
  pageno=parseInt(p.text);
  current=(pageno-1)*10;
  showproductTable(products);
}

function gonext(){
    pageno=parseInt($('#pagination').children('.active').text())+1;
    current=(pageno-1)*10;
    showproductTable(products);
}
function goback(){
    pageno=parseInt($('#pagination').children('.active').text())-1;
    current=(pageno-1)*10;
    showproductTable(products);
}
