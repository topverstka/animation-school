```js
// Кастомный select
castomSelect();
function castomSelect() {
    const selectNodes = document.querySelectorAll('.form-select');

    selectNodes.forEach(selectNode => {
        const inputNode = selectNode.querySelector('.form-select__input');
        const toggleNode = selectNode.querySelector('.form-select__toggle');
        const buttonNodes = selectNode.querySelectorAll('.form-select__btn');

        toggleNode.addEventListener('click', handleToggle);

        buttonNodes.forEach((buttonNode, index) => {
            buttonNode.addEventListener('click', () => {
                buttonNodes.forEach(buttonNode => buttonNode.classList.remove('form-select__btn_active'));
                buttonNode.classList.add('form-select__btn_active');
                inputNode.selectedIndex = index;
                toggleNode.classList.add('form-select__toggle_selected');
                toggleNode.textContent = buttonNode.textContent;
            });
        });

        function handleToggle(evt) {
            evt.stopPropagation();
            selectNode.classList.toggle('form-select_active');

            if (selectNode.classList.contains('form-select_active')) {
                toggleNode.removeEventListener('click', handleToggle);
                document.addEventListener('click', handleDocument);
            }
        }

        function handleDocument() {
            selectNode.classList.remove('form-select_active');

            document.removeEventListener('click', handleDocument);
            selectNode.addEventListener('click', handleToggle);
        }
    });
}
```

```scss
.form-select {
    position: relative;
    display: flex;
    flex-direction: column;
}

.form-select_active {
    .form-select__toggle {
        &::before {
            transform: rotate(-180deg);
        }
    }

    .form-select__list {
        opacity: 1;
        visibility: visible;
        transform: translateY(20px);
    }
}

.form-select__input {
    position: absolute;
    transform: scale(0);
}

.form-select__toggle {
    position: relative;
    padding: 13px 29px;
    padding-right: 60px;
    font-family: 'Montserrat-medium', sans-serif;
    color: rgba(255, 255, 255, .5);
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    text-align: left;
    background: #23252D;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    transition: border-color .3s, color .3s;

    &:hover,
    &:focus {
        border-color: var(--accent-light);
    }

    &::before {
        content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none"%3E%3Cpath d="M0.45119 1.6585C-0.11457 1.01192 0.344609 0 1.20377 0L10.7962 0C11.6554 0 12.1146 1.01192 11.5488 1.6585L6.75258 7.13991C6.35416 7.59524 5.64583 7.59524 5.24742 7.13991L0.45119 1.6585Z" fill="white"/%3E%3C/svg%3E');
        position: absolute;
        right: 31px;
        top: 16px;
        opacity: .5;
        transition: $tr;
    }

    @media (max-width: 767px) {
        padding: 19px;
        padding-right: 40px;
        font-size: 14px;
        line-height: 17px;

        &::before {
            right: 19px;
            top: 20px;
        }
    }
}

.form-select__toggle_selected {
    color: #FFFFFF;
}

.form-select__list {
    position: absolute;
    left: 0;
    top: 100%;
    right: 0;
    z-index: 1;
    display: grid;
    gap: 30px;
    padding: 20px 30px;
    border-radius: 10px;
    background: #23252D;
    border: 1px solid rgba(255, 255, 255, 0.2);
    opacity: 0;
    visibility: hidden;
    transition: $tr;

    @media (max-width: 767px) {
        padding: 20px;
    }
}

.form-select__btn {
    position: relative;
    padding-left: 60px;
    color: #FFFFFF;
    font-family: 'Montserrat-medium', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    text-align: left;
    opacity: 0.5;

    &:hover {
        opacity: 1;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        width: 30px;
        height: 30px;
        border: 2px solid #FFFFFF;
        border-radius: 50%;
    }

    &::after {
        content: '';
        position: absolute;
        left: 8px;
        top: 8px;
        width: 14px;
        height: 14px;
        background: #FFFFFF;
        border-radius: 50%;
        transform: scale(0);
        opacity: 0;
        transition: $tr;
    }

    @media (max-width: 767px) {
        font-size: 14px;
    }
}

.form-select__btn_active {
    opacity: 1;

    &::after {
        transform: scale(1);
        opacity: 1;
    }
}
```
