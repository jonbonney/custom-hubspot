document.addEventListener('DOMContentLoaded', function() {
    const roles = ['sales', 'marketing', 'development'];
    
    // Load and highlight current role
    chrome.storage.sync.get(['selectedRole'], function(result) {
        if (result.selectedRole) {
            const button = document.getElementById(result.selectedRole);
            if (button) {
                button.style.backgroundColor = '#ff8f73';
            }
        }
    });

    roles.forEach(role => {
        document.getElementById(role).addEventListener('click', async () => {
            // Reset all buttons to default color
            roles.forEach(r => {
                document.getElementById(r).style.backgroundColor = '#ff7a59';
            });
            
            // Highlight selected button
            document.getElementById(role).style.backgroundColor = '#ff8f73';
            
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