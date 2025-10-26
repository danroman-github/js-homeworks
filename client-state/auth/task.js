document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin__form');
    const signin = document.getElementById('signin');
    const welcome = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');

    const savedUserId = localStorage.getItem('user_id');
    if (savedUserId) {
        showWelcome(savedUserId);
    }

    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(signinForm);

        fetch('https://students.netoservices.ru/nestjs-backend/auth', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('user_id', data.user_id);
                showWelcome(data.user_id);
            } else {
                alert('Неверный логин/пароль');
            }

            signinForm.reset();
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при авторизации');
            signinForm.reset();
        });
    });

    function showWelcome(userId) {
        userIdSpan.textContent = userId;
        signin.classList.remove('signin_active');

        const title = document.createElement('h2');
        title.className = 'title';
        title.textContent = 'Вход';

        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'btn';
        logoutBtn.textContent = 'Выйти';
        logoutBtn.id = 'logout__btn';
        logoutBtn.style.marginLeft = '10px';

        const container = signin.parentNode;
        container.appendChild(title);
        container.appendChild(logoutBtn);

        logoutBtn.addEventListener('click', function() {
            logout();
        });

        welcome.classList.add('welcome_active');
    }

    function logout() {
        localStorage.removeItem('user_id');

        welcome.classList.remove('welcome_active');

        const title = document.querySelector('.title');
        const logoutBtn = document.getElementById('logout__btn');

        if (title) {
            title.remove();
        }
        if (logoutBtn) {
            logoutBtn.remove();
        }

        signin.classList.add('signin_active');

        signinForm.reset();
    }
});