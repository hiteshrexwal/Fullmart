let index = 1;
let products;
let psortorder=-1,tsortorder=-1;
let current=0;
let pageno=1;
let totalpages;
let newdata;
$(function () {
    $.get(
        '/api/product/',
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
    $('#search').on('input', function() {
        let filteredData=products.filter((p)=>{
            return p.name.toLowerCase().includes($('#search').val().toLowerCase());
        });
        showproductTable(filteredData);
        //console.log(filteredData);
    });
    
})

function titlesort(){
    if(tsortorder===-1 || tsortorder==='inc'){
        /*products.sort((a,b)=>{
            return a.name.toLowerCase()-b.name.toLowerCase();
        })*/
        products.sort(function(a, b){
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        })
        showproductTable(products);
        console.log(products);
        tsortorder='des'
    }
    else if(tsortorder==='des'){
        products.sort(function(a, b){
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            return 0;
        })
        console.log(products);
        showproductTable(products);
        tsortorder='inc';
    }

}

function pricesort(){
    if(psortorder===-1 || psortorder==='des'){
        products.sort((a,b)=>{
            return a.price-b.price;
        })
        showproductTable(products);
        //console.log(products);
        psortorder='inc'
    }
    else if(psortorder==='inc'){
        products.sort((a,b)=>{
            return b.price-a.price;
        })
        showproductTable(products);
       // console.log(products);
        psortorder='des';
    }

}

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
        <td>${items[i].price}</td>
        <td><a href="#">Edit</a></td>
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
