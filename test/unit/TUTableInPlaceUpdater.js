/*
 * Name: TUTableInPlaceUpdater.js
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

var TableInPlaceUpdater = require('../../main/DataModel/NorrisChart/TableInPlaceUpdater.js');
var assert = require("assert");

describe('TableInPlaceUpdater', function(){

    describe('update(chart: ChartImpl, updateData: ChartUpdate): void', function(){
        
        it('should update a given table with the inplace method',function(){
            var chart = {
                data: {
                    datasets: [ {row:
                        [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                        ]},
                            {row:
                        [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                          {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                        ]}
                    ]
                }
            };
            chart.getData = function() {return this.data;};
            chart.setData = function(par) {this.data = par;};
            var newData = {inplace :[ 
                { position: {x:0, y:0}, data: {color: {r: 0, g: 0, b: 0}, background: {r: 0, g: 0, b: 0}, value:'9999'} },
                { position: {x:0, y:1}, data: {color: {r: 0, g: 0, b: 0}, background: {r: 0, g: 0, b: 0}, value:'8888'} }
            ]};
            var updatedData = {
                datasets: [ {row: 
                    [ 
                      {color : {r: 0, g: 0, b: 0}, background : {r: 0, g: 0, b: 0}, value: '9999'},
                      {color : {r: 0, g: 0, b: 0}, background : {r: 0, g: 0, b: 0}, value: '8888'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                    ]},
                        {row:
                    [ {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'},
                      {color : {r: 255, g: 255, b: 255}, background : {r: 255, g: 255, b: 255}, value: '1'}
                    ]}
            ]};
            (new TableInPlaceUpdater()).update(chart, newData);
            assert.deepEqual(updatedData, chart.data);
        });
    });
});
