document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('.has-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    document.body.appendChild(tooltip);
    
    tooltipElements.forEach((element) => {
        element.addEventListener('click', (event) => {
            event.preventDefault();
            
            if (tooltip.classList.contains('tooltip_active') &&
                tooltip.textContent === element.getAttribute('title')) {
                tooltip.classList.remove('tooltip_active');
                return;
            }
            
            tooltip.textContent = element.getAttribute('title');
            positionTooltip(tooltip, element);
            
            tooltip.classList.add('tooltip_active');
        });
    });
    
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.has-tooltip')) {
            tooltip.classList.remove('tooltip_active');
        }
    });

    // Функция позиционирования
    function positionTooltip(tooltip, element) {
        const position = element.getAttribute('data-position') || 'top';
        const elementRect = element.getBoundingClientRect();
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        switch (position) {
            case 'top':
                tooltip.style.left = `${elementRect.left + scrollX}px`;
                tooltip.style.top = `${elementRect.top + scrollY - tooltip.offsetHeight - 5}px`;
                break;
            case 'left':
                tooltip.style.left = `${elementRect.left + scrollX - tooltip.offsetWidth - 5}px`;
                tooltip.style.top = `${elementRect.top + scrollY}px`;
                break;
            case 'right':
                tooltip.style.left = `${elementRect.right + scrollX + 5}px`;
                tooltip.style.top = `${elementRect.top + scrollY}px`;
                break;
            case 'bottom':
                tooltip.style.left = `${elementRect.left + scrollX}px`;
                tooltip.style.top = `${elementRect.bottom + scrollY + 5}px`;
                break;
        }
    }
});