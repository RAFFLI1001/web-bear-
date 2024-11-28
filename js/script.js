const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = new Audio('Pop.mp3');
const backgroundMusic = document.getElementById('background-music'); // Elemen audio untuk backsound

let tanahSebelumnya;
let selesai;
let skor;
let waktu = 30;
let timerId;
let gameBerjalan = false;

// Fungsi untuk memilih tanah secara acak
function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

// Fungsi untuk memilih waktu acak
function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Fungsi untuk memunculkan tikus
function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

// Fungsi untuk memulai permainan
function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();

  // Mainkan backsound ketika permainan dimulai
  backgroundMusic.play();

  setTimeout(() => {
    selesai = true;
  }, 30000); // 30 detik

  waktu = 30;
  document.getElementById("waktu").textContent = waktu;
  timer();
}

// Fungsi untuk mengatur timer
function timer() {
  timerId = setInterval(() => {
    waktu--;
    document.getElementById("waktu").textContent = waktu;

    if (waktu <= 0) {
      clearInterval(timerId);
      gameBerjalan = false;
      // Hentikan backsound ketika waktu habis
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0; // Reset ke awal

      alert("Waktu habis! Skor akhir Anda: " + document.querySelector(".papan-skor").textContent);
      resetGame();
    }
  }, 1000);
}

// Fungsi untuk mereset permainan
function resetGame() {
  // Reset skor
  document.querySelector(".papan-skor").textContent = "0";
  // Reset waktu
  document.getElementById("waktu").textContent = "30";
  // Mengakhiri interval yang ada
  clearInterval(timerId);
  gameBerjalan = false;
}

// Fungsi untuk memukul tikus
function pukul() {
  if (this.parentNode.classList.contains('muncul')) { // Cek jika tikus sedang muncul
    skor++;
    this.parentNode.classList.remove('muncul');
    pop.currentTime = 0; // Reset waktu audio ke awal
    pop.play(); // Mainkan suara
    papanSkor.textContent = skor;
  }
}

// Event listener untuk klik pada tikus
tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

// Event listener untuk tombol mulai
document.querySelector('#start-button').addEventListener('click', () => {
  pop.load(); // Memuat audio saat permainan dimulai
  mulai();
});
