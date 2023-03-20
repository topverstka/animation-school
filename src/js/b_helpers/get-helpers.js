/**
 * offsetPage(elem) - определение расстояния между элементом и верхней границей страницы
 */
function offsetPage(elem) {
    var rect = elem.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// Возвращает рандомное целое число включительно max
export function getRandomInt(min, max) {
  return (
    Math.floor(Math.random() * (Math.floor(max) + 1 - Math.ceil(min))) +
    Math.ceil(min)
  );
}

/**
 * getCoords(elem) - получает координаты элемента, относительно страницы
 */
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
}

/**
 * getCookie(name) - возвращает cookie с указанным именем
 * name - имя куки
 * Если ничего не будет найдено, вернет undefined
 */
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


// Получаем все соседние элементы
export function getSiblings(elem) {
  const siblings = [];
  let sibling = elem;

  while (sibling.previousSibling) {
    sibling = sibling.previousSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  sibling = elem;
  while (sibling.nextSibling) {
    sibling = sibling.nextSibling;
    sibling.nodeType == 1 && siblings.push(sibling);
  }

  return siblings;
}

/*
  Проверяет был ли клик за пределами выбранного блока
 */
export function getClickedNotBeyondElement(e, selector) {
    // let isElementClicked = false;
    let clickedElement;
    const path = e.path || (e.composedPath && e.composedPath());
    const isSelect = path.map((item, index, pathElems) => {
      if (pathElems.length - 4 < index) return;
      if (item.classList.contains(selector)) {
        // isElementClicked = true;
        clickedElement = item;
      }
    })
    if (clickedElement !== undefined) return clickedElement;
    return false
    // return isElementClicked;
}
