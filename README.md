# Norris-rtc
## 1 Installation details
### 1.1 Prerequisites
Before you begin, make sure:
<ul>
<li>you have Node.js and npm installed. Get the latest version from http://nodejs.org. If
you’re using Mac or Windows, the best way to install Node.js is to use one of the prebuilt installers. If you’re using 
Linux, you can use the installer or you can download the source code.
Node.js comes with npm installed so you should have a version of npm. However, npm gets
updated more frequently than Node does, so you’ll want to make sure it’s the latest version.</li>
<li>you have a <i>package.json</i> file in the root directory of your application. It holds various metadata relevant 
to your project. This file is used to give information to npm that allows it
to identify the project as well as handle the project’s dependencies.
If <i>package.json</i> file does not exist yet, you can create it with the <i>npm init</i> command. A
second option is to create it manually (specifics of npm’s <i>package.json</i> handling can be
found at https://docs.npmjs.com/files/package.json).</li>
<li>you have Express.js installed in the app directory and saved in the dependencies list
This package can be downloaded and added to the dependencies list with the <i>npm install
express –save</i> command (detailed instructions can be found at http://expressjs.com/
starter/installing.html).</li>
</ul>
### 1.2 Performing the installation
First, make the app directory your working directory. Then use the following npm command: <br/>
<i>$ npm install norris−rtc −−save</i> <br/>
This will create the <i>node_modules</i> directory (if one doesn’t exist yet), and will download the
package to that directory. It will also add the package to the dependencies in <i>package.json</i>
(unless it was already there).<br/>
You might want to add Norris temporarily, just to try it out, without adding it to the dependencies
list in the package.json file. Just avoid using save flag:<br/>
<i>$ npm install norris−rtc</i>

## 2 Usage
### 2.1 Initialization
<ul>
<li>You have to create a Express and a HTTP server.<br/>
1. Include the library:<br/>
<i>var http = require( ' http ' );</i><br/>
2. Create a new instance of Express:<br/>
<i>var app = require('express')();</i><br/>
3. Create a new instance of http.Server:<br/>
<i>var server = http.createServer( app );</i><br/>
4. Make the HTTP server accept connections on the specified port:<br/>
<i>server.listen( port );</i><br/>
</li>
<li>You have to create an instance of Norris.<br/>
1. Include the library:<br/>
<i>var norris = require( 'norris' );</i><br/>
2. Create a new instance of Norris. You can choose some settings (properties) that affect
how Norris behaves:<br/>
<i>var nrr = norris( server , app [ ,options] );</i><br/>
</li>
</ul>

### 2.2 Example of usage
This section contains some code that shows you a common scenario. It is explained how it works
and what it does. For more detailed information about the internal API, you can check out
Description of Norris’ Internal API.<br/>
You can create one of the charts Norris has available. In the example below, we will build a Bar
Chart based on some data and settings. Then we will add it to a page, and we keep it updated.<br/>
<i>// create a new empty Bar Chart whose ID is 'myChart'<br/>
var myChart = nrr.createChart( 'barchart', 'myChart' );<br/>
// enter data for the chart<br/>
myChart.setData( { . . . } );<br/>
// choose options for the chart [optional]<br/>
myChart.setSettings( { . . . } );<br/>
// create a new page<br/>
var myPage = nrr.createPage( 'myFirstPage' );<br/>
// add the myChart to the new page<br/>
myPage.add( myChart );<br/>
// myPage will be available at '/endpoint/norris/pages/page_ID' path :<br/>
// endpoint is the endpoint value passed during Norris' instance creation,<br/>
// 'norris' is the path where the middleware is mounted,<br/>
// 'pages' and 'page_ID' specify that a page with page_ID ID<br/>
// is going to be visualized .<br/>
// Note that a route will match any path which follows<br/>
// its path immediately with a ’ / ’ .<br/>
app.use('/ norris', nrr.getMiddleware( ) );<br/>
// keep myChart updated using inplace method ( some values will be replaced )<br/>
myChart.update('inplace', { . . . } );</i><br/>

It’s now possible for a user to request and visualize the page containing the chart.
If you are a developer and you would like to insert a chart of an instance of Norris in your own
product, just have a look at our Description of Norris' External APIs.
