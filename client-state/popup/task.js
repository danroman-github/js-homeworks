document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('subscribe-modal');
    const closeButton = document.querySelector('.modal__close');
    
	// Получение cookie
    function getCookie(name) {
        const cookies = document.cookie.split('; ');
        const cookie = cookies.find(c => c.startsWith(name + '='));
        return cookie ? cookie.substring(name.length + 1) : null;
    }
    
    // Установка cookie
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }
    
    const isModalClosed = getCookie('modalClosed');

    if (!isModalClosed) {
        modal.classList.add('modal_active');
    }
    
    closeButton.addEventListener('click', function() {
        modal.classList.remove('modal_active');
        setCookie('modalClosed', 'true', 1);
    });
});