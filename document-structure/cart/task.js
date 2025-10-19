document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.product__quantity-control').forEach(control => {
        control.addEventListener('click', function() {
            const controlsContainer = this.closest('.product__quantity-controls');
            const valueElement = controlsContainer.querySelector('.product__quantity-value');
            let value = parseInt(valueElement.textContent);
            
            if (this.classList.contains('product__quantity-control_dec')) {
                if (value > 1) {
                    value--;
                    valueElement.textContent = value;
                }
            } else if (this.classList.contains('product__quantity-control_inc')) {
                value++;
                valueElement.textContent = value;
            }
        });
    });
    
    document.querySelectorAll('.product__add').forEach(addButton => {
        addButton.addEventListener('click', function() {
            const product = this.closest('.product');
            const productId = product.dataset.id;
            const productImage = product.querySelector('.product__image').src;
            const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);
            
            addToCart(productId, productImage, quantity);
            updateCartVisibility();
        });
    });
    
    // Функция добавления в корзину
    function addToCart(productId, productImage, quantity) {
        const cartProducts = document.querySelector('.cart__products');
        const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);
        
        if (existingProduct) {
            const countElement = existingProduct.querySelector('.cart__product-count');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + quantity;
        } else {
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.dataset.id = productId;
            
            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImage}">
                <div class="cart__product-count">${quantity}</div>
                <div class="cart__product-remove">×</div>
            `;
            
            // Обработчик для кнопки удаления
            const removeButton = cartProduct.querySelector('.cart__product-remove');
            removeButton.addEventListener('click', function() {
                cartProduct.remove();
                updateCartVisibility();
            });

            removeButton.style.cursor = 'pointer';
            
            cartProducts.appendChild(cartProduct);
        }
    }
    
    // Видимость корзины
    function updateCartVisibility() {
        const cart = document.querySelector('.cart');
        const cartProducts = document.querySelector('.cart__products');
        const hasProducts = cartProducts.querySelectorAll('.cart__product').length > 0;
        
        if (hasProducts) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    }
    
    updateCartVisibility();
});