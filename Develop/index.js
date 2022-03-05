const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateMarkdown = require('./utils/generateMarkdown.js');
const api = require('./utils/api.js');
const { Console } = require('console');

const questions = [
    {
        type: 'input',
        message: "What is your project's title?",
        name: 'title',
        validate: function (answer)
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
    } ,
    {
        type: 'input',
        message: "Write a description of your project.",
        name: 'description',
        validate: function (answer)
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
    },
    {
        type: 'input',
        message: "Describe how to install your project.",
        name: 'installations',
        validate: function (answer)
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
    },
    {
        type: 'input',
        message: "Describe how your project will be used.",
        name: 'usages',
        validate: function (answer)
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
    },
    {
        type: 'input',
        message: "Describe how other developers can contribute to this project.",
        name: 'contributions',
        validate: function (answer)
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
    },    
    {
        type: 'input',
        message: "Describe any tests you have for your project, and how to run them.",
        name: 'tests',
        validate: function (answer)
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
    },    
    {
        type: 'list',
        message: "Choose a license type for your project.",
        choices: ['I need to work in a community.', 'I want it simple and permissive.', 'I care about sharing improvements.', "My project isn't a software.", 'I do not want to choose'],
        name: 'licenses',
        validate: function (answer)
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
    },  
    {
        type: 'input',
        message: "What is your GitHub username?",
        name: 'githubName',
        validate: function (answer)
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
    },
    {
        type: 'input',
        message: "What is your repo's name?",
        name: 'githubRepo',
        validate: function (answer)
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
    }
];

function writeToFile(file, data) {
    fs.writeFile(file, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Your README.md file has been generated")
    });
}

const writeFile = util.promisify(writeToFile);

async function init() {
    try {

        console.log("You will be required to answer every question. If you don't have an answer, just say something else!");
        const readMe = await inquirer.prompt(questions);
    
        const user = await api.getUser(readMe);
    
        const markdown = generateMarkdown(readMe, user);
    
        await writeFile(`${readMe.githubName}-ReadMe.md`, markdown);

    } catch (error) {
        console.log("error: " + error);
    }
};

init();
