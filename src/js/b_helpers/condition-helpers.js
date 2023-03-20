//#region PlatformDetect
/**
 * Получает класс названия текущей платформы и добавляет его для <body>
 * Нужно для фиксов, специфичных только для конкретной платформы
 * - [ ] tested
 */
let os = "Unknown";
if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
if (navigator.appVersion.indexOf("Mac") != -1) os = "macos";
if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
document.body.classList.add("os-" + os);
//#endregion PlatformDetect

// Проверка поддержки webp, добавление класса webp или no-webp тегу body
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    let className = support === true ? "webp" : "no-webp";
    document.body.classList.add(className);
  });
}
// Является ли устройство сенсорным
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

/**
 * mediaMax(value) - проверяет на максимальный размер экрана
 * Возвращает true если ширина экрана меньше value, false если нет.
 * ℹ️ Попробовать `window.innerWidth`
 */
function mediaMax(value) {
  return window.matchMedia(`(max-width: ${parseInt(value)}px)`).matches
}

/**
 * mediaMin(value) - проверяет на минимальный размер экрана
 * Возвращает true если ширина экрана больше value, false если нет.
 *
 */

function mediaMin(value) {
  return window.matchMedia(`(min-width: ${parseInt(value)}px)`).matches
}

/**
 * Debounce
 * - [ ] tested
 * Разрешает только одно срабатывание fn раз в time милисекунд
 * @param {Функция для дебаунса} fn
 * @param {Тайминг} time Время перерыва между сраабатыванием функции
 * @returns void
 */
const debounce = function (fn, time) {
  if (!fn && !time) return;
  let timeout;

  return function () {
    let self = this;
    const functionCall = function () {
      return fn.apply(self, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

/*
  Проверяет был ли клик за пределами выбранного блока
 */
export function isClickedBeyond(e, selector) {
    let isClickBeyond = true;
    const path = e.path || (e.composedPath && e.composedPath());
    const isSelect = path.map((item, index, pathElems) => {
      if (pathElems.length - 4 < index) return;
      if (item.classList.contains(selector)) {
        isClickBeyond = false;
      }
    })
    return isClickBeyond;
}
