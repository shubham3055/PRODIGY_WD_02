let timer;
let isRunning = false;
let ms = 0, sec = 0, min = 0, hr = 0;
let lastLapTime = 0;

const progress = document.getElementById("progress");
const circumference = 2 * Math.PI * 90;
progress.style.strokeDasharray = circumference;

const sound = document.getElementById("clickSound");

function playSound() {
  sound.currentTime = 0;
  sound.play();
}

function pad(num, size = 2) {
  return num.toString().padStart(size, '0');
}

function getTotalTime() {
  return hr * 3600000 + min * 60000 + sec * 1000 + ms;
}

function updateDisplay() {
  document.getElementById("display").innerText =
    `${pad(hr)}:${pad(min)}:${pad(sec)}:${pad(ms,3)}`;
}

function updateCircle() {
  let totalSeconds = hr * 3600 + min * 60 + sec;
  let offset = circumference - (totalSeconds % 60) / 60 * circumference;
  progress.style.strokeDashoffset = offset;
}

function start() {
  playSound();
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      ms += 10;

      if (ms >= 1000) {
        ms = 0;
        sec++;
      }
      if (sec >= 60) {
        sec = 0;
        min++;
      }
      if (min >= 60) {
        min = 0;
        hr++;
      }

      updateDisplay();
      updateCircle();
    }, 10);
  }
}

function pause() {
  playSound();
  isRunning = false;
  clearInterval(timer);
}

function reset() {
  playSound();
  clearInterval(timer);
  isRunning = false;
  ms = sec = min = hr = 0;
  lastLapTime = 0;
  updateDisplay();
  updateCircle();
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    playSound();

    const currentTime = getTotalTime();
    const diff = currentTime - lastLapTime;
    lastLapTime = currentTime;

    const li = document.createElement("li");
    li.innerText = `Lap: ${formatTime(currentTime)} (+${formatTime(diff)})`;
    document.getElementById("laps").appendChild(li);
  }
}

function formatTime(time) {
  let h = Math.floor(time / 3600000);
  let m = Math.floor((time % 3600000) / 60000);
  let s = Math.floor((time % 60000) / 1000);
  let ms = time % 1000;

  return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(ms,3)}`;
}

function toggleTheme() {
  document.body.classList.toggle("light");
}
