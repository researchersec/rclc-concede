let data = [];

// Load JSON data from the repository
fetch('export.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
    })
    .catch(error => {
        console.error("Error fetching the JSON data: ", error);
    });

function searchPlayer() {
    if (!data.length) {
        console.log("Data not loaded yet. Please try again in a moment.");
        return;
    }

    let playerName = document.getElementById("playerName").value;
    playerName += "-Golemagg";  // Appending -Golemagg to the entered player name
    
    const resultsTable = document.getElementById("resultsTable");
    
    // Filter data for the player
    const playerData = data.filter(entry => entry.player === playerName);

    // Ensure tableContent is initialized before the loop
    let tableContent = '<tr><th>Date</th><th>Item Name</th><th>Votes</th><th>Instance</th><th>Boss</th></tr>';

    playerData.forEach(entry => {
        let itemId = entry.itemId ? entry.itemId.toString() : "117378";  // Ensure itemId is a string or use default value
        let wowheadLink = `<a href="https://www.wowhead.com/item=${itemId}" data-wowhead="item=${itemId}" target="_blank">${entry.itemName}</a>`;
        tableContent += `<tr><td>${entry.date}</td><td>${wowheadLink}</td><td>${entry.votes}</td><td>${entry.instance}</td><td>${entry.boss}</td></tr>`;
    });
    
    resultsTable.innerHTML = tableContent;

    // Initialize the DataTable and set default sorting
    $('#resultsTable').DataTable({
        "order": [[0, 'desc']],  // Sort by first column (Date) in descending order
        "destroy": true  // Destroy any existing table instance before reinitializing
    });

}
