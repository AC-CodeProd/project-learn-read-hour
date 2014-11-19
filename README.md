#Learn to read the hour in CE2
================

## Getting Started

### Prerequisites
You must have [node.js](http://nodejs.org/) and npm installed before going further.

* [Gulp](http://gulpjs.com/) - The streaming build system
* [Bower](http://bower.io/) - A package manager for the web

### Installation
You can get started by cloning this project:

```
git clone https://github.com/AC-CodeProd/project-learn-read-hour.git
cd project-learn-read-hour
```

You can install dependencies by simply run the following command:

```
bower install
npm install
```

### Run the project

Once the installation is done, just run:

```
gulp
```

You can access it [here](http://127.0.0.1:9000)

### Testing

Before running tests, you need to start the selenium webdriver-manager:

```
gulp webdriver-start
```

Open a new shell and then run:

```
gulp tests
```

It uses by default Chrome browser.

Enjoy ! =)