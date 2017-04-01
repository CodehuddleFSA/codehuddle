![Code Huddle Logo](http://i.imgur.com/j8EBw4u.png "Code Huddle")
--- 
![code ship](https://codeship.com/projects/4f55ecf0-c4a3-0134-b0f8-4e6f0fe654b5/status?branch=master)

A single page application for conducting coding interviews. This application features a collaborative coding and whiteboard environment. Built as a capstone project for the Fullstack Academy Software Engineering Immersive program.

[Live demo](https://codehuddle.herokuapp.com)

## Installation

First, clone the repository through git and change to the new directory:
```
git clone https://github.com/CodehuddleFSA/codehuddle.git
cd codehuddle
```

Then install the required dependencies:
```
npm install
```

## Usage

### Starting
To start the application locally, first start your Postgres server, then run the following command:
```
npm start
```
The application will be available locally at `http://localhost:1337/`.

### Building
While in development, you can build using:
```
npm run build-watch
npm run build-sass
```

### Seeding
You can populate the database using:
```
npm run seed
```

### Testing
You can test the application using:
```
npm test
```

## Screenshots
#### Coding interview page with collaborative editor and whiteboard
![Code Huddle Screen Shot 1](http://imgur.com/XNBoJOL.jpg "Code Huddle")
#### Interviewer dashboard, displays all the interviews
![Code Huddle Screen Shot 1](http://imgur.com/HaFRxyq.jpg "Code Huddle")
#### Interview planning, allows the interviewer to edit the interview details and problems
![Code Huddle Screen Shot 1](http://imgur.com/IVWlECR.jpg "Code Huddle")

## License
MIT © CodehuddleFSA
