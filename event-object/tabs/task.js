const tabsContainer = document.getElementById('tabs1');

const tabs = tabsContainer.querySelectorAll('.tab');
const tabContents = tabsContainer.querySelectorAll('.tab__content');

// Функция для переключения вкладок
function activateTab(tabIndex) {
    tabs.forEach(tab => {
        tab.classList.remove('tab_active');
    });
    
    tabContents.forEach(content => {
        content.classList.remove('tab__content_active');
    });
    
    tabs[tabIndex].classList.add('tab_active');

    tabContents[tabIndex].classList.add('tab__content_active');
}

// Обработчики клика на каждую вкладку
tabs.forEach((tab, index) => {
    tab.addEventListener('click', function() {
        activateTab(index);
    });
});
