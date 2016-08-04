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

```sh
$ grunt serve
```

### Code Generators
The frontend was generated with [Yeoman's generator angular](https://github.com/yeoman/generator-angular). It has a few generators if you `npm install -g` `yo` and `generator-angular`.

```sh
$ cd api/ && npm install
```
To install the SQLite shell, download and install the binaries from [SQLite's download page](https://www.sqlite.org/download.html)

### Inserting entries into SQLite/Running
To open the SQLite shell,
```sh
$ sqlite3
```
```sh
$ .open database.sqlite #or whatever the name of the database is
```
```sh
$ INSERT INTO table_name(columns) VALUES(data); #standard SQL insert query
```
Finally, visit your app at [http://localhost:4500](http://localhost:4500).
