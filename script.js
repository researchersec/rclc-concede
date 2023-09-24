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

    // Filter data temp fix
    const playerData = data.filter(entry => entry.player === playerName);


    // Resetting the DataTable and table content
    if ($.fn.dataTable.isDataTable('#resultsTable')) {
        $('#resultsTable').DataTable().destroy();
    }
    $('#resultsTable tbody').empty();

    let tableContent = '';

    playerData.forEach(entry => {
        let itemID = entry.itemID ? entry.itemID.toString() : "117378";  // Ensure itemID is a string or use default value
        let wowheadLink = `<a href="https://www.wowhead.com/wotlk/item=${itemID}" data-wowhead="item=${itemID}" target="_blank">${entry.itemName}</a>`;
        tableContent += `<tr><td>${entry.date}</td><td>${wowheadLink}</td><td>${entry.votes}</td><td>${entry.instance}</td><td>${entry.boss}</td></tr>`;
});


    $('#resultsTable tbody').html(tableContent);

    // Initialize the DataTable and set default sorting
    $('#resultsTable').DataTable({
        "order": [[0, 'desc']]  // Sort by first column (Date) in descending order
    });
}
// Set up the Enter key event listener here, outside of the searchPlayer function
document.getElementById("playerName").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action (if any)
        event.preventDefault();
        // Trigger the search function
        searchPlayer();
    }
});
