// Ensure video playback starts immediately
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-background');
    const loadingOverlay = document.querySelector('.loading-overlay');

    // Show loading overlay initially
    loadingOverlay.classList.remove('hidden');

    // Handle video loaded event
    video.addEventListener('loadeddata', function() {
        loadingOverlay.classList.add('hidden');
    });

    // Force video play on mobile devices
    video.play().catch(function(error) {
        console.log("Video autoplay failed:", error);
    });

    // Ensure video fits within viewport while maintaining aspect ratio
    function adjustVideoSize() {
        const videoRatio = 16/9;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowRatio = windowWidth / windowHeight;

        if (windowRatio < videoRatio) {
            // Window is taller than video aspect ratio
            const videoHeight = windowWidth / videoRatio;
            video.style.width = windowWidth + 'px';
            video.style.height = videoHeight + 'px';
            // Center vertically
            video.style.top = ((windowHeight - videoHeight) / 2) + 'px';
            video.style.left = '0';
            video.style.transform = 'none';
        } else {
            // Window is wider than video aspect ratio
            const videoWidth = windowHeight * videoRatio;
            video.style.width = videoWidth + 'px';
            video.style.height = windowHeight + 'px';
            // Center horizontally
            video.style.top = '0';
            video.style.left = ((windowWidth - videoWidth) / 2) + 'px';
            video.style.transform = 'none';
        }
    }

    // Adjust video size on load and resize
    window.addEventListener('resize', adjustVideoSize);
    adjustVideoSize();
});