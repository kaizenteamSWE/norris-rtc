/*
 * Name: TUMapChartInPlaceUpdater.js
 * Module: 
 * Location: Norris/test/unit
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
 * v0.02 2015-06-02 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var MapChartInPlaceUpdater = require('../../main/DataModel/NorrisChart/MapChartInPlaceUpdater.js');
var assert = require("assert");

describe('MapChartInPlaceUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        
        it('should update a given mapchart with the inplace method',function(){
            var chart = {
                data: {datasets : [
                    { values: [{x:1, y:2}, {x:3, y:4}, {x:5, y:6}, {x:7, y:8}] },
                    { values: [{x:1, y:16}, {x:31, y:41}, {x:41, y:21}, {x:12, y:19}] },
                    { values: [{x:123, y:110}, {x:10, y:18}, {x:18, y:81}, {x:91, y:1}] }
                ]
            }};
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            var newData = { inplace : [
                {position: {series:0, index:0}, data: {x:9999, y:9999} },
                {position: {series:0, index:1}, data: {x:8888, y:8888} }
            ]};
            var updatedData = 
                { datasets : [{values: [{x:9999, y:9999}, {x:8888, y:8888}, {x:5, y:6}, {x:7, y:8}] },
                { values: [{x:1, y:16}, {x:31, y:41}, {x:41, y:21}, {x:12, y:19}] },
                { values: [{x:123, y:110}, {x:10, y:18}, {x:18, y:81}, {x:91, y:1}] }
            ]};
            (new MapChartInPlaceUpdater()).update(chart, newData);
            assert.deepEqual(chart.data, updatedData);
        });
    });
});
