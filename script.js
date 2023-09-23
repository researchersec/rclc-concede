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
    let playerName = document.getElementById("playerName").value;
    playerName += "-Golemagg";  // Appending -Golemagg to the entered player name
    
    const resultsTable = document.getElementById("resultsTable");
    
    // Filter data for the player
    const playerData = data.filter(entry => entry.player === playerName);

    // Create table rows from the player data
    let tableContent = '<tr><th>Date</th><th>Item Name</th><th>Votes</th><th>Instance</th><th>Boss</th></tr>';
    playerData.forEach(entry => {
        tableContent += `<tr><td>${entry.date}</td><td>${entry.itemName}</td><td>${entry.votes}</td><td>${entry.instance}</td><td>${entry.boss}</td></tr>`;
    });
    
    resultsTable.innerHTML = tableContent;
}

