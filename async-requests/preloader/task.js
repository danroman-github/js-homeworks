document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const items = document.getElementById('items');

    fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.json();
        })
        .then(data => {
            loader.classList.remove('loader_active');
            const valutes = data.response.Valute;
            
            items.innerHTML = '';
            
            Object.values(valutes).forEach(valute => {
                const item = document.createElement('div');
                item.classList.add('item');
                
                item.innerHTML = `
                    <div class="item__code">${valute.CharCode}</div>
                    <div class="item__value">${valute.Value}</div>
                    <div class="item__currency">руб.</div>
                `;
                
                items.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            loader.classList.remove('loader_active');
            items.innerHTML = '<div class="error">Не удалось загрузить данные</div>';
        });
});