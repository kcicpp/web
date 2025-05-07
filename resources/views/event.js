document.addEventListener('DOMContentLoaded', function() {
    // Load gallery images
    const gallery = document.getElementById('gallery');
    
    const galleryImages = [
        'images/event-gallery1.jpg',
        'images/event-gallery2.jpg',
        'images/event-gallery3.jpg',
        'images/event-gallery4.jpg',
        'images/event-gallery5.jpg',
        'images/event-gallery6.jpg'
    ];
    
    function renderGallery() {
        gallery.innerHTML = '';
        
        galleryImages.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            galleryItem.innerHTML = `
                <img src="${image}" alt="Hình ảnh sự kiện">
            `;
            
            gallery.appendChild(galleryItem);
        });
    }
    
    renderGallery();
});