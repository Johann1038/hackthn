// Application State
let currentUser = null;
let currentPage = 'home';
let cart = [];
let orders = [];
let filteredProducts = [];
let currentFilters = {
    category: '',
    brand: '',
    priceRange: 200000,
    rating: '',
    search: ''
};
let currentSort = 'relevance';

// Sample Data
const categories = [
    {
        name: "Electronics",
        subcategories: ["Smartphones", "Laptops", "Audio", "Tablets", "Cameras"]
    },
    {
        name: "Clothing",
        subcategories: ["Men", "Women", "Kids", "Shoes", "Accessories"]
    },
    {
        name: "Books",
        subcategories: ["Fiction", "Non-fiction", "Academic", "Children", "Comics"]
    },
    {
        name: "Home & Kitchen", 
        subcategories: ["Appliances", "Furniture", "Decor", "Storage", "Cleaning"]
    },
    {
        name: "Sports",
        subcategories: ["Fitness", "Outdoor", "Team Sports", "Water Sports", "Winter Sports"]
    }
];

const brands = ["Apple", "Samsung", "Sony", "Nike", "Adidas", "Levi's", "Dell", "HP", "Canon", "LG"];

let products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
        price: 134900,
        originalPrice: 159900,
        discount: 16,
        category: "Electronics",
        subcategory: "Smartphones",
        brand: "Apple",
        rating: 4.8,
        reviews: 1250,
        image: "https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro",
        images: ["https://via.placeholder.com/300x300/1a1a1a/ffffff?text=iPhone+15+Pro", "https://via.placeholder.com/300x300/2a2a2a/ffffff?text=iPhone+Back", "https://via.placeholder.com/300x300/3a3a3a/ffffff?text=iPhone+Side"],
        availability: "in-stock",
        stock: 45,
        specifications: {
            "Display": "6.7-inch Super Retina XDR",
            "Processor": "A17 Pro",
            "Storage": "256GB",
            "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
        },
        tags: ["smartphone", "apple", "iphone", "premium", "5g"]
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        description: "Premium Android phone with S Pen, incredible cameras, and AI features",
        price: 124999,
        originalPrice: 129999,
        discount: 4,
        category: "Electronics",
        subcategory: "Smartphones", 
        brand: "Samsung",
        rating: 4.7,
        reviews: 980,
        image: "https://via.placeholder.com/300x300/1a365d/ffffff?text=Galaxy+S24",
        images: ["https://via.placeholder.com/300x300/1a365d/ffffff?text=Galaxy+S24", "https://via.placeholder.com/300x300/2a466d/ffffff?text=Galaxy+Back"],
        availability: "in-stock",
        stock: 32,
        specifications: {
            "Display": "6.8-inch Dynamic AMOLED 2X",
            "Processor": "Snapdragon 8 Gen 3",
            "Storage": "256GB",
            "Camera": "200MP Main + 50MP Periscope Telephoto + 12MP Ultra Wide + 12MP Telephoto"
        },
        tags: ["smartphone", "samsung", "galaxy", "android", "s-pen"]
    },
    {
        id: 3,
        name: "MacBook Air M3",
        description: "Incredibly thin and light laptop with M3 chip and all-day battery life",
        price: 114900,
        originalPrice: 119900,
        discount: 4,
        category: "Electronics",
        subcategory: "Laptops",
        brand: "Apple",
        rating: 4.9,
        reviews: 756,
        image: "https://via.placeholder.com/300x300/f7fafc/1a1a1a?text=MacBook+Air",
        images: ["https://via.placeholder.com/300x300/f7fafc/1a1a1a?text=MacBook+Air"],
        availability: "in-stock", 
        stock: 28,
        specifications: {
            "Display": "13.6-inch Liquid Retina",
            "Processor": "Apple M3",
            "Memory": "8GB",
            "Storage": "256GB SSD"
        },
        tags: ["laptop", "macbook", "apple", "m3", "ultrabook"]
    },
    {
        id: 4,
        name: "Sony WH-1000XM5 Headphones",
        description: "Industry-leading noise canceling headphones with exceptional sound quality",
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        category: "Electronics",
        subcategory: "Audio",
        brand: "Sony",
        rating: 4.6,
        reviews: 1420,
        image: "https://via.placeholder.com/300x300/2d3748/ffffff?text=Sony+WH1000XM5",
        images: ["https://via.placeholder.com/300x300/2d3748/ffffff?text=Sony+WH1000XM5"],
        availability: "in-stock",
        stock: 67,
        specifications: {
            "Type": "Over-ear",
            "Battery": "30 hours",
            "Connectivity": "Bluetooth 5.2",
            "Features": "Active Noise Cancellation"
        },
        tags: ["headphones", "sony", "wireless", "noise-cancelling", "audio"]
    },
    {
        id: 5,
        name: "Levi's 501 Original Jeans",
        description: "Classic straight leg jeans, the original blue jean since 1873",
        price: 3999,
        originalPrice: 4999,
        discount: 20,
        category: "Clothing",
        subcategory: "Jeans",
        brand: "Levi's",
        rating: 4.4,
        reviews: 890,
        image: "https://via.placeholder.com/300x300/1e3a8a/ffffff?text=Levis+501",
        images: ["https://via.placeholder.com/300x300/1e3a8a/ffffff?text=Levis+501"],
        availability: "in-stock",
        stock: 125,
        specifications: {
            "Fit": "Straight",
            "Material": "100% Cotton",
            "Origin": "Made in USA",
            "Sizes": "28-42 waist"
        },
        tags: ["jeans", "levis", "denim", "classic", "mens"]
    },
    {
        id: 6,
        name: "Nike Air Max 270",
        description: "Lifestyle shoes with large Air Max unit and breathable mesh upper",
        price: 12995,
        originalPrice: 14995,
        discount: 13,
        category: "Clothing",
        subcategory: "Shoes",
        brand: "Nike",
        rating: 4.5,
        reviews: 1100,
        image: "https://via.placeholder.com/300x300/dc2626/ffffff?text=Nike+Air+Max",
        images: ["https://via.placeholder.com/300x300/dc2626/ffffff?text=Nike+Air+Max"],
        availability: "in-stock",
        stock: 89,
        specifications: {
            "Type": "Lifestyle",
            "Upper": "Mesh and synthetic",
            "Sole": "Air Max cushioning",
            "Sizes": "UK 6-12"
        },
        tags: ["shoes", "nike", "sneakers", "air-max", "lifestyle"]
    },
    {
        id: 7,
        name: "The Alchemist - Paulo Coelho",
        description: "International bestseller about following your dreams and finding your destiny",
        price: 299,
        originalPrice: 399,
        discount: 25,
        category: "Books",
        subcategory: "Fiction",
        brand: "HarperCollins",
        rating: 4.7,
        reviews: 2500,
        image: "https://via.placeholder.com/300x300/8b5cf6/ffffff?text=The+Alchemist",
        images: ["https://via.placeholder.com/300x300/8b5cf6/ffffff?text=The+Alchemist"],
        availability: "in-stock",
        stock: 200,
        specifications: {
            "Author": "Paulo Coelho",
            "Pages": "208",
            "Language": "English",
            "Publisher": "HarperCollins"
        },
        tags: ["book", "fiction", "bestseller", "paulo-coelho", "inspirational"]
    },
    {
        id: 8,
        name: "Instant Pot Duo 7-in-1",
        description: "Multi-use pressure cooker that replaces 7 kitchen appliances",
        price: 8999,
        originalPrice: 12999,
        discount: 31,
        category: "Home & Kitchen",
        subcategory: "Appliances",
        brand: "Instant Pot",
        rating: 4.6,
        reviews: 1850,
        image: "https://via.placeholder.com/300x300/374151/ffffff?text=Instant+Pot",
        images: ["https://via.placeholder.com/300x300/374151/ffffff?text=Instant+Pot"],
        availability: "in-stock",
        stock: 45,
        specifications: {
            "Capacity": "6 Quart",
            "Functions": "Pressure Cook, Slow Cook, Rice Cooker, Yogurt Maker, Steamer, Sauté, Food Warmer",
            "Material": "Stainless Steel",
            "Warranty": "1 Year"
        },
        tags: ["kitchen", "appliance", "pressure-cooker", "instant-pot", "cooking"]
    },
    {
        id: 9,
        name: "Yoga Mat Premium",
        description: "Non-slip exercise mat perfect for yoga, pilates, and fitness workouts",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "Sports",
        subcategory: "Fitness",
        brand: "Gaiam",
        rating: 4.3,
        reviews: 567,
        image: "https://via.placeholder.com/300x300/059669/ffffff?text=Yoga+Mat",
        images: ["https://via.placeholder.com/300x300/059669/ffffff?text=Yoga+Mat"],
        availability: "in-stock",
        stock: 150,
        specifications: {
            "Size": "68 x 24 inches",
            "Thickness": "6mm",
            "Material": "TPE",
            "Features": "Non-slip, Eco-friendly"
        },
        tags: ["yoga", "fitness", "exercise", "mat", "workout"]
    },
    {
        id: 10,
        name: "Dell XPS 13 Laptop",
        description: "Premium ultrabook with InfinityEdge display and latest Intel processors",
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        category: "Electronics",
        subcategory: "Laptops",
        brand: "Dell",
        rating: 4.5,
        reviews: 434,
        image: "https://via.placeholder.com/300x300/1f2937/ffffff?text=Dell+XPS+13",
        images: ["https://via.placeholder.com/300x300/1f2937/ffffff?text=Dell+XPS+13"],
        availability: "in-stock",
        stock: 22,
        specifications: {
            "Display": "13.4-inch FHD+",
            "Processor": "Intel Core i7",
            "Memory": "16GB RAM",
            "Storage": "512GB SSD"
        },
        tags: ["laptop", "dell", "xps", "ultrabook", "premium"]
    }
];

