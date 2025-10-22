document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const fileInput = document.getElementById('file');
    const progress = document.getElementById('progress');
    const fileNameDisplay = document.querySelector('.input__wrapper-desc');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Имя файла...';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (fileInput.files.length === 0) {
            alert('Пожалуйста, выберите файл для загрузки');
            return;
        }

        const file = fileInput.files[0];
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                progress.value = 1.0;
                alert('Файл успешно загружен!');
            } else {
                alert('Ошибка при загрузке файла');
                progress.value = 0.0;
            }
        });

        xhr.addEventListener('error', () => {
            alert('Произошла ошибка при отправке файла');
            progress.value = 0.0;
        });

        xhr.open('POST', form.action);
        const formData = new FormData(form);
        xhr.send(formData);
    });
});