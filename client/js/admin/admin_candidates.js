document.addEventListener("DOMContentLoaded", async (evt) => {
  const table = document.getElementById("admin-table");

  const response = await fetch("http://localhost:3000/api/v1/candidates", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const entries = await response.json();

    if (!entries || entries.length === 0) {
    table.innerHTML = '<tr><td>No candidate profiles available</td></tr>';
    return;
  }

  const headers = Object.keys(entries[0]);

  setTableHeaders(table, headers);
  populateRows(table, headers, entries);

  table.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const entryId = event.target.id;

      try {
        const response = await fetch(`http://localhost:3000/api/v1/candidates/${entryId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          event.target.closest('tr').remove();
        } else {
          console.error('Failed to delete: ', response.status);
          alert('Failed to delete the entry. Please try again');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('An error occurred. Please try again.');
      }
    }
  });
});
