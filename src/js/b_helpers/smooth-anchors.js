function getTopOffset(percents = 100) {
    return window.innerHeight / 100 * percents;
}

function scrollToAnchor(percents = 9) {
    const linkElems = document.querySelectorAll('[href^="#"]')
    if (!linkElems) return;
    for (let i = 0; i < linkElems.length; i++) {
        const link = linkElems[i];
        link.addEventListener('click', (e) => {
            e.preventDefault()
            let href = link.getAttribute('href')
            if (!href || href == "#") return;
            let anchor = document.querySelector(href)
            if (!anchor) return;
            if (anchor.classList.contains('poppa')) return
            window.scroll({
                top: anchor.getBoundingClientRect().top + pageYOffset - getTopOffset(percents),
                left: 0,
                behavior: 'smooth'
            })
        })
    }
}
scrollToAnchor();