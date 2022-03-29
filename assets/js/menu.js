// Menu mobile
const menu = document.querySelector('.header-menu');
const hamburger = document.querySelector('.hamburger');
const toggle = function () {
    hamburger.classList.toggle("is-active");
    menu.classList.toggle('header-menu--active');
}

hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggle();
});

document.addEventListener('click', function (e) {
    const its_menu = e.target == menu || menu.contains(e.target);
    const its_btn_menu = e.target == hamburger;
    const menu_is_active = menu.classList.contains('header-menu--active');

    if (!its_menu && !its_btn_menu && menu_is_active) {
        toggle();
    };
});
