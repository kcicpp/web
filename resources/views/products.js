document.addEventListener('DOMContentLoaded', function() {
    // ========== DOM ELEMENTS ==========
    const productsGrid = document.getElementById('productsGrid');
    const priceRange = document.getElementById('priceRange');
    const currentPrice = document.getElementById('currentPrice');
    const sortBy = document.getElementById('sortBy');
    const colorOptions = document.querySelectorAll('.color-box');
    const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const showingCount = document.getElementById('showing-count');
    const totalCount = document.getElementById('total-count');

    // ========== SAMPLE PRODUCT DATA ==========
    const products = [
        {
            id: 1,
            name: 'Áo thun cổ tròn basic',
            price: 199000,
            oldPrice: 299000,
            image: '/public/images/img-8.png',
            category: 'Áo thun',
            sizes: ['S', 'M', 'L'],
            colors: ['black', 'white'],
            isNew: true,
            isBestSeller: false,
            createdAt: '2023-05-10'
        },
        {
            id: 2,
            name: 'Áo sơ mi trắng dáng rộng',
            price: 349000,
            image: 'images/product2.jpg',
            category: 'Áo sơ mi',
            sizes: ['M', 'L', 'XL'],
            colors: ['white', 'blue'],
            isNew: true,
            isBestSeller: true,
            createdAt: '2023-06-15'
        },
        {
            id: 3,
            name: 'Quần jeans slim fit đen',
            price: 499000,
            oldPrice: 599000,
            image: 'images/product3.jpg',
            category: 'Quần jeans',
            sizes: ['S', 'M', 'L'],
            colors: ['black'],
            isNew: false,
            isBestSeller: true,
            createdAt: '2023-04-20'
        },
        {
            id: 4,
            name: 'Đầm dự tiệc cổ V',
            price: 599000,
            image: 'images/product4.jpg',
            category: 'Đầm/Váy',
            sizes: ['S', 'M'],
            colors: ['red', 'black'],
            isNew: false,
            isBestSeller: false,
            createdAt: '2023-03-05'
        }
    ];

    // ========== INITIAL RENDER ==========
    totalCount.textContent = products.length;
    renderProducts(products);

    // ========== EVENT LISTENERS ==========
    priceRange.addEventListener('input', updatePriceDisplay);
    sortBy.addEventListener('change', filterAndSortProducts);
    applyFiltersBtn.addEventListener('click', filterAndSortProducts);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    colorOptions.forEach(color => {
        color.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // ========== CORE FUNCTIONS ==========
    function renderProducts(productsToRender) {
        productsGrid.innerHTML = productsToRender.map(product => `
            <div class="product-item">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='images/default-product.jpg'">
                    ${product.oldPrice ? '<span class="product-badge">SALE</span>' : ''}
                    ${product.isNew ? '<span class="product-badge new">MỚI</span>' : ''}
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
            </div>
        `).join('');

        showingCount.textContent = productsToRender.length;
        addCartEventListeners();
    }

    function filterAndSortProducts() {
        // Get filter values
        const maxPrice = parseInt(priceRange.value);
        const selectedSizes = getSelectedSizes();
        const selectedColors = getSelectedColors();
        const sortValue = sortBy.value;

        // Filter products
        let filteredProducts = products.filter(product => {
            const matchPrice = product.price <= maxPrice;
            const matchSizes = selectedSizes.length === 0 || 
                             product.sizes.some(size => selectedSizes.includes(size));
            const matchColors = selectedColors.length === 0 || 
                              product.colors.some(color => selectedColors.includes(color));
            
            return matchPrice && matchSizes && matchColors;
        });

        // Sort products
        filteredProducts = sortProducts(filteredProducts, sortValue);
        
        // Render results
        renderProducts(filteredProducts);
    }

    function sortProducts(products, sortValue) {
        switch(sortValue) {
            case 'price-asc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...products].sort((a, b) => b.price - a.price);
            case 'newest':
                return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'best-selling':
                return [...products].sort((a, b) => b.isBestSeller - a.isBestSeller);
            default:
                return products;
        }
    }

    function resetFilters() {
        // Reset UI elements
        priceRange.value = 1000000;
        currentPrice.textContent = '1.000.000đ';
        sortBy.value = 'default';
        
        sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
        colorOptions.forEach(color => color.classList.remove('active'));
        
        // Reset to all products
        renderProducts(products);
    }

    // ========== HELPER FUNCTIONS ==========
    function updatePriceDisplay() {
        currentPrice.textContent = formatPrice(priceRange.value) + 'đ';
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function getSelectedSizes() {
        return Array.from(sizeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    function getSelectedColors() {
        return Array.from(colorOptions)
            .filter(color => color.classList.contains('active'))
            .map(color => color.dataset.color);
    }

    function addCartEventListeners() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const cartCount = document.querySelector('.cart-count');
                let count = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = count + 1;
                showNotification('Đã thêm sản phẩm vào giỏ hàng');
            });
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Initialize price display
    updatePriceDisplay();
});

// Add notification styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
        font-size: 14px;
    }
    .notification.show {
        opacity: 1;
    }
    .product-badge.new {
        background-color: #2196F3;
    }
`;
document.head.appendChild(notificationStyles);