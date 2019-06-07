const usersUrl = 'https://randomuser.me/api/?results=12';
const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');

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
  return employeeJSON.results;
}