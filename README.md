# AET Intern Hackathon 2016


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

```
$ git clone <repository-url>
```
```sh
$ cd AmExHackathon/
```
```sh
$ npm install && bower install
```


## Running / Development

```sh
$ ember serve --proxy http://localhost:4500
```
CD into the api directory.
```sh
$ nodemon server.js
```

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

## Mongo
You will have to download the dependencies for the server - side: for example, Mongoose and Express.
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
