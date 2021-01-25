let users=[];
let orders=[];
let medsArray =[];
db.collection('users').get().then(data=>{
    for(let user of data.docs){
        users.push(user.data());
    }
    db.collection('meds').get().then(data=>{
        for(let med of data.docs){
            medsArray.push(med.data());
        }
        db.collection('orders').get().then(data=>{
            for(let order of data.docs){
                orders.push(order.data());
            }
            /* class Component {
    constructor(selector){
        this.$el = document.querySelector(selector)
    }
    hide(){
        this.$el.style.display = 'none'
    }
    show(){
        this.$el.style.display = 'block'
    }
}
class Box extends Component {
    constructor(options){
        super(options.selector)
        this.$el.style.width = this.$el.style.height = options.size+'px'
        this.$el.style.background = options.color
    }
} */
let cart =[];
if(window.localStorage.cart){
    cart=window.localStorage.cart.split(',');
}
let currentUser = null;
if(!window.localStorage.currentUser){
    window.localStorage.currentUser=null;
}
if(window.localStorage.currentUser){
    currentUser=window.localStorage.currentUser;
}
/* let users=[
    {
        id:1,
        mail:'userone@gmail.com',
        password:'123abC',
        login:'userone',
        phone:'+380957689312'
    },
    {
        id:2,
        mail:'usertwo@gmail.com',
        password:'123abC',
        login:'usertwo',
        phone:'+380957689313'
    }
]
let orders=[
    {
        id:1,
        userId:1,
        meds:[
            {
                id:1,
                price:58
            }
        ]
    },
    {
        id:2,
        userId:1,
        meds:[
            {
                id:2,
                price:190
            }
        ]
    },
    {
        id:3,
        userId:1,
        meds:[
            {
                id:3,
                price:69
            }
        ]
    }
]
let medsArray = [
    {
        id:1,
        price:61,
        name:'Амиксин IC',
        category:'иммуномодулятор',
        catName:'immunity',
        reciept:false,
        restrictions:'нет',
        type:'3 таблетки по 6мг',
        caption:'иммуномодулирующее и противовирусное средство.',
        photo:['https://apteka911.com.ua/content/shop/products/30751/amiksin-ic-tabl-p-o-0-06g-3-odo-interhim-prod-400x400-1b1e.jpg'],
        clicked:2
    },
    {
        id:2,
        price:250,
        name:'Никоретте Свежая мята',
        category:'лечение цнс',
        catName:'cns',
        reciept:false,
        restrictions:'нельзя беременным и кормящим',
        type:'спрей д/рот. пол. дозир. 1мг/доза фл. 15мл (150доз)',
        caption:'Никоретте® - широкая линейка препаратов никотинзаместительной терапии уменьшения тяги к курению.',
        photo:['https://apteka911.com.ua/content/shop/products/69853/nikorette-svezhaya-myata-sprey-d-rot-pol-dozir-1mg-doza-fl-15ml-150doz-mak-nil-ab-prod-400x400-b689.jpg','https://apteka911.com.ua/content/shop/products/69853/photos/312056-69853-big-1500x1500-dacc.jpg'],
        clicked:7
    },
    {
        id:3,
        price:21,
        name:'Парацетамол',
        category:'жаропонижающее',
        catName:'temperature',
        reciept:false,
        restrictions:'нет',
        type:'10 таблеток по 200мг',
        caption:'жаропонижающее',
        photo:['https://apteka911.com.ua/content/shop/products/9899/paratsetamol-tabl-200mg-10-lubnyifarm-ukraina-prod-400x400-7ab5.jpg'],
        clicked:5
    },
    {
        id:4,
        price:21,
        name:'Сок фруктовый детский NESTLE GERBER Яблочный',
        category:'детское питание',
        catName:'child-food',
        reciept:false,
        restrictions:'нет',
        type:'175г',
        caption:'Детский сок NESTLE GERBER Яблоко (175 мл) обогатит рацион Вашего малыша питательными веществами и познакомит его с новыми натуральными вкусами.',
        photo:['https://apteka911.com.ua/content/shop/products/5776/sok-fruktovyiy-detskiy-nestle-gerber-nestle-gerber-yablochnyiy-175-g-nestle-polska-s-a-prod-400x400-5377.jpg'],
        clicked:19
    },
    {
        id:5,
        price:67,
        name:'Еврофаст капс жел. мягкие 200мг',
        category:'обезбаливающее',
        catName:'painkillers',
        reciept:false,
        restrictions:'Нельзя беременным и кормящим',
        type:'10 капсул по 200мг',
        caption:'Капсулы Еврофаст показаны при симптоматическом лечении головной, зубной и менструальной боли, лихорадки, невралгии, боли в спине, суставах, мышцах, при ревматических болях.',
        photo:['https://apteka911.com.ua/content/shop/products/42682/evrofast-kaps-zhel-myagkie-200mg-10-marksans-farma-ltd-prod-400x400-bf89.jpg'],
        clicked:15
    },
    {
        id:6,
        price:164,
        name:'Еврофаст капс жел. мягкие 400мг',
        category:'обезбаливающее',
        catName:'painkillers',
        reciept:false,
        restrictions:'Нельзя беременным и кормящим',
        type:'20 капсул по 400мг',
        caption:'Капсулы Еврофаст показаны при симптоматическом лечении головной, зубной и менструальной боли, лихорадки, невралгии, боли в спине, суставах, мышцах, при ревматических болях.',
        photo:['https://apteka911.com.ua/content/shop/products/131944/evrofast-kaps-zhel-myagkie-400mg-20-marksans-farma-ltd-prod-400x400-7366.jpg'],
        clicked:999
    },
]; */

let current = [];
let logos = document.querySelectorAll('.logo');
let welcome = document.querySelector('.welcome');
let topItems = document.querySelector('.top-items');
let itemsContainer =  document.querySelector('.items__container');

for(let logo of logos){
    logo.addEventListener('click',()=>{
        showElements();
        itemsContainer.style.display='none';
        itemsContainer.innerHTML='';
    })
}



let catalog = document.querySelectorAll('.catalog li');
for(let  li of catalog){
    li.addEventListener('click',(event)=>{
        renderItems(event.target.dataset.category);
        itemsContainer.style.display='';
    })
}
function hideElements(){
    welcome.style.display='none';
    topItems.style.display='none';
}
function showElements(){
    welcome.style.display='';
    topItems.style.display='';
}
function renderItems(category){
    let html = '';
    hideElements();
    for(let item of medsArray){
        if (item.catName == category){
                    html+= `<div class="item" data-id='${item.id}'>
                        <img src="${item.photo[0]}">
                        <div class="item__caption">
                            <div class="item__title">${item.name}</div>
                            <div class="item__info">${item.caption}</div>
                                <div class="item__price">
                                    ${item.price}₴
                                </div>
                            <button class="item__button">В корзину</button>
                        </div>
            </div>`
        }
    }
    if(!html){
        html='<div class="not-found">Извините! По Вашему запросу ничего не найдено!</div>';
    }
    itemsContainer.innerHTML=html;
    showId();
    cartAdd();
}

let searchButton = document.querySelector('.search__btn');
let searchInput = document.querySelector('.search__input');
searchButton.addEventListener('click',()=>{
    let searchValue = searchInput.value;
    renderSearch(searchValue);
})
function renderSearch(value){
    hideElements();
    let html = '';
    for(let item of medsArray){
        if (item.category.toLowerCase().includes(value.toLowerCase()) && value.length>2 || item.name.toLowerCase().includes(value.toLowerCase()) && value.length>2){
                    html+= `<div class="item" data-id='${item.id}'>
                        <img src="${item.photo[0]}">
                        <div class="item__caption">
                            <div class="item__title">${item.name}</div>
                            <div class="item__info">${item.caption}</div>
                                <div class="item__price">
                                    ${item.price}₴
                                </div>
                            <button class="item__button">В корзину</button>
                        </div>
            </div>`
        }
    }
    if(!html){
        itemsContainer.style.display='';
        html='<div class="not-found">Извините! По Вашему запросу ничего не найдено!</div>';
    }
    itemsContainer.style.display='';
    itemsContainer.innerHTML=html;
    showId();
    cartAdd();
}
function showId(){
    let items = document.querySelectorAll('.item');
    for(let item of items){
        if(!item.getAttribute('listener')){
            item.setAttribute('listener', 'true');
            item.addEventListener('click',(event)=>{
                if( !event.target.classList.contains("item__button")){
                    renderCard(event.currentTarget.dataset.id);
                }
            })
    }
}
}
function renderCard(id){
    let html='';
    let cardItem = document.querySelector('.card-item');
    for(let item of medsArray){
        if (item.id == id){
        item.clicked+=1;
        html = `<div class="item-card">
        <div class="card" data-id='${id}'>
        <div class="card__cat">${item.category}</div>
        <img src="${item.photo[0]}">
        <div class="card__name">${item.name}</div>
        <div class="card__info">
            <div class="card__caption">${item.category}</div>
            <div class="card__reciept"><span>Рецепт:</span> ${item.reciept?'да':'нет'}</div>
            <div class="card__restrictions"><span>Ограничения:</span> ${item.restrictions?item.restrictions:'нет'}</div>
            <div class="card__type">${item.type}</div>
            <div class="card__price">${item.price}₴</div>
        </div>
        <button class="card__toCart">В корзину</button>
        <button class="card__close">Закрыть</button>
    </div>
    </div>`
        }
    }
    cardItem.innerHTML=html;
    let close = document.querySelector('.card__close');
    close.addEventListener('click',()=>{
        cardItem.innerHTML='';
    })
    let toCart = document.querySelector('.card__toCart');
    if(!toCart.getAttribute('listener')){
        toCart.setAttribute('listener', 'true');
        toCart.addEventListener('click',()=>{
            addToCart(id);
        })
    }
    let cat = document.querySelector('.card__cat');
    cat.addEventListener('click',()=>{
        let searchValue = cat.innerText; 
        renderSearch(searchValue);
        cardItem.innerHTML='';
    })
}

function cartAdd(){
    let btn = document.querySelectorAll('.item__button');
    for(let button of btn){
        if(!button.getAttribute('listener')){
            button.setAttribute('listener', 'true');
            button.addEventListener('click',(event)=>{        
                    addToCart(event.currentTarget.parentElement.parentElement.dataset.id);
            })
    }
}
}
function addToCart(id){
    cart.push(id);
    updateCart();
}
function renderTopItems(){
    let elem = document.querySelector('.top-items .item-container')
    let html = '';
    let sortedItems = [...medsArray]
    sortedItems.sort(function (a, b) {
        if (a.clicked < b.clicked) {
            return 1;
        }
        if (a.clicked > b.clicked) {
            return -1;
        }
            return 0;
        });
    if(sortedItems.length>4){
        sortedItems.length=4;
    }
    for(let item of sortedItems){
                    html+= `<div class="item" data-id='${item.id}'>
                        <img src="${item.photo[0]}">
                        <div class="item__caption">
                            <div class="item__title">${item.name}</div>
                            <div class="item__info">${item.caption}</div>
                                <div class="item__price">
                                    ${item.price}₴
                                </div>
                            <button class="item__button">В корзину</button>
                        </div>
            </div>`
    }
    elem.innerHTML = html;
} 

function updateCart(){
    window.localStorage.cart = cart;
    let sum=0;
    let elem = document.querySelector('.cart__sum');
    for(let item of medsArray){
        for(let element of cart){
            if(item.id == element){
                sum+=+item.price;
            }
        }
    }
    elem.innerHTML=sum+'₴';
}
/*
function logIn(){

}
function logOut(){

}
function updateUser(){

}
*/
let cartBtn = document.querySelector('.cart');
cartBtn.addEventListener('click',()=>{
    let cartModal = document.querySelector('.cartModal');
    cartModal.classList.remove('invisible');
    openCart();
});
function openCart(){
    cart.sort(function (c, b) {
        if (c.clicked < b.clicked) {
            return 1;
        }
        if (c.clicked > b.clicked) {
            return -1;
        }
            return 0;
        });
        
        let result = {};
        for (let i = 0; i < cart.length; ++i)
        {
            var a = cart[i];
            if (result[a] != undefined)
                ++result[a];
            else
                result[a] = 1;
        }
        for (let key in result){
            //console.log(key,result[key]);
        }
        renderCart(result);
        let cartModal = document.querySelector('.cartModal');
        let closeModal = document.querySelector('.cartModal__close');
    closeModal.addEventListener('click',()=>{
        cartModal.classList.add('invisible');
    });
};

function renderCart(result){
    let html ='<div class="cartModal__descr">Корзина</div>';
    let wrapper = document.querySelector('.cartModal__wrapper');
    for(let prop in result){
        for(let item of medsArray){
            if(item.id == prop ){
                html+=`
            <div class="cartModal__item" data-id='${item.id}'>
                <div class="item__description">${item.name}</div>
                <div class="item__quantity-box">
                    <button class="item__minus">-</button>
                    <div class="item__quantity">${result[prop]}</div>
                    <button class="item__plus">+</button>
                </div>
                <div class="item__price">${item.price}${result[prop]>1?'/'+item.price*result[prop]:''}₴</div>
                <button class="item__remove">удалить</button>
            </div>`
            }
        }
    }
    html+=`<input type="text" class="cartModal__comment" placeholder="комментарий"><button class="cartModal__close btn">Закрыть</button> <button class="cartModal__order btn">Заказать</button>`;
    wrapper.innerHTML=html;
    let cmItems = document.querySelectorAll('.cartModal__item');
    for(let element of cmItems){
        if(!element.getAttribute('listener')){
            element.setAttribute('listener', 'true');
            element.addEventListener('click',(event)=>{
                if(event.target.classList.contains('item__plus')){
                    cart.push(event.currentTarget.dataset.id);
                }
                if(event.target.classList.contains('item__minus')){
                        let index = cart.indexOf(event.currentTarget.dataset.id);
                        if (index > -1) {
                        cart.splice(index, 1);
                        }
                }
                if(event.target.classList.contains('item__remove')){
                        cart = cart.filter((n) => {return n != event.currentTarget.dataset.id});
                }
                if(event.target.classList.contains('item__description')){
                    renderCard(event.currentTarget.dataset.id);
                    let cartModal = document.querySelector('.cartModal');
                    cartModal.classList.add('invisible');
                }
                openCart();
                updateCart();
            })
        }
        }
        initOrder();
};
function userCheck(){
    let crUser = document.querySelector('.cabinet__name');
    let userNameCart = document.querySelector('.userCard__name');
    let userEmailCart = document.querySelector('.userCard__email');
    let userPhoneCart = document.querySelector('.userCard__phone');
    let imgCart = document.querySelector('.userCard__image');
    let userName='Login';
    if(currentUser!='null'){
        userName=currentUser;
        userNameCart.textContent=currentUser;
        let curUser=users.find((user)=>{console.log(user);return user.login==currentUser;});
        userEmailCart.textContent=curUser.mail;
        userPhoneCart.textContent=curUser.phone;
        if(curUser.image){
            imgCart.src = curUser.image;
        }
    }
    /* if(currentUser){
        for(let user of users){
            if(user.id == currentUser){
                userName=user.login;
            }
        }
    } */
    crUser.textContent=userName;
}
function loginShow(){
    let cabinet=document.querySelector('.cabinet');
    console.log(currentUser);
    cabinet.addEventListener('click',(e)=>{
        if(currentUser==='null'){
            showLogin();
        }else{
            showCabinet();
        }
    })
};

function showLogin(){
    console.log(currentUser);
    let form = document.querySelector('.loginModal');
    form.classList.remove('invisible');
}

function modalLogin(){
    let form = document.querySelector('.loginModal__wrapper');
    form.addEventListener('click',(event)=>{
        form.style.outline='';
        if(event.target.classList.contains('loginModal__loginBtn')){
            let loginInput = document.querySelector('.loginModal__login');
            let loginPassword = document.querySelector('.loginModal__password');
            let loginResult = logIn(loginInput.value, loginPassword.value);
            if(loginResult){
                event.currentTarget.parentElement.classList.add('invisible');
            }else{
                form.style.outline = '3px solid red';
            }
        }
        if(event.target.classList.contains('loginModal__close')){
            event.currentTarget.parentElement.classList.add('invisible');
        }  
    })
}
function logIn(login,password){
    for (let user of users){
        if(user.login == login && user.password == password || user.mail == login && user.password == password || user.phone == login && user.password == password){
            currentUser = user.login;
            window.localStorage.currentUser = user.login;
            userCheck();
            return true;
        }
    }
}
let logOutBtn = document.querySelector('.userCard__logOut');
logOutBtn.addEventListener('click',()=>{
    console.log('logout');
    logOut()});
function logOut(){
    closeUserModal();
    window.localStorage.currentUser = 'null';
    currentUser='null';
    userCheck();
}
function showCabinet(){
    let card=document.querySelector('.userCard');
    card.classList.remove('invisible');
}
function initOrder(){
    let order = document.querySelector('.cartModal__order');
    let comment = document.querySelector('.cartModal__comment');
    order.addEventListener('click',(e)=>{
        if(currentUser!='null' && cart.length>0){
            let orderRecieptNeeded=false;
            let recieptLink;
            for(let item of cart){
                for(let element of medsArray){
                    if(element.id==item){
                        if(element.reciept){
                            orderRecieptNeeded=true;
                        }
                    }
                }
            }
            if(orderRecieptNeeded){
                recieptLink = prompt('Введите ссылку на рецепт');
                if(!recieptLink || recieptLink.length<5){
                    alert('Некорректно введен рецепт');
                    return;
                }
            }
            let orderComment='';
            if(comment.value){
                orderComment=comment.value;
            }
            orderItems(cart,recieptLink,orderComment);
            alert('Заказ отправлен. С Вами свяжутся');
            cart.length=0;
            updateCart();
            openCart();
        }else if(currentUser=='null'){
            alert('Вы должны быть зарегистрированы');
        }else{
            console.log(cart.length, currentUser);
            alert('В корзине ничего нет');
        }
    })
}
let userCardCloseBtn = document.querySelector('.userCard__close');
userCardCloseBtn.addEventListener('click',()=>{closeUserModal()})
function closeUserModal(){
    let card=document.querySelector('.userCard');
    card.classList.add('invisible');
}
function orderItems(cart,recieptLink='',orderComment=''){
    let curUser = users.find((user)=>{return user.login == currentUser});
    let medicaments = [];

    for(let elem of cart){
        let med = medsArray.find((med)=>{return med.id == elem});
        console.log('med in find',med)
        let id = med.id;
        let price = med.price;
        medicaments.push({id, price});
    }

    orders.push({
        id:orders.length+1,
        userId:curUser.id,
        meds:medicaments,
        recieptLink,
        orderComment
    })
    updateOrders();

    console.log('oooo',orders);
    generateOrders();
}
function generateOrders(){
    let parentOrders = document.querySelector('.userCard__orders');
    parentOrders.innerHTML='';
    
    let curUser = users.find((user)=>{return user.login == currentUser});
    if(!curUser){return};
    let orderList = orders.filter(order => curUser.id == order.userId);
    
    for(let order of orderList){
        order.meds.sort((a,b)=>{return a.id - b.id});
        let medsInOrder='';
        let newarr={};
        let donearr={};
        for(let item of order.meds){
            newarr[item.id]=0;
        }
        for(let item of order.meds){
            newarr[item.id]=+newarr[item.id] + +item.price;
        }
        for (let item of order.meds){
            let med = medsArray.find((medic)=>{return medic.id == item.id});
            if(!donearr[item.id]){
                console.log(med);
                console.log(item);
                medsInOrder+=`<div class="order__med">
                <img src="${med.photo[0]}" alt="" class="med__image">
                <div class="med__name">${med.name}</div>
                <div class="med__amount">Количество${newarr[item.id]/item.price}</div>
                <div class="med__price">${newarr[item.id]}/${item.price}</div>
                </div>`
                donearr[item.id]=true;
            }
            
        }
        parentOrders.innerHTML+=`<div class="userCard__order">
        <div class="order__number">${order.id}</div>
        <div class="order__meds">
            ${medsInOrder}
        </div>
    </div>`
    }
}
let registerBtn = document.querySelector('.loginModal__register');
registerBtn.addEventListener('click',()=>{
    let email = document.querySelector('.loginModal__email');
    let phone = document.querySelector('.loginModal__phone');
    let password = document.querySelector('.loginModal__registerPassword');
    if(!isNaN(phone.value) && phone.value.length>6 || !isNaN(phone.value.slice(1,phone.value.length))&& phone.value.length>6){
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email.value)){
            var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(password.value.match(passw)){
                registerUser(email.value,phone.value,password.value);
            }else{
                alert('password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.');
            }
        }else{
            alert('invalid email');
        }
    }else{
        alert('invalid phone');
    }
})
function registerUser(email,phone,password){
    if(checkEmail(email) && checkPhone(phone)){
        users.push({
            id:users.length,
            mail:email,
            password,
            login:email.substring(0, email.indexOf('@')),
            phone,
            type:'user'
        });
        logIn(email,password);
        alert('Регистрация прошла успешно');
        updateUsers();
    }
}
function checkEmail(email){
    for(let user of users){
        if(email == user.mail){
            alert('Account with this email already exists');
            return false;
        }
    }
    return true;
}
function checkPhone(phone){
    for(let user of users){
        if(phone == user.phone){
            alert('Account with this phone already exists');
            return false;
        }
    }
    return true;
}
let inputs = document.querySelectorAll('.userCard__field');
for(let input of inputs){
    input.addEventListener('click',(e)=>{
        let newValue = prompt('Введите новое значение');
        if(newValue){
            if(e.target.classList.contains('userCard__name')){
                for(let user of users){
                    if(newValue != user.login && user.login == currentUser){
                        user.login = newValue;
                        window.localStorage.currentUser = newValue;
                        currentUser = newValue;
                        userCheck();
                        updateUsers();
                }
            }}else{
                if(e.target.classList.contains('userCard__email')){
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(checkEmail(newValue) && re.test(newValue)){
                        for(let user of users){
                            if(newValue != user.email && user.login == currentUser){
                                user.mail = newValue;
                                userCheck();
                                updateUsers();
                        }
                    }
                }
                }else{
                    if(e.target.classList.contains('userCard__phone')){
                        if(checkPhone(newValue) ){
                                for(let user of users){
                                    if(newValue != user.phone && user.login == currentUser &&  !isNaN(newValue.slice(1,newValue.length))&& newValue.length>6){
                                        user.phone = newValue;
                                        userCheck();
                                        updateUsers();
                                }
                            
                        }
                    }}else{
                        if(e.target.classList.contains('userCard__image')){
                            for(let user of users){
                                if( user.login == currentUser){
                                    user.image = newValue;
                                    userCheck();
                                    updateUsers();
                                }
                        }}else{
                            alert('Неправильно введенные данные.');
                        }
                    }
                }
            }}
        else{
            alert('Введите данные');
        }
    })
}
let changePassBtn = document.querySelector('.userCard__changePassword');
changePassBtn.addEventListener('click',()=>{
    let oldPass=prompt('Введите старый пароль');
    for(let user of users){
        if(user.login==currentUser){
            if(user.password==oldPass){
                let newPass = prompt('Введите новый пароль');
                if(newPass.match(passw)){
                    user.password=newPass;
                    updateUsers();
                }else{
                    alert('password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.');
                }
                
            }else{
                alert('Неверный старый пароль');
            }
        }
    }
})

/* for(let med of medsArray){
    db.collection('meds').add(med).then(()=>{
        console.log('done!');
    }).catch(err=>{
        console.log(err);
    })
} */
modalLogin();
updateCart();
userCheck();
renderTopItems();
cartAdd();
showId();
loginShow();
generateOrders();
        });
    });
});


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
$('.slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots:true
});
