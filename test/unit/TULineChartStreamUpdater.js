/*
 * Name: TULineChartStreamUpdater.js
 * Module: 
 * Location: Norris/test/unit
 * Date: 2015-05-26
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
 * v0.01 2015-05-26 Bucco Riccardo Creation
 * ================================================================================
 */

var LineChartStreamUpdater = require('../../main/DataModel/NorrisChart/LineChartStreamUpdater.js');
var assert = require("assert");

describe('LineChartStreamUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should update a given chart with the stream method', function(){
            var chart = {
                data: {
                    labels: ['2010','2011','2012','2013'],
                    datasets: [
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]},
                        {values: [1,2,3,4]}
                    ]
                },
                settings: {
                    maxPoints: 10
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            chart.getSettings = function() {return this.settings;};
            var newData = { stream: [
                {label: 'foo', data: [777,888,999]},
                {label: 'bar', data: [111,222,333]}
            ]};
            var updatedData = {
                labels: ['2010','2011','2012','2013', 'foo', 'bar'],
                datasets: [
                    {values: [1,2,3,4,777,111]},
                    {values: [1,2,3,4,888,222]},
                    {values: [1,2,3,4,999,333]}
                ]
            };
            (new LineChartStreamUpdater()).update(chart, newData);
            assert.deepEqual(updatedData, chart.data);
        });
    });
    
});
