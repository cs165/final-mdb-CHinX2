class HomeScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._gotoMain = this._gotoMain.bind(this);
  }

  show() {
    this.containerElement.classList.remove('inactive');

    // add button

    for (let i = 0; i < FLASHCARD_DECKS.length; i++)
    {
      var btn = document.createElement('div');
      btn.textContent =  FLASHCARD_DECKS[i].title;
      btn.id = i;
      btn.addEventListener('click', this._gotoMain);
      document.querySelector('#choices').appendChild(btn);
    }
  }

  hide() {
    // remove button
    var list = document.querySelector('#choices');
    while(list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }
    this.containerElement.classList.add('inactive');
  }

  _gotoMain(event) {
    document.dispatchEvent(new CustomEvent('goto-main'));
  }
}
