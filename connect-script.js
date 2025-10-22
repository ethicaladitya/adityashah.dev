// Connect Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initLinkAnimations();
    initCopyToClipboard();
    initAnalytics();
    initAccessibility();
});

// Link animations and interactions
function initLinkAnimations() {
    const links = document.querySelectorAll('.connect-link');
    
    // Add staggered entrance animation
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s ease-out';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });

    // Add hover sound effect (subtle)
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Could add subtle sound effects here if desired
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

// Copy link functionality
function initCopyToClipboard() {
    // Add copy functionality to email link
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = 'hi@adityashah.dev';
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!', 'success');
                }).catch(() => {
                    // Fallback: open email client
                    window.location.href = `mailto:${email}`;
                });
            } else {
                // Fallback for older browsers
                window.location.href = `mailto:${email}`;
            }
        });
    }

    // Add share functionality
    const shareButtons = document.querySelectorAll('[data-share]');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            shareCurrentPage();
        });
    });
}

// Share current page
async function shareCurrentPage() {
    const shareData = {
        title: 'Connect with Aditya Shah',
        text: 'Connect with Aditya Shah - WordPress Expert, DevOps Specialist, and Community Builder',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: copy URL to clipboard
            await navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        }
    } catch (error) {
        console.log('Error sharing:', error);
        // Fallback: copy URL
        try {
            await navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        } catch (clipboardError) {
            showNotification('Unable to share at the moment', 'error');
        }
    }
}

// Analytics tracking (optional)
function initAnalytics() {
    const links = document.querySelectorAll('.connect-link');
    
    links.forEach(link => {
        link.addEventListener('click', function() {
            const linkTitle = this.querySelector('.link-title')?.textContent || 'Unknown';
            const linkUrl = this.href;
            
            // Track link clicks (you can integrate with your analytics service)
            console.log('Link clicked:', linkTitle, linkUrl);
            
            // Example: Google Analytics 4 event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'social_link',
                    event_label: linkTitle,
                    value: linkUrl
                });
            }
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.remove();
            });
        }
    });

    // Add focus indicators for keyboard users
    const links = document.querySelectorAll('.connect-link');
    links.forEach(link => {
        link.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

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
        borderRadius: '12px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
    });

    // Set background color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    notification.style.background = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Background animation control
function initBackgroundAnimation() {
    const shapes = document.querySelectorAll('.shape');
    
    // Add mouse interaction to shapes
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize background animation
initBackgroundAnimation();

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Add touch feedback for mobile devices
if ('ontouchstart' in window) {
    const links = document.querySelectorAll('.connect-link');
    
    links.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Theme detection and adjustment
function detectTheme() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

// Initialize theme detection
detectTheme();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        shareCurrentPage,
        initLinkAnimations,
        initAccessibility
    };
}