// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto slide change
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Load products
    const productsGrid = document.querySelector('.products-grid');
    
    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Áo thun cổ tròn basic',
            price: 199000,
            oldPrice: 299000,
            image: 'images/product1.jpg',
            badge: 'Sale'
        },
        {
            id: 2,
            name: 'Quần jeans slim fit',
            price: 399000,
            oldPrice: 499000,
            image: 'images/product2.jpg',
            badge: 'New'
        },
        {
            id: 3,
            name: 'Đầm dự tiệc cổ V',
            price: 599000,
            image: 'images/product3.jpg'
        },
        {
            id: 4,
            name: 'Áo sơ mi trắng',
            price: 249000,
            image: 'images/product4.jpg'
        }
    ];
    
    // Render products
    function renderProducts() {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            productItem.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}đ</span>
                        ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}đ</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Thêm vào giỏ</button>
                        <button class="wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productItem);
        });
    }
    
    // Format price with dots as thousand separators
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    renderProducts();
    
    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || 
            e.target.closest('.add-to-cart')) {
            cartCount++;
            cartCountElement.textContent = cartCount;
            showNotification('Đã thêm sản phẩm vào giỏ hàng');
        }
        
        if (e.target.classList.contains('wishlist') || 
            e.target.closest('.wishlist')) {
            showNotification('Đã thêm vào yêu thích');
        }
    });
});

// Notification system
function showNotification(message) {
    const noti = document.createElement('div');
    noti.className = 'notification';
    noti.textContent = message;
    document.body.appendChild(noti);
    
    setTimeout(() => {
        noti.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        noti.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(noti);
        }, 300);
    }, 3000);
}

// Add notification styles to head
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    .notification.show {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyle);