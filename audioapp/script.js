let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const pauseBtn = document.getElementById("pause");
const progressBar = document.getElementById("progress-bar");
const playlistElement = document.getElementById("playlist");
const audioUpload = document.getElementById("audio-upload");
const currentTrack = document.getElementById("current-track");

function createPlaylistItem() {
  playlistElement.innerHTML = "";
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.title;
    li.dataset.src = track.src;
    li.addEventListener("click", () => {
      audio.src = track.src;
      audio.play();
      updatePlayPauseButtons();
      document
        .querySelectorAll("#playlist li")
        .forEach((item) => item.classList.remove("active"));
      li.classList.add("active");
      currentTrack.textContent = `Now Playing: ${track.title}`;
    });
  });
}

function updatePlayPauseButtons() {
  if (audio.paused) {
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  } else {
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  }
}

function savePlaylist() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

createPlaylistItem();
audioUpload.addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const track = {
        title: file.name,
        src: e.target.result,
      };
      playlist.push(track);
      console.log(playlist);
      createPlaylistItem();
      savePlaylist();
    };
    reader.readAsDataURL(file);
  });
});
playBtn.addEventListener("click", () => {
  audio.play();
  updatePlayPauseButtons();
});
pauseBtn.addEventListener("click", () => {
  audio.pause();
  updatePlayPauseButtons();
});

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

audio.addEventListener("ended", () => {
  updatePlayPauseButtons();
  progressBar.style.width = "0%";
  audio.pause();
  playBtn.style.display = "inline";
  pauseBtn.style.display = "none";
});

