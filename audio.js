Howler.volume(0.5)
const audio = {
  backgroundMusic: new Howl({
    src: 'assests/backgroundMusic.wav',
    loop: true
  }),
  enemyShoot: new Howl({
    src: 'assests/enemyShoot.wav'
  }),
  explode: new Howl({
    src: 'assests/explode.wav'
  }),
  gameOver: new Howl({
    src: 'assests/gameOver.mp3'
  }),
  bomb: new Howl({
    src: 'assests/bomb.mp3'
  }),
  shoot: new Howl({
    src: 'assests/shoot.wav'
  }),
  start: new Howl({
    src: './audio/start.mp3'
  })
}