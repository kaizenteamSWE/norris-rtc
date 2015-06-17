/*
 * Name: TINorrisDataModelNorrisChart.js
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
 * v0.02 2015-06-03 Bigarella Chiara Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */

var ChartImpl = require('../../main/DataModel/NorrisChart/ChartImpl.js');

var assert = require("assert");

describe('Norris::DataModel::NorrisChart', function () {
    var barData = {
        labels: ['2010','2011','2012','2013'],
        datasets: [
            {name: 'pippo', color : '#ff0000', values: [1,2,3,4]},
            {name: 'pluto', color : '#00ff00', values: [5,6,7,8]},
            {name: 'paperino', color : '#0000ff', values: [9,10,11,12]},
        ]
    };
    var lineData = {
        labels: ['2010','2011','2012','2013'],
        datasets: [
            {name: 'pippo', color : '#ff0000', values: [1,2,3,4]},
            {name: 'pluto', color : '#00ff00', values: [5,6,7,8]},
            {name: 'paperino', color : '#0000ff', values: [9,10,11,12]},
        ]
    };
    var mapData = {
        datasets: [
            {name: 'uno', color : '#ff0000', values: [{x:1, y:1}, {x:2, y:2}, {x:6, y:7}, {x:10, y:1}]},
            {name: 'due', color : '#ffff00', values: [{x:19, y:18}, {x:13, y:121}, {x:13, y:12}]},
            {name: 'tre', color : '#ffffff', values: [{x:13, y:1}, {x:13, y:14}, {x:7, y:8}, {x:1, y:0}]}
        ]
    };
    var tabData = {
        headers: ['anno','mese','giorno','ora'],
        datasets: [
            {row: [
                {color : '#ff0000', background : '#ff0340', value: 'due'},
                {color : '#123456', background : '#ff0012', value: 'sette'},
                {color : '#654321', background : '#ff8700', value: 'random'}
            ]},
            {row: [
                {color: '#624375', background : '#845767', value: '12'},
                {color: '#624567', background : '#ff0765', value: 'tre'},
                {color: '#123375', background : '#000000', value: 'dieci'}
            ]}
        ]
    };

    it('should properly memorize data and settings for a specified chart of a given type',function(){
        var barchart = ChartImpl.createChart('barchart','bar1');
        var linechart = ChartImpl.createChart('linechart','line1');
        var mapchart = ChartImpl.createChart('mapchart','map1');
        var table = ChartImpl.createChart('table','tab1');
        
        barchart.setData(barData);
        linechart.setData(lineData);
        mapchart.setData(mapData);
        table.setData(tabData);

        assert.deepEqual(barData, barchart.getData());
        assert.deepEqual(lineData, linechart.getData());
        assert.deepEqual(mapData, mapchart.getData());
        assert.deepEqual(tabData, table.getData());
    });
    it('should properly update a specified chart with a given method', function () {
        var barchart = ChartImpl.createChart('barchart','bar1');
        var linechart = ChartImpl.createChart('linechart','line1');
        var mapchart = ChartImpl.createChart('mapchart','map1');
        var table = ChartImpl.createChart('table','tab1');

        barchart.setData(barData);
        linechart.setData(lineData);
        mapchart.setData(mapData);
        table.setData(tabData);

        var barNewDataInPlace = {
            inplace: [
                {position: {x:0, y:0}, data: 4},
                {position: {x:0, y:1}, data: 5}
            ]
        };
        var lineNewDataStream = {
            stream: [
                {label: 'foo', data: [88,88,88]},
                {label: 'bar', data: [99,99,99]}
            ]
        };
        var mapNewDataMovie = {
            inplace: [
                { position: {series:0, index:0}, data: {x:99, y:99} },
                { position: {series:0, index:1}, data: {x:88, y:88} }
            ],
            stream: [
                {series: 1, data: {x: 88, y: 99}},
            ],
            delete: [
                {series:1, index:0},
                {series:2, index:0},
                {series:2, index:1}
            ]
        };

        var barDataUpdatedInPlace = {
            labels: ['2010','2011','2012','2013'],
            datasets: [
                {name: 'pippo', color : '#ff0000', values: [4,5,3,4]},
                {name: 'pluto', color : '#00ff00', values: [5,6,7,8]},
                {name: 'paperino', color : '#0000ff', values: [9,10,11,12]},
            ]
        };

        var lineDataUpdatedStream = {
            labels: ['2010','2011','2012','2013','foo','bar'],
            datasets: [
                {name: 'pippo', color : '#ff0000', values: [1,2,3,4,88,99]},
                {name: 'pluto', color : '#00ff00', values: [5,6,7,8,88,99]},
                {name: 'paperino', color : '#0000ff', values: [9,10,11,12,88,99]},
            ]
        };

        var mapDataUpdatedMovie = {
            datasets: [
                {name: 'uno', color : '#ff0000', values: [{x:99, y:99}, {x:88, y:88}, {x:6, y:7}, {x:10, y:1}]},
                {name: 'due', color : '#ffff00', values: [{x:13, y:121}, {x:13, y:12}, {x: 88, y: 99}]},
                {name: 'tre', color : '#ffffff', values: [{x:13, y:1}, {x:1, y:0}]}
            ]
        };

        barchart.update('inplace', barNewDataInPlace);
        linechart.update('stream', lineNewDataStream);
        mapchart.update('movie', mapNewDataMovie);

        assert.deepEqual(barDataUpdatedInPlace, barchart.getData());
        assert.deepEqual(lineDataUpdatedStream, linechart.getData());
        assert.deepEqual(mapDataUpdatedMovie, mapchart.getData());
    });
});