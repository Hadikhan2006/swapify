class MarketplaceManager {
  constructor() {
    this.items = this.generateDummyItems()
    this.init()
  }

  init() {
    this.renderItems()
    this.setupEventListeners()
    this.updateResultsCount()
  }

  // Function to generate dummy items with specific images
  generateDummyItems() {
    const dummyItems = []
    const categories = ["electronics", "books", "fashion", "furniture", "sports", "toys", "home-garden", "vehicles"]
    const locations = ["Karachi, Sindh", "Lahore, Punjab", "Islamabad, ICT", "Faisalabad, Punjab", "Rawalpindi, Punjab"]
    const conditions = ["New", "Like New", "Good", "Fair", "Used - Acceptable"]
    const titles = {
      electronics: ["iPhone 14 Pro Max", "MacBook Pro M2", "Canon EOS R5", "Gaming PC", "Smartwatch"],
      books: ["Medical Textbooks Set", "Fantasy Novel Collection", "History Encyclopedia", "Children's Story Books"],
      fashion: ["Designer Dress", "Men's Leather Jacket", "Sneaker Collection", "Traditional Wear"],
      furniture: ["Modern Sofa Set", "Dining Table", "Office Chair", "Bookshelf"],  // Furniture category
      sports: ["Electric Bicycle", "Cricket Bat", "Football Kit", "Gym Equipment"],
      toys: ["Remote Control Car", "Board Game Bundle", "Lego Set", "Action Figures"],
      "home-garden": ["Smart Home Devices", "Garden Tool Set", "Decorative Vase", "Indoor Plant"],
      vehicles: ["Motorcycle", "Scooter", "Car Accessories", "Bicycle"],
    }
    const descriptions = [
      "Excellent condition, barely used. Looking to swap for something new.",
      "Perfect for students. Well-maintained and ready for a new owner.",
      "Professional grade, with minor wear and tear. Open to all offers.",
      "Like new, comes with original packaging. Great deal!",
      "Used but in good working order. Ideal for someone starting out.",
      "A classic item, still has a lot of life left. Swap for something unique.",
      "Rare find, perfect for collectors. Serious inquiries only.",
      "Lightly used, very comfortable. Looking for a quick swap.",
    ]

    // Function to return specific images based on the item title
    const getImageUrls = (title) => {
      const images = {
        "iPhone 14 Pro Max": [
          "https://i5.walmartimages.com/seo/Restored-Apple-iPhone-14-Pro-Max-128GB-Deep-Purple-AT-T-MQ8R3LL-A-Refurbished_1385d15c-17b0-4392-8fc1-414cae1a51ed.75f6972b7faabe8490df9e82084adf01.jpeg", // Replace with actual image URLs
          "https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-space-black-220907_inline.jpg.large.jpg",
          "https://m.media-amazon.com/images/I/51KLILQ67nL._UF894,1000_QL80_.jpg",
        ],
        "MacBook Pro M2": [
          "https://static.independent.co.uk/2022/06/22/11/macbook%20pro%20m2%20indybest.jpg?width=1200&height=800&crop=1200:800",
          "https://www.notebookcheck.net/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M2_Pro/AKA8518.jpg",
          "https://external-preview.redd.it/notebookcheck-apple-macbook-pro-16-2023-review-m2-max-v0-YpwzcjdfuDptKCuSEGQ2K8E34kGfmezglTqzTDdl4ik.jpg?auto=webp&s=bcad0da786705b02809ba265afe25ed65ebf6cb4",
        ],
        "Bookshelf": [
          "https://interwood.pk/cdn/shop/files/20250422_1602_Wall-Mounted_Bookshelf_Display_remix_01jsejgvn8ecnvkqtx5k7ev4y3_11111111111.png?v=1752501131",
          "https://woodking.pk/wp-content/uploads/2023/07/WhatsApp-Image-2021-03-23-at-10.10.02-AM.jpeg",
        ],
        // Add more specific images for each item as needed
      }

      return images[title] || [
        "https://via.placeholder.com/600x400.png?text=Default+Image", 
        "https://via.placeholder.com/600x400.png?text=Default+Image+2",
        "https://via.placeholder.com/600x400.png?text=Default+Image+3",
      ]
    }

    // Generate 156 dummy items
    for (let i = 1; i <= 156; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)]
      const title = titles[category][Math.floor(Math.random() * titles[category].length)]

      dummyItems.push({
        id: i,
        title: title,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        time: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        badge: i % 5 === 0 ? "Hot Deal" : i % 7 === 0 ? "Featured" : "New",
        category: category,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        rating: (Math.random() * (5 - 3) + 3).toFixed(1),
        swaps: Math.floor(Math.random() * 200) + 10,
        images: getImageUrls(title), // Assign images based on title
        seller: {
          name: `User ${Math.floor(Math.random() * 1000)}`,
          location: locations[Math.floor(Math.random() * locations.length)],
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
          swaps: Math.floor(Math.random() * 50) + 5,
        },
        reviews: [
          { user: "Ali S.", rating: 5, comment: "Great item, smooth swap!", date: "2 days ago" },
          { user: "Sara K.", rating: 4, comment: "Item as described, good communication.", date: "1 week ago" },
        ],
      })
    }
    return dummyItems
  }

  // Function to render the items in the marketplace
  renderItems() {
    const container = document.getElementById("itemsContainer")
    if (!container) return

    const itemsHTML = this.items
      .map(
        (item) => `
        <div class="item-card-featured enhanced-card animate-scale-in" data-item-id="${item.id}">
          <div class="item-image-container">
            ${item.images
              .map(
                (image) => `
                  <div class="item-image holographic" style="background-image: url('${image}'); background-size: cover; background-position: center;">
                  </div>
                `
              )
              .join("")}
            <div class="item-badge animate-glow">${item.badge}</div>
            <button class="item-favorite" onclick="toggleFavorite(${item.id})">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="item-content">
            <h5 class="item-title">${item.title}</h5>
            <p class="item-description">${item.description}</p>
            <div class="item-meta mb-3">
              <div class="item-location">
                <i class="fas fa-map-marker-alt me-1"></i>
                ${item.location}
              </div>
              <div class="item-time">
                <i class="fas fa-clock me-1"></i>
                ${item.time}
              </div>
            </div>
            <div class="item-stats mb-3">
              <div class="stat-item">
                <i class="fas fa-star text-warning me-1"></i>
                <span>${item.rating}</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-exchange-alt text-success me-1"></i>
                <span>${item.swaps} swaps</span>
              </div>
            </div>
            <div class="item-actions">
              <button class="btn btn-primary flex-fill me-2 animate-glow" onclick="window.SwapifyApp.addToCart(${item.id}, '${item.title}')">
                <i class="fas fa-shopping-cart me-1"></i>Add to Cart
              </button>
              <button class="btn btn-outline-primary" onclick="window.SwapifyApp.viewItem(${item.id})">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("")

    container.innerHTML = itemsHTML
  }

  // Setup event listeners for various actions (search, filters, etc.)
  setupEventListeners() {
    const searchInput = document.getElementById("searchInput")
    const searchSuggestions = document.getElementById("searchSuggestions")
    if (searchInput && searchSuggestions) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase()
        if (query.length > 2) {
          const suggestions = this.items
            .filter(
              (item) => item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
            )
            .slice(0, 5)

          if (suggestions.length > 0) {
            searchSuggestions.innerHTML = suggestions
              .map(
                (item) => `
              <div class="suggestion-item" onclick="selectSearchSuggestion('${item.title}')">
                <i class="fas fa-box suggestion-icon"></i>
                <span class="suggestion-text">${item.title}</span>
                <span class="suggestion-category text-muted">${item.category}</span>
              </div>
            `,
              )
              .join("")
            searchSuggestions.style.display = "block"
          } else {
            searchSuggestions.style.display = "none"
          }
        } else {
          searchSuggestions.style.display = "none"
        }
      })

      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
          searchSuggestions.style.display = "none"
        }
      })
    }

    // Additional event listeners for location selector, filters, etc.
    // Add other event listeners as needed...
  }

  // Apply filters for items based on search, category, location, etc.
  applyFilters() {
    const query = document.getElementById("searchInput").value.toLowerCase()
    const category = document.getElementById("categoryFilter").value
    const location = document.getElementById("locationInput").value
    const conditionFilters = Array.from(
document.querySelectorAll('.filter-section input[type="checkbox"]:checked'),
    ).map((cb) => cb.value)
    const sortBy = document.getElementById("sortBy").value

    const filteredItems = this.items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
      const matchesCategory = category === "" || item.category === category
      const matchesLocation = location === "" || item.location.toLowerCase().includes(location.toLowerCase())
      const matchesCondition =
        conditionFilters.length === 0 || conditionFilters.includes(item.condition.toLowerCase().replace(/\s/g, "-"))
      return matchesSearch && matchesCategory && matchesLocation && matchesCondition
    })

    // Sorting items (based on date, popularity, etc.)
    filteredItems.sort((a, b) => {
      if (sortBy === "newest") {
        return a.time.localeCompare(b.time)
      } else if (sortBy === "oldest") {
        return b.time.localeCompare(a.time)
      } else if (sortBy === "popular") {
        return b.swaps - a.swaps
      }
      return 0
    })

    const container = document.getElementById("itemsContainer")
    if (container) {
      container.innerHTML = filteredItems
        .map(
          (item) => `
        <div class="item-card-featured enhanced-card animate-scale-in" data-item-id="${item.id}">
          <div class="item-image-container">
            <div class="item-image holographic" style="background-image: url('${item.images[0]}'); background-size: cover; background-position: center;">
            </div>
            <div class="item-badge animate-glow">${item.badge}</div>
            <button class="item-favorite" onclick="toggleFavorite(${item.id})">
              <i class="fas fa-heart"></i>
            </button>
          </div>
          <div class="item-content">
            <h5 class="item-title">${item.title}</h5>
            <p class="item-description">${item.description}</p>
            <div class="item-meta mb-3">
              <div class="item-location">
                <i class="fas fa-map-marker-alt me-1"></i>
                ${item.location}
              </div>
              <div class="item-time">
                <i class="fas fa-clock me-1"></i>
                ${item.time}
              </div>
            </div>
            <div class="item-stats mb-3">
              <div class="stat-item">
                <i class="fas fa-star text-warning me-1"></i>
                <span>${item.rating}</span>
              </div>
              <div class="stat-item">
                <i class="fas fa-exchange-alt text-success me-1"></i>
                <span>${item.swaps} swaps</span>
              </div>
            </div>
            <div class="item-actions">
              <button class="btn btn-primary flex-fill me-2 animate-glow" onclick="window.SwapifyApp.addToCart(${item.id}, '${item.title}')">
                <i class="fas fa-shopping-cart me-1"></i>Add to Cart
              </button>
              <button class="btn btn-outline-primary" onclick="window.SwapifyApp.viewItem(${item.id})">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      `,
        )
        .join("")
    }
    this.updateResultsCount(filteredItems.length)
  }

  // Update the results count in the UI
  updateResultsCount(count = this.items.length) {
    const resultsCountElement = document.getElementById("resultsCount")
    if (resultsCountElement) {
      resultsCountElement.textContent = `Showing 1-${Math.min(12, count)} of ${count} items`
    }
  }

  // Toggle between grid and list view
  toggleView(viewType) {
    const gridViewBtn = document.getElementById("gridView")
    const listViewBtn = document.getElementById("listView")
    const itemsContainer = document.getElementById("itemsContainer")

    if (gridViewBtn && listViewBtn && itemsContainer) {
      if (viewType === "grid") {
        gridViewBtn.classList.add("active")
        listViewBtn.classList.remove("active")
        itemsContainer.classList.remove("list-view")
        itemsContainer.classList.add("items-grid")
      } else {
        listViewBtn.classList.add("active")
        gridViewBtn.classList.remove("active")
        itemsContainer.classList.remove("items-grid")
        itemsContainer.classList.add("list-view")
      }
      window.SwapifyApp.showToast(`Switched to ${viewType} view`, "info")
    }
  }

  // Load more items (for demo purposes)
  loadMoreItems() {
    const loadingSkeleton = document.getElementById("loadingSkeleton")
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    if (loadingSkeleton && loadMoreBtn) {
      loadingSkeleton.style.display = "block"
      loadMoreBtn.disabled = true
      loadMoreBtn.innerHTML = '<span class="loading-spinner me-2"></span>Loading...'

      setTimeout(() => {
        // Simulate loading more items
        const newItems = this.generateDummyItems().slice(0, 6) // Load 6 more dummy items
        this.items = [...this.items, ...newItems] // Add to existing items (for demo)
        this.applyFilters() // Re-render with new items and current filters

        loadingSkeleton.style.display = "none"
        loadMoreBtn.disabled = false
        loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Load More Items'
        window.SwapifyApp.showToast("More items loaded!", "success")
      }, 1500)
    }
  }

  // Get an item by ID
  getItemById(id) {
    return this.items.find((item) => item.id === id)
  }
}

// Global functions for marketplace interactions
window.selectSearchSuggestion = (title) => {
  document.getElementById("searchInput").value = title
  document.getElementById("searchSuggestions").style.display = "none"
  window.marketplaceManager.applyFilters()
}

window.selectLocation = (location) => {
  document.getElementById("locationInput").value = location
  document.getElementById("locationDropdown").style.display = "none"
  window.marketplaceManager.applyFilters()
}

// Initialize marketplace manager
let marketplaceManager
document.addEventListener("DOMContentLoaded", () => {
  marketplaceManager = new MarketplaceManager()
  window.marketplaceManager = marketplaceManager // Make it globally accessible
})
