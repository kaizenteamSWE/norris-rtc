/*
 * Name: ChartBridge.js
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
 * v0.08 2015-06-01 Davide Dal Bianco   Verify
 * ================================================================================
 * v0.07 2015-05-28 Bigarella Chiara  Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bigarella Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-12 Bucco Riccardo   Creation
 * ================================================================================
 */

module.exports = ChartBridge;

/**
 * Creates an instance of ChartBridge.
 * 
 * @constructor
 * @param {ChartImpl} chart - The model to which attach the bridge.
 */
function ChartBridge(chart) {
    if (!(this instanceof ChartBridge)) return new ChartBridge(chart);

    /** @private */
    this.chart = chart;
}

/**
 * Returns the instance of the represented chart.
 *
 * @return {ChartImpl} The represented chart.
 */
ChartBridge.prototype.getChartModel = function () {
    return this.chart;
};

/**
 * Return the chart's id.
 *
 * @return {String} The chart's id.
 */
ChartBridge.prototype.getId = function () {
    return this.chart.getId();
};

/**
 * Return the chart's type.
 *
 * @return {String} The chart's type.
 */
ChartBridge.prototype.getType = function () {
    return this.chart.getType();
};

/**
 * Sets the chart's data.
 *
 * @param {ChartData} data - The chart's data.
 */
ChartBridge.prototype.setData = function (data) {
    this.chart.setData(data);
};

/**
 * Gets the chart's data.
 *
 * @return {ChartData} The chart's data.
 */
ChartBridge.prototype.getData = function () {
    return this.chart.getData();
};

/**
 * Sets the chart's settings.
 *
 * @param {ChartSettings} settings - The chart's settings.
 */
ChartBridge.prototype.setSettings = function (settings) {
    this.chart.setSettings(settings);
};

/**
 * Gets the chart's settings.
 *
 * @return {ChartSettings} The chart's settings.
 */
ChartBridge.prototype.getSettings = function() {
    return this.chart.getSettings();
};

/**
 * Updates the chart.
 *
 * @param {String} updateType - The update's name.
 * @param {ChartUpdate} updateData - The update's data.
 */
ChartBridge.prototype.update = function (updateType, updateData) {
    this.chart.update(updateType, updateData);
};