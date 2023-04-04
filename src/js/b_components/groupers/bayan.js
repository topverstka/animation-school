/**
 * @bayan
 * 
 * Первый элемент внутри .bayan будет шапкой, второй будет открывающейся частью
 * 
 * 
 */
const bayans = [...document.querySelectorAll(".bayan")];
const bayanOpenedClass = "bayan--opened";
// const bayanHeight = 2000;

function openBayan(bayanObject) {
  // bayanObject.bottom.bayan.style.display = "block";
  // bayanObject.bottom.bayan.style.maxHeight = `${bayanHeight}px`;
  bayanObject.top.bayan.parentElement.classList.add(bayanOpenedClass);
  bayanObject.bottom.bayan.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("tabindex", "0");
  });
  // setTimeout(() => {
  // }, 10);
}

function closeBayan(bayanObject) {
  // bayanObject.bottom.bayan.style.maxHeight = "0";
  bayanObject.top.bayan.parentElement.classList.remove(bayanOpenedClass);
  bayanObject.bottom.bayan.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("tabindex", "-1");
  });
  setTimeout(() => {
    // bayanObject.bottom.bayan.style.display = "none";
  }, 401);
}

function toggleBayan(bayanObject) {
  if (!bayanObject) return;

  if (
    bayanObject.top.bayan.parentElement.classList.value.includes(
      bayanOpenedClass
    )
  ) {
    closeBayan(bayanObject);
  } else {
    openBayan(bayanObject);
  }
}

function createBayans(bayans) {
  bayans.forEach((bayan, index) => {
    let [bayanTopContent, bayanBottomContent] = Array.from(bayan.children);

    let bayanObject = {
      top: {
        content: bayanTopContent,
      },
      bottom: {
        content: bayanBottomContent,
      },
      bayan,
    };

    function createBayanStructure(bayanObject) {
      let bayanTop = document.createElement("div");
      bayanTop.classList.add("bayan__top");
      bayanTop.appendChild(bayanTopContent);
      bayanObject.bayan.appendChild(bayanTop);
      bayanObject.top.bayan = bayanTop;

      let bayanBottom = document.createElement("div");
      bayanBottom.classList.add("bayan__bottom");
      bayanBottom.appendChild(bayanBottomContent);
      bayanObject.bayan.appendChild(bayanBottom);
      bayanObject.bottom.bayan = bayanBottom;

      let bayanToggler = document.createElement('button')
      bayanToggler.type = 'button';
      bayanToggler.classList.add('bayan__toggler');
      bayanTopContent.appendChild(bayanToggler)


      bayanObject.top.bayan.addEventListener("click", (event) => {
        toggleBayan(bayanObject);
      });
    }

    createBayanStructure(bayanObject);
  });
}

if (bayans.length > 0) {
  createBayans(bayans);
}

function initBayan(className) {
  let bayans = document.querySelectorAll(className);
  if (bayans.length > 0) {
    createBayans(bayans);
  }
}

