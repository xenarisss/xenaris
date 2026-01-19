const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = '⏸';
  } else {
    audio.pause();
    playPause.textContent = '▶';
  }
});

audio.addEventListener('loadedmetadata', () => {
  progress.max = audio.duration;
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

    
}


const cursor = document.getElementById('cursor');
const canvas = document.getElementById('cursorTrail');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const trail = []; // массив точек для следа
const maxTrail = 20; // количество точек в следе

let mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  cursor.style.left = mouse.x + 'px';
  cursor.style.top = mouse.y + 'px';
});

function animate() {
  // Обновляем размер canvas на случай ресайза
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // Добавляем текущую позицию в массив следа
  trail.push({ x: mouse.x, y: mouse.y });
  if (trail.length > maxTrail) trail.shift(); // удаляем старые точки

  // Очистка canvas с лёгкой прозрачностью для плавного эффекта
  ctx.fillStyle = 'rgba(0,0,0,0)'; // полностью прозрачный
  ctx.clearRect(0, 0, width, height);

  // Рисуем след
  trail.forEach((point, index) => {
    const alpha = (index + 1) / trail.length; // прозрачность точек уменьшается к концу
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(animate);
}

animate();
