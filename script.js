/**
 * CONTINENTAL SAGA - Premium Streaming Platform UI
 * Internet Archive Embed Integration
 */

// ============================================================
// CAST DATA
// ============================================================

const castMembers = [
    { name: 'Amruth', role: 'Alien Amruth', img: 'am.png' },
    { name: 'Aditya', role: 'Barbie Bapat', img: 'ba.png' },
    { name: 'Guruprasad', role: 'GeForce Guru', img: 'gu.png' },
    { name: 'Kushal', role: 'Katrina Kushal', img: 'ku.png' },
    { name: 'Manoj', role: 'McQueen MJ', img: 'me.png' },
    { name: 'Mohan', role: 'Mustang Mohan', img: 'mo.png' },
    { name: 'Nitish', role: 'Nutella Nitish', img: 'ni.png' },
    { name: 'Prajeet', role: 'Pookie Prajeet', img: 'pa.png' },
    { name: 'Praful', role: 'Pheonix Praful', img: 'fu.png' },

    
];

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeCast();
    attachEventListeners();
    removeShimmerAfterLoad();
    setupMobilePlayerHandler();
});

// ============================================================
// SCROLL TO PLAYER
// ============================================================

function scrollToPlayer() {
    const playerSection = document.getElementById('playerSection');
    if (playerSection) {
        playerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================================
// PLAYER POSTER SETUP - Removed (using Google Drive's native controls)
// ============================================================

function initializeCast() {
    const castRow = document.getElementById('castRow');
    if (!castRow) return;
    
    castRow.innerHTML = '';
    
    castMembers.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'cast-card fade-in';
        card.innerHTML = `
            <img src="${member.img}" alt="${member.name}" class="cast-avatar">
            <div class="cast-name">${member.name}</div>
            <div class="cast-role">${member.role}</div>
        `;
        
        card.style.animationDelay = `${index * 0.1}s`;
        castRow.appendChild(card);
    });
}

// ============================================================
// EVENT LISTENERS
// ============================================================

function attachEventListeners() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const playerContainer = document.querySelector('.player-container');
    const playerOverlay = document.getElementById('playerOverlay');

    // Fullscreen
    if (fullscreenBtn && playerContainer) {
        fullscreenBtn.addEventListener('click', () => toggleFullscreen(playerContainer));
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Auto-hide overlay on idle
    if (playerOverlay) {
        let idleTimeout;
        document.querySelector('.custom-player').addEventListener('mousemove', () => {
            clearTimeout(idleTimeout);
            playerOverlay.style.opacity = '1';
            
            idleTimeout = setTimeout(() => {
                playerOverlay.style.opacity = '0';
            }, 3000);
        });
    }

    // Add "My List" functionality
    const addListBtn = document.querySelector('.btn-add-list');
    if (addListBtn) {
        addListBtn.addEventListener('click', function() {
            showNotification('Added to My List!');
            this.style.opacity = '0.6';
        });
    }
}

// ============================================================
// MOBILE PLAYER HANDLER
// ============================================================

function setupMobilePlayerHandler() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const playerContainer = document.querySelector('.player-container');
    const customPlayer = document.querySelector('.custom-player');
    
    if (isMobile && playerContainer) {
        // Make player container clickable on mobile
        playerContainer.style.cursor = 'pointer';
        playerContainer.style.touchAction = 'manipulation';
        
        // Create overlay with tap instruction for mobile
        const tapOverlay = document.createElement('div');
        tapOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.3);
            z-index: 9;
            border-radius: 8px;
            pointer-events: none;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            text-align: center;
            padding: 20px;
            transition: opacity 0.3s ease;
        `;
        tapOverlay.innerHTML = '📱 Tap to play fullscreen';
        
        if (customPlayer) {
            customPlayer.parentElement.style.position = 'relative';
            customPlayer.parentElement.appendChild(tapOverlay);
        }
        
        // Handle click for fullscreen
        playerContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFullscreen(playerContainer);
            if (tapOverlay) {
                tapOverlay.style.opacity = '0';
                tapOverlay.style.pointerEvents = 'none';
            }
        });
        
        // Add touch feedback
        playerContainer.addEventListener('touchstart', () => {
            playerContainer.style.opacity = '0.9';
        });
        
        playerContainer.addEventListener('touchend', () => {
            playerContainer.style.opacity = '1';
        });
        
        // Hide overlay on fullscreen exit
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement && tapOverlay) {
                tapOverlay.style.opacity = '1';
                tapOverlay.style.pointerEvents = 'auto';
            }
        });
        
        // Improve iframe loading on mobile
        const iframe = document.getElementById('mainVideo');
        if (iframe) {
            iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-presentation allow-forms allow-autoplay allow-fullscreen');
        }
    }
}

// ============================================================
// FULLSCREEN
// ============================================================

function toggleFullscreen(playerContainer) {
    if (!document.fullscreenElement) {
        playerContainer.requestFullscreen().catch(err => {
            console.log(`Fullscreen request failed: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

function handleKeyboardShortcuts(event) {
    if (event.target.matches('input, textarea')) return;

    switch (event.code) {
        case 'KeyF':
            event.preventDefault();
            const playerContainer = document.querySelector('.player-container');
            toggleFullscreen(playerContainer);
            break;
    }
}

// ============================================================
// VISUAL EFFECTS
// ============================================================

function removeShimmerAfterLoad() {
    const playerShimmer = document.querySelector('.player-shimmer');
    setTimeout(() => {
        if (playerShimmer) {
            playerShimmer.style.opacity = '0';
            setTimeout(() => {
                playerShimmer.style.display = 'none';
            }, 300);
        }
    }, 1500);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #e50914;
        color: #fff;
        padding: 14px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 4px 16px rgba(229, 9, 20, 0.5);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ============================================================
// ANIMATIONS
// ============================================================

const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(animStyle);

// ============================================================
// CONSOLE
// ============================================================

console.log('🎬 CONTINENTAL SAGA - Premium Streaming Platform');
console.log('🎥 Internet Archive Video Embed Active');
console.log('⌨️  Press F to toggle fullscreen');
