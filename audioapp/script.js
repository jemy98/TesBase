let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const pauseBtn = document.getElementById('pause');
const progressBar = document.getElementById('progress-bar');
const playlistElement = document.getElementById('playlist');
const audioUpload = document.getElementById('audio-upload');
const currentTrack = document.getElementById('current-track');