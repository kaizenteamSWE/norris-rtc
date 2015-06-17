/*
 * Name: PageBridge.js
 * Module: InternalAPIManager
 * Location: Norris/Main/InternalAPIManager
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
 * v0.08 2015-06-01 Bucco Riccardo   Verify
 * ================================================================================
 * v0.07 2015-05-28 Pavanello Fabio Matteo   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */
var ChartBridge = require('./ChartBridge.js');

module.exports = PageBridge;

/**
 * Creates an instance of PageBridge.
 * 
 * @constructor
 * @param {PageImpl} model - The model to which attach the bridge.
 */
function PageBridge(page) {
    if (!(this instanceof PageBridge)) return new PageBridge(pageId);

    /** @private */
    this.page = page;
}

/**
 * Adds a new chart to this page.
 *
 * @param {ChartBridge} chart - The chart to add.
 * @return {PageBridge} The instance of this PageBridge.
 */
PageBridge.prototype.add = function (chart) {
    var chart = chart.getChartModel();
    this.page.add(chart);
    return this;
};

/**
 * Gets the page's id.
 *
 * @return {String} The page's id.
 */
PageBridge.prototype.getId = function () {
    return this.page.getId();
};

/**
 * Sets the page's settings.
 *
 * @param {PageSettings} settings - The page's settings.
 */
PageBridge.prototype.setSettings = function (settings) {
    this.page.setSettings(settings);
};

/**
 * Gets the page's settings.
 *
 * @return {PageSettings} The page's settings.
 */
PageBridge.prototype.getSettings = function () {
    return this.page.getSettings();
};

/**
 * Sets the charts of the page.
 *
 * @param {ChartBridge[]} charts - The charts to set.
 */
PageBridge.prototype.setCharts = function (charts) {
    this.page.clearCharts();
    charts.forEach(function (chart) {
        this.page.add(chart.getChartModel());
    });
};

/**
 * Gets the page's charts.
 *
 * @return {ChartBridge[]} The page's charts.
 */
PageBridge.prototype.getCharts = function () {
    var modelCharts = this.page.getCharts();
    var charts = [];
    modelCharts.forEach(function (chart) {
        charts.push(new ChartBridge(chart));
    });
    return charts;
};