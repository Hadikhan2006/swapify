// Enhanced Swapify JavaScript with Dark Theme Default
class SwapifyApp {
  constructor() {
    this.currentTheme = "dark" // Default to dark theme
    this.cartItems = JSON.parse(localStorage.getItem("swapifyCart") || "[]")
    this.notifications = JSON.parse(localStorage.getItem("swapifyNotifications") || "[]")
    this.featuredItemsData = [
      {
        id: 1,
        title: "iPhone 14 Pro Max",
        description: "Brand new condition, all accessories included. Perfect for photography enthusiasts.",
        location: "Karachi, Sindh",
        time: "1 hour ago",
        badge: "Hot Deal",
        category: "electronics",
        rating: 4.9,
        swaps: 156,
        images: ["Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907_Full-Bleed-Image.jpg.large.jpg"],
      },
      {
        id: 2,
        title: "MacBook Pro",
        description: "Like new, comes with original packaging.",
        location: "Lahore, Punjab",
        time: "2 hours ago",
        badge: "Featured",
        category: "electronics",
        rating: 4.8,
        swaps: 120,
        images: ["macbook-pro.jpg"],
      },
      {
        id: 3,
        title: "Canon EOS R5",
        description: "Perfect for professional photographers.",
        location: "Karachi, Sindh",
        time: "1 day ago",
        badge: "New",
        category: "electronics",
        rating: 4.7,
        swaps: 135,
        images: ["canon-eos-r5.jpg"],
      },
      {
        id: 4,
        title: "Smartwatch Series 6",
        description: "Brand new, perfect for fitness enthusiasts.",
        location: "Islamabad, ICT",
        time: "3 hours ago",
        badge: "Featured",
        category: "electronics",
        rating: 4.5,
        swaps: 98,
        images: ["watch-series-6.jpg"],
      },
      {
        id: 5,
        title: "Gaming Laptop",
        description: "High performance laptop for gamers.",
        location: "Lahore, Punjab",
        time: "5 hours ago",
        badge: "Hot Deal",
        category: "electronics",
        rating: 4.9,
        swaps: 200,
        images: ["gaming-laptop.jpg"],
      },
      {
        id: 6,
        title: "Samsung Galaxy S22",
        description: "Excellent condition, ready to swap.",
        location: "Karachi, Sindh",
        time: "1 hour ago",
        badge: "New",
        category: "electronics",
        rating: 4.8,
        swaps: 145,
        images: ["Galaxy-S22.jpg"],
      },
    ]
    this.init()
  }

  init() {
    this.setupTheme()
    this.setupParticleSystem()
    this.setupAnimations()
    this.setupEventListeners()
    this.updateCartCount()
    this.updateNotificationCount()
    this.renderFeaturedItems()
    this.startAutoAnimations()
    this.setActiveNavLink()

    // Show welcome message only on homepage
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      setTimeout(() => {
        this.showToast("Welcome to Swapify! 🌱 Start your sustainable journey today.", "success")
      }, 2000)
    }
  }

  setupTheme() {
    // Set dark theme as default
    document.documentElement.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
    this.updateThemeIcon("dark")
    this.applyThemeStyles("dark")
  }

  setupParticleSystem() {
    const heroParticles = document.getElementById("heroParticles")
    if (!heroParticles) return

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      const size = Math.random() * 6 + 2
      particle.style.width = size + "px"
      particle.style.height = size + "px"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 10 + 5 + "s"
      particle.style.animationDelay = Math.random() * 5 + "s"

      heroParticles.appendChild(particle)
    }
  }

  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")

          // Handle stagger animations
          if (entry.target.classList.contains("stagger-animation")) {
            this.animateStaggerChildren(entry.target)
          }

          // Handle counter animations
          if (entry.target.querySelector("[data-count]")) {
            this.animateCounters(entry.target)
          }
        }
      })
    }, observerOptions)

    // Observe all animated elements
    document.querySelectorAll('[class*="animate-"], .stagger-animation').forEach((el) => {
      observer.observe(el)
    })
  }

  animateStaggerChildren(container) {
    const children = container.children
    Array.from(children).forEach((child, index) => {
      child.style.animationDelay = `${index * 0.1}s` // Apply delay for stagger
      child.classList.add("stagger-child") // Add a class to identify stagger children
      child.classList.add("animate-in") // Trigger animation
    })
  }

  animateCounters(container) {
    const counters = container.querySelectorAll("[data-count]")
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-count"))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const updateCounter = () => {
        current += increment
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }

      setTimeout(updateCounter, 500)
    })
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }

    // Chat FAB
    const chatFab = document.querySelector(".chat-fab")
    if (chatFab) {
      chatFab.addEventListener("click", () => {
        window.location.href = "chat.html"
      })
    }

    // Enhanced button effects
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-2px)"
      })
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)"
      })
    })

    // Card hover effects
    document.querySelectorAll(".enhanced-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px) scale(1.02)"
      })
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
      })
    })

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      })
    })

    // Form submissions
    this.setupFormHandlers()
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    this.updateThemeIcon(newTheme)
    this.applyThemeStyles(newTheme)

    // Animate theme toggle
    const themeToggle = document.getElementById("themeToggle")
    if (themeToggle) {
      themeToggle.style.transform = "rotate(360deg) scale(1.2)"
      setTimeout(() => {
        themeToggle.style.transform = "rotate(0deg) scale(1)"
      }, 300)
    }

    this.showToast(`Switched to ${newTheme} theme`, "info")
  }

  updateThemeIcon(theme) {
    const themeIcon = document.querySelector("#themeToggle i")
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    }
  }

  applyThemeStyles(theme) {
    // Force update all themed elements
    setTimeout(() => {
      const elements = document.querySelectorAll(".form-control, .form-select, .modal-content, .dropdown-menu, .card")
      elements.forEach((el) => {
        el.style.transition = "all 0.3s ease"
      })
    }, 100)
  }

  renderFeaturedItems() {
    const container = document.getElementById("featuredItems")
    if (!container) return

    const itemsHTML = this.featuredItemsData
      .map(
        (item) => `
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="item-card-featured enhanced-card animate-scale-in" data-item-id="${item.id}">
              <div class="item-image-container">
                <div class="item-image holographic" style="background-image: url('${item.images[0]}');">
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
                  <button class="btn btn-primary flex-fill me-2 animate-glow" onclick="addToCart(${item.id}, '${item.title}', '${item.images[0]}')">
                    <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                  </button>
                  <button class="btn btn-outline-primary" onclick="viewItem(${item.id})">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `,
      )
      .join("")

    container.innerHTML = itemsHTML
  }

  addToCart(itemId, itemTitle, itemImage) {
    const existingItem = this.cartItems.find((item) => item.id === itemId)
    if (!existingItem) {
      this.cartItems.push({
        id: itemId,
        title: itemTitle,
        image: itemImage, // Store the image URL
        addedAt: new Date().toISOString(),
      })
      localStorage.setItem("swapifyCart", JSON.stringify(this.cartItems))
      this.updateCartCount()
      this.showToast(`${itemTitle} added to cart!`, "success")
    } else {
      this.showToast("Item already in cart", "info")
    }
  }

  updateCartCount() {
    const cartCount = document.getElementById("cartCount")
    if (cartCount) {
      cartCount.textContent = this.cartItems.length
      cartCount.style.display = this.cartItems.length > 0 ? "flex" : "none"
    }
  }

  updateNotificationCount() {
    const notificationCount = document.getElementById("notificationCount")
    if (notificationCount) {
      // Simulate notifications
      const unreadCount = 3
      notificationCount.textContent = unreadCount
      notificationCount.style.display = unreadCount > 0 ? "flex" : "none"
    }
  }

  setupFormHandlers() {
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleLogin(e.target)
      })
    }

    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
      const submitBtn = newsletterForm.querySelector("button")
      submitBtn.addEventListener("click", () => {
        const email = newsletterForm.querySelector("input").value
        if (email) {
          this.showToast("Successfully subscribed to newsletter!", "success")
          newsletterForm.querySelector("input").value = ""
        }
      })
    }
  }

  handleLogin(form) {
    const submitBtn = form.querySelector('button[type="submit"]')
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...'
    submitBtn.disabled = true

    setTimeout(() => {
      this.showToast("Login successful! Welcome back!", "success")
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      // Close modal
      const modal = document.querySelector(".modal.show")
      if (modal) modal.style.display = "none"

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1000)
    }, 2000)
  }

  startAutoAnimations() {
    // Auto-rotate brand icon
    setInterval(() => {
      const brandIcon = document.querySelector(".brand-icon")
      if (brandIcon) {
        brandIcon.style.transform = "rotate(360deg)"
        setTimeout(() => {
          brandIcon.style.transform = "rotate(0deg)"
        }, 1000)
      }
    }, 10000)

    // Auto-pulse glow elements
    setInterval(() => {
      document.querySelectorAll(".animate-glow").forEach((el) => {
        el.style.animation = "none"
        setTimeout(() => {
          el.style.animation = "glow 3s ease-in-out infinite"
        }, 100)
      })
    }, 15000)
  }

  showToast(message, type = "success", duration = 5000) {
    // Remove existing toasts
    document.querySelectorAll(".toast-notification").forEach((toast) => toast.remove())

    const toast = document.createElement("div")
    toast.className = `toast-notification toast-${type} animate-slide-right`

    const icons = {
      success: "check-circle",
      error: "exclamation-circle",
      warning: "exclamation-triangle",
      info: "info-circle",
    }

    toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${icons[type] || "info-circle"}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `

    document.body.appendChild(toast)

    // Show toast
    setTimeout(() => toast.classList.add("show"), 100)

    // Auto remove
    const autoRemove = setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => toast.remove(), 300)
    }, duration)

    // Manual close
    toast.querySelector(".toast-close").addEventListener("click", () => {
      clearTimeout(autoRemove)
      toast.classList.remove("show")
      setTimeout(() => toast.remove(), 300)
    })
  }

  setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop()
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

    navLinks.forEach((link) => {
      link.classList.remove("active")
      const linkPath = link.getAttribute("href")
      if (linkPath && linkPath.includes(currentPath)) {
        link.classList.add("active")
      }
    })
  }
}

// Global functions
window.toggleFavorite = (itemId) => {
  const btn = document.querySelector(`[data-item-id="${itemId}"] .item-favorite`)
  if (btn) {
    btn.classList.toggle("active")
    const isActive = btn.classList.contains("active")
    window.swapifyApp.showToast(isActive ? "Added to favorites!" : "Removed from favorites!", "success")
  }
}

window.addToCart = (itemId, itemTitle, itemImage) => {
  window.swapifyApp.addToCart(itemId, itemTitle, itemImage)
}

window.viewItem = (itemId) => {
  const item = window.swapifyApp.featuredItemsData.find((i) => i.id === itemId)
  if (item && item.images && item.images.length > 0) {
    const previewImage = document.getElementById("previewImage")
    const itemImagePreviewModalLabel = document.getElementById("itemImagePreviewModalLabel")

    previewImage.src = item.images[0]
    previewImage.alt = item.title
    itemImagePreviewModalLabel.textContent = item.title

    const itemImagePreviewModal = window.bootstrap.Modal.getOrCreateInstance(
      document.getElementById("itemImagePreviewModal"),
    )
    itemImagePreviewModal.show()
  } else {
    window.swapifyApp.showToast("Item image not available.", "error")
  }
}

// Initialize app
let swapifyApp
document.addEventListener("DOMContentLoaded", () => {
  swapifyApp = new SwapifyApp()
  console.log("🚀 Swapify - Enhanced Dark Theme Loaded!")
})

// Enhanced scroll effects
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    if (scrolled > 100) {
      navbar.style.background = "rgba(15, 23, 42, 0.98)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "rgba(15, 23, 42, 0.95)"
    }
  }

  // Parallax effect for hero background (already handled by CSS background-attachment: fixed)
  // No need for JS parallax for hero-section if using CSS fixed attachment
})

// Enhanced keyboard navigation
document.addEventListener("keydown", (e) => {
  // Quick chat access with Ctrl+M
  if (e.ctrlKey && e.key === "m") {
    e.preventDefault()
    window.location.href = "chat.html"
  }

  // Quick search with Ctrl+K
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault()
    const searchInput = document.querySelector('input[placeholder*="search"]')
    if (searchInput) {
      searchInput.focus()
    }
  }
})

// Service Worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Toggle light mode on the body
function toggleLightMode() {
  document.body.classList.toggle("light")
}

// Import Bootstrap
window.bootstrap = window.bootstrap || {}
window.bootstrap.Modal = window.bootstrap.Modal || {
  getOrCreateInstance: (element) => {
    return {
      show: () => {
        element.style.display = "block"
      },
    }
  },
}

