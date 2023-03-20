// #region lazymap
function getElementVerticalOffset(el) {
  if (!el) return;

  let rect = el.getBoundingClientRect();
  let currentOffset = rect.top;

  return currentOffset;
}

const lazyClasses = {
  container: "js_lazy__media",
  preview: "js_lazy__preview",
  content: "js_lazy__content",
  init: "js_lazy-init",
};

function loadMap(mapContainer) {
  const { preview, content, init } = lazyClasses;

  if (!mapContainer.classList.contains(init)) {
    const placeholder = mapContainer.querySelector(`.${preview}`);
    const map = mapContainer.querySelector(`.${content}`);

    map.src = map.dataset.src;

    mapContainer.classList.add(init);
  }
}

window.addEventListener("scroll", () => {
  const mapContainer = document.querySelector(".contacts-map");
  const offset = getElementVerticalOffset(mapContainer);
  const lazyOffset = 1000;

  if (offset < lazyOffset) {
    loadMap(mapContainer);
  }
});
// #endregion lazymap
