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
        let noteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16" data-toggle="tooltip" data-placement="top" data-original-title="${entry.note}">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
</svg>`;
tableContent += `<tr><td>${entry.date}</td><td>${wowheadLink}</td><td>${noteIcon}</td><td>${entry.instance}</td><td>${entry.boss}</td></tr>`;

});


    $('#resultsTable tbody').html(tableContent);

    // Initialize the DataTable and set default sorting
    $('#resultsTable').DataTable({
        "order": [[0, 'desc']]  // Sort by first column (Date) in descending order
    });
    $('[data-toggle="tooltip"]').tooltip();
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
