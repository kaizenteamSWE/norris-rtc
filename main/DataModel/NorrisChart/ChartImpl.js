/*
 * Name: ChartImpl.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
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
 * v0.08 2015-06-02 Bigarella Chiara   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bigarella Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */

var events=require('events');
var _ = require('lodash');
var validate = require('jsonschema').validate;

module.exports = ChartImpl;

/**
 * Creates a new chart.
 * @constructor
 * @param {String} chartType - the chart's type, i.e. 'barchart', 'linechart', 'mapchart', 'table';
 * @param {String} id - the chart's id.
 */
function ChartImpl (chartType, id) {
    if (!(this instanceof ChartImpl)) return new ChartImpl(chartType,id);
    events.EventEmitter.call(this); //ChartImpl inherits from events.EventEmitter
    this.uid = id;
    this.type=chartType;
    this.settings = {title : '' , description : 'This is a chart.'};
    this.data = {};
}

ChartImpl.prototype.__proto__=events.EventEmitter.prototype;

ChartImpl.prototype.factories = {}; // factories is a static variable

ChartImpl.prototype.updaters = {}; // updaters is a static variable

/**
 * A static method which registers the correspondence between a chart's type and its factory.
 *
 * @param {String} chartType - the chart's type, i.e. 'barchart', 'linechart', 'mapchart', 'table';
 * @param {ChartFactory} factory - the factory instance which corresponds to the type in chartType.
 */
ChartImpl.registerFactory = function(chartType, factory) {
    if (! ChartImpl.prototype.factories.hasOwnProperty(chartType)) {
        ChartImpl.prototype.factories[chartType] = factory; /* EXPLICITLY assign to prototype property,
         otherwise it won't act as a static variable */
    }

};

/**
 * A static method which allows you to create specific kinds of chart.
 *
 * @param {String} chartType - the chart's type, i.e. 'barchart', 'linechart', 'mapchart', 'table';
 * @param {String} chartId - the chart's ID;
 * @return {ChartImpl} the created chart.
*/
ChartImpl.createChart = function(chartType, chartId) {
    if (ChartImpl.prototype.factories.hasOwnProperty(chartType)) {
        var dep = ChartImpl.prototype.factories[chartType];
        return dep.createChart(chartId);
    }
    else
    return null;
};

/**
 * A static method which registers the correspondence between an updating type and its updater.
 *
 * @param {String} updateType - the chart's updating type, i.e. 'linechart:stream', 'barchart:inplace',
 * 'mapchart:movie', and so on;
 * @param {ChartUpdater} updater - the updater instance which corresponds to the updating type in updateType.
 */
ChartImpl.registerUpdater = function(updateType, updater) {
    if (! ChartImpl.prototype.updaters.hasOwnProperty(updateType)) {
        ChartImpl.prototype.updaters[updateType] = updater;
        /* EXPLICITLY assign to prototype property,
         otherwise it won't act as a static variable */
    }
};

/**
 * Gets the chart's ID.
 *
 * @return {String} the chart's ID.
 */
ChartImpl.prototype.getId = function() {
    return this.uid;
};

/**
 * Gets the chart's type.
 *
 * @return {String} the chart's type.
 */
ChartImpl.prototype.getType = function() {
    return this.type;
};

/**
 * Sets the chart's data.
 *
 * @param {ChartData} data - a JSON object containing the chart's data.
 */
ChartImpl.prototype.setData = function(data) {
    var schema = require(__dirname + '/../../../resources/schemes/' + this.getType() + '-data');
    if(validate(data, schema).errors.length > 0) {
        console.error("ERROR: wrong data." );
        throw new Error('ChartImpl:wrongData');
    }

    this.data=data;
};

/**
 * Gets the chart's data.
 *
 * @return  {ChartData} the chart's data.
 */
ChartImpl.prototype.getData = function() {
    return this.data;
};

/**
 * Sets the chart's settings. You're allowed to change value to the default properties, but you cannot add
 * new properties to the chart's settings.
 *
 * @param {ChartSettings} settings - a JSON object containing the chart's settings you wish to add.
 */
ChartImpl.prototype.setSettings = function(settings) {

    function set(mySettings, settings) {
        if(typeof settings == 'object') {
            for(var key in settings) {
                if(mySettings.hasOwnProperty(key)) {
                    if ( typeof settings[key] == 'object') {
                        set(mySettings[key], settings[key])
                    }
                    else {
                        mySettings[key] = settings[key];
                    }
                }
            }
        }
    }

    var newSettings=_.cloneDeep(this.settings);
    set(newSettings, settings);

    var schema = require(__dirname + '/../../../resources/schemes/' + this.getType() + '-settings');
    if(validate(newSettings, schema).errors.length > 0) {
        console.error("ERROR: wrong settings." );
        throw new Error('ChartImpl:wrongSettings');
    }

    this.settings = newSettings;

};

/**
 * Gets the chart's settings.
 *
 * @return  {ChartSettings} the chart's settings.
 */
ChartImpl.prototype.getSettings = function() {
    return this.settings;
};

/**
 * Updates the chart's data.
 *
 * @param {String} updateType - the chart's updating type, i.e. 'stream', 'inplace', 'movie';
 * @param {ChartUpdate} updateData - contains the new data and the information needed to update the chart.
 */
ChartImpl.prototype.update = function(updateType, updateData) {

    var type=this.getType()+":"+updateType;
    if (ChartImpl.prototype.updaters.hasOwnProperty(type)) {
        var schema = require(__dirname + '/../../../resources/schemes/' + this.getType() + '-update-' + updateType);
        if(validate(updateData, schema).errors.length > 0) {
            console.error("ERROR: wrong updating data." );
            throw new Error('ChartImpl:wrongUpdatingData');
        }

        var dep=ChartImpl.prototype.updaters[type];
        dep.update(this, updateData);
        this.emit('update', updateType, updateData); // emits an 'update' signal
        console.log("Chart "+this.uid+" has been updated with the method: "+updateType);
    }
    else {
        console.error("ERROR: wrong updating type." );
        throw("ChartImpl:wrongUpdatingType");

    }
};

// For dependency injection:
var BarChartImpl = require('./BarChartImpl.js');
var LineChartImpl = require('./LineChartImpl.js');
var MapChartImpl = require('./MapChartImpl.js');
var TableImpl = require('./TableImpl.js');
