// const anchors = document.querySelectorAll('a[href*="#"]');
// for (let anchor of anchors) {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (anchor.getAttribute("href") === "#") return;

//     const blockID = anchor.getAttribute("href").substr(1);
//     document.getElementById(blockID).scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   });
// }

function scrollToAnchor(distanceTop = 0) {
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
                top: anchor.getBoundingClientRect().top + pageYOffset - distanceTop,
                left: 0,
                behavior: 'smooth'
            })
        })
    }
}
scrollToAnchor(80);