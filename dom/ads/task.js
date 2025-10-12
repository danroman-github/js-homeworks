function initRotators() {
    const rotators = document.querySelectorAll('.rotator');
    
    rotators.forEach(rotator => {
        const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
        let activeIndex = 0;
        let timer = null;
        
        function activateCase(index) {
            cases.forEach(caseElement => {
                caseElement.classList.remove('rotator__case_active');
            });
            
            const activeCase = cases[index];
            activeCase.classList.add('rotator__case_active');
            
            const color = activeCase.dataset.color;
            activeCase.style.color = color;
            
            const speed = parseInt(activeCase.dataset.speed);
            
            restartTimer(speed);
        }
        
        function nextCase() {
            activeIndex = (activeIndex + 1) % cases.length;
            activateCase(activeIndex);
        }
        
        function restartTimer(speed) {
            if (timer) {
                clearInterval(timer);
            }
            
            timer = setInterval(nextCase, speed);
        }
        
        activateCase(activeIndex);
    });
}

document.addEventListener('DOMContentLoaded', initRotators);