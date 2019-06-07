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

//Modal controls and functions
function closeModal() {
  const modal = document.querySelector('.modal-container');
  modal.style.display = 'none';
}

//Generate html for employee
function generateHTML(data) {
  data.map(employee => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${employee.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
      </div>`;
    gallery.appendChild(card);
  });
  generateModal(data);
}

//Generate modal html
function generateModal(data) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const closeBtn = document.createElement('button');
  closeBtn.classList.add('modal-close-btn');
  closeBtn.setAttribute('type', 'button');
  closeBtn.setAttribute('id', 'modal-close-btn');
  closeBtn.innerHTML = '<strong>X</strong>';

  closeBtn.addEventListener('click', closeModal);

  modal.appendChild(closeBtn);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('modal-btn-container');
  btnContainer.innerHTML = '<button type="button" id="modal-prev" class="modal-prev btn">Prev</button><button type="button" id="modal-next" class="modal-next btn">Next</button>';

  data.map(employee => {
    const modalInfo = document.createElement('div');
    modalInfo.classList.add('modal-info-container');
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

  modalContainer.appendChild(modal);
  modalContainer.appendChild(btnContainer);
  //modalContainer.style.display = 'none';
  main.appendChild(modalContainer);
}

getEmployees(usersUrl).then(generateHTML);