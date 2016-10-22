const key = `&api_key=dc6zaTOxFJmzC`;
const giphy = `http://api.giphy.com/v1/gifs/search?q=`

const topics = [
  'cats',
  'dogs',
  'penguins',
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

class App {
  constructor() {
    this.btnGrp = new ButtonGroup({
      handleClick: this.btnClick.bind(this),
    });
  }
  btnClick(topic) {
    fetch(`${giphy}${topic}${key}`)
      .then(res => res.json())
      .then(res => {
        this.gifSet.renderGifs(res.data)
      });
  }

}

new App;
