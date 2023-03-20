/*
  snackMaker — созадет функцию для вызова в определнном контейнере определенный шаблон c текстом

  snackObject

 */
class snackMaker {

  visibleClass = 'snacky--visible';

  constructor(message, container, removeAfter = 5000) {
    const snack = this.createSnack(message);
    this.spawnSnack(snack, container);
    this.removeSnack(snack, removeAfter);
  }

  createSnack(message) {

    const snack = document.createElement('div');
    snack.classList.add('snacky');

    const snackMessage = document.createElement('p');
    snackMessage.innerText = message;
    snackMessage.classList.add('snacky__message');
    snack.append(snackMessage)

    const snackCloser = document.createElement('button');
    snackCloser.type = "button";
    snackCloser.classList.add('snacky__closer');
    snack.append(snackCloser);
    snackCloser.addEventListener("click", (e) => {
      this.removeSnack(snack, 100);
    });


    return snack;
  }
  spawnSnack(snack, container = document.body, delay = 100) {
    container.append(snack);

    setTimeout((e) => {
      snack.classList.add(this.visibleClass);
    }, delay);
  }
  removeSnack(snack, delay = 200) {
    setTimeout((e) => {
      snack.classList.remove(this.visibleClass);
    }, delay);
    setTimeout((e) => {
      snack.remove();
    }, delay + 800);
  }
}

window.snacky = snackMaker;