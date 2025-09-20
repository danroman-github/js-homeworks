const img = document.getElementById("cookie")
const counter = document.getElementById('clicker__counter')

img.onclick = () => {
	counter.textContent = Number(counter.textContent) + 1
    
    img.style.transform = 'scale(1.1)';

    setTimeout(() => {
        img.style.transform = 'scale(1)';
    }, 100);
};