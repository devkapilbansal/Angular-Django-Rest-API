A simple web app with Django in Backend and Angular in Front-End

# Prerequisite

1. Python 3 - To verify if python is installed open your command prompt and run `python -V` .

To install python visit `https://www.python.org/downloads/`[Python] and download the version supported by your OS. After install verify if python is executing from the terminal.

2. Node JS - Open terminal and execute `node -v` and `npm -v` to verify if node is installed. Node version and npm version used in this app are 12.18.2 and 6.14.5 respectively.

# Installation

1. Install angular using npm.

Open your terminal and execute `npm install @angular/cli` to install. Verify the installation by running `ng version`.

2. Install Python libraries.

From the base repository run `pip install -r requirements.txt` to install all required python libraries.

3. Go to app/front-end and run `ng build` to deploy static files

Angular installs all packages required in the project. The npm packages used in this project are:

- @angular-devkit/architect

- @angular-devkit/core

- @angular-devkit/schematics

- @schematics/angular

- @schematics/update

- rxjs

Try running `npm install [package name]` to install the package that is not available or gives an error.

4. Go to base repository and run `python manage.py runserver` to run the server.

5. Visit localhost:8000 in your browser.