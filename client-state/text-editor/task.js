document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    
    const savedText = localStorage.getItem('editorText');
    if (savedText) {
        editor.value = savedText;
    }
    
    editor.addEventListener('input', function() {
        localStorage.setItem('editorText', editor.value);
    });
	
	// Кнопка "Очистить содержимое"
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Очистить содержимое';
    clearButton.type = 'button';
    clearButton.className = 'clear-button';
    
    // Обработчик события для кнопки
    clearButton.addEventListener('click', function() {
        editor.value = '';
        localStorage.setItem('editorText', '');
    });
    
    editor.parentNode.appendChild(clearButton);
});
