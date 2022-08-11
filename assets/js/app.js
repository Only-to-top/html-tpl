document.addEventListener('DOMContentLoaded', () => {

    // Swiper
    if (document.querySelector(".swiper-1x")) { };

    // Fancybox
    const popup = Fancybox.bind("[data-fancybox]", {
        l10n: {
            CLOSE: "Закрыть",
            NEXT: "Далее",
            PREV: "Назад",
        },
    });

    // Forms
    if (document.querySelector(".ajax-form")) {
        const ajaxSend = async (url, formData) => {
            const fetchResponse = await fetch(url, {
                method: 'POST',
                body: formData
            });
            if (!fetchResponse.ok) {
                throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResponse.status}`);
            }
            return await fetchResponse.text();
        }

        document.querySelectorAll('.form').forEach(el => {
            el.addEventListener('submit', function (e) {
                e.preventDefault();
                const formData = new FormData(this);

                ajaxSend('/mail.php', formData)
                    .then(function (data) {
                        alert('Спасибо! Данные отправлены.');
                        el.reset();
                        // setTimeout(() => {
                        //     document.querySelector('.fancybox-close-small').click(); // close fancy popup
                        // }, 2000);
                    }).catch(function (error) {
                        alert(error);
                    });
            });
        });
    }

    document.querySelectorAll('img, a').forEach(el => el.addEventListener("dragstart", e => e.preventDefault()));
});


window.addEventListener('load', () => { });

// + html { overflow-x: visible; }
window.addEventListener('scroll', () => { });

window.addEventListener("orientationchange", () => { }, false);

if (document.documentElement.clientWidth < 768) { };