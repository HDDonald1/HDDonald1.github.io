$('.slider_wide').on('init', function(event, slick){
    $('.slider-controls__slides').append('<div class="slider-count"><p><span id="current">1</span> of <span id="total">'+slick.slideCount+'</span></p></div>');
});

$(document).ready(function(){
    $('.slider_wide').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: true,
        prevArrow: $(".slider-controls__prev"),
        nextArrow: $(".slider-controls__next"),
        responsive:[
            {
                breakpoint:1200,
                settings:{
                }
            },
            {
                breakpoint:768,
                settings:{
                    slidesToShow: 1,
                    dots:true
                }
            }
        ]
    });
});
$('.slider_wide')
    .on('afterChange', function(event, slick, currentSlide, nextSlide){
        // finally let's do this after changing slides
        $('.slider-count #current').html(currentSlide+1);
    });
    
    
    
    
    
const hamburger = document.querySelector('.hamburger');
const navWrap = document.querySelector('.nav__wrap');
const navList = document.querySelector('.nav__list');
const headerButton = document.querySelector('.btn_white');
const navMobile = document.querySelector('.nav__wrap')
hamburger.addEventListener('click',()=>{
    hamburger.classList.toggle('hamburger_retracted');
    navWrap.classList.toggle('nav__wrap_toggle');
    navList.classList.toggle('nav__list_toggle');
    headerButton.classList.toggle('btn_white');
    navMobile.classList.toggle('wow animate__animated animate__backInUp');
})