const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            
            if (registration.installing) {
                console.log('SW installing');
            } else if (registration.waiting) {
                console.log('SW installed');
            } else if (registration.active) {
                console.log('SW active');
            }
        } catch (error) {
            console.error(`Registration failed with ${error}`);
        }
    }
};

registerServiceWorker();