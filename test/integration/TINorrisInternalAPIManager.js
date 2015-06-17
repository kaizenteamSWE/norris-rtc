/*
 * Name: TINorrisNorrisInternalAPIManager.js
 * Module: 
 * Location: Norris/test/integration
 * Date: 2015-05-25
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara Approved
 * ================================================================================
 * v0.02 2015-06-03 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */
var NorrisBridge = require('../../main/InternalAPIManager/NorrisBridge.js');

var assert = require("assert");

describe('Norris::InternalAPIManager',function(){
    function chart(type, id) {
        this.id = id;
        this.type = type;
        this.settings = {};
        this.data = {};
        this.updateData = {};
    };

    chart.prototype.getId = function() {return this.id;};
    chart.prototype.getType = function() {return this.type;};
    chart.prototype.getSettings = function() {return this.settings;};
    chart.prototype.setSettings = function(settings) {this.settings = settings;};
    chart.prototype.getData = function() {return this.data;};
    chart.prototype.getUpdateData = function() {return this.updateData;}
    chart.prototype.setData = function(data) {this.data = data;};
    chart.prototype.update = function(updateType, updateData) {this.updateData = updateData;};
    var model = {
        norrisSettings: {},
        charts: []
    };
    model.setSettings = function(settings) {this.norrisSettings = settings;};
    model.getSettings = function() {return tnis.norrisSettings;};
    model.createChart = function(type, id) {var x = new chart(type,id); this.charts[id] = x; return x;};
    model.getChart = function(chartId) {}
    var nrr = new NorrisBridge(model);
    it('should be possible to create a chart, adding data and settings to it', function(){
        var chartBridge = nrr.createChart('barchart','randomID');
        chartBridge.setData({randomkey1: 'randomDATA1', randomkey2: 'randomDATA2'});
        chartBridge.setSettings({randomkey3: 'randomSETTINGS1', randomkey4: 'randomSETTINGS2'});

        assert.deepEqual({randomkey1: 'randomDATA1', randomkey2: 'randomDATA2'},chartBridge.getData());
        assert.deepEqual({randomkey3: 'randomSETTINGS1', randomkey4: 'randomSETTINGS2'},chartBridge.getSettings());
    });
    it('should be possible to update a chart',function(){
        var chartBridge = nrr.createChart('barchart','randomID');
        chartBridge.setData({randomkey1: 'randomDATA1', randomkey2: 'randomDATA2'});
        chartBridge.setSettings({randomkey3: 'randomSETTINGS1', randomkey4: 'randomSETTINGS2'});
        chartBridge.update('barchart', {randomkey5: 'update1'});
        assert.deepEqual({randomkey5: 'update1'},chartBridge.getChartModel().getUpdateData());
        assert.deepEqual({randomkey1: 'randomDATA1', randomkey2: 'randomDATA2'},chartBridge.getChartModel().getData());
    });
});