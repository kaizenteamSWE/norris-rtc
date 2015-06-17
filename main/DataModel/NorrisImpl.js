/*
 * Name: NorrisImpl.js
 * Module: DataModel
 * Location: Norris/Main/DataModel
 * Date: 2015-04-10
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.06 2015-05-24 Bucco Riccardo  Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bucco Riccardo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */
var events=require('events');
var NorrisChart = require('./NorrisChart');
var NorrisPage = require('./NorrisPage');

module.exports = NorrisImpl;

var defaults = {
    endpoint: '/',
    secret: 'r7k;._$e*"°à#',
    origins: [],
    login: function () {return true;},
    keepAlive: function () {return true;},
    logout: function () {return true;},
    isLogged: function () {return true;}
};

/**
 * Creates a Norris instance.
 * @constructor
 */
function NorrisImpl (settings) {
    if (!(this instanceof NorrisImpl)) return new NorrisImpl();
    events.EventEmitter.call(this); //NorrisImpl inherits from events.EventEmitter

    this.settings = {};
    this.charts = {};
    this.pages = {};

    settings = settings || {};
    for(var key in defaults) {
        this.settings[key] = settings[key] || defaults[key];
    }
    if(this.settings.endpoint.slice(-1) !== '/') {
        this.settings.endpoint += '/';
    }
}

NorrisImpl.prototype.__proto__=events.EventEmitter.prototype;


/**
 * NorrisImpl.prototype.getSettings allows you to get the Norris' settings.
 *
 * @return the Norris' settings.
 */
NorrisImpl.prototype.getSettings = function() {
      return this.settings;
};

/**
 * Creates a new chart and adds it to the Norris instance's list of charts.
 * If the creation of a new chart ends successfully, this method emits the 'create' signal. Otherwise it shows
 * an error message and return null.
 *
 * @param {String} chartType - represents the chart's type, i.e. 'barchart', 'linechart', 'mapchart', 'table';
 * @param {String} chartId - the chart's ID;
 * @return {ChartImpl} the created chart.
 */
NorrisImpl.prototype.createChart = function(chartType, chartId) {
      
      if (!this.charts.hasOwnProperty(chartId)) {       //the chart's ID should be unique
            var chart = NorrisChart.createChart(chartType, chartId);
            if (chart != null) {
                  this.charts[chartId] = chart;
                  this.emit('create', chart); // emits a 'create' signal
                  console.log("New chart added: " + chartId); // TOGLIERE
            }
            return chart;
      }
      else {
            console.error("ERROR: this ID is already used.");
            throw("NorrisImpl:IDAlreadyUsed");
      }
};

/**
 * Gets a Norris' chart.
 *
 * @param {String} chartId - the value of a chart's ID;
 * @return  {ChartImpl} the Norris' chart with the ID==chartId.
 */
NorrisImpl.prototype.getChart = function(chartId) {
   return this.charts[chartId];
};

/**
 * Gets all Norris' charts.
 *
 * @return  a list of the Norris' charts.
 */
NorrisImpl.prototype.getCharts = function() {
      var charts = [];
      for (var id in this.charts) {
            charts.push(this.charts[id]);
      }
      return charts;
};

/**
 * Creates a new page and adds it to the Norris instance's list of pages.
 * If the creation of a new page ends successfully, this method return the created page. Otherwise it shows
 * an error message and return null.
 *
 * @param {String} pageId - the page's ID;
 * @return  {PageImpl} the created page.
 */
NorrisImpl.prototype.createPage = function(pageId) {
      if (!this.pages.hasOwnProperty(pageId)) {       //the page's ID should be unique
            var page = new NorrisPage(pageId);
            this.pages[pageId] = page;
            console.log("New page added: "+pageId); // TOGLIERE
            return page;
      }
      else {
            console.error("ERROR: this ID is already used.");
            throw("NorrisImpl:IDAlreadyUsed");
      }
};

/**
 * Gets a Norris' page.
 *
 * @param {String} pageId - contains the value of a page's ID;
 * @return  {PageImpl} the Norris' page with the ID==chartId.
 */
NorrisImpl.prototype.getPage = function(pageId){
      return this.pages[pageId];
};

/**
 *Gets all Norris' pages.
 *
 * @return  a list of the Norris' pages.
 */
NorrisImpl.prototype.getPages = function(){
      var pages = [];
      for (var id in this.pages) {
            pages.push(this.pages[id]);
      }
      return pages;
};