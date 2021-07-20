// Queue up the required js files
const inquirer = require('inquirer');
const fs = require('fs')
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const generate = require('./util/generateHtml');


inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of team manager:',
    },


])

.then((answers) => {

    const mdPageContent = generateTeam(answers);
    
    fs.writeFile('./samples/output.html', mdPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created HTML file!')
    );
  });

  //I've passed all tests and now setting up the inquirer and output code