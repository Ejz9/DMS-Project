## How to run the app in IDE:
- Get a JavaScript IDE. Examples include: VSCode and what I use, Jet Brains WebStorm.
- Clone the Repository into your IDE.
- Install [NodeJS](https://nodejs.org/en/) and point the IDE to it, or if using WebStorm you should be prompted to install Node.js near the top.
- If it's not present on your system already, install NPM (I do not believe this is required if using WebStorm, I believe it does this for you already).

You should then be able to go to your terminal in your IDE and run the following:
`
node -v 
npm -v
`
Which should return the version of Node.js installed and the version of NPM installed, verify they are installed and working.

Next, you will want to run:
`npm install` to install the necessary packages.

Now you should be able to run the application typing:
`npm run start` in your terminal. Or by going to the package.json and hovering to run in VS or clicking the green play in WebStorm

## How to access or manipulate the database:
There are three options based on what I've covered with VSCode and Jet Brains.
- Use JetBrains Webstorm and manage the database from the button on the right (the same as openining it in DataGrip).
- Use JetBrains DataGrip which will visually show you the database and how it is structured. As well as allow querying with some auto-fill.
- Use VSCode and use an extension to manipulate or access the database.
