/*
 * Name: TUBarChartInPlaceUpdater.js
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

var BarChartInPlaceUpdater = require('../../main/DataModel/NorrisChart/BarChartInPlaceUpdater.js');
var assert = require("assert");

describe('BarChartInPlaceUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should update a given barchart with the inplace method',function(){
            var chart = {
                data: {
                    datasets: [
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]}
                    ]
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            var newData = { inplace : [
                { position: {x:0, y:0}, data: 10 },
                { position: {x:0, y:1}, data: 30 }
            ]};
            var updatedData = {
                datasets: [
                    {values: [10,30,3,4]},
                    {values: [1,2,3,4]},
                    {values: [1,2,3,4]}
                ]
            };
            (new BarChartInPlaceUpdater()).update(chart, newData);
            assert.deepEqual(chart.data, updatedData);
        });
    });
});
