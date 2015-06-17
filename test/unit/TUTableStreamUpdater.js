/*
 * Name: TUTableStreamUpdater.js
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
 * v0.02 2015-06-01 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-26 Bucco Riccardo Creation
 * ================================================================================
 */

var TableStreamUpdater = require('../../main/DataModel/NorrisChart/TableStreamUpdater.js');
var assert = require("assert");

describe('TableStreamUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        
        it('should update a given chart with the stream method', function(){
            var chart = {
                data: {
                    headers: ['col1','col2','col3'],
                    datasets: [
                        {row: [ {value: '1'}, {value: '2'}, {value: '3'} ]},
                        {row: [ {value: '1'}, {value: '1'}, {value: '1'} ]}
                    ]
                },
                settings: {
                    maxRows: 10
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            chart.getSettings = function() {return this.settings;};
            var newData = { stream : [
                { row: [ {value: '9999'}, {value: '8888'}, {value: '7777'} ]},
                { row: [ {value: '6666'}, {value: '5555'}, {value: '4444'} ]}
            ]};
            var updatedData = {
                headers: ['col1','col2','col3'],
                datasets: [
                    // those are the expected values, because new values are inserted in top of the array   
                    { row: [ {value: '6666'}, {value: '5555'}, {value: '4444'} ]},
                    { row: [ {value: '9999'}, {value: '8888'}, {value: '7777'} ]},
                    { row: [ {value: '1'}, {value: '2'}, {value: '3'} ]},
                    { row: [ {value: '1'}, {value: '1'}, {value: '1'} ]}
                ]
            };
            (new TableStreamUpdater()).update(chart, newData);
            assert.deepEqual(updatedData, chart.data);
        });
    });
    
});