const users = [
    {
        id: 1,
        email: "admin@shopmart.com",
        password: "admin123",
        role: "admin",
        name: "Admin User",
        phone: "+91 9876543210"
    },
    {
        id: 2,
        email: "user@example.com", 
        password: "user123",
        role: "customer",
        name: "John Doe",
        phone: "+91 9876543211"
    }
];

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(price);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    
    return stars;
}

function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    currentPage = pageId.replace('Page', '');
}

function goToHome() {
    showPage('homePage');
    currentFilters.search = '';
    document.getElementById('searchInput').value = '';
    filterProducts();
}

// Authentication Functions
function initAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }
}

function updateUserInterface() {
    const loginBtn = document.getElementById('loginBtn');
    const userDropdown = document.getElementById('userDropdown');
    const userInfo = document.getElementById('userInfo');
    
    if (currentUser) {
        loginBtn.textContent = currentUser.name;
        loginBtn.classList.remove('btn--outline');
        loginBtn.classList.add('btn--secondary');
        userInfo.textContent = `${currentUser.name} (${currentUser.role})`;
        userDropdown.classList.remove('hidden');
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.classList.add('btn--outline');
        loginBtn.classList.remove('btn--secondary');
        userDropdown.classList.add('hidden');
    }
}

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface();
        closeModal('loginModal');
        showToast(`Welcome back, ${user.name}!`);
        
        if (user.role === 'admin') {
            showPage('adminPage');
            initAdminDashboard();
        }
        return true;
    }
    return false;
}

