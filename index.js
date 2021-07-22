const inquirer = require('inquirer');
const fs = require('fs')
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const { exit } = require('process');

const engineers = []
const interns = []
const manager = []

const intro = async ()=>{
  console.log('Welcome to TeamBuilder!')
  addManager();
}

const main = async ()=>{
  console.log('---------------')
  const {choice} = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "TeamBuilder Menu:",
    choices: ["Replace the Manager","Add an Engineer","Add an Intern",new inquirer.Separator(),"EXPORT team list to HTML",new inquirer.Separator(), "Exit"]
  })
  switch (choice) {
    case "Replace the Manager":
      addManager()
      break;
    case "Add an Engineer":
      addEngineer()
      break;
    case "Add an Intern":
      addIntern()
      break;
    case "EXPORT team list to HTML":
      exportHtml()
      break;
    case "Exit":
      exit();
    default:
      console.log('The program closed. Please restart.')
      break;
  }
 
}

const addManager = async ()=>{
    const {name} = await inquirer.prompt({
      type: "input",
      name: "name",
      message: "What is the Manager name?"
    })
    const {id} = await inquirer.prompt({
      type: "input",
      name: "id",
      message: "What is the manager's ID number?"
    })
    const {email} = await inquirer.prompt({
      type: "input",
      name: "email",
      message: "What is the manager's Email address?"
    })
    const {officeNumber} = await inquirer.prompt({
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?"
    })
    
    const newManager = new Manager(name,id,email,officeNumber)
    manager.pop();
    manager.push(newManager);
    main()
}

const addEngineer = async ()=>{
  const {name} = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is the engineer's name?"
  })
  const {id} = await inquirer.prompt({
    type: "input",
    name: "id",
    message: "What is the engineer's ID number?"
  })
  const {email} = await inquirer.prompt({
    type: "input",
    name: "email",
    message: "What is the engineer's Email address?"
  })
  const {github} = await inquirer.prompt({
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?"
  })
  
  const newEngineer = new Engineer(name,id,email,github)
  engineers.push(newEngineer);
  console.log('Engineer added!')
  main()
}

const addIntern = async ()=>{
  const {name} = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is the intern's name?"
  })
  const {id} = await inquirer.prompt({
    type: "input",
    name: "id",
    message: "What is the intern's ID number?"
  })
  const {email} = await inquirer.prompt({
    type: "input",
    name: "email",
    message: "What is the intern's Email address?"
  })
  const {school} = await inquirer.prompt({
    type: "input",
    name: "school",
    message: "What is the intern's school?"
  })
  
  const newIntern = new Intern(name,id,email,school)
  interns.push(newIntern);
  main()
}

const exportHtml = async ()=>{
    
let teamPageContent = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Amazing Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateManager()}
                </div>
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateEngineers()}
                </div>
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateInterns()}
                </div>
        </div>
    </div>
</body>
</html>
    `;    

    fs.writeFile('./output/team-roster.html', teamPageContent, (err) =>
      err ? console.log(err) : console.log('Exported HTML file to output folder!')
    );
}

function generateManager() {
  return `
  <div class="card employee-card">
  <div class="card-header">
      <h2 class="card-title">${manager[0].name}</h2>
      <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager[0].role}</h3>
  </div>
  <div class="card-body">
      <ul class="list-group">
          <li class="list-group-item">ID: ${manager[0].id}</li>
          <li class="list-group-item">Email: <a href="mailto:${manager[0].email}">${manager[0].email}</a></li>
          <li class="list-group-item">Office number: ${manager[0].officeNumber}</li>
      </ul>
  </div>
  </div>
  `;
  }

function generateEngineers() {
let innerHtml = ''
for (let i = 0; i < engineers.length; i++) {
        innerHtml +=
`    <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${engineers[i].name}</h2>
            <h3 class="card-title"><i class="fas fa-code mr-2"></i>${engineers[i].role}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${engineers[i].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${engineers[i].email}">${engineers[i].email}</a></li>
                <li class="list-group-item">Github: <a href="https://github.com/${engineers[i].github}" target="_blank">${engineers[i].github}</a></li>
            </ul>
        </div>
        </div>
        `
  }
  return innerHtml
}

function generateInterns() {
let innerHtml = ''
for (let i = 0; i < interns.length; i++) {
        innerHtml +=
`    <div class="card employee-card">
        <div class="card-header">
            <h2 class="card-title">${interns[i].name}</h2>
            <h3 class="card-title"><i class="far fa-file-code mr-2"></i>${interns[i].role}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${interns[i].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${interns[i].email}">${interns[i].email}</a></li>
                <li class="list-group-item">School: <a href="https://www.google.com/search?q=${interns[i].school}" target="_blank">${interns[i].school}</a></li>
            </ul>
        </div>
        </div>
        `
  }
  return innerHtml  
  }

intro()