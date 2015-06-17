/*
 * Name: NorrisBridge.js
 * Module: InternalAPIManager
 * Location: Norris/Main/InternalAPIManager
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Bucco Riccardo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Pavanello Fabio Matteo   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bucco Riccardo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */

var express = require('express');
var ChartBridge = require('./ChartBridge.js');
var PageBridge = require('./PageBridge.js');

module.exports = NorrisBridge;

/**
 * Creates an instance of NorrisBridge.
 * 
 * @constructor
 * @param {NorrisImpl} model - The model to which attach the bridge.
 */
function NorrisBridge(model) {
    if (!(this instanceof NorrisBridge)) return new NorrisBridge();
    
    /** @private */
    this.model = model;
}

/**
 * Gets the Norris' endpoint.
 *
 * @return {String} the endpoint.
 */
NorrisBridge.prototype.getEndpoint = function(){
    return this.model.getSettings().endpoint;
};


/**
 * Creates a new chart.
 *
 * @param {String} chartType - The type of the chart to create.
 * @param {String} chartId - The id of the chart to create.
 * @return {ChartBridge} The created chart.
 */
NorrisBridge.prototype.createChart = function (chartType, chartId) {
    var chart = this.model.createChart(chartType, chartId);
    return new ChartBridge(chart);
};

/**
 * Retrieves a chart from the Norris instance.
 *
 * @param {String} chartId - The id of the chart to retrieve.
 * @return {ChartBridge} The retrieved chart.
 */
NorrisBridge.prototype.getChart = function (chartId) {
    var chart = this.model.getChart(chartId);
    if(chart)
        return new ChartBridge(chart);
    else
        return null;
};

/**
 * Retrieves all charts from the Norris instance.
 *
 * @return {ChartBridge[]} The retrieved charts.
 */
NorrisBridge.prototype.getCharts = function () {
    var modelCharts = this.model.getCharts();
    var charts = [];
    modelCharts.forEach(function (chart) {
        charts.push(new ChartBridge(chart));
    });
    return charts;
};

/**
 * Creates a new page.
 *
 * @param {String} pageId - The id of the page to create.
 * @return {PageBridge} The created page.
 */
NorrisBridge.prototype.createPage = function (pageId) {
    var page = this.model.createPage(pageId);
    return new PageBridge(page);
};

/**
 * Retrieves a page from the Norris instance.
 *
 * @param {String} pageId - The id of the page to retrieve.
 * @return {PageBridge} The retrieved page.
 */
NorrisBridge.prototype.getPage = function (pageId) {
    var page = this.model.getPage(pageId);
    if(page)
        return new PageBridge(page);
    else
        return null;
};

/**
 * Retrieves all pages from the Norris instance.
 *
 * @return {PageBridge[]} The retrieved pages.
 */
NorrisBridge.prototype.getPages = function () {
    var modelPages = this.model.getPages();
    var pages = [];
    modelPages.forEach(function (page) {
        pages.push(new PageBridge(page));
    });
    return pages;
};

NorrisBridge.prototype.getMiddleware = function () {
    var instance = this;
    var app = express();
    app.set('views', __dirname + '/../../templates');
    app.engine('ejs', require('ejs').renderFile);

    app.get('/', function (req, res) {
        var pages = instance.getPages();
        var charts = instance.getCharts();
        res.render('index.ejs', {pages: pages, charts: charts, endpoint: instance.getEndpoint()});
    });

    app.get('/pages/:pageId', function (req, res) {
        var page = instance.getPage(req.params.pageId);
        if(page)
            res.render('page.ejs', {page: page, endpoint: instance.getEndpoint()});
        else
            res.sendStatus(404);
    });

    app.get('/charts/:chartId', function (req, res) {
        var chart = instance.getChart(req.params.chartId);
        if(chart)
            res.render('chart.ejs', {chart: chart, endpoint: instance.getEndpoint()});
        else
            res.sendStatus(404);
    });

    app.use('/', express.static(__dirname + '/../../static'));

    return app;
};