function register(userData) {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        return false;
    }
    
    const newUser = {
        id: users.length + 1,
        email: userData.email,
        password: userData.password,
        role: 'customer',
        name: userData.name,
        phone: userData.phone
    };
    
    users.push(newUser);
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    updateUserInterface();
    closeModal('registerModal');
    showToast(`Account created successfully! Welcome, ${newUser.name}!`);
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    showPage('homePage');
    showToast('Logged out successfully');
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Product Functions
function initProducts() {
    filteredProducts = [...products];
    renderProducts();
    renderCategories();
    renderBrandFilters();
}

function renderCategories() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = '';
    
    const allOption = document.createElement('li');
    allOption.innerHTML = '<button class="category-btn active" data-category="">All Categories</button>';
    categoryList.appendChild(allOption);
    
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `<button class="category-btn" data-category="${category.name}">${category.name}</button>`;
        categoryList.appendChild(li);
    });
    
    // Add event listeners to category buttons
    categoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-btn')) {
            const category = e.target.getAttribute('data-category');
            currentFilters.category = category;
            filterProducts();
            updateCategoryButtons();
        }
    });
}

function renderBrandFilters() {
    const brandFilters = document.getElementById('brandFilters');
    brandFilters.innerHTML = '';
    
    brands.forEach(brand => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" value="${brand}"> ${brand}`;
        label.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.brand = brand;
                // Uncheck other brand filters
                document.querySelectorAll('#brandFilters input[type="checkbox"]').forEach(cb => {
                    if (cb !== e.target) cb.checked = false;
                });
            } else {
                currentFilters.brand = '';
            }
            filterProducts();
        });
        brandFilters.appendChild(label);
    });
}

