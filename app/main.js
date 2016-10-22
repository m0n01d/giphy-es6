const key = `&api_key=dc6zaTOxFJmzC`;
const giphy = `http://api.giphy.com/v1/gifs/search?q=`

let topics = [
  'cats',
  'dogs',
  'penguins',i
  'giraffes',
  'elephants',
  'dragons',
  'hedgehog',
  'frog',
];

class ButtonGroup {
  constructor({handleClick}) {
    this.$buttons = document.getElementById('buttons');
    this.$buttons.addEventListener('click', e => handleClick(e.target.dataset.topic), false);
    this.renderAll();
  }
  renderOne(topic) {
    return `<button data-topic="${topic.toLowerCase()}">${topic}</button>`
  }
  renderAll() {
    this.$buttons.innerHTML = '';
    this.$buttons.innerHTML = topics.map(this.renderOne).join('')
  }
}

class AddTopic {
  constructor({onEnter}) {
    this.newTopic = document.getElementById('new-topic');
    this.newTopic.addEventListener('keyup', (e) => {
      if (e.which === 13) {
        onEnter(e.target.value);
        e.target.value = '';
      }
    }, false);
  }
}

class GifSet {
  constructor({gifs, renderGifs}) {
    this.$gifs = document.getElementById('gifs');
  }
  renderGifs(gifs) {
    this.$gifs.innerHTML = '';
    this.$gifs.innerHTML = gifs.map(gif => (
      `<div class="gif">
        <img class="gif__img" src="${gif.images.fixed_width.webp}" />
        <p>Raing: ${gif.rating}</p>
      </div>`
    ))
  }
}

class App {
  constructor() {
    this.addTopic = new AddTopic({
      onEnter: this.addBtn.bind(this),
    });
    this.btnGrp = new ButtonGroup({
      handleClick: this.btnClick.bind(this),
    });
    this.gifSet = new GifSet({
      gifs: [],
      renderGifs: this.renderGifs
    })
  }
  btnClick(topic) {
    fetch(`${giphy}${topic}${key}`)
      .then(res => res.json())
      .then(res => {
        this.gifSet.renderGifs(res.data)
      });
  }
  addBtn(topic) {
    topics = [topic, ...topics];
    this.btnGrp.renderAll();
  }
}

new App;
