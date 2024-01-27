// /public/javascripts/networkingModule.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and render lab content
    fetchLabContent();

    // Setup spawn Kali instance button
    setupSpawnKaliButton();

    // Setup terminate Kali instance button
    setupTerminateKaliButton();
});

function fetchLabContent() {
    // Make authenticated request with the token cookie
    fetch('/api/v1/lab/networkingLab', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch lab content: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Update the content in the 'lab-content' div
        document.getElementById('lab-content').innerHTML = data.labContent.content;
    })
    .catch(error => console.error('Error fetching lab content:', error));
}

function setupSpawnKaliButton() {
    // Add event listener to the spawn Kali instance button
    const spawnKaliButton = document.getElementById('spawnKaliButton');
    spawnKaliButton.addEventListener('click', handleSpawnKali);
}

function handleSpawnKali() {
    const spawnKaliButton = document.getElementById('spawnKaliButton');
    spawnKaliButton.textContent = 'Loading Kali Lab';

    // Make authenticated request to spawn Kali instance
    fetch('/api/v1/spawnlab', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to spawn Kali instance: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // After the progress, open the link in a new tab
        window.open(data.link, '_blank');
    })
    .catch(error => console.error('Error spawning Kali instance:', error));
}


function updateSpawnKaliButtonState(link) {
    const spawnKaliButton = document.getElementById('spawnKaliButton');
    
    // Change button text and color for loading state
    spawnKaliButton.textContent = 'Loading Kali Lab';
    spawnKaliButton.classList.remove('btn-primary');
    spawnKaliButton.classList.add('btn-magenta'); // Add magenta color class

    // Disable button during loading state
    spawnKaliButton.disabled = true;

    // Store the link for later use
    spawnKaliButton.dataset.kaliLink = link;
}

function setupTerminateKaliButton() {
    // Add event listener to the terminate Kali instance button
    const terminateKaliButton = document.getElementById('terminateKaliButton');
    terminateKaliButton.addEventListener('click', handleTerminateKali);
}

function handleTerminateKali() {
    // Make authenticated request to terminate Kali instance
    fetch('/api/v1/termlab', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to terminate Kali instance: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Show alert with termination message
        showAlert(`Instance terminated successfully. Instance ID: ${data.terminatedInstanceId}`);
        // Reset spawn Kali button to original state
        resetSpawnKaliButton();
    })
    .catch(error => console.error('Error terminating Kali instance:', error));
}

function resetSpawnKaliButton() {
    const spawnKaliButton = document.getElementById('spawnKaliButton');
    
    // Reset button text and color
    spawnKaliButton.textContent = 'Spawn Kali Lab';
    spawnKaliButton.classList.remove('btn-magenta'); // Remove magenta color class
    spawnKaliButton.classList.add('btn-primary'); // Restore original color class

    // Enable the button
    spawnKaliButton.disabled = false;

    // Clear stored link
    spawnKaliButton.dataset.kaliLink = '';
}


function hideAlert() {
    // Clear the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = '';
}

function simulateProgressBarInButton(buttonElement, durationInSeconds, onComplete) {
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';

    const progressBarElement = document.createElement('div');
    progressBarElement.className = 'progress-bar-magenta';
    progressBarContainer.appendChild(progressBarElement);

    buttonElement.textContent = ''; // Clear button text
    buttonElement.classList.remove('btn-primary'); // Remove blue color class
    buttonElement.classList.add('btn-magenta'); // Add magenta color class
    buttonElement.appendChild(progressBarContainer);

    let progress = 0;

    const intervalId = setInterval(() => {
        progress += (100 / durationInSeconds);
        progressBarElement.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(intervalId);
            progressBarElement.style.width = '100%';

            // Remove the progress bar after completion
            buttonElement.removeChild(progressBarContainer);

            // Disable the button during loading state
            buttonElement.disabled = true;

            // Hide loading message
            onComplete();
        }
    }, 1000);
}




function showAlert(message) {
    // Create an alert element
    const alertElement = document.createElement('div');
    alertElement.className = 'alert';
    alertElement.textContent = message;

    // Append the alert to the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear previous alerts
    alertContainer.appendChild(alertElement);
}

// Helper function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
