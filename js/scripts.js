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
  modal.style.display = 'none';
}

function openModal() {
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'block';
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
    card.addEventListener('click', function () {
      const el = this;
      const index = Array.from(el.parentElement.children).indexOf(el);
      employeeDetails = document.querySelectorAll('.modal-info-container');
      employeeDetails[index].style.display = 'block';
      openModal();
    });
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
      <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
          <p class="modal-text">(555) 555-5555</p>
          <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
          <p class="modal-text">Birthday: 10/21/2015</p>`;
    modal.appendChild(modalInfo);
  });

  btnContainer.innerHTML = '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button><button type="button" id="modal-next" class="modal-next btn">Next</button>';

  modalContainer.appendChild(modal);
  modalContainer.appendChild(btnContainer);
  modalContainer.style.display = 'none';
  main.appendChild(modalContainer);
}

getEmployees(usersUrl).then(generateHTML);