function updateCategoryButtons() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnCategory = btn.getAttribute('data-category');
        if (btnCategory === currentFilters.category || 
            (btnCategory === '' && !currentFilters.category)) {
            btn.classList.add('active');
        }
    });
}

function filterProducts() {
    filteredProducts = products.filter(product => {
        const matchesCategory = !currentFilters.category || product.category === currentFilters.category;
        const matchesBrand = !currentFilters.brand || product.brand === currentFilters.brand;
        const matchesPrice = product.price <= currentFilters.priceRange;
        const matchesRating = !currentFilters.rating || product.rating >= parseFloat(currentFilters.rating);
        const matchesSearch = !currentFilters.search || 
            product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.brand.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(currentFilters.search.toLowerCase()));
        
        return matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesSearch;
    });
    
    sortProducts();
    renderProducts();
}

function sortProducts() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order for relevance
            break;
    }
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const resultsCount = document.getElementById('resultsCount');
    
    resultsCount.textContent = `Showing ${filteredProducts.length} products`;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', product.id);
        productCard.innerHTML = `
            <div class="product-image">${product.name}</div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    <span class="discount">${product.discount}% off</span>
                </div>
                <button class="btn btn--primary btn--full-width add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners after rendering
    attachProductEventListeners();
}

function attachProductEventListeners() {
    // Product card click for navigation to detail
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.add-to-cart-btn')) {
                const productId = parseInt(card.getAttribute('data-product-id'));
                showProductDetail(productId);
            }
        });
    });
    
    // Add to cart button clicks
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="back-nav">
            <button class="btn btn--outline" onclick="goToHome()">← Back to Products</button>
        </div>
        <div class="product-detail-content">
            <div class="product-images">
                <div class="main-image">${product.name}</div>
            </div>
            <div class="detail-info">
                <h1>${product.name}</h1>
                <div class="detail-rating">
                    <span class="rating-stars">${generateStars(product.rating)}</span>
                    <span>(${product.reviews} reviews)</span>
                </div>
                <div class="detail-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    <span class="discount">${product.discount}% off</span>
                </div>
                <p>${product.description}</p>
                <div class="detail-actions">
                    <button class="btn btn--primary btn--lg" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn--secondary btn--lg" onclick="addToWishlist(${product.id})">Wishlist</button>
                </div>
                <div class="specifications">
                    <h3>Specifications</h3>
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <div class="spec-row">
                            <div class="spec-label">${key}</div>
                            <div class="spec-value">${value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    showPage('productDetailPage');
}

// Cart Functions
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            product
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showToast('Item removed from cart');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <button class="btn btn--primary" onclick="goToHome()">Continue Shopping</button>
            </div>
        `;
        cartSummary.innerHTML = '';
        return;
    }
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.product.name}</div>
            <div class="cart-item-info">
                <h3 class="cart-item-name">${item.product.name}</h3>
                <div class="cart-item-price">${formatPrice(item.product.price)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateCartQuantity(${item.productId}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                </div>
                <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.productId})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    const shipping = subtotal > 500 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    
    cartSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>
        <button class="btn btn--primary btn--full-width btn--lg" onclick="proceedToCheckout()">Proceed to Checkout</button>
    `;
}

function proceedToCheckout() {
    if (!currentUser) {
        showModal('loginModal');
        showToast('Please login to proceed', 'error');
        return;
    }
    
    renderCheckout();
    showPage('checkoutPage');
}

function renderCheckout() {
    const orderSummary = document.getElementById('orderSummary');
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.product.price * item.quantity;
    });
    
    const shipping = subtotal > 500 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    
    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="order-items">
            ${cart.map(item => `
                <div class="order-item-summary">
                    <div>${item.product.name} x ${item.quantity}</div>
                    <div>${formatPrice(item.product.price * item.quantity)}</div>
                </div>
            `).join('')}
        </div>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        <div class="summary-row">
            <span>Tax</span>
            <span>${formatPrice(tax)}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(total)}</span>
        </div>
    `;
}

function placeOrder(orderData) {
    if (!currentUser) {
        showToast('Please login to place order', 'error');
        return;
    }
    
    const order = {
        id: orders.length + 1,
        userId: currentUser.id,
        items: [...cart],
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        status: 'pending',
        orderDate: new Date(),
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showToast('Order placed successfully!');
    showPage('ordersPage');
    renderOrders();
}

// Order Functions
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const userOrders = orders.filter(order => order.userId === currentUser?.id);
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = '<div class="empty-orders">No orders found</div>';
        return;
    }
    
    ordersList.innerHTML = '';
    
    userOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header">
                <div class="order-id">Order #${order.id}</div>
                <div class="order-status ${order.status}">${order.status.toUpperCase()}</div>
            </div>
            <div class="order-details">
                <p>Order Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                <p>Total: ${formatPrice(order.total)}</p>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div>${item.product.name} x ${item.quantity}</div>
                    `).join('')}
                </div>
            </div>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Admin Functions
function initAdminDashboard() {
    renderAdminProducts();
    renderAdminOrders();
    renderAnalytics();
}

function renderAdminProducts() {
    const adminProductsList = document.getElementById('adminProductsList');
    adminProductsList.innerHTML = '';
    
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'admin-product-item';
        productItem.innerHTML = `
            <div>
                <strong>${product.name}</strong>
                <div>₹${product.price} | Stock: ${product.stock}</div>
            </div>
            <div>
                <button class="btn btn--sm btn--secondary">Edit</button>
                <button class="btn btn--sm btn--outline" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        adminProductsList.appendChild(productItem);
    });
}

function renderAdminOrders() {
    const adminOrdersList = document.getElementById('adminOrdersList');
    adminOrdersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'admin-order-item';
        orderItem.innerHTML = `
            <div>
                <strong>Order #${order.id}</strong>
                <div>Total: ${formatPrice(order.total)}</div>
            </div>
            <div>
                <select class="form-control" onchange="updateOrderStatus(${order.id}, this.value)">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </div>
        `;
        adminOrdersList.appendChild(orderItem);
    });
}

function renderAnalytics() {
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const activeProducts = products.filter(p => p.availability === 'in-stock').length;
    
    document.getElementById('totalSales').textContent = totalSales.toLocaleString();
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('activeProducts').textContent = activeProducts;
    
    // Create sales chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#1FB8CD',
                backgroundColor: 'rgba(31, 184, 205, 0.1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        localStorage.setItem('orders', JSON.stringify(orders));
        showToast(`Order #${orderId} status updated to ${status}`);
    }
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    initProducts();
    
    // Logo click to go home
    const logo = document.querySelector('.logo h2');
    if (logo) {
        logo.addEventListener('click', goToHome);
        logo.style.cursor = 'pointer';
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value;
            filterProducts();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            currentFilters.search = searchInput.value;
            filterProducts();
        });
    }
    
    // Price range filter
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            priceValue.textContent = value.toLocaleString();
            currentFilters.priceRange = value;
            filterProducts();
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterProducts();
        });
    }
    
    // Rating filters
    document.querySelectorAll('.rating-filters input').forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                currentFilters.rating = e.target.value;
                // Uncheck other rating filters
                document.querySelectorAll('.rating-filters input').forEach(other => {
                    if (other !== e.target) other.checked = false;
                });
            } else {
                currentFilters.rating = '';
            }
            filterProducts();
        });
    });
    
    // User menu - Fixed click handler
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (currentUser) {
                const dropdown = document.getElementById('userDropdown');
                if (dropdown) {
                    dropdown.classList.toggle('hidden');
                }
            } else {
                showModal('loginModal');
            }
        });
    }
    
    // Cart button - Fixed click handler
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            renderCart();
            showPage('cartPage');
        });
    }
    
    // Auth forms
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (login(email, password)) {
                loginForm.reset();
            } else {
                showToast('Invalid email or password', 'error');
            }
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value,
                password: document.getElementById('registerPassword').value
            };
            
            if (register(userData)) {
                registerForm.reset();
            } else {
                showToast('User already exists', 'error');
            }
        });
    }
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const orderData = {
                shippingAddress: {
                    name: document.getElementById('shippingName').value,
                    address: document.getElementById('shippingAddress').value,
                    city: document.getElementById('shippingCity').value,
                    pincode: document.getElementById('shippingPincode').value
                },
                paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || 'cod'
            };
            
            placeOrder(orderData);
            checkoutForm.reset();
        });
    }
    
    // OTP functionality
    const otpLoginBtn = document.getElementById('otpLoginBtn');
    if (otpLoginBtn) {
        otpLoginBtn.addEventListener('click', () => {
            closeModal('loginModal');
            showModal('otpModal');
            const otp = generateOTP();
            showToast(`Your OTP is: ${otp}`, 'info');
            window.currentOTP = otp;
        });
    }
    
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const enteredOTP = document.getElementById('otpInput').value;
            
            if (enteredOTP === window.currentOTP) {
                login('user@example.com', 'user123');
                closeModal('otpModal');
                otpForm.reset();
            } else {
                showToast('Invalid OTP', 'error');
            }
        });
    }
    
    const resendOtpBtn = document.getElementById('resendOtpBtn');
    if (resendOtpBtn) {
        resendOtpBtn.addEventListener('click', () => {
            const otp = generateOTP();
            showToast(`New OTP: ${otp}`, 'info');
            window.currentOTP = otp;
        });
    }
    
    // Modal navigation
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => {
            closeModal('loginModal');
            showModal('registerModal');
        });
    }
    
    const showLoginBtn = document.getElementById('showLoginBtn');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => {
            closeModal('registerModal');
            showModal('loginModal');
        });
    }
    
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
    // User dropdown actions
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            showToast('Profile page coming soon');
            document.getElementById('userDropdown').classList.add('hidden');
        });
    }
    
    const ordersBtn = document.getElementById('ordersBtn');
    if (ordersBtn) {
        ordersBtn.addEventListener('click', () => {
            renderOrders();
            showPage('ordersPage');
            document.getElementById('userDropdown').classList.add('hidden');
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            document.getElementById('userDropdown').classList.add('hidden');
        });
    }
    
    // Admin navigation
    const adminProductsBtn = document.getElementById('adminProductsBtn');
    const adminOrdersBtn = document.getElementById('adminOrdersBtn');
    const adminAnalyticsBtn = document.getElementById('adminAnalyticsBtn');
    
    if (adminProductsBtn) {
        adminProductsBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
            document.getElementById('adminProducts').classList.remove('hidden');
            document.querySelectorAll('.admin-nav .btn').forEach(b => b.classList.remove('active'));
            adminProductsBtn.classList.add('active');
        });
    }
    
    if (adminOrdersBtn) {
        adminOrdersBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
            document.getElementById('adminOrders').classList.remove('hidden');
            document.querySelectorAll('.admin-nav .btn').forEach(b => b.classList.remove('active'));
            adminOrdersBtn.classList.add('active');
        });
    }
    
    if (adminAnalyticsBtn) {
        adminAnalyticsBtn.addEventListener('click', () => {
            document.querySelectorAll('.admin-section').forEach(s => s.classList.add('hidden'));
            document.getElementById('adminAnalytics').classList.remove('hidden');
            document.querySelectorAll('.admin-nav .btn').forEach(b => b.classList.remove('active'));
            adminAnalyticsBtn.classList.add('active');
        });
    }
    
    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const userMenu = document.getElementById('userMenu');
        const userDropdown = document.getElementById('userDropdown');
        if (userMenu && userDropdown && !userMenu.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
    });
});

// Global functions for onclick handlers
function addToWishlist(productId) {
    showToast('Added to wishlist (feature coming soon)');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products.splice(index, 1);
            renderAdminProducts();
            showToast('Product deleted successfully');
        }
    }
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.proceedToCheckout = proceedToCheckout;
window.placeOrder = placeOrder;
window.showProductDetail = showProductDetail;
window.addToWishlist = addToWishlist;
window.deleteProduct = deleteProduct;
window.updateOrderStatus = updateOrderStatus;
window.goToHome = goToHome;
