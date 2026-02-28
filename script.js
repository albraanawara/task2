const audio = document.getElementById("audio");
const icon = document.getElementById("icon");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const bar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
function togglePlay() {
  if (audio.paused) {
    audio.play();
    icon.classList.replace("fa-play", "fa-pause");
  } else {
    audio.pause();
    icon.classList.replace("fa-pause", "fa-play");
  }
}
function stopAudio() {
  audio.pause();          
  audio.currentTime = 0;  
  icon.classList.replace("fa-pause", "fa-play");
  bar.style.width = "0%";
  currentTimeEl.innerText = "0:00";
}
const tracks = [
  {
    src: "/Free piano loop 197 120 bpm.mp3",
    title: "Song One",
    artist: "Unknown Artist"
  },
  {
    src: "/Anitek_-_Komorebi.mp3",
    title: "Song Two",
    artist: "Anitek"
  }
];

let currentTrack = 0;


function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
function loadTrack(index) {
  audio.src = tracks[index].src;
  trackTitle.innerText = tracks[index].title;
  trackArtist.innerText = tracks[index].artist;

  audio.load();
  audio.play();

  icon.classList.replace("fa-play", "fa-pause");
  bar.style.width = "0%";
  currentTimeEl.innerText = "0:00";
}

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  bar.style.width = percent + "%";
  currentTimeEl.innerText = formatTime(audio.currentTime);
});


audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progress.addEventListener("click", (e) => {
  const width = progress.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
});

audio.volume = volume.value / 100;
volume.addEventListener("input", () => {
  audio.volume = volume.value / 100;
});

audio.addEventListener("ended", () => {
  icon.classList.replace("fa-pause", "fa-play");
  bar.style.width = "0%";
});
audio.addEventListener("ended", () => {
  nextTrack();
});
function prevTrack() {
  currentTrack--;

  if (currentTrack < 0) {
    currentTrack = tracks.length - 1; 
  }

  loadTrack(currentTrack);
}
function nextTrack() {
  currentTrack++;

  if (currentTrack >= tracks.length) {
    currentTrack = 0; 
  }

 loadTrack(currentTrack);
}