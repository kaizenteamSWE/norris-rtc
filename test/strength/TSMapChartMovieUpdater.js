/*
 * Name: TSMapChartMovieUpdater.js
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
 * v0.02 2015-06-03 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var MapChartMovieUpdater = require('../../main/DataModel/NorrisChart/MapChartMovieUpdater.js');
var assert = require("assert");

describe('MapChartMovieUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should reject chart without data',function(){
            var chart = {data: {}};
            chart.getData = function() {return this.data;};
            chart.setData = function(data) {this.data = data;};
            var newData = {
                inplace : [
                    { position: {series:0, index:0}, data: {x:1, y:1} },
                    { position: {series:0, index:1}, data: {x:1, y:1} }
                ],
                stream: [
                    { values: [{x:11, y:11}, {x:22, y:22}, {x:33, y:33}, {x:44, y:44}] },
                ],
                delete: [
                    {series:0, index:0},
                    {series:0, index:1}
                ]
            };
            assert.throws(function () {(new MapChartMovieUpdater()).update(chart, newData)});
        });
        
    });
});
