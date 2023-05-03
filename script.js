const screen = document.querySelector('.screen');
const toggleBtn = document.querySelector('.fa-moon');
const play = document.querySelector('.fa-play');
const song = document.querySelector('.song');
const track = document.querySelector('.track');
const cover = document.querySelector('.cover');
const length = document.querySelector('.length');
const indi = document.querySelector('.indi');
const heart = document.querySelector('.fa-heart');


let durationSec, durationMin;
let currentSec, currentMin;
let deg;

//When page fully loaded
song.onloadeddata = () => {
  //Set song Duration
  durationSec = parseInt(song.duration % 60);
  durationMin = parseInt(song.duration / 60);
  
  //Set Track Max to Song Duration
  track.max = Math.floor(song.duration);
  
  //Adding 0 if Secend or minute Lesthen 10
  durationMin = durationMin < 10 ? '0' + durationMin : durationMin;
  durationSec = durationSec < 10 ? '0' + durationSec : durationSec;
  
  //Set Song Duration in DOM
  length.children[1].innerText = `${durationMin}:${durationSec}`;
  
  // Update Functoin
    load()
};


//Loading Song
const load = () => {
  //Set Track Value to Song Duration
  track.value = song.currentTime;
  //Set Secend And Minute
  currentSec = parseInt(song.currentTime % 60);
  currentMin = parseInt(song.currentTime / 60);
  //Add 0 if lesthen 10
  currentSec = currentSec < 10 ? '0' + currentSec : currentSec;
  currentMin = currentMin < 10 ? '0' + currentMin : currentMin;
  
  //Set song Start 00
  length.children[0].innerText = `${currentMin}:${currentSec}`;
  
  //When End
  if (song.currentTime === song.duration) {
    cover.classList.remove('coverpic');
    indi.innerText = 'Music';
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  };
  
};
setInterval(load, 999);


//Updating Song When Forward or backward
const updateSong = (e) => {
  //Set track value to Song currentTime
  song.currentTime = e.target.value;
  
  //Play 
  song.play();
  indi.innerText = 'Playing';
  play.classList.add('fa-play');
  //Blanking play
  setTimeout(() => {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }, 100);
  
  load()
  
};
track.addEventListener('input',updateSong);


//Play Song
const playSong = (e) => {
  //Get target Element class
  const clas = e.target.classList[1];
  if (clas === 'fa-play') {
    song.play()
    play.classList.replace('fa-play', 'fa-pause');
    cover.classList.add('coverpic');
    indi.innerText = 'Playing';
    
  }else {
    play.classList.replace('fa-pause', 'fa-play');
    song.pause();
    cover.classList.remove('coverpic');
    indi.innerText = 'Pause';
  };
  
};
play.addEventListener('click',playSong);



//Dark Mood Toggle
const toggle = (e) => {
  //Get Target element class
  const clas = e.target.classList[1];
  screen.classList.toggle('dark');
  
  if (clas === 'fa-moon') {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    toggleBtn.style.justifyContent = 'right';
  }else {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    toggleBtn.style.justifyContent = 'left';
  };
  
};
toggleBtn.addEventListener('click',toggle);

//kshapii