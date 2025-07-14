// Wix Velo code examples for Ecommerce Project

// ...Velo code here...
// Wix Velo Code - Complete Implementation
// File: velo-code.js

// Frontend Code (Page Code)
import { cart } from 'public/cart.js';
import { products } from 'public/products.js';
import { payments } from 'backend/payments.js';
import wixData from 'wix-data';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

// Page load event
$w.onReady(function () {
    loadProducts();
    setupSearchAndFilter();
    setupCartFunctionality();
    setupContactForm();
    setupAnimations();
});

// Load products from CMS
async function loadProducts() {
    try {
        const results = await wixData.query("Products")
            .ascending("title")
            .find();
        
        displayProducts(results.items);
        setupProductRepeater(results.items);
    } catch (error) {
        console.error("Error loading products:", error);
        showErrorMessage("Failed to load products");
    }
}

// Setup product repeater
function setupProductRepeater(products) {
    $w("#productRepeater").data = products;
    
    $w("#productRepeater").onItemReady(($item, itemData) => {
        $item("#productTitle").text = itemData.title;
        $item("#productDescription").text = itemData.description;
        $item("#productPrice").text = `₹${itemData.price}`;
        $item("#productImage").src = itemData.image;
        
        // Add to cart button
        $item("#addToCartBtn").onClick(() => {
            addToCart(itemData);
        });
        
        // Product hover effects
        $item("#productCard").onMouseIn(() => {
            $item("#productCard").style.transform = "translateY(-8px)";
        });
        
        $item("#productCard").onMouseOut(() => {
            $item("#productCard").style.transform = "translateY(0)";
        });
    });
}

// Search and filter functionality
function setupSearchAndFilter() {
    let currentFilter = 'all';
    let currentPriceRange = 'all';
    
    // Search input
    $w("#searchInput").onInput((event) => {
        const searchTerm = event.target.value.toLowerCase();
        filterProductsBySearch(searchTerm);
    });
    
    // Category filters
    $w("#filterAll").onClick(() => {
        currentFilter = 'all';
        updateActiveFilter("#filterAll");
        applyFilters();
    });
    
    $w("#filterArt").onClick(() => {
        currentFilter = 'art';
        updateActiveFilter("#filterArt");
        applyFilters();
    });
    
    $w("#filterDesign").onClick(() => {
        currentFilter = 'design';
        updateActiveFilter("#filterDesign");
        applyFilters();
    });
    
    $w("#filterAccessories").onClick(() => {
        currentFilter = 'accessories';
        updateActiveFilter("#filterAccessories");
        applyFilters();
    });
    
    // Price filters
    $w("#filterLowPrice").onClick(() => {
        currentPriceRange = 'low';
        updateActiveFilter("#filterLowPrice");
        applyFilters();
    });
    
    $w("#filterHighPrice").onClick(() => {
        currentPriceRange = 'high';
        updateActiveFilter("#filterHighPrice");
        applyFilters();
    });
    
    async function applyFilters() {
        try {
            let query = wixData.query("Products");
            
            // Apply category filter
            if (currentFilter !== 'all') {
                query = query.eq("category", currentFilter);
            }
            
            // Apply price filter
            if (currentPriceRange === 'low') {
                query = query.lt("price", 1000);
            } else if (currentPriceRange === 'high') {
                query = query.ge("price", 1000);
            }
            
            const results = await query.find();
            displayProducts(results.items);
        } catch (error) {
            console.error("Error applying filters:", error);
        }
    }
}

// Update active filter button
function updateActiveFilter(activeButtonId) {
    const filterButtons = [
        "#filterAll", "#filterArt", "#filterDesign", 
        "#filterAccessories", "#filterLowPrice", "#filterHighPrice"
    ];
    
    filterButtons.forEach(buttonId => {
        $w(buttonId).style.backgroundColor = buttonId === activeButtonId ? "#667eea" : "#ffffff";
        $w(buttonId).style.color = buttonId === activeButtonId ? "#ffffff" : "#333333";
    });
}

// Search products by text
async function filterProductsBySearch(searchTerm) {
    try {
        const results = await wixData.query("Products")
            .or(
                wixData.query("Products").contains("title", searchTerm),
                wixData.query("Products").contains("description", searchTerm)
            )
            .find();
        
        displayProducts(results.items);
    } catch (error) {
        console.error("Error searching products:", error);
    }
}

// Display products
function displayProducts(products) {
    $w("#productRepeater").data = products;
    
    if (products.length === 0) {
        $w("#noProductsMessage").show();
        $w("#productRepeater").hide();
    } else {
        $w("#noProductsMessage").hide();
        $w("#productRepeater").show();
    }
}

// Shopping cart functionality
function setupCartFunctionality() {
    let cartItems = [];
    let cartTotal = 0;
    
    // Cart icon click
    $w("#cartIcon").onClick(() => {
        openCartModal();
    });
    
    // Close cart modal
    $w("#closeCartModal").onClick(() => {
        $w("#cartModal").hide();
    });
    
    // Add item to cart
    window.addToCart = function(product) {
        const existingItem = cartItems.find(item => item._id === product._id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        showAddToCartAnimation();
    };
    
    // Update cart display
    function updateCartDisplay()