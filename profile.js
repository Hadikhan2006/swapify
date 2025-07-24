// Profile page functionality
class ProfileManager {
  constructor() {
    this.userItems = this.generateDummyUserItems()
    this.swapHistory = this.generateDummySwapHistory()
    this.favoriteItems = this.generateDummyFavoriteItems()
    this.reviews = this.generateDummyReviews()
    this.init()
  }

  init() {
    this.renderUserItems()
    this.renderSwapHistory()
    this.renderFavoriteItems()
    this.renderReviews()
    this.setupEventListeners()
    this.animateStats()
  }

  generateDummyUserItems() {
    const items = []
    const titles = ["Gaming Laptop", "Vintage Camera", "Designer Watch", "Electric Scooter", "Rare Book Collection"]
    const descriptions = [
      "High performance, perfect for gaming and work.",
      "Classic model, great for collectors.",
      "Luxury timepiece, excellent condition.",
      "Fast and eco-friendly, ideal for city commutes.",
      "First editions, a must-have for enthusiasts.",
    ]
    const locations = ["Karachi", "Lahore", "Islamabad"]
    const conditions = ["Like New", "Good", "Fair"]
    const statuses = ["Active", "Pending Swap", "Swapped"]

    for (let i = 1; i <= 10; i++) {
      const title = titles[Math.floor(Math.random() * titles.length)]
      items.push({
        id: i,
        title: title,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        images: [`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title)}`],
        posted: `${Math.floor(Math.random() * 30) + 1} days ago`,
        views: Math.floor(Math.random() * 500) + 50,
        proposals: Math.floor(Math.random() * 20) + 1,
      })
    }
    return items
  }

  generateDummySwapHistory() {
    const history = []
    const itemNames = ["Smartphone", "Novel", "Headphones", "Backpack", "Coffee Maker"]
    const swapPartners = ["Ali", "Sara", "Usman", "Ayesha", "Bilal"]
    const statuses = ["Completed", "Pending", "Cancelled"]

    for (let i = 1; i <= 7; i++) {
      history.push({
        id: i,
        yourItem: itemNames[Math.floor(Math.random() * itemNames.length)],
        theirItem: itemNames[Math.floor(Math.random() * itemNames.length)],
        partner: swapPartners[Math.floor(Math.random() * swapPartners.length)],
        date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      })
    }
    return history
  }

  generateDummyFavoriteItems() {
    const items = []
    const titles = ["Vintage Bicycle", "Collectible Stamps", "Smart TV", "Acoustic Guitar", "Rare Vinyl Records"]
    const locations = ["Lahore", "Karachi", "Peshawar"]
    for (let i = 1; i <= 6; i++) {
      const title = titles[Math.floor(Math.random() * titles.length)]
      items.push({
        id: i + 100, // Unique IDs
        title: title,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        location: locations[Math.floor(Math.random() * locations.length)],
        time: `${Math.floor(Math.random() * 7) + 1} days ago`,
        badge: "Favorite",
        category: "misc",
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        swaps: Math.floor(Math.random() * 50) + 10,
        images: [`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(title)}`],
      })
    }
    return items
  }

  generateDummyReviews() {
    const reviews = []
    const users = ["Kamran", "Nida", "Farhan", "Sana"]
    const comments = [
      "Smooth transaction, item was exactly as described. Highly recommended!",
      "Great communication and quick swap. Very happy with the experience.",
      "Reliable swapper, would definitely trade again.",
      "Item was in better condition than expected. Excellent!",
      "Professional and friendly. A pleasure to swap with.",
    ]
    for (let i = 1; i <= 5; i++) {
      reviews.push({
        id: i,
        reviewer: users[Math.floor(Math.random() * users.length)],
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        comment: comments[Math.floor(Math.random() * comments.length)],
        date: `2025-${String(Math.floor(Math.random() * 6) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      })
    }
    return reviews
  }

  renderUserItems() {
    const container = document.getElementById("userItems")
    if (!container) return

    if (this.userItems.length === 0) {
      container.innerHTML =
        '<div class="text-center text-muted p-5 enhanced-card"><i class="fas fa-box-open fa-4x mb-3"></i><h5>No items listed yet!</h5><p>Start by adding your first item to swap.</p></div>'
      return
    }

    container.innerHTML = this.userItems
      .map(
        (item) => `
      <div class="item-card-featured enhanced-card animate-scale-in" data-item-id="${item.id}">
        <div class="item-image-container">
          <div class="item-image holographic" style="background-image: url('${item.images[0]}'); background-size: cover; background-position: center;">
            <!-- <i class="fas fa-image fa-3x"></i> -->
          </div>
          <div class="item-badge animate-glow">${item.status}</div>
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
              ${item.posted}
            </div>
          </div>
          <div class="item-stats mb-3">
            <div class="stat-item">
              <i class="fas fa-eye text-info me-1"></i>
              <span>${item.views} views</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-handshake text-warning me-1"></i>
              <span>${item.proposals} proposals</span>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn btn-primary flex-fill me-2 animate-glow" onclick="window.SwapifyApp.viewItem(${item.id})">
              <i class="fas fa-eye me-1"></i>View
            </button>
            <button class="btn btn-outline-secondary" onclick="window.profileManager.editItem(${item.id})">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      )
      .join("")
  }

  renderSwapHistory() {
    const container = document.getElementById("swapHistory")
    if (!container) return

    if (this.swapHistory.length === 0) {
      container.innerHTML =
        '<div class="text-center text-muted p-5 enhanced-card"><i class="fas fa-history fa-4x mb-3"></i><h5>No swap history yet!</h5><p>Complete your first swap to see it here.</p></div>'
      return
    }

    container.innerHTML = this.swapHistory
      .map(
        (swap) => `
      <div class="swap-history-item enhanced-card animate-slide-up">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h6>Swap with ${swap.partner}</h6>
          <span class="badge bg-${swap.status === "Completed" ? "success" : swap.status === "Pending" ? "warning" : "danger"}">${swap.status}</span>
        </div>
        <p class="text-muted mb-1">You swapped: <strong>${swap.yourItem}</strong> for <strong>${swap.theirItem}</strong></p>
        <small class="text-muted">Date: ${swap.date}</small>
        <div class="text-end mt-2">
          <button class="btn btn-outline-primary btn-sm">View Details</button>
        </div>
      </div>
    `,
      )
      .join("")
  }

  renderFavoriteItems() {
    const container = document.getElementById("favoriteItems")
    if (!container) return

    if (this.favoriteItems.length === 0) {
      container.innerHTML =
        '<div class="text-center text-muted p-5 enhanced-card"><i class="fas fa-heart-broken fa-4x mb-3"></i><h5>No favorite items yet!</h5><p>Browse the <a href="marketplace.html" class="text-primary">marketplace</a> and add items to your favorites.</p></div>'
      return
    }

    container.innerHTML = this.favoriteItems
      .map(
        (item) => `
      <div class="item-card-featured enhanced-card animate-scale-in" data-item-id="${item.id}">
        <div class="item-image-container">
          <div class="item-image holographic" style="background-image: url('${item.images[0]}'); background-size: cover; background-position: center;">
            <!-- <i class="fas fa-image fa-3x"></i> -->
          </div>
          <div class="item-badge animate-glow">${item.badge}</div>
          <button class="item-favorite active" onclick="toggleFavorite(${item.id})">
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

  renderReviews() {
    const container = document.getElementById("reviewsList")
    if (!container) return

    if (this.reviews.length === 0) {
      container.innerHTML =
        '<div class="text-center text-muted p-5 enhanced-card"><i class="fas fa-star-half-alt fa-4x mb-3"></i><h5>No reviews yet!</h5><p>Once you complete swaps, others can leave reviews here.</p></div>'
      return
    }

    container.innerHTML = this.reviews
      .map(
        (review) => `
      <div class="review-item enhanced-card animate-slide-up">
        <div class="review-header">
          <div class="reviewer-info">
            <h6>${review.reviewer}</h6>
            <div class="review-rating">
              ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
              ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
            </div>
          </div>
          <div class="review-date">${review.date}</div>
        </div>
        <p class="review-text">${review.comment}</p>
      </div>
    `,
      )
      .join("")
  }

  setupEventListeners() {
    // Add Item Modal form handling
    const addItemForm = document.getElementById("addItemForm")
    if (addItemForm) {
      addItemForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const submitBtn = addItemForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<span class="loading-spinner me-2"></span> Listing...'
        submitBtn.disabled = true

        setTimeout(() => {
          window.SwapifyApp.showToast("Item listed successfully!", "success")
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          addItemForm.reset()
          // Simulate adding a new item to userItems and re-rendering
          const newItem = {
            id: this.userItems.length + 1,
            title: "New Listed Item",
            description: "This is a newly added item for demonstration.",
            location: "Your City",
            condition: "New",
            status: "Active",
            images: ["/placeholder.svg?height=400&width=600&text=New Item"],
            posted: "just now",
            views: 0,
            proposals: 0,
          }
          this.userItems.unshift(newItem) // Add to the beginning
          this.renderUserItems()
          // Close modal
          const modal = window.bootstrap.Modal.getInstance(document.getElementById("addItemModal"))
          if (modal) modal.hide()
        }, 1500)
      })
    }
  }

  editItem(itemId) {
    window.SwapifyApp.showToast(`Editing item ${itemId}... (functionality not fully implemented)`, "info")
    // In a real app, this would open a modal with item details for editing
  }

  deleteItem(itemId) {
    if (confirm("Are you sure you want to delete this item?")) {
      this.userItems = this.userItems.filter((item) => item.id !== itemId)
      this.renderUserItems()
      window.SwapifyApp.showToast("Item deleted successfully!", "success")
    }
  }

  animateStats() {
    const stats = [
      { id: "itemsSwappedCount", target: 47 },
      { id: "activeListingsCount", target: 23 },
      { id: "ecoPointsCount", target: 156 },
    ]

    stats.forEach((stat) => {
      const element = document.querySelector(`.profile-stat-number[data-count="${stat.target}"]`)
      if (element) {
        const target = stat.target
        const duration = 1500
        const increment = target / (duration / 16)
        let current = 0

        const updateCounter = () => {
          current += increment
          if (current < target) {
            element.textContent = Math.floor(current).toLocaleString()
            requestAnimationFrame(updateCounter)
          } else {
            element.textContent = target.toLocaleString()
          }
        }
        setTimeout(updateCounter, 500)
      }
    })
  }
}

// Initialize profile manager
let profileManager
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("profilePage")) {
    // Check if on profile page
    profileManager = new ProfileManager()
    window.profileManager = profileManager // Make it globally accessible
  }
})

// Declare showToast and bootstrap variables
window.SwapifyApp = {
  showToast: (message, type) => {
    console.log(`Toast: ${message} (${type})`)
  },
  viewItem: (itemId) => {
    console.log(`View item ${itemId}`)
  },
  addToCart: (itemId, title) => {
    console.log(`Add item ${itemId} (${title}) to cart`)
  },
}

window.bootstrap = {
  Modal: {
    getInstance: (element) => ({
      hide: () => {
        console.log("Modal hidden")
      },
    }),
  },
}
