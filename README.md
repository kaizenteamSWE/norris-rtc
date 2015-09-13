# Norris-rtc
## 1 Installation details
### 1.1 Prerequisites
Before you begin, make sure:
  * you have Node.js and npm installed. Get the latest version from http://nodejs.org. If you’re using Mac or Windows, the best way to install Node.js is to use one of the prebuilt installers. If you’re using Linux, you can use the installer or you can download the source code. Node.js comes with npm installed so you should have a version of npm. However, npm gets updated more frequently than Node does, so you’ll want to make sure it’s the latest version.
  * you have a *package.json* file in the root directory of your application. It holds various metadata relevant to your project. This file is used to give information to npm that allows it to identify the project as well as handle the project’s dependencies. If *package.json* file does not exist yet, you can create it with the `npm init` command. A second option is to create it manually (specifics of npm’s *package.json* handling can be found at https://docs.npmjs.com/files/package.json).
  * you have Express.js installed in the app directory and saved in the dependencies list. This package can be downloaded and added to the dependencies list with the `npm install express –save` command (detailed instructions can be found at http://expressjs.com/starter/installing.html).

### 1.2 Performing the installation
First, make the app directory your working directory. Then use the following npm command:
```
$ npm install norris−rtc −−save
```
This will create the *node_modules* directory (if one doesn’t exist yet), and will download the package to that directory. It will also add the package to the dependencies in *package.json* (unless it was already there).

You might want to add Norris temporarily, just to try it out, without adding it to the dependencies list in the *package.json* file. Just avoid using save flag:
```
$ npm install norris−rtc
```

## 2 Usage
### 2.1 Initialization
First of all, you have to create an Express and a HTTP server.
```
var http = require('http'); // Include the library
var app = require('express')(); // Create a new instance of Express
var server = http.createServer(app); // Create a new instance of http.Server:
server.listen(port); // Make the HTTP server accept connections on the specified port
```
Then you have to create an instance of Norris.
```
var norris = require('norris'); // Include the library
var nrr = norris(server, app[, options]); // Create a new instance of Norris.
```

### 2.2 Example of usage
This section contains some code that shows you a common scenario. It is explained how it works and what it does. For more detailed information about the internal API, you can check out Description of Norris’ Internal API.

You can create one of the charts Norris has available. In the example below, we build a Bar Chart that summarizes the performance of a company over time. Then we add it to a page, to make it available to everyone.
```
// create a new empty Bar Chart whose ID is 'myFirstChart'
var myFirstChart = nrr.createChart('barchart', 'companyPerformance');
// create a new object that contains data to initialize the chart
var data = {
    labels: [2012, 2013, 2014, 2015],
    datasets: [
        {
            name: 'Sales',
            color: '#FF0000',
            values: [100, 120, 110, 150]
        },
        {
            name: 'Expenses',
            color: '#FFFF00',
            values: [56, 83, 76, 86]
        }
    ]
};
// enter data for the chart
myFirstChart.setData(data);
// create a new page
var myFirstPage = nrr.createPage('companyPage');
// add the chart to the new page
myFirstPage.add(myFirstChart);
app.use('/norris', nrr.getMiddleware());
```
The page is now available at `/endpoint/norris/pages/companyPage` path (*endpoint* is the endpoint value passed during Norris' instance creation). So it’s now possible for a user to request and visualize the page containing the chart.

If you want to update the created chart just use one of the available methods. For example, it's possible to update the data of the company's performance during 2015 (changing the sales from 150 to 160, and the expenses from 86 to 92):
```
// keep myFirstChart updated using inplace method (some values will be replaced)
myChart.update('inplace', [
    {
        position: {
            x: 0,
            y: 3
        },
        data: 160
    },
    {
        position: {
            x: 1,
            y: 3
        },
        data: 92
    }
]);
```

