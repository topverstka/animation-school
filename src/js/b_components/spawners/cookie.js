/**
 * notificationOfCookie() - отображение уведомления об использовании cookie
 * Этот скрипт проверяет наличие куки accept_cookie и чтобы его значение было равно true. Если это не так, то он создает новый элемент, с содержимым HTML, которое должно быть указано вместо <YOUR-HTML-CODE>. После чего, спустя время равное showTime присваивает ему класс show. При клике по крестику, уведомление будет закрываться и удаляться из DOM через время равное removeTime. В данном случае, removeTime равно времени продолжения анимации скрытия уведомления (transition).
 */

function notificationOfCookie(showTime, removeTime) {
    const acceptCookie = getCookie('accept_cookie')
    if (acceptCookie != undefined || acceptCookie != false) { return }

    cookieBlock = document.createElement('div')
    cookieBlock.classList.add('cookie')
    cookieBlock.innerHTML = `<YOUR-HTML-CODE>`
    document.querySelector('body').append(cookieBlock)

    cookie = document.querySelector('.cookie')
    setTimeout(() => {
        cookie.classList.add('_show')
    }, showTime)

    const acceptCookieElem = document.querySelector('.cookie-accept')
    acceptCookieElem.addEventListener('click', () => {
        cookie.classList.remove('_show')
        document.cookie = `accept_cookie=true; path=/;`

        setTimeout(() => {
          cookie.remove()
        }, removeTime)
    })
}
