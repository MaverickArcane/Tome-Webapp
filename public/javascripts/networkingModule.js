document.addEventListener('DOMContentLoaded', function () {
    // Fetch and render lab content
    fetchLabContent();

    // Reference to the spawn lab button
    var spawnLabButton = document.getElementById('spawnKaliButton');

    // Reference to the terminate lab button
    var terminateLabButton = document.getElementById('terminateKaliButton');

    // Reference to the link button
    var linkButton = document.getElementById('openLinkButton');

    // Reference to the header text
    var headerText = document.getElementById('headerText');

    function fetchLabContent() {
        // Make authenticated request with the token cookie
        fetch('/api/v1/lab/networkingLab', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
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

    function handleSpawnKali() {
        // Make authenticated request to spawn Kali instance
        fetch('/api/v1/spawnlab', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to spawn Kali instance: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Store the link for later use in the Open Link button
            linkButton.href = data.link;
        })
        .catch(error => console.error('Error spawning Kali instance:', error));
    }

    function handleTerminateKali() {
        // Make authenticated request to terminate Kali instance
        fetch('/api/v1/termlab', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to terminate Kali instance: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Clear the stored link
            linkButton.href = "";
        })
        .catch(error => console.error('Error terminating Kali instance:', error));
    }

    // Add click event listener to the spawn lab button
    spawnLabButton.addEventListener('click', function() {
        // Call the function to spawn the lab
        handleSpawnKali();
    });

    // Add click event listener to the terminate lab button
    terminateLabButton.addEventListener('click', function() {
        // Call the function to terminate the lab
        handleTerminateKali();
    });

    // Add click event listener to the link button
    linkButton.addEventListener('click', function() {
        // Open the stored link in a new tab
        window.open(linkButton.href, '_blank');
    });
});
