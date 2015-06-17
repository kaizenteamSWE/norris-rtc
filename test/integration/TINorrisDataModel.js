/*
 * Name: TINorrisDataModel.js
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
 * v0.02 2015-06-03 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */
var NorrisImpl = require('../../main/DataModel/NorrisImpl.js');

var assert = require("assert");

describe('Norris::DataModel',function(){
    var nrr = new NorrisImpl();

    var data1 = {
        labels: ['2010','2011','2012','2013'],
        datasets: [
            {name: 'pippo', color : '#ff0000', values: [1,2,3,4]},
            {name: 'pluto', color : '#00ff00', values: [5,6,7,8]},
            {name: 'paperino', color : '#0000ff', values: [9,10,11,12]},
        ]
    };
    var data2 = {
        labels: ['2010','2011','2012','2013'],
        datasets: [
            {name: 'milan', color : '#0000ff', values: [1,2,3,4]},
            {name: 'inter', color : '#00ff00', values: [3,4,5,6]},
            {name: 'juve', color : '#ff0000', values: [7,8,9,10]},
        ]
    };

    var barchart1 = nrr.createChart('barchart','bar1');
    var linechart1 = nrr.createChart('linechart','line1');
    var linechart2 = nrr.createChart('linechart','line2');

    barchart1.setData(data1);
    linechart1.setData(data1);
    linechart2.setData(data2);

    var page1 = nrr.createPage('p1');
    var page2 = nrr.createPage('p2');

    page1.add(barchart1);
    page1.add(linechart2);
    page2.add(linechart1);
    page2.add(linechart2);
    page2.add(barchart1);

    it('should properly memorize charts',function(){
        assert.deepEqual(data1,barchart1.getData());
        assert.deepEqual(data1,linechart1.getData());
        assert.deepEqual(data2,linechart2.getData());
    });
    it('should properly memorize pages',function(){
        assert.deepEqual([barchart1,linechart2],page1.getCharts());
        assert.deepEqual([linechart1,linechart2,barchart1],page2.getCharts());
    });
    it('should return charts previously memorized without loosing data',function(){
        assert.deepEqual({'bar1':barchart1, 'line1': linechart1, 'line2': linechart2},nrr.charts);
    });
    it('should return pagess previously memorized without loosing data',function(){
        assert.deepEqual({'p1':page1, 'p2': page2},nrr.pages);
    });
});