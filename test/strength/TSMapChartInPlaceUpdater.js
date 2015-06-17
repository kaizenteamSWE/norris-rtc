/*
 * Name: TSMapChartInPlaceUpdater.js
 * Module: 
 * Location: Norris/test/strength
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
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var MapChartInPlaceUpdater = require('../../main/DataModel/NorrisChart/MapChartInPlaceUpdater.js');
var assert = require("assert");

describe('MapChartInPlaceUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should reject chart without data',function(){
            var chart = {data: {}};
            chart.getData = function() {return this.data;};
            chart.setData = function(data) {this.data = data;};
            var newData = [
                { position: {x:0, y:0}, value: 'foo' },
                { position: {x:0, y:1}, value: 'foo' }
            ]
            assert.throws(function () {(new MapChartInPlaceUpdater()).update(chart, newData)});
        });
  
    });
});
