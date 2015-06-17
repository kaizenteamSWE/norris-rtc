/*
 * Name: PageImpl.js
 * Module: DataModel
 * Location: Norris/Main/DataModel
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
 * v0.08 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bigarella Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */

var NorrisChart = require('../NorrisChart');
var _ = require('lodash');
var validate = require('jsonschema').validate;

module.exports = PageImpl;

var defaults = {
    title: 'Norris\'s page',
    maxChartsRow: 2, // maximum number of charts per row
    maxChartsCol: 3 // maximum number of charts per column
};

/**
 * Creates a new page.
 * @constructor
 * @param {String} PageId - the page's id.
 */
function PageImpl (PageId) {
    if (!(this instanceof PageImpl)) return new PageImpl(PageId);
    this.uid = PageId;
    this.settings = {};
    this.charts = [];
    this.setSettings(defaults);
}

/**
 * Adds a chart to the page.
 *
 * @param {ChartImpl} chart - the chart you wish to add to the page;
 * @return {PageImpl} the page to which you've added the chart.
 */
PageImpl.prototype.add = function (chart) {
    if (this.charts.length < (this.settings['maxChartsCol']*this.settings['maxChartsRow']) ) {
        if ((chart instanceof NorrisChart)) {
            this.charts.push(chart);
            return this;
        }
        else {
            console.error("ERROR: wrong type. A NorrisChart widget is required.");
            throw("PageImpl:requiredNorrisChart");
        }
    }
    else {
        console.error("ERROR: maximum number of charts is reached. You cannot add other charts to the page.");
        throw("PageImpl:reachedMaximunNumberOfCharts");
    }

};

/**
 * Gets the page's ID.
 *
 * @return {String} the page's ID.
 */
PageImpl.prototype.getId = function() {
    return this.uid;
};

/**
 * Sets the page's settings. You're allowed to change value to the default properties, but you cannot add
 * new properties to the page's settings.
 *
 * @param {PageSettings} settings - a JSON object containing the page's settings you wish to add.
 */
PageImpl.prototype.setSettings = function(settings) {
    function set(mySettings, settings) {
        if(typeof settings == 'object') {
            for(var key in settings) {
                if (typeof settings[key] == 'object') {
                    set(mySettings[key], settings[key])
                }
                else {
                    mySettings[key] = settings[key];
                }
            }
        }
    }

    var newSettings=_.cloneDeep(this.settings);
    set(newSettings, settings);

    var schema = require(__dirname + '/../../../resources/schemes/page-settings');
    if(validate(newSettings, schema).errors.length > 0) {
        console.error("ERROR: wrong settings.");
        throw new Error('PageImpl:wrongSettings');
    }

    this.settings = newSettings;
};

/**
 * Gets the page's settings.
 *
 * @return {PageSettings} the page's settings.
 */
PageImpl.prototype.getSettings = function() {
    return this.settings;
};

/**
 * Gets the page's charts.
 *
 * @return {ChartImpl[]} the page's charts.
 */
PageImpl.prototype.getCharts = function() {
    return this.charts;
};

/**
 * Removes all the charts in the page.
 */
PageImpl.prototype.clearCharts = function() {
    this.charts=[];
};
/*
/* Modifica le impostazioni * /
PageImpl.prototype.set = function (param, info) {
    if(typeof param == 'object') {
        for(var key in param) {
            if(param.hasOwnProperty(key)) {
                this.settings[key] = param[key];
            }
        }
    } else {
        this.settings[param] = info;
    }
}

*/
