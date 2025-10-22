document.addEventListener('DOMContentLoaded', function() {
  const titleElement = document.getElementById('poll__title');
  const answersContainer = document.getElementById('poll__answers');
  let currentPollData = null;

  // Функция "загрузка опроса"
  function loadPoll() {
    if (titleElement) {
      titleElement.textContent = 'Загрузка опроса...';
    }
    if (answersContainer) {
      answersContainer.innerHTML = '';
    }

    fetch('https://students.netoservices.ru/nestjs-backend/poll')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        currentPollData = data;
        renderPoll(data);
      })
      .catch(error => {
        console.error('Ошибка:', error);
        if (titleElement) {
          titleElement.textContent = 'Не удалось загрузить опрос. Попробуйте снова позже.';
        }
      });
  }

  // Функция "отображение опроса"
  function renderPoll(pollData) {
    if (!titleElement || !answersContainer) {
      console.error('Не найдены необходимые DOM-элементы');
      return;
    }

    titleElement.textContent = pollData.data.title;
    answersContainer.innerHTML = '';

    pollData.data.answers.forEach((answerText, index) => {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answerText;
      
      button.addEventListener('click', () => handleVote(pollData.id, index));
      answersContainer.appendChild(button);
    });
  }

  // Функция "обработка голосования"
  async function handleVote(pollId, answerIndex) {
    const buttons = answersContainer.querySelectorAll('.poll__answer');
    
    buttons.forEach(btn => {
      btn.disabled = true;
      btn.textContent = 'Голос учтен...';
    });

    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `vote=${pollId}&answer=${answerIndex}`
      });
      
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      
      const resultData = await response.json();
      showResults(resultData.stat);
      
    } catch (err) {
      console.error(err.message);
      
      buttons.forEach((btn, index) => {
        btn.disabled = false;
        btn.textContent = currentPollData.data.answers[index];
      });
      
      alert("Что-то пошло не так при обработке вашего голосования.");
    }
  }

  // Функция "отображение результатов"
  function showResults(stats) {
    if (!titleElement || !answersContainer) {
      console.error('Не найдены необходимые DOM-элементы');
      return;
    }

    titleElement.textContent = 'Результаты голосования:';

    answersContainer.innerHTML = '';

    const totalVotes = stats.reduce((sum, item) => sum + item.votes, 0);

    stats.forEach(statItem => {
      const percentage = totalVotes > 0 ? (statItem.votes / totalVotes * 100).toFixed(1) : 0;
      
      const resultElement = document.createElement('div');
      resultElement.innerHTML = `
        <div><strong>${statItem.answer}</strong>: ${statItem.votes} голосов (${percentage}%)</div>
      `;
      
      answersContainer.appendChild(resultElement);
    });

    const retryButton = document.createElement('button');
    retryButton.textContent = 'Проголосовать снова';
    retryButton.addEventListener('click', loadPoll);
    
    answersContainer.appendChild(retryButton);
  }

  loadPoll();
});