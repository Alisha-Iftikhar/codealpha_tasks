const songs = [
  {
    title: "Acoustic Breeze",
    artist: "Bensound",
    src: "audio/bensound-acousticbreeze.mp3",
    cover: "cover1.jpg",
  },
  {
    title: "Creative Minds",
    artist: "Bensound",
    src: "audio/bensound-creativeminds.mp3",
    cover: "cover2.jpg",
  },
  {
    title: "Sunny",
    artist: "Bensound",
    src: "audio/bensound-sunny.mp3",
    cover: "cover3.jpg",
  },
  {
    title: "Dubstep",
    artist: "Bensound",
    src: "audio/bensound-dubstep.mp3",
    cover: "cover4.jpg",
  },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const search = document.getElementById("search");
const volumeSlider = document.getElementById("volume-slider");

let songIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  highlightActiveSong();
}

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
}
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

// Next / Prev
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const percent = (currentTime / duration) * 100;
  progress.style.width = `${percent}%`;

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = isNaN(duration) ? "0:00" : formatTime(duration);
}
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

function renderPlaylist(list = songs) {
  playlist.innerHTML = "";
  list.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} — ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = songs.indexOf(song);
      loadSong(song);
      playSong();
    });
    playlist.appendChild(li);
  });
  highlightActiveSong();
}

function highlightActiveSong() {
  const items = playlist.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === songIndex);
  });
}

search.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );
  renderPlaylist(filtered);
});

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong); // autoplay next

loadSong(songs[songIndex]);
renderPlaylist();
audio.volume = 0.8;
