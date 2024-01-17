document.getElementById("bar-menu").addEventListener("click", function() {
    var element = document.getElementById("side-menu-mobile");
    var icon = document.getElementsByClassName("icon-mobile-burger");
    if (element.style.display === "none") {
        element.style.display = "block";
        var newText = 'NEW TEXT';
        icon.setAttribute('data-text', newText);
    } else {
        element.style.display = "none";
    }
});


let swiper = new Swiper('#FootLinkTerkait', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: true
    },
    loop: true,
    navigation: {
        nextEl: '.rbt-arrow-left',
        prevEl: '.rbt-arrow-right',
        clickable: true,
    },
    breakpoints: {
        575: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        992: {
            slidesPerView: 3,
        },
    },
});
