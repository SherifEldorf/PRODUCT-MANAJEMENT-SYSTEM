let title=document.getElementById('title')
let price=document.getElementById('price')
let taxes=document.getElementById('taxes')
let ads=document.getElementById('ads')
let discount=document.getElementById('discount')
let total=document.getElementById('total')
let count=document.getElementById('count')
let Category=document.getElementById('Category')
let submit=document.getElementById('submit')
let tbody =document.getElementById('tbody')
let tdelete =document.getElementById('delete')
let mood="create";
let tmp;

// get total
function get_total(){
    if(price.value !=''){
   let result = +price.value+ +taxes.value+ +ads.value- +discount.value;
   total.innerHTML=result;
   total.style.background='#040' }
   else{
       total.innerHTML='';
       total.style.background='#a00d02'

    }
}
//create product
let datapro;

if(localStorage.product != null)
{
    datapro =JSON.parse(localStorage.product)
}else
{
    datapro=[];
}

//save local storage

submit.onclick = function()
{ 

    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        Category:Category.value.toLowerCase()
    }
    if(mood==="create"){
    if(newpro.count>1){
        for(let i =0;i<newpro.count;i++)
        {
            datapro.push(newpro)
            // save to local storage
            localStorage.setItem('product',JSON.stringify(datapro))
        }
    
  
    }else
    {
        datapro.push(newpro)
        // save to local storage
        localStorage.setItem('product',JSON.stringify(datapro))  
    }}
    else
    {
        datapro[tmp]=newpro;
        mood="create";
        count.style.display="block"
        submit.innerHTML="Create"
    }




    cleardata()
    showdata()
}


//clear inputs
function cleardata()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    Category.value='';
}
//read
function showdata()
{
    get_total()
    let table='';
    for(let i =0 ; i <datapro.length;i++)
    {
        table+= ` <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].Category}</td>
        <td> <button id="update" onclick="updatedata(${i})" > update </button> </td> 
        <td> <button id="delete" onclick="deleteitem(${i})" > delete </button> </td>
        
    </tr> `
    let btndelete=document.getElementById('deleteall');
   if( datapro.length > 0 ){ 
       btndelete.innerHTML=`
    <button id="deleteall"  onclick="deleteall() " > Delete All (${datapro.length}) </button> `
   }
   else{
       btndelete.innerHTML=''
   }

    }
    tbody.innerHTML=table;

}
showdata()


//count 
//delete
function deleteitem(id )
{
    datapro.splice(id,1);
    localStorage.product=JSON.stringify(datapro)
    showdata()

    }       

  function deleteall()
  {
    datapro.splice(0,datapro.length);
    localStorage.product=JSON.stringify(datapro);
    showdata();
}   
//update
function updatedata(i)
{
    console.log(i);
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    count.style.display="none";
    Category.value=datapro[i].Category;
    get_total()
    submit.innerHTML="Update";
    mood="update";
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })



}
//search
let searchmood="title";
function getSearchMood(id)
{
    let search=document.getElementById('search');

    if(id ==="searchtitle")
    {
        searchmood="title";
    
    }else
    {
        searchmood="cateogery";

    }
    search.placeholder ='search by ' + searchmood;
    console.log(searchmood);
    search.focus();
    search.value='';
    showdata();
}

function searchdata(searchvalue)
{
    let table='';
    if( searchmood==="title")
    {
        for( let i =0 ; i<datapro.length;i++ )
        {
            if( datapro[i].title.includes(searchvalue.toLowerCase()) )
            {
                table+= ` <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].Category}</td>
                <td> <button id="update" onclick="updatedata(${i})" > update </button> </td> 
                <td> <button id="delete" onclick="deleteitem(${i})" > delete </button> </td>
                
            </tr> `
            let btndelete=document.getElementById('deleteall');
           if( datapro.length > 0 ){ 
               btndelete.innerHTML=`
            <button id="deleteall"  onclick="deleteall() " > Delete All (${datapro.length}) </button> `       
                                    }
            }
        
        
            if( datapro[i].Category.includes(searchvalue.toLowerCase()) )
            {
                table+= ` <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].Category}</td>
                <td> <button id="update" onclick="updatedata(${i})" > update </button> </td> 
                <td> <button id="delete" onclick="deleteitem(${i})" > delete </button> </td>
                
            </tr> `
            let btndelete=document.getElementById('deleteall');
           if( datapro.length > 0 ){ 
               btndelete.innerHTML=`
            <button id="deleteall"  onclick="deleteall() " > Delete All (${datapro.length}) </button> `       
                                    }
            }
        }
        

    }
    tbody.innerHTML=table;

}


//clean data
