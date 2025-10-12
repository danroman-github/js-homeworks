function handleScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
  
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight && elementTop > 0) {
            element.classList.add('reveal_active');
        } else {
            element.classList.remove('reveal_active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
});