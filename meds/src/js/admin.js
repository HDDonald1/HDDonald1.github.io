let users=[];
let orders=[];
let medsArray =[];

db.collection('users').get().then(data=>{
    for(let user of data.docs){
        users.push(user.data());
    };
    db.collection('meds').get().then(data=>{
        for(let med of data.docs){
            medsArray.push(med.data());
        };
        db.collection('orders').get().then(data=>{
            for(let order of data.docs){
                orders.push(order.data());
            }
            let categories = ["Иммунитет",
"Жаропонижающие",
"Антибиотики",
"Противоаллергические",
"Обезбаливающие",
"Лечение ЦНС",
"Витамины",
"Детское питание",
"Медтехника",
"Ортопедические товары",]

function updateUsers(){
    db.collection('users').get().then(data=>{
        for(let user of data.docs){
            db.collection('users').doc(user.id).delete();
        }
        for (let user of users){
            db.collection('users').add(user);
        }
    });    
}
function updateMeds(){
    db.collection('meds').get().then(data=>{
        for(let med of data.docs){
            db.collection('meds').doc(med.id).delete();
        }
        for (let med of medsArray){
            db.collection('meds').add(med);
        }
    });
}
function updateOrders(){
    db.collection('orders').get().then(data=>{
        for(let order of data.docs){
            db.collection('orders').doc(order.id).delete();
        }
        for (let order of orders){
            db.collection('orders').add(order);
        }
    });
} 

let addMeds = document.querySelector('.addMeds__add');
let editMeds = document.querySelector('.editMeds__edit');
let category = document.querySelector('.addMeds__category');
let medElem = document.querySelector('.editMeds__select');
for (let categoryOf of categories){
    let opt = document.createElement('option');
    opt.value = categoryOf;
    opt.innerHTML = categoryOf;
    category.appendChild(opt);
};
for(let med of medsArray){
    let opt = document.createElement('option');
    opt.value = med.id;
    opt.innerHTML = med.name;
    medElem.appendChild(opt);
};

function renderOrders(){
    let ordersBlock = document.querySelector('.orders__list')
    let ordersHtml=``;
    for(let order of orders){
        let client = users.find(user=>user.id==order.userId)
        let summary=0;
        let skipmed={};
        ordersHtml+=`<div class="order">
        <div class="order__id">
            ID:${order.id}
            Клиент:${client.login}
        </div>`;
        for(let med of order.meds){
            console.log(skipmed);
            if(skipmed[med.id]==true){continue};
            let amount =1;
            let newArr = order.meds.filter((medc)=>{return medc.id === med.id});
            console.log(newArr);
            if(newArr.length>1){
                amount=newArr.length;
                skipmed[med.id]=true;
            }
            let item = medsArray.find((elem)=>{return elem.id==med.id});
            summary+=med.price*amount;
            ordersHtml+=`<div class="order__med">
            <div class="med__name">Название: ${item.name}</div>
            <div class="med__type">Количество: ${item.type}</div>
            <div class="med__price">Цена: ${med.price + ' x ' +amount}</div>
            </div>
            `
        }
        ordersHtml+=`
        <div class="order__summary">Итого ${summary}</div>
        <div class="order__comment">${order.orderComment?'Комментарий:'+order.orderComment:''}</div>
        <div class="order__comment">${order.recieptLink?'Рецепт:'+order.recieptLink:''}</div>
        </div>
        `;
        ordersBlock.innerHTML=ordersHtml;
    }
}
let name = document.querySelector('.editMeds__name');
let price = document.querySelector('.editMeds__price');
let descr = document.querySelector('.editMeds__descr');
let foundElem =medsArray.find((med)=>{return med.id==medElem.value});
    name.value = foundElem.name;
    price.value = foundElem.price;
    descr.value = foundElem.caption;
medElem.addEventListener('change',(e)=>{
    foundElem =medsArray.find((med)=>{return med.id==e.target.value});
    name.value = foundElem.name;
    price.value = foundElem.price;
    descr.value = foundElem.caption;
});
editMeds.addEventListener('click',()=>{
    let id = medElem.value;
    let name = document.querySelector('.editMeds__name');
    let price = document.querySelector('.editMeds__price');
    let descr = document.querySelector('.editMeds__descr');
    if(name.value.length>3){
        if(!isNaN(price.value)){
            for(let med of medsArray){
                if(med.id == id){
                    med.name=name.value;
                    med.price=+price.value;
                    med.caption=descr.value;
                    
                    updateMeds();
                }
            }
        }else{
            alert('invalid price');
        }
    }else{
        alert('invalid name');
    }
});
addMeds.addEventListener('click',()=>{
    let category = document.querySelector('.addMeds__category');
    let checkbox = document.querySelector('.addMeds__reciept');
    let name =  document.querySelector('.addMeds__name');
    let restrictions =  document.querySelector('.addMeds__restrictions');
    let type =  document.querySelector('.addMeds__type');
    let caption =  document.querySelector('.addMeds__caption');
    let photo =  document.querySelector('.addMeds__photo');
    let price =  document.querySelector('.addMeds__price');
    let catName='';
    switch(category.value.toLowerCase()){
        case 'иммунитет':catName='immunity'; break;
        case 'жаропонижающие':catName='temperature'; break;
        case 'антибиотики':catName='antibiotics'; break;
        case 'противоаллергические':catName='allergy'; break;
        case 'обезбаливающие':catName='painkillers'; break;
        case 'лечение цнс<':catName='cns'; break;
        case 'витамины':catName='vitamins'; break;
        case 'детское питание':catName='child-food'; break;
        case 'медтехника':catName='tech'; break;
        case 'ортопедические товары':catName='orto'; break;
    }
    console.log(checkbox.checked);
    if(name.value && type.value && photo.value && price.value && !isNaN(price.value)){
        medsArray.push(
            {
                id:medsArray.length+1,
                price:price.value,
                name:name.value,
                category:category.value,
                catName,
                reciept:checkbox.checked,
                restrictions:restrictions.value?restrictions.value:'нет',
                type:type.value,
                caption:caption.value,
                photo:[photo.value],
                clicked:0,
                
            }
        )
        updateMeds();
        console.log(medsArray);
        
    }else{
        alert('Неправильно введены данные');
    }
});
console.log(orders);
renderOrders();
        })})}); 


