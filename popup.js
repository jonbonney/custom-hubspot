document.addEventListener('DOMContentLoaded', function() {
    const roles = ['sales', 'marketing', 'development'];
    
    // Load and highlight current role
    chrome.storage.sync.get(['selectedRole'], function(result) {
        if (result.selectedRole) {
            const button = document.getElementById(result.selectedRole);
            if (button) {
                button.classList.add('selected');
            }
        }
    });

    roles.forEach(role => {
        document.getElementById(role).addEventListener('click', async () => {
            // Reset all buttons to default state
            roles.forEach(r => {
                document.getElementById(r).classList.remove('selected');
            });
            
            // Add selected class to clicked button
            document.getElementById(role).classList.add('selected');
            
            // Save role selection
            chrome.storage.sync.set({ selectedRole: role });
            
            // Send message to content script
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.sendMessage(tab.id, {
                action: 'switchRole',
                role: role
            });
        });
    });
}); 