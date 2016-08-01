# AET Intern Hackathon 2016


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* Grunt

## Installation

```sh
git clone <repository-url>
cd AmExHackathon-frontend/
npm install && bower install
cd ../api
npm install
```

## Running / Development

Frontend
```sh
cd AmExHackathon-frontend
grunt serve
```

Backend
```sh
cd api
npm install
nodemon server.js
```

### Code Generators
The frontend was generated with [Yeoman's generator angular](https://github.com/yeoman/generator-angular). It has a few generators if you `npm install -g` `yo` and `generator-angular`.

```sh
$ cd api/ && npm install
```
To install mongo, either download and install the binaries from [Mongo's website](https://www.mongodb.com/download-center?jmp=nav) or, for Mac
```sh
$ brew install mongodb
```
### Inserting entries into Mongo/Running
To open the Mongo shell,
```sh
$ mongo
```
```sh
$ use emberData #or whatever the name of the database is
```
```sh
$ db.modelName.insert(#insert JSON data here)
```
To run Mongo,
```sh
$ mongod
```
Finally, visit your app at [http://localhost:4200](http://localhost:4200).
