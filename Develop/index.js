// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What is your project's title?",
        name: 'title',
        validate: isValid(answer)
    },
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        validate: isValid(answer)
    },
    {
        type: 'input',
        message: "Describe how to install your project.",
        name: 'installations'
    },
    {
        type: 'input',
        message: "Describe how your project will be used.",
        name: 'usages'
    },
    {
        type: 'input',
        message: "Describe how other developers can contribute to this project.",
        name: 'contributes'
    },    
    {
        type: 'input',
        message: "Describe any tests you have for your project, and how to run them.",
        name: 'tests'
    },    
    {
        type: 'list',
        message: "Choose a license type for your project.",
        choices: ['I need to work in a community.', 'I want it simple and permissive.', 'I care about sharing improvements.', "My project isn't a software.", 'I do not want to choose'],
        name: 'licenses'
    },  
    {
        type: 'input',
        message: "What is your GitHub username?",
        name: 'githubName',
        validate: isValid(answer)
    },
    {
        type: 'input',
        message: "What is your repo's name?",
        name: 'githubRepo',
        validate: isValid(answer)
    }, 
    
];

// TODO: Create a function to write README file
function writeToFile(file, data) {
    fs.writeFile(file, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README.md file has been generated")
    });
}

const writeFileAsync = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
    try {

        // Prompt Inquirer questions
        const readMe = await inquirer.prompt(questions);
        console.log("Your responses: ", userResponses);
    
        // Call GitHub api for user info
        const user = await api.getUser(readMe);
        console.log("Your GitHub user info: ", user);
    
        // Pass Inquirer userResponses and GitHub userInfo to generateMarkdown
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        // Write markdown to file
        await writeFileAsync(`${readMe.githubName}.md`, markdown);

    } catch (error) {
        console.log(error);
    }
};

function isValid(answer)
{
    if(answer)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Function call to initialize app
init();
