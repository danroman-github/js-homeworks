const dropdowns = document.querySelectorAll('.dropdown');

// Добавляем обработчики событий
dropdowns.forEach(dropdown => {
    const dropdownValue = dropdown.querySelector('.dropdown__value');
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const dropdownItems = dropdown.querySelectorAll('.dropdown__item');

     dropdownValue.addEventListener('click', function() {
        document.querySelectorAll('.dropdown__list_active').forEach(activeList => {
            if (activeList !== dropdownList) {
                activeList.classList.remove('dropdown__list_active');
            }
        });
        
        dropdownList.classList.toggle('dropdown__list_active');
    });

    // Обработчики для каждого пункта меню
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            const link = this.querySelector('.dropdown__link');
            const newValue = link.textContent.trim();
            
            dropdownValue.textContent = newValue;
            
            dropdownList.classList.remove('dropdown__list_active');
        });
    });
});