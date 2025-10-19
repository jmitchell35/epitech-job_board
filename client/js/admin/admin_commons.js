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
  const nonEditableFields = ['id', 'createdAt', 'updatedAt', 'created_at', 'updated_at'];

  entries.forEach((entry) => {
    const entryRow = document.createElement('tr');
    entryRow.classList.add('odd:bg-white', 'even:bg-gray-100');
    // for later query
    entryRow.dataset.id = entry.id;

    headers.forEach((property) => {
      const td = document.createElement('td');
      td.innerHTML = entry[property];
      td.classList.add('px-4', 'py-2', 'border-r');

      if (!nonEditableFields.includes(property)) {
        td.classList.add('editable');
        // DB column in memory for later query
        td.dataset.field = property;
      }

      entryRow.appendChild(td);
    })
    const actionsTd = document.createElement('td');
    actionsTd.classList.add('actions-cell');

    const delButton = document.createElement('button');
    delButton.classList.add('delete-button');
    delButton.setAttribute('id', `${entry.id}`);
    delButton.innerHTML = 'Delete';
    delButton.classList.add('bg-red-500', 'text-white', 'p-2', 'm-1', 'rounded', 'w-full');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.setAttribute('id', `${entry.id}`);
    editButton.innerHTML = 'Edit';
    editButton.classList.add('bg-black', 'text-white', 'p-2', 'm-1', 'rounded', 'w-full');

    actionsTd.appendChild(editButton);
    actionsTd.appendChild(delButton);
    entryRow.appendChild(actionsTd);
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

function setSelectOptionsFromStrings(element, options) {
  options.forEach((option) => {
    const selectOption = document.createElement('option');
    selectOption.textContent = option;
    selectOption.value = option;
    element.appendChild(selectOption);
  });
}

function setSelectOptionsFromObjects(element, objects) {
  objects.forEach((object) => {
    const selectOption = document.createElement('option');
    if (object.name) {
      selectOption.innerText = object.name;
    } else if (object.email) {
      selectOption.innerText = object.email;
    } else if (object.title) {
      selectOption.innerText = object.title;
    } else {
      selectOption.innerText = object.id;
    }
    selectOption.value = object.id;
    element.appendChild(selectOption);
  })
}

function setHtmlAttributes(element, config) {
  if (config.required) {
    element.required = config.required;
  }

  if (config.type) {
    element.type = config.type;
  }

  if (config.minLength) {
    element.minLength = config.minLength;
  }

  if (config.maxLength) {
    element.maxLength = config.maxLength;
  }

  if (config.pattern) {
    element.pattern = config.pattern;
  }

  if (config.options) {
    setSelectOptionsFromStrings(element, config.options);
  }
}

async function setDynamicSelectOptions(element, fetchPath) {
  const response = await fetch(`http://localhost:3000/api/v1/${fetchPath}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    console.error(`Failed to fetch ${fetchPath}: ${response.status}`);
    return false;
  }

  const options = await response.json();

  if (!options || options.length === 0) {
    return false;
  }

  setSelectOptionsFromObjects(element, options);

  return true;
}

async function setUpPostForm(table, model) {
  const properties = Object.entries(model);
  const newEntryRow = document.createElement('tr');

  for (const [fieldName, config] of properties) {
    const td = document.createElement('td');
    let element = document.createElement(`${config.tag}`);

    if (config.fetchOption) {
      if (!await setDynamicSelectOptions(element, config.fetchOption)) {
        element = document.createElement('input');
        element.type = 'text';
        element.pattern = config.pattern;
      }
    }

    setHtmlAttributes(element, config);
    element.name = fieldName;
    element.classList.add('border', 'p-1', 'w-full');
    td.appendChild(element);
    newEntryRow.appendChild(td);
  }
  table.appendChild(newEntryRow);
}

async function listenCreateButton() {
  const postTable = document.getElementById("post-table");
  const postButton = document.getElementById("post-button");
  const model = localModel;
  setTableHeaders(postTable, Object.keys(model));

  try {
    await setUpPostForm(postTable, model);

    postButton.innerText = 'POST';
    postButton.removeEventListener('click', listenCreateButton);
    postButton.addEventListener('click', listenPostButton);


  } catch (error) {
    console.error('Failed to set up form: ', error);
  }
}

async function listenPostButton() {
  const postButton = document.getElementById("post-button");
  const postTable = document.getElementById("post-table");
  const model = localModel;

  const inputs = postTable.querySelectorAll('input, select, textarea');
  const data = {};
  inputs.forEach(input => data[input.name] = input.value);

  try {
    const response = await fetch(`http://localhost:3000/api/v1/${model.endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    if (response.ok) {
      postTable.innerHTML = '';
      postButton.innerText = 'Créer une entrée';
      postButton.removeEventListener('click', listenPostButton);
      postButton.addEventListener('click', listenCreateButton);
      location.reload();
    }

  } catch (error) {
    console.error('Failed to set up form: ', error);
  }
}

function editRow(row) {
  // Prevent multiple edits
  if (editingRow) return;

  editingRow = { row, originalData: {} };
  const model = localModel;
  // checked

  row.querySelectorAll('.editable').forEach(cell => {
    const field = cell.dataset.field;
    const value = cell.textContent.trim();
    editingRow.originalData[field] = value;

    const config = model[field];
    let input;

    if (config && config.tag === 'select') {
      input = document.createElement('select');
      input.classList.add('border', 'p-1', 'w-full');
      // Checked

      if (config.fetchOption) {
        setDynamicSelectOptions(input, config.fetchOption).then(success => {
          if (success) {
            input.value = value;
          }
        });
      } else if (config.options) {
        setSelectOptionsFromStrings(input, config.options);
        input.value = value;
      }
    } else if (config && config.tag === 'textarea') {
      input = document.createElement('textarea');
      input.classList.add('border', 'p-1', 'w-full');
      input.value = value;
    } else {
      input = document.createElement('input');
      input.classList.add('border', 'p-1', 'w-full');
      input.value = value;
      if (config) setHtmlAttributes(input, config);
    }
    // Checked

    input.dataset.field = field;
    cell.innerHTML = '';
    cell.appendChild(input);
    // Checked
  });

  const actionsCell = row.querySelector('.actions-cell');
  actionsCell.innerHTML = '';

  const saveButton = document.createElement('button');
  saveButton.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
  saveButton.innerHTML = 'Save';
  saveButton.onclick = () => saveRow(row);

  const cancelButton = document.createElement('button');
  cancelButton.classList.add('bg-red-500', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.onclick = () => cancelEdit(row);

  actionsCell.appendChild(saveButton);
  actionsCell.appendChild(cancelButton);
  // Checked
}

async function saveRow(row) {
  const id = row.dataset.id;
  const updates = {};
  const model = localModel;

  row.querySelectorAll('.editable input, .editable select, .editable textarea').forEach(input => {
    updates[input.dataset.field] = input.value;
  });

  try {
    const response = await fetch(`http://localhost:3000/api/v1/${model.endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error('Save failed');

    row.querySelectorAll('.editable').forEach(cell => {
      const field = cell.dataset.field;
      cell.innerHTML = updates[field];
    });

    // Restore action buttons back to their original state
    const actionsCell = row.querySelector('.actions-cell');
    actionsCell.innerHTML = '';

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button', 'bg-black', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
    editButton.innerHTML = 'Edit';
    editButton.onclick = () => editRow(row);

    const delButton = document.createElement('button');
    delButton.classList.add('delete-button', 'bg-red-500', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
    delButton.setAttribute('id', id);
    delButton.innerHTML = 'Delete';

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(delButton);

    editingRow = null;
    // Checked
  } catch (error) {
    alert('Error saving changes');
    console.error(error);
  }
}

function cancelEdit(row) {
  const { originalData } = editingRow;
  const id = row.dataset.id;

  // Revert changes
  row.querySelectorAll('.editable').forEach(cell => {
    const field = cell.dataset.field;
    cell.innerHTML = originalData[field];
  });

  const actionsCell = row.querySelector('.actions-cell');
  actionsCell.innerHTML = '';

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button', 'bg-black', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
  editButton.innerHTML = 'Edit';
  editButton.onclick = () => editRow(row);

  const delButton = document.createElement('button');
  delButton.classList.add('delete-button', 'bg-red-500', 'text-white', 'p-2', 'rounded', 'm-1', 'w-full');
  delButton.setAttribute('id', id);
  delButton.innerHTML = 'Delete';

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(delButton);

  editingRow = null;
  // Checked
}

let editingRow = null;

adminOnly();

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-button')) {
    const row = e.target.closest('tr');
    editRow(row);
  }

  if (e.target.classList.contains('save-button')) {
    const row = e.target.closest('tr');
    saveRow(row);
  }

  if (e.target.classList.contains('cancel-button')) {
    const row = e.target.closest('tr');
    cancelEdit(row);
  }
});

document.addEventListener("DOMContentLoaded", async (evt) => {
  const table = document.getElementById("admin-table");
  const postButton = document.getElementById("post-button");
  postButton.addEventListener('click', listenCreateButton);

  const response = await fetch(`http://localhost:3000/api/v1/${localModel.endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const entries = await response.json();

  if (!entries || entries.length === 0) {
    table.innerHTML = `<tr><td>No ${localModel.entity.plural} available</td></tr>`;
    return;
  }

  const headers = Object.keys(entries[0]);

  setTableHeaders(table, headers);
  populateRows(table, headers, entries);

  table.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
      const entryId = event.target.id;

      try {
        const response = await fetch(`http://localhost:3000/api/v1/${localModel.endpoint}/${entryId}`, {
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
