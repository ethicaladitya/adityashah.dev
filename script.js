// DOM Elements
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update active navigation link
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// Typing animation for hero code
function typeWriter() {
  const codeLines = document.querySelectorAll('.code-line');
  
  codeLines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.borderRight = '2px solid var(--primary-color)';
    
    setTimeout(() => {
      let i = 0;
      const typing = setInterval(() => {
        if (i < text.length) {
          line.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
          line.style.borderRight = 'none';
          
          // Start next line
          if (index < codeLines.length - 1) {
            // Handled by CSS animation timing
          }
        }
      }, 50);
    }, index * 1000);
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.project-card, .skill-item, .contact-item, .about-stats .stat'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '+';
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    // Start animation when element is in view
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counterObserver.observe(counter);
  });
}

// Contact form handling
function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      showNotification('Thank you! Your message has been sent.', 'success');
      form.reset();
    });
  }
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '9999',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease-out',
    maxWidth: '300px',
    wordWrap: 'break-word'
  });
  
  // Set background color based on type
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6'
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Parallax effect for background shapes
function initParallax() {
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Cursor effect (optional)
function initCursorEffect() {
  // Only on desktop devices
  if (window.innerWidth > 1024) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    Object.assign(cursor.style, {
      position: 'fixed',
      width: '20px',
      height: '20px',
      background: 'var(--primary-color)',
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.1s ease-out',
      opacity: '0'
    });
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.opacity = '0.5';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '1';
      });
    });
  }
}

// Theme switcher (optional feature)
function initThemeToggle() {
  // This is a placeholder for future theme switching functionality
  // You can implement light/dark mode toggle here
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  updateActiveNavLink();
}, 16); // ~60fps

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initScrollAnimations();
  animateCounters();
  initContactForm();
  initParallax();
  initCursorEffect();
  
  // Replace default scroll handler with optimized version
  window.removeEventListener('scroll', updateActiveNavLink);
  window.addEventListener('scroll', optimizedScrollHandler);
  
  // Start typing animation after a delay
  setTimeout(typeWriter, 1000);
  
  // Show initial notification
  setTimeout(() => {
    showNotification('Welcome! Let\'s Connect', 'info');
  }, 2000);
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
}, 250));

// Preload images and optimize performance
function preloadImages() {
  const images = [
    // Add any image URLs here when you add actual project images
  ];
  
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Call preload function
preloadImages();

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // You can uncomment this when you create a service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered:', registration))
    //   .catch(error => console.log('SW registration failed:', error));
  });
}

// Blog RSS Feed Functionality
async function fetchBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;

  // Show loading state
  blogContainer.innerHTML = '<div class="blog-loading">Loading latest posts from blog.adityashah.dev...</div>';

  console.log('Attempting to fetch blog posts...');

  try {
    // Use your direct RSS feed URL
    const rssUrl = 'http://blog.adityashah.dev/feed';
    console.log('Fetching from RSS URL:', rssUrl);
    
    // Try RSS2JSON first (free service, no API key needed)
    let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=3`);
    console.log('RSS2JSON response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('RSS2JSON data:', data);
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        console.log('Found', data.items.length, 'posts from RSS2JSON');
        const posts = data.items.slice(0, 3).map(post => ({
          title: post.title,
          link: post.link,
          description: post.description || post.content || '',
          pubDate: post.pubDate
        }));
        
        displayBlogPosts(posts);
        
        // Store the last fetch time and posts in localStorage
        localStorage.setItem('lastBlogFetch', Date.now().toString());
        localStorage.setItem('cachedBlogPosts', JSON.stringify(posts));
        console.log('Successfully cached blog posts');
        return;
      } else {
        console.log('RSS2JSON returned no items or error status:', data.status);
      }
    }
    
    // Fallback 1: Try AllOrigins proxy service
    console.log('Trying AllOrigins proxy service...');
    response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
    console.log('AllOrigins response status:', response.status);
    
    if (response.ok) {
      const proxyData = await response.json();
      console.log('AllOrigins proxy data received');
      
      if (proxyData.contents) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(proxyData.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        console.log('Found', items.length, 'items in RSS XML');
        
        if (items.length > 0) {
          const posts = Array.from(items).slice(0, 3).map(item => ({
            title: item.querySelector('title')?.textContent || 'Untitled',
            link: item.querySelector('link')?.textContent || '#',
            description: item.querySelector('description')?.textContent || '',
            pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString()
          }));
          
          console.log('Parsed posts from XML:', posts);
          displayBlogPosts(posts);
          
          // Store the last fetch time and posts in localStorage
          localStorage.setItem('lastBlogFetch', Date.now().toString());
          localStorage.setItem('cachedBlogPosts', JSON.stringify(posts));
          console.log('Successfully cached blog posts from XML');
          return;
        }
      }
    }
    
    // Fallback 2: Try CORS Anywhere (if available)
    console.log('Trying CORS Anywhere proxy...');
    response = await fetch(`https://cors-anywhere.herokuapp.com/${rssUrl}`);
    console.log('CORS Anywhere response status:', response.status);
    
    if (response.ok) {
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const items = xmlDoc.querySelectorAll('item');
      console.log('Found', items.length, 'items via CORS Anywhere');
      
      if (items.length > 0) {
        const posts = Array.from(items).slice(0, 3).map(item => ({
          title: item.querySelector('title')?.textContent || 'Untitled',
          link: item.querySelector('link')?.textContent || '#',
          description: item.querySelector('description')?.textContent || '',
          pubDate: item.querySelector('pubDate')?.textContent || new Date().toISOString()
        }));
        
        console.log('Parsed posts from CORS Anywhere:', posts);
        displayBlogPosts(posts);
        
        // Store the last fetch time and posts in localStorage
        localStorage.setItem('lastBlogFetch', Date.now().toString());
        localStorage.setItem('cachedBlogPosts', JSON.stringify(posts));
        console.log('Successfully cached blog posts from CORS Anywhere');
        return;
      }
    }
    
    throw new Error('All RSS proxy services failed');
    
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    
    // Try to load from cache first
    const cachedPosts = localStorage.getItem('cachedBlogPosts');
    if (cachedPosts) {
      try {
        const posts = JSON.parse(cachedPosts);
        console.log('Loading blog posts from cache:', posts);
        displayBlogPosts(posts);
        
        // Add a note that these are cached
        const blogContainer = document.getElementById('blog-posts');
        if (blogContainer) {
          const cacheNote = document.createElement('div');
          cacheNote.style.cssText = 'text-align: center; color: var(--text-muted); font-size: 0.875rem; margin-top: 1rem;';
          cacheNote.textContent = 'Showing cached posts (live feed temporarily unavailable)';
          blogContainer.appendChild(cacheNote);
        }
        return;
      } catch (e) {
        console.error('Failed to parse cached posts:', e);
      }
    }
    
    // Final fallback: show placeholder posts
    console.log('Showing fallback posts');
    displayFallbackPosts();
  }
}

