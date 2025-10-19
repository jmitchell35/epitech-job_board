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
  const response = await fetch(`http://localhost:3000/${fetchPath}`, {
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

  const inputs = postTable.querySelectorAll('input, select, textarea');
  const data = {};
  inputs.forEach(input => data[input.name] = input.value);

  try {
    const response = await fetch("http://localhost:3000/api/v1/job_advertisements", {
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

adminOnly();