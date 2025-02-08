const products = [
    { id: 1, name: 'Product 1', price: 19.99 },
    { id: 2, name: 'Product 2', price: 29.99 },
    { id: 3, name: 'Product 3', price: 49.99 }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    if (document.body.contains(document.getElementById('cart-items'))) {
        renderCart();
    }
});

function addToCart(event) {
    const productId = event.target.dataset.productId;
    const product = products.find(p => p.id == productId);

    if (!product) {
        return;
    }

    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        alert(`${product.name} is already in your cart.`);
    } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById('cart-count').textContent = cart.length;
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is empty!</p>`;
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `<p>${item.name} - $${item.price}</p>`;
            cartItemsContainer.appendChild(itemElement);

            totalPrice += item.price;
        });
    }

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

const clearCartButton = document.getElementById('clear-cart');
if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        cart = [];
        renderCart();
        document.getElementById('cart-count').textContent = 0;
    });
}
