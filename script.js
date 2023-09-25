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
        // Convert the date string to a sortable format
        const sortableDate = convertToSortableDate(entry.date);

        let itemID = entry.itemID ? entry.itemID.toString() : "117378";
        let wowheadLink = `<a href="https://www.wowhead.com/wotlk/item=${itemID}" data-wowhead="item=${itemID}" target="_blank">${entry.itemName}</a>`;
        let noteIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16" data-toggle="tooltip" data-placement="top" data-original-title="${entry.note}">
            <!-- ... -->
        </svg>`;

        // Use the sortableDate for sorting
        tableContent += `<tr><td>${sortableDate}</td><td>${wowheadLink}</td><td>${noteIcon}</td><td>${entry.instance}</td><td>${entry.boss}</td></tr>`;
    });

    $('#resultsTable tbody').html(tableContent);

    // Initialize the DataTable with date sorting
    $('#resultsTable').DataTable({
        "order": [[0, 'asc']], // Sort by the first column (sortableDate) in descending order
        "columnDefs": [
            { "type": "date", "targets": 0 } // Specify that the first column contains dates
        ]
    });
    $('[data-toggle="tooltip"]').tooltip('show');
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

// Function to convert date to sortable format (YYYY-MM-DD)
function convertToSortableDate(inputDate) {
    const parts = inputDate.split('/');
    if (parts.length === 3) {
        const year = parts[2].padStart(4, '20'); // assuming the year is in 2000s
        const month = parts[1].padStart(2, '0');
        const day = parts[0].padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return inputDate;
}

