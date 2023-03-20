# b_modal

Окна сами получают нужную обертку и функционал, когда класс `b_modal` вызван хоть раз.
Окна открываются по хэшу в урле

## Окна

Оберни то, что должно стать всплывашкой в:
```html
<div class="b_modal" id="your-modal-name">
	<!- Твой контент окна ->
</div>
```
`.b_modal` при генерит кастомные js события на открытии и заркытии:
* `b_modal-open`
* `b_modal-close`

## Кнопки
По клику откроет окно, которое ты создал ранее. В атрибуте `data-b_modal-open` укажи id попапа
Если поменять значение `data-b_modal-open`, то будет открываться актуальное окно
```html
<button data-b_modal-open="your-modal-name">Открыть окно</button>
```

По клику закроет окно, которое ты создал ранее. В атрибуте `data-b_modal-open` укажи id попапа
Если поменять значение `data-b_modal-close`, то будет открываться актуальное окно
```html
<button data-b_modal-close="your-modal-name">Открыть окно</button>
```

## Методы

```js
window.b_modal.openPop(id)
```
```js
window.b_modal.closePop(id)
```

Создает с нуля окно с текстом `text` и убирает его после `removeAfter_ms`
```js
window.b_modal.makeInfoPop(text, removeAfter_ms)
```

Создает попап из `popupNode` и присваевает ему опиональный `id`.
```js
window.b_modal.makePopup(popupNode, id)
```

Заставляет `buttonNode` по клику открывать окно с id === `popupId`
```js
window.b_modal.makeOpenerButton(buttonNode, popupId)
```
