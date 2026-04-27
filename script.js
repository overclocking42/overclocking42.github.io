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
    setupPlayerPoster();
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
// PLAYER POSTER SETUP
// ============================================================

function setupPlayerPoster() {
    const playerPoster = document.getElementById('playerPoster');
    const playerContainer = document.querySelector('.custom-player');
    
    if (playerPoster && playerContainer) {
        // Hide poster on click
        playerContainer.addEventListener('click', () => {
            playerPoster.style.opacity = '0';
            playerPoster.style.pointerEvents = 'none';
        }, { once: true });
        
        // Also hide poster after a delay to account for autoplay
        setTimeout(() => {
            if (playerPoster && playerPoster.style.opacity !== '0') {
                playerPoster.style.opacity = '0';
                playerPoster.style.pointerEvents = 'none';
            }
        }, 1000);
    }
}

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
