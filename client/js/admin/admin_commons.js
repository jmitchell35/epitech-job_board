function setTableHeaders(table, headers) {
  const row = document.createElement('tr');

  headers.forEach((header) => {
    const th = document.createElement('th');
    th.innerHTML = header;
    row.appendChild(th);
  })

  const deleteCol = document.createElement('th');
  row.appendChild(deleteCol);
  table.appendChild(row);
}

function populateRows(table, headers, entries) {
  entries.forEach((entry) => {
    const entryRow = document.createElement('tr');
    entryRow.classList.add('odd:bg-white', 'even:bg-gray-100');

    headers.forEach((property) => {
      const td = document.createElement('td');
      td.innerHTML = entry[property];
      td.classList.add('px-4', 'py-2', 'border-r');
      entryRow.appendChild(td);
    })
    const delTd = document.createElement('td');
    const delButton = document.createElement('button');
    delButton.classList.add('delete-button');
    delButton.setAttribute('id', `${entry.id}`);
    delButton.innerHTML = 'Delete';
    delButton.classList.add('bg-black', 'text-gray-100', 'py-2', 'rounded');
    delTd.appendChild(delButton);
    entryRow.appendChild(delTd);
    table.appendChild(entryRow);
  })
}

async function adminOnly() {
  const rights = await youHaveTheRightToRemainSilent().then((profile) => { return profile; });

  if (rights === 'USER') {
    window.alert('This page is adminOnly');
    window.location.href = '/index.html';
  } else if (rights === 'RECRUITER') {
    window.alert('This page is adminOnly');
    window.location.href = '/recruiter_dashboard.html';
  }
}

adminOnly();