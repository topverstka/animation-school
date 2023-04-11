Еще сделать
- [ ] Добавь массив респонсивов viewports


# Как пользоваться [backstopjs](https://github.com/garris/BackstopJS)

Нужен для контроля визуальной регрессии, когда ты что-то меняешь в одном месте, а ломается в другом

1. Установи `npm install -g backstopjs`
2. Проиниируй в корне прокта `backstop init`. Появится папка `backstop_data` и файл `backstop.json`
3. Сделай снимок референсов `backstop reference`. Делай снимки перед редактированием
4. Сделай тест после редактирования `backstop test`



## Какие проблемы могут быть при запуске

### Выдает ошибки, в которых пишет что-то про `.cjs` файлы

Поменяй расширения файлов в папке `backstop_data/engine_scripts/puppet/`
1. `clickAndHoverHelpers.cjs`
2. `loadCookies.cjs`
3. `onBefore.cjs`
4. `onReady.cjs`

Внутри файлов `onBefore.cjs` и `onReady.cjs` добавь в require cjs расширение

onReady.cjs
```js
await require('./clickAndHoverHelper.cjs')(page, scenario);
```

onBefore.cjs
```js
await require('./loadCookies.cjs')(page, scenario);
```

Измени в backstop.json расширения импортов onReady и onBefore
```json
  "onBeforeScript": "puppet/onBefore.cjs",
  "onReadyScript": "puppet/onReady.cjs",
```
