window.addEventListener('DOMContentLoaded', (event) => {
    const menuItems = document.querySelectorAll('.wp-block-heading');
    const sections = document.querySelectorAll('.lwptoc_item');

    if ([...articleHeadings].length < 1) return;

    articleHeadings.forEach((item, index) => {
        item.dataset.step = index;
        articleMenus[index].dataset.stepContent = index;
    });

    articleMenus[0].classList.add('_active');

    if (document.querySelector('[data-step-content]')) {

        const options = {
            root: null,
            rootMargin: '50px',
            threshold: .5
        }


        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {
                // если элемент является наблюдаемым
                if (entry.isIntersecting) {
                    const step = entry.target.getAttribute('data-step');

                    console.log(document.querySelector(`[data-step-content="${step}"]`))

                    document.querySelector(`[data-step-content]._active`).classList.remove('_active')
                    document.querySelector(`[data-step-content="${step}"]`).classList.add('_active')

                    // прекращаем наблюдение
                    observer.unobserve(step)
                }
            })
        }, options)


        const arr = document.querySelectorAll('[data-step]')
        arr.forEach(i => {
            observer.observe(i)
        })
        

    }
});
