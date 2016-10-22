const key = `&api_key=dc6zaTOxFJmzC`;
const giphy = `http://api.giphy.com/v1/gifs/search?q=`

let topics = [
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

const renderGif = ({images, rating, playing}, i) => {
  const playingImg = `<img class="gif__img" src="${images.fixed_width.webp}" />`;
  const pausedImg = `<img class="gif__img" src="${images.original_still.url}" />`;
  const Img = playing ? playingImg : pausedImg;
  return `<div class="gif" data-index="${i}">
    ${Img}
    <p>Raing: ${rating}</p>
  </div>`
};

class GifSet {
  constructor({gifs, renderGifs, handleClick}) {
    this.$gifs = document.getElementById('gifs');

    this.$gifs.addEventListener('click', (e) => {
      const index = e.target.parentElement.dataset.index;
      handleClick(index);
    }, false);
  }
  renderGifs(gifs) {
    this.$gifs.innerHTML = '';
    this.$gifs.innerHTML = gifs.map(renderGif)
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
      renderGifs: this.renderGifs,
      handleClick: this.togglePlay.bind(this)
    });

    this.gifs = [];
  }
  btnClick(topic) {
    fetch(`${giphy}${topic}${key}`)
      .then(res => res.json())
      .then(res => {
        return this.gifs = res.data.map(gif => {
          gif.playing = false;
          return gif;
        })}
      )
      .then(() => {
        this.gifSet.renderGifs(this.gifs)
      });
  }
  addBtn(topic) {
    topics = [topic, ...topics];
    this.btnGrp.renderAll();
  }
  togglePlay(index) {
    this.gifs[index].playing = !this.gifs[index].playing;
    this.gifSet.renderGifs(this.gifs);
  }
}

new App;