// Display blog posts
function displayBlogPosts(posts) {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;
  
  blogContainer.innerHTML = posts.map(post => `
    <article class="blog-post">
      <h3 class="blog-post-title">
        <a href="${post.link}" target="_blank" rel="noopener" aria-label="Read blog post: ${post.title}">
          ${post.title}
        </a>
      </h3>
      <p class="blog-post-excerpt">${post.description ? stripHtml(post.description).substring(0, 150) + '...' : 'Click to read more'}</p>
      <div class="blog-post-meta">
        <time datetime="${post.pubDate}" class="blog-post-date">
          ${new Date(post.pubDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
      </div>
    </article>
  `).join('');
}

// Display fallback posts
function displayFallbackPosts() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;
  
  blogContainer.innerHTML = `
    <article class="blog-post">
      <h3 class="blog-post-title">
        <a href="http://blog.adityashah.dev" target="_blank" rel="noopener">
          WordPress Performance Optimization Tips
        </a>
      </h3>
      <p class="blog-post-excerpt">Learn essential techniques to boost your WordPress site's performance and improve user experience...</p>
      <div class="blog-post-meta">
        <time class="blog-post-date">Recent Post</time>
      </div>
    </article>
    <article class="blog-post">
      <h3 class="blog-post-title">
        <a href="http://blog.adityashah.dev" target="_blank" rel="noopener">
          DevOps Best Practices for WordPress
        </a>
      </h3>
      <p class="blog-post-excerpt">Explore modern DevOps practices specifically tailored for WordPress development and deployment...</p>
      <div class="blog-post-meta">
        <time class="blog-post-date">Recent Post</time>
      </div>
    </article>
    <article class="blog-post">
      <h3 class="blog-post-title">
        <a href="http://blog.adityashah.dev" target="_blank" rel="noopener">
          Building WordPress Communities
        </a>
      </h3>
      <p class="blog-post-excerpt">Tips and insights from organizing WordPress communities and events across India...</p>
      <div class="blog-post-meta">
        <time class="blog-post-date">Recent Post</time>
      </div>
    </article>
  `;
}

// Check if we should refresh blog posts (every 30 minutes)
function shouldRefreshBlogPosts() {
  const lastFetch = localStorage.getItem('lastBlogFetch');
  if (!lastFetch) return true;
  
  const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
  return (Date.now() - parseInt(lastFetch)) > thirtyMinutes;
}

// Refresh blog posts periodically
function startBlogRefreshTimer() {
  // Check every 5 minutes if we should refresh
  setInterval(() => {
    if (shouldRefreshBlogPosts()) {
      console.log('Refreshing blog posts...');
      fetchBlogPosts();
    }
  }, 5 * 60 * 1000); // Check every 5 minutes
}

// Helper function to strip HTML tags
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// Initialize blog posts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load blog posts immediately
  fetchBlogPosts();
  
  // Start the refresh timer
  startBlogRefreshTimer();
  
  // Add manual refresh button for testing
  addRefreshButton();
  
  // Also refresh when the page becomes visible again (user returns to tab)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden && shouldRefreshBlogPosts()) {
      console.log('Page became visible, checking for blog updates...');
      fetchBlogPosts();
    }
  });
});

// Add manual refresh button for testing
function addRefreshButton() {
  const blogSection = document.getElementById('blog');
  if (blogSection) {
    const refreshButton = document.createElement('button');
    refreshButton.innerHTML = '🔄 Refresh Posts';
    refreshButton.style.cssText = `
      position: absolute; 
      top: 1rem; 
      right: 1rem; 
      background: var(--primary-color); 
      color: white; 
      border: none; 
      padding: 0.5rem 1rem; 
      border-radius: 4px; 
      cursor: pointer; 
      font-size: 0.875rem;
      z-index: 10;
    `;
    refreshButton.onclick = () => {
      console.log('Manual refresh triggered');
      // Clear cache to force fresh fetch
      localStorage.removeItem('cachedBlogPosts');
      localStorage.removeItem('lastBlogFetch');
      fetchBlogPosts();
    };
    
    const container = blogSection.querySelector('.container');
    if (container) {
      container.style.position = 'relative';
      container.appendChild(refreshButton);
    }
  }
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidEmail,
    debounce,
    showNotification,
    fetchBlogPosts,
    stripHtml,
    displayBlogPosts,
    displayFallbackPosts,
    shouldRefreshBlogPosts,
    startBlogRefreshTimer,
    addRefreshButton
  };
}
