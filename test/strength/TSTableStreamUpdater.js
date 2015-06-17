/*
 * Name: TSTableStreamUpdater.js
 * Module: 
 * Location: Norris/test/strength
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
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-26 Bucco Riccardo Creation
 * ================================================================================
 */

var TableStreamUpdater = require('../../main/DataModel/NorrisChart/TableStreamUpdater.js');
var assert = require("assert");

describe('TableStreamUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        it('should not accept a chart without data',function(){
            var chart = {
                data: {},
                settings: {
                    maxRows: 10
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(data) {this.data = data;};
            chart.getSettings = function() {return this.settings;};
            var newData = [
                [{color: 'blue', background: 'white', value: '1'}, {color: 'blue', background: 'white', value: '1'}, 
                    {color: 'blue', background: 'white', value: '1'}], 
                [{color: 'blue', background: 'white', value: '1'}, {color: 'blue', background: 'white', value: '1'}, 
                    {color: 'blue', background: 'white', value: '1'}]
            ];
            assert.throws(function () {(new TableStreamUpdater()).update(chart, newData)});
        });
        it('should reject an update whose data length is different from datasets length of the chart',function(){
            var chart = {
                data: {
                    headers: ['col1','col2','col3'],
                    datasets: [
                        [ {value: '1'}, {value: '2'}, {value: '3'} ],
                        [ {value: '1'}, {value: '1'}, {value: '1'} ]
                    ]
                },
                settings: {
                    maxRows: 10
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            chart.getSettings = function() {return this.settings;};
            var newData = [
                [ {value: '9999'}, {value: '8888'}, {value: '7777'}, {value: 'tooMuch1'} ],
                [ {value: '6666'}, {value: '5555'}, {value: '4444'}, {value: 'tooMuch2'} ]
            ];
            assert.throws(function () {(new TableStreamUpdater()).update(chart, newData)});
        });
        
    });
    
});
