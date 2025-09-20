let dead = 0;
let lost = 0;

const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Функция для обновления счетчиков
function updateCounters() {
    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
}

// Функция для проверки победы/поражения
function checkGameStatus() {
    if (dead >= 10) {
        alert('Победа!');
        resetGame();
        return true;
    }
    
    if (lost >= 5) {
        alert('Вы проиграли.');
        resetGame();
        return true;
    }
    
    return false;
}

// сброс игры
function resetGame() {
    dead = 0;
    lost = 0;
    updateCounters();
}

// Обработки клика по лунке
function handleHoleClick(event) {
    const hole = event.target;
    
    if (hole.className.includes('hole_has-mole')) {
        dead++;
    } else {
        lost++;
    }
    
    updateCounters();
    
    checkGameStatus();
}

const holes = document.querySelectorAll('.hole');

// Обработчик клика для каждой лунки
for (let i = 0; i < holes.length; i++) {
    holes[i].onclick = handleHoleClick;
}