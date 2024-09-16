const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
////////////////////////////////////////////////////////////////////
function renderColumn(title, users) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column');
  const h3 = document.createElement('h3');
  h3.textContent = title;
  columnDiv.appendChild(h3);
  users.forEach((user) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const nameP = document.createElement('p');
    nameP.textContent = `Name: ${user.name}`;
    cardDiv.appendChild(nameP);
    const usernameP = document.createElement('p');
    usernameP.textContent = `Username: ${user.username}`;
    cardDiv.appendChild(usernameP);
    const websiteP = document.createElement('p');
    websiteP.textContent = `Website: ${user.website}`;
    cardDiv.appendChild(websiteP);
    columnDiv.appendChild(cardDiv);
  });
  const wrapperDiv = document.getElementById('wrapper');
  wrapperDiv.appendChild(columnDiv);
}

var req = new XMLHttpRequest();
req.open('GET', 'https://jsonplaceholder.typicode.com/users', false);
req.send(null);
const obj = JSON.parse(req.responseText);
const map_card = new Map();
for (let i = 0; i < obj.length; i++) {
  let domain = obj[i].website.substr(obj[i].website.indexOf('.'));
  if (!map_card.has(domain)) {
    map_card.set(domain, new Array);
  }
  map_card.get(domain).push(i);
}
// process the title and users
for (const x of map_card.keys()) {
    let users=new Array();
  for (const i of map_card.get(x)) {
    const user={};
    user.name=obj[i].name;
    user.username=obj[i].username;
    user.website=obj[i].website;
    users.push(user);
  }
  renderColumn(x,users);
}