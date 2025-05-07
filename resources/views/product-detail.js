document.addEventListener('DOMContentLoaded', function() {
    // Thay đổi ảnh khi click thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Xóa active class từ tất cả thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            // Thêm active class cho thumbnail được click
            this.classList.add('active');
            // Thay đổi ảnh chính
            mainImage.src = this.querySelector('img').src;
        });
    });
    
    // Thay đổi số lượng
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.quantity-selector input');
    
    minusBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    });
    
    // Chọn màu sắc
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Thêm vào giỏ hàng
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtn.addEventListener('click', function() {
        // Tăng số lượng giỏ hàng
        let currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + parseInt(qtyInput.value);
        
        // Hiệu ứng/hiển thị thông báo
        showNotification('Đã thêm vào giỏ hàng');
    });
    
    // Hiển thị thông báo
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Thêm style cho notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});