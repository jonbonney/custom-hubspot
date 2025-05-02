// Role-specific functions
function applySalesRole() {
    // Update title to append role
    const originalTitle = document.title.replace(/ \((Sales|Marketing|Development) Role\)$/, '');
    document.title = `${originalTitle} (Sales Role)`;
    console.log('Sales role activated');

    const hideElements = [
        'developers-branch',
        'automation-branch-toggle',
        'commerce-branch-v5-toggle',
        'marketing-toggle',
    ];

    hideElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hide-element');
        }
    });
}

function applyMarketingRole() {
    // Update title to append role
    const originalTitle = document.title.replace(/ \((Sales|Marketing|Development) Role\)$/, '');
    document.title = `${originalTitle} (Marketing Role)`;
    console.log('Marketing role activated');

    const hideElements = [
        'developers-branch',
    ];

    const showElements = [
        'marketing-branch-toggle',
        'automation-branch-toggle',
        'commerce-branch-v5-toggle',
    ];

    hideElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hide-element');
        }
    });

    showElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hide-element');
        }
    });
}

function applyDevelopmentRole() {
    // Update title to append role
    const originalTitle = document.title.replace(/ \((Sales|Marketing|Development) Role\)$/, '');
    document.title = `${originalTitle} (Development Role)`;
    console.log('Development role activated');
    
    const showElements = [
        'developers-branch',
        'automation-branch-toggle',
        'commerce-branch-v5-toggle',
        'marketing-toggle',
    ];

    showElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hide-element');
        }
    });
}

// Function to handle role-specific changes
function applyRoleChanges(role) {
    // Remove any existing role-specific changes first
    // TODO: Add cleanup code here when we implement actual changes
    
    // Apply new role changes
    switch(role.toLowerCase()) {
        case 'sales':
            applySalesRole();
            break;
        case 'marketing':
            applyMarketingRole();
            break;
        case 'development':
            applyDevelopmentRole();
            break;
        default:
            console.warn('Unknown role:', role);
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'switchRole') {
        applyRoleChanges(message.role);
    }
});

// Load and apply saved role when page loads
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['selectedRole'], function(result) {
        if (result.selectedRole) {
            applyRoleChanges(result.selectedRole);
        }
    });
});

// Also check for role after a short delay to handle dynamic content
setTimeout(() => {
    chrome.storage.sync.get(['selectedRole'], function(result) {
        if (result.selectedRole) {
            applyRoleChanges(result.selectedRole);
        }
    });
}, 1000);
