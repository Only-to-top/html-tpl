addEventListener("DOMContentLoaded", () => {

    const app = {

        ajaxSend: async (url, formData) => {
            const response = await fetch(url, { method: 'POST', body: formData });
            if (!response.ok) { throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`); }
            return await response.text();
        },

        ajaxGet: async (url) => {
            const response = await fetch(url);
            if (!response.ok) { throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`); }
            return await response.json();
        },
     
        menu: (() => {
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
        })(),

        tabs: (() => {
            const tabs = document.querySelectorAll('.differences__tab');
            const contents = document.querySelectorAll('.differences__content');

            tabs.forEach((tab, tab_index) => {
                tab.addEventListener('click', () => {
                    document.querySelector('.differences__tab--active').classList.remove('differences__tab--active');
                    tab.classList.add('differences__tab--active');

                    contents.forEach((content, content_index) => {
                        if (tab_index == content_index) {
                            content.classList.add('differences__content--active');
                        } else {
                            content.classList.remove('differences__content--active');
                        }
                    });
                });
            });
        })(),

        popups: (() => {
            const popup = Fancybox.bind("[data-fancybox]", {
                l10n: {
                    CLOSE: "Закрыть",
                    NEXT: "Далее",
                    PREV: "Назад",
                },
                closeButton: 'inside', // default
            });
        })(),

        forms: (() => {
            if (document.querySelector(".ajax_form")) {
                document.querySelectorAll('.ajax_form').forEach(el => {
                    el.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const formData = new FormData(this);

                        app.ajaxSend('./lib/mail.php', formData)
                            .then(data => {
                                alert('Спасибо! Данные отправлены.');
                                el.reset();
                            })
                            .catch(error => alert(error));
                    });
                });
            }
        })(),

        slideUp: (target = null, duration = 300) => {
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.style.display = 'none';
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
            }, duration);
        },

        slideDown: (target = null, duration = 300) => {
            target.style.removeProperty('display');
            let display = window.getComputedStyle(target).display;

            if (display === 'none')
                display = 'block';

            target.style.display = display;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
            }, duration);
        },

        slideToggle: (target, duration = 300) => {
            if (window.getComputedStyle(target).display === 'none') {
                return app.slideDown(target, duration);
            } else {
                return app.slideUp(target, duration);
            }
        },

        phoneMask: () => {
            const phones = document.querySelectorAll('input[type=tel]');

            phones.forEach(phone => {
                IMask(phone, {
                    mask: '+375 (00) 000-00-00',
                });
            });
        },
    }
    // app.phoneMask(); // imask.min.js

    document.querySelectorAll('img, a').forEach(el => el.addEventListener("dragstart", e => e.preventDefault()));

    app.ajaxSend('uri', { type: "type", print: true })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            preloaderEnd();
        })
});

// + html { overflow-x: visible; }
window.addEventListener('scroll', () => { });

window.addEventListener("orientationchange", () => { }, false);

if (document.documentElement.clientWidth < 768) { };
