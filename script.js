const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");
const bar = document.querySelector(".center-bar");
const wrap = document.getElementById("progressWrap");
const timeText = document.getElementById("time");
const volume = document.getElementById("volume");
const typing = document.getElementById("typing");
const eq = document.querySelectorAll(".equalizer span");

// typing name
const nameText = "Fatar";
let i = 0;
(function type(){
  if(i < nameText.length){
    typing.textContent += nameText[i++];
    setTimeout(type,120);
  }
})();

function play(){
  music.play();
  playBtn.textContent = "⏸";
  eq.forEach(b=>b.style.animationPlayState="running");
}

function pause(){
  music.pause();
  playBtn.textContent = "▶";
  eq.forEach(b=>b.style.animationPlayState="paused");
}

playBtn.onclick = e=>{
  e.stopPropagation();
  music.paused ? play() : pause();
};

// autoplay after first click
let firstClick=true;
document.addEventListener("click",()=>{
  if(firstClick && music.paused){
    play();
    firstClick=false;
  }
});

music.addEventListener("timeupdate",()=>{
  if(!music.duration) return;
  bar.style.width = (music.currentTime/music.duration)*100+"%";
  timeText.textContent =
    `${format(music.currentTime)} / ${format(music.duration)}`;
});

wrap.onclick = e=>{
  const r = wrap.getBoundingClientRect();
  music.currentTime = ((e.clientX-r.left)/r.width)*music.duration;
};

volume.oninput = ()=> music.volume = volume.value;
music.volume = volume.value;

function format(t){
  const m=Math.floor(t/60);
  const s=Math.floor(t%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}
