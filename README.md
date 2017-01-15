# AET Intern Hackathon 2016

## Purpose

The main purpose of this application is to automate the intern recruitment process for AmEx Technology.  It is meant to be used on a tablet or phone.  The flow works as follows:

1. The Screener takes a picture of the prospective intern's resume.  Screener can write notes on the image using a soft pen or other tablet writing device.
2. The prospective intern fills out their information in the following form.  This information is saved along with the image of their resume to the database.
3. The tablet is handed back to the Screener.  They decide on the spot whether to accept them to the on-campus interview.
4. If the prospective intern is accepted, they are passed to the Recruiter.  They are scheduled for an interview slot using the calendar interface.
5. The Interviewer can use the canvas functionality to draw up interview questions, or there is an Admin tab where they can upload documents for the interviewee to examine.

This app also has
* The ability to filter candidates by name, school, major, etc.
* An Admin tab where documents can be uploaded and viewed
* Flexibility to be installed on any server - it has been tested and runs on Raspberry Pi's that are configured for DHCP protocall

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* Grunt

## Installation

```sh
git clone <repository-url>
cd AmExHackathon
npm install && bower install
```

## Running / Development

```sh
$ grunt serve
```

To test on iOS devices or Safari, run the production build that does ES6 transpilation with Babel:

```sh
$ grunt runprod   # you may need --force if there are linting errors
```

To just build the full production ready app, just run grunt:

```sh
$ grunt           # you may need --force if there are linting errors
```

## Production
Use the `systemd` service. It has instructions within `recruiting-app.service`. When cloning the app on the pi, there is a bug with the `sqlite3` npm package where it takes forever to install. So to clone the app, do:
```sh
git clone ...
cd AmExHackathon
npm install --only=production         # only install the production deps
bower install
npm link sqlite3                      # is already installed globably to fix bug
npm link sequelize

# install the service
sudo cp recruiting-app.service /etc/systemd/system/.
sudo systemctl enable recruiting-app   # will start automagically on reboot
sudo systemctl start recruiting-app    # start it now semi-magically
```

### Code Generators
The frontend was generated with [Yeoman's generator angular](https://github.com/yeoman/generator-angular). It has a few generators if you `npm install -g` `yo` and `generator-angular`.

To install the SQLite shell, download and install the binaries from [SQLite's download page](https://www.sqlite.org/download.html). Or on linux please use your package manager.

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
