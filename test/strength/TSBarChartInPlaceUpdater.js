/*
 * Name: TSBarChartInPlaceUpdater.js
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
 * v0.02 2015-06-03 Bucco Riccardo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bigarella Chiara Creation
 * ================================================================================
 */

var BarChartInPlaceUpdater = require('../../main/DataModel/NorrisChart/BarChartInPlaceUpdater.js');
var assert = require("assert");

describe('BarChartInPlaceUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should reject chart without data',function(){
            var chart = {data: {}};
            chart.getData = function() {return this.data;};
            chart.setData = function(data) {this.data = data;};
            var newData = [
                { position: {x:0, y:0}, value: 'foo' },
                { position: {x:0, y:1}, value: 'foo' }
            ]
            assert.throws(function () {(new BarChartInPlaceUpdater()).update(chart, newData)});
        });
        
    });
});
