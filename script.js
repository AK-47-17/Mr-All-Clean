// Service categories for search
const serviceCategories = [
  { name: "Wash & Fold", href: "services.html#wash-fold", icon: "tshirt" },
  { name: "Dry Cleaning", href: "services.html#dry-cleaning", icon: "wind" },
  { name: "Specialty Items", href: "services.html#specialty-items", icon: "magic" },
  { name: "Express Service", href: "services.html#express-service", icon: "clock" },
  { name: "Pickup & Delivery", href: "services.html#pickup-delivery", icon: "truck" },
  { name: "Commercial Services", href: "services.html#commercial", icon: "building" },
  { name: "Wedding Dress Cleaning", href: "services.html#wedding-dress", icon: "female" },
  { name: "Leather & Suede", href: "services.html#leather-suede", icon: "mitten" },
  { name: "Alterations", href: "services.html#alterations", icon: "cut" },
  { name: "Stain Removal", href: "services.html#stain-removal", icon: "eraser" },
  { name: "Eco-Friendly Cleaning", href: "services.html#eco-friendly", icon: "leaf" },
]

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const searchToggle = document.getElementById("searchToggle")
  const searchBox = document.getElementById("searchBox")
  const searchInput = document.getElementById("searchInput")
  const searchClose = document.getElementById("searchClose")
  const searchResults = document.getElementById("searchResults")
  const mobileSearchInput = document.getElementById("mobileSearchInput")
  const mobileSearchResults = document.getElementById("mobileSearchResults")
  const themeToggle = document.getElementById("themeToggle")
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const currentYearElements = document.querySelectorAll("#currentYear")
  const pricingTabs = document.querySelectorAll(".pricing-tab")
  const pricingTables = document.querySelectorAll(".pricing-table")
  const contactForm = document.getElementById("contactForm")
  const achievementNumbers = document.querySelectorAll(".achievement-number")
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-links a")
  const scrollToTopButton = document.getElementById("scrollToTop")

  // Set current year in footer
  currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear()
  })

  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage) {
      link.classList.add("active")
    }
  })

  // Page transition
  window.addEventListener("beforeunload", () => {
    document.body.classList.add("page-exit")
  })

  // Theme Toggle
  function initTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      document.body.className = savedTheme
    } else {
      // Check user preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.className = "dark-theme"
      } else {
        document.body.className = ""
      }
    }
  }

  initTheme()

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme")
        localStorage.setItem("theme", "")
      } else {
        document.body.classList.add("dark-theme")
        localStorage.setItem("theme", "dark-theme")
      }
    })
  }

  // Search Functionality
  function performSearch(query, resultsContainer) {
    if (!resultsContainer) return

    resultsContainer.innerHTML = ""

    if (query.trim() === "") {
      resultsContainer.style.display = "none"
      return
    }

    const filteredResults = serviceCategories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase()),
    )

    if (filteredResults.length > 0) {
      filteredResults.forEach((result) => {
        const link = document.createElement("a")
        link.href = result.href
        link.innerHTML = `<i class="fas fa-${result.icon}"></i> ${result.name}`
        link.classList.add("search-result-item")
        resultsContainer.appendChild(link)
      })
      resultsContainer.style.display = "block"
    } else {
      const noResults = document.createElement("div")
      noResults.textContent = "No services found. Try a different search term."
      noResults.classList.add("no-results")
      resultsContainer.appendChild(noResults)
      resultsContainer.style.display = "block"
    }
  }

  // Desktop Search
  if (searchToggle && searchBox && searchInput && searchClose && searchResults) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      searchBox.classList.add("active")
      searchInput.focus()
    })

    searchClose.addEventListener("click", () => {
      searchBox.classList.remove("active")
      searchInput.value = ""
      searchResults.innerHTML = ""
      searchResults.style.display = "none"
    })

    searchInput.addEventListener("input", () => {
      performSearch(searchInput.value, searchResults)
    })

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (searchBox && !searchBox.contains(e.target) && e.target !== searchToggle) {
        searchBox.classList.remove("active")
      }
    })
  }

  // Mobile Search
  if (mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener("input", () => {
      performSearch(mobileSearchInput.value, mobileSearchResults)
    })

    // Close mobile search results when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileSearchResults && !mobileSearchResults.contains(e.target) && e.target !== mobileSearchInput) {
        mobileSearchResults.style.display = "none"
      }
    })
  }

  // Mobile Menu Toggle with animation
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      mobileMenu.classList.toggle("active")

      // Update ARIA attributes for accessibility
      const isExpanded = mobileMenu.classList.contains("active")
      mobileMenuToggle.setAttribute("aria-expanded", isExpanded)
      mobileMenu.setAttribute("aria-hidden", !isExpanded)

      // Animate the icon
      if (isExpanded) {
        mobileMenuToggle.innerHTML = '<i class="fas fa-times fa-spin"></i>'
        setTimeout(() => {
          mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>'
        }, 300)

        // Prevent body scrolling when menu is open
        document.body.style.overflow = "hidden"
      } else {
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars fa-spin"></i>'
        setTimeout(() => {
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        }, 300)

        // Restore body scrolling when menu is closed
        document.body.style.overflow = ""
      }
    })

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
        document.body.style.overflow = ""
      })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        mobileMenu &&
        !mobileMenu.contains(e.target) &&
        e.target !== mobileMenuToggle &&
        !mobileMenuToggle.contains(e.target)
      ) {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>'
        mobileMenuToggle.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("aria-hidden", "true")
        document.body.style.overflow = ""
      }
    })
  }

  // Pricing Tabs with animation
  if (pricingTabs.length > 0 && pricingTables.length > 0) {
    console.log("Found pricing tabs:", pricingTabs.length, "and pricing tables:", pricingTables.length)

    // Remove any existing event listeners to prevent conflicts
    pricingTabs.forEach((tab) => {
      const newTab = tab.cloneNode(true)
      tab.parentNode.replaceChild(newTab, tab)
    })

    // Re-select tabs after cloning
    const refreshedTabs = document.querySelectorAll(".pricing-tab")

    refreshedTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const tabId = tab.getAttribute("data-tab")
        console.log("Tab clicked:", tabId)

        // Remove active class from all tabs
        refreshedTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Hide all pricing tables
        pricingTables.forEach((table) => {
          table.classList.remove("active")
          // Remove any animation classes that might interfere
          table.classList.remove("animate__animated", "animate__fadeIn")
        })

        // Show the corresponding pricing table
        const activeTable = document.getElementById(`${tabId}-pricing`)
        console.log("Looking for table with ID:", `${tabId}-pricing`, activeTable ? "Found" : "Not found")

        if (activeTable) {
          activeTable.classList.add("active")
          console.log(`Successfully activated table: ${tabId}-pricing`)
        }
      })
    })
  }

  // Contact Form Submission with animation
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Add animation to the form
      this.classList.add("animate__animated", "animate__pulse")

      // Show success message with animation
      const formContainer = this.parentElement
      const successMessage = document.createElement("div")
      successMessage.className = "success-message animate__animated animate__fadeInUp"
      successMessage.innerHTML =
        '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.'

      setTimeout(() => {
        this.reset()
        this.classList.remove("animate__animated", "animate__pulse")
        formContainer.appendChild(successMessage)

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove("animate__fadeInUp")
          successMessage.classList.add("animate__fadeOutDown")
          setTimeout(() => {
            if (formContainer.contains(successMessage)) {
              formContainer.removeChild(successMessage)
            }
          }, 1000)
        }, 5000)
      }, 500)
    })
  }

  // Scroll to section if URL has hash
  if (window.location.hash) {
    const element = document.querySelector(window.location.hash)
    if (element) {
      setTimeout(() => {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.getAttribute("href") !== "#") {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const href = this.getAttribute("href")
        const element = document.querySelector(href)

        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth",
          })
        }
      })
    }
  })

  // Button ripple effect
  const rippleButtons = document.querySelectorAll(".btn-ripple")

  rippleButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left
      const y = e.clientY - e.target.getBoundingClientRect().top

      const ripple = document.createElement("span")
      ripple.classList.add("ripple")
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Animate numbers in achievements section
  function animateNumbers() {
    achievementNumbers.forEach((number) => {
      const target = Number.parseInt(number.textContent.replace(/,/g, "").replace(/\+/g, ""))
      const suffix = number.textContent.includes("+") ? "+" : ""
      let start = 0
      const duration = 2000
      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        const currentValue = Math.floor(easeProgress * target)
        number.textContent = currentValue.toLocaleString() + suffix
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }

      // Use Intersection Observer to start animation when element is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              window.requestAnimationFrame(step)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(number)
    })
  }

  // Initialize AOS with more options
  let AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: "ease-in-out-cubic",
    })
  }

  // Call animateNumbers if there are achievement numbers on the page
  if (achievementNumbers.length > 0) {
    animateNumbers()
  }

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`
    })
  }

  // Add typing animation to hero heading if it exists
  const heroHeading = document.querySelector(".hero-content h1")
  if (heroHeading && !heroHeading.classList.contains("typing-animation-applied")) {
    heroHeading.classList.add("typing-animation-applied")
    const text = heroHeading.textContent
    heroHeading.textContent = ""
    heroHeading.classList.add("typing-animation")

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroHeading.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 500)
  }

  // Add hover animations to service cards
  const serviceCards = document.querySelectorAll(".service-card, .service-detail-card")
  serviceCards.forEach((card) => {
    const icon = card.querySelector(".service-icon")
    if (icon) {
      card.addEventListener("mouseenter", () => {
        icon.classList.add("animate__animated", "animate__heartBeat")
      })

      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          icon.classList.remove("animate__animated", "animate__heartBeat")
        }, 1000)
      })
    }
  })

  // Add floating animation to images
  const images = document.querySelectorAll(".about-image img, .features-image img")
  images.forEach((img) => {
    img.classList.add("float")
  })

  // Add scroll indicator if we're on the home page
  if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
    const scrollIndicator = document.createElement("div")
    scrollIndicator.className = "scroll-indicator"
    scrollIndicator.innerHTML =
      '<div class="mouse"><div class="wheel"></div></div><div class="arrow"><span></span><span></span><span></span></div>'

    const heroElement = document.querySelector(".hero")
    if (heroElement) {
      heroElement.appendChild(scrollIndicator)
    }
  }

  // Scroll to top functionality
  if (scrollToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add("visible")
      } else {
        scrollToTopButton.classList.remove("visible")
      }
    })

    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Add spotlight effect to service cards on hover
  const spotlightElements = document.querySelectorAll(".service-card, .mission-card, .team-card")
  spotlightElements.forEach((element) => {
    element.classList.add("spotlight")
  })

  // Add shimmer effect to CTA buttons
  const ctaButtons = document.querySelectorAll(".cta-buttons .btn")
  ctaButtons.forEach((button) => {
    button.classList.add("shimmer")
  })

  // Add rainbow text effect to pricing
  const pricingElements = document.querySelectorAll(".service-price")
  pricingElements.forEach((element) => {
    element.classList.add("rainbow-text")
  })

  // Add data-label attributes to table cells for responsive tables
  const priceTables = document.querySelectorAll(".price-table")
  priceTables.forEach((table) => {
    const headerCells = table.querySelectorAll("thead th")
    const headerTexts = Array.from(headerCells).map((cell) => cell.textContent)

    const bodyRows = table.querySelectorAll("tbody tr")
    bodyRows.forEach((row) => {
      const cells = row.querySelectorAll("td")
      cells.forEach((cell, index) => {
        if (headerTexts[index]) {
          cell.setAttribute("data-label", headerTexts[index])
        }
      })
    })
  })

  // Responsive image loading
  function handleResponsiveImages() {
    const images = document.querySelectorAll("img[loading='lazy']")

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.src // Trigger load if it hasn't loaded yet
            imageObserver.unobserve(img)
          }
        })
      })

      images.forEach((img) => {
        imageObserver.observe(img)
      })
    }
  }

  // Call the function
  handleResponsiveImages()

  // Handle window resize events for responsive adjustments
  let resizeTimer
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      // Reinitialize AOS on resize
      if (typeof AOS !== "undefined") {
        AOS.refresh()
      }
    }, 250)
  })
})
