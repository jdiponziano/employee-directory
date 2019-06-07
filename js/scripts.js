const usersUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
const main = document.getElementsByTagName('main')[0];

//Handle fetch requests
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getEmployees(url) {
  const employeeJSON = await getJSON(url);
  employees = await employeeJSON.results;
  return employees;
}

//Create element helper function
function createElement(name, className) {
  const el = document.createElement(name);
  el.classList.add(className);
  return el;
}

//Modal controls and functions
function closeModal() {
  const modal = document.querySelector('.modal-container');
  const employeeDetails = document.querySelectorAll('.modal-info-container');
  hideDetails(employeeDetails);
  modal.style.display = 'none';
}

function openModal(el) {
  const modal = document.querySelector('.modal-container');
  const index = Array.from(el.parentElement.children).indexOf(el);
  const employeeDetails = document.querySelectorAll('.modal-info-container');
  hideDetails(employeeDetails);
  employeeDetails[index].style.display = 'block';
  employeeDetails[index].classList.add('active');
  modal.style.display = 'block';
}

function hideDetails(details) {
  details.forEach(function (employee) {
    employee.style.display = 'none';
    employee.classList.remove('active');
  });
}

//Generate html for employee
function generateHTML(data) {
  data.map(employee => {
    const card = createElement('div', 'card');
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>`;

    card.addEventListener('click', function () { openModal(this); });

    gallery.appendChild(card);
  });

  generateModal(data);
}

//Generate modal html
function generateModal(data) {
  const modalContainer = createElement('div', 'modal-container');
  const modal = createElement('div', 'modal');
  const closeBtn = createElement('button', 'modal-close-btn');
  const btnContainer = createElement('div', 'modal-btn-container');

  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('id', 'modal-close-btn');
  closeBtn.innerHTML = '<strong>X</strong>';
  closeBtn.addEventListener('click', closeModal);

  modal.appendChild(closeBtn);

  data.map(employee => {
    const modalInfo = createElement('div', 'modal-info-container');
    modalInfo.style.display = 'none';
    modalInfo.innerHTML = `
      <img class="modal-img" src="${employee.picture.medium}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="modal-text">${employee.email}</p>
        <p class="modal-text cap">${employee.location.city}</p>
        <hr>
          <p class="modal-text">${employee.phone}</p>
          <p class="modal-text cap">${employee.location.street} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
          <p class="modal-text">Birthday: ${employee.dob.date}</p>`;
    modal.appendChild(modalInfo);
  });

  btnContainer.innerHTML = '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button><button type="button" id="modal-next" class="modal-next btn">Next</button>';

  modalContainer.appendChild(modal);
  modalContainer.appendChild(btnContainer);
  modalContainer.style.display = 'none';
  main.appendChild(modalContainer);
}

getEmployees(usersUrl).then(generateHTML);

