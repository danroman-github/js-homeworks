const timer = document.getElementById('timer')

const timerInterval = setInterval(() => {
	timer.textContent = Number(timer.textContent) - 1

    if (Number(timer.textContent) <= 0) {
        clearInterval(timerInterval);
        alert('Вы победили в конкурсе!');
    }

}, 1000)