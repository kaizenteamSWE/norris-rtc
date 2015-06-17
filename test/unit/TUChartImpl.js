/*
 * Name: TUChartImpl.js
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
var ChartImpl = require('../../main/DataModel/NorrisChart/ChartImpl.js');
var assert = require("assert");

describe('ChartImpl', function(){

    describe('registerFactory(chartType: String, factory: ChartFactory): void',function(){
        it('should register the correspondence between a type of chart and its factory',function(){
            var factory = {'method1':'RandomMethod1', 'method2':'RandomMethod2', 'attribute':'RandomAttribute'};
            ChartImpl.registerFactory('newFactory',factory);
            assert.deepEqual(factory,ChartImpl.prototype.factories['newFactory']);
        });
    });

    describe('registerUpdater(updateType: String, updater: ChartUpdater): void',function(){
        it('should register the correspondence between a type of chart and its updater',function(){
            var updater = {'method1':'RandomMethod1', 'method2':'RandomMethod2', 'attribute':'RandomAttribute'};
            ChartImpl.registerUpdater('newUpdater',updater);
            assert.deepEqual(updater,ChartImpl.prototype.updaters['newUpdater']);
        });
    });

    describe('createChart(chartType: String, chartId: String): ChartImpl',function(){
        // in this test the createChart method of factory class is indirectly tested too
        it('should allow you to create a bar chart', function(){
            var bc = ChartImpl.createChart('barchart','randomID');        
            assert.deepEqual('barchart', bc.getType());
        });
        it('should allow you to create a line chart', function(){
            var lc = ChartImpl.createChart('linechart','randomID');        
            assert.deepEqual('linechart', lc.getType());
        });
        it('should allow you to create a map chart', function(){
            var mc = ChartImpl.createChart('mapchart','randomID');        
            assert.deepEqual('mapchart', mc.getType());
        });
        it('should allow you to create a table', function(){
            var tb = ChartImpl.createChart('table','randomID');        
            assert.deepEqual('table', tb.getType());
        });
        it('should not allow you to create a chart if its type is not registered in the "factories" attribute', function(){
            assert.deepEqual(null,ChartImpl.createChart('randomType','randomID'));
        });
        
    });

    describe('ChartImpl(chartType: String, chartId: String)', function(){
        it('should memorize the right type of the chart',function(){
            assert.equal('barchart', (new ChartImpl('barchart','randomID')).type);
        });
        it('should memorize the right id of the chart',function(){
            assert.equal('randomID', (new ChartImpl('barchart','randomID')).uid);
        });
        it('should memorize an empty title for the chart',function(){
            assert.equal('', (new ChartImpl('barchart','randomID')).settings.title);
        });
        it('should memorize "This is a chart." as a description for the chart',function(){
            assert.equal('This is a chart.', (new ChartImpl('barchart','randomID')).settings.description);
        });
        it('should memorize no data',function(){
            assert.equal(0, Object.keys(new ChartImpl('barchart','randomID').data).length);
        });
    });

    describe('getId(): String', function(){
        it('should return the ID of the chart', function(){
            assert.equal('randomID', (new ChartImpl('barchart','randomID')).getId());
        });
    });

    describe('getType(): String', function(){
        it('should return the type of the chart', function(){
            assert.equal('linechart', (new ChartImpl('linechart','0123')).getType());
            assert.equal('barchart', (new ChartImpl('barchart','3210')).getType());
            assert.equal('mapchart', (new ChartImpl('mapchart','0132')).getType());
            assert.equal('table', (new ChartImpl('table','2301')).getType());
        });
    });

    describe('setData(data: ChartData): void', function(){
        it('should set "data" parameter as data object in the chart', function(){
            var data = {
                labels: ['1','2','3','4','5'],
                datasets: [
                    {name: 'pippo', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,3,4,5]},
                    {name: 'pluto', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,0,4,5]},
                    {name: 'paperino', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,3,4,5]}
                ]
            };
            var chart = new ChartImpl('linechart','randomID');
            chart.setData(data);
            assert.deepEqual(data, chart.data);
        });
    });

    describe('getData(): ChartData', function(){
        it('should return the data object of the chart',function(){
            var chart = new ChartImpl('linechart','randomID');
            chart.data = {'randomKey1':'randomValue1', 'randomKey2':'randomValue2'};
            assert.deepEqual(chart.data,chart.getData());
        });
    });

    describe('setSettings(settings: ChartSettings): void', function(){
        it('should set "settings" parameter as settings object in the chart (keys different from "title" and "description" are ignored)', function(){
            var settings = {'randomKey1':'randomValue1', 'randomKey2':'randomValue2'};
            var chart = new ChartImpl('linechart','randomID');
            chart.setSettings(settings);
            assert.notDeepEqual(settings, chart.settings);
            settings = {'title':'randomTitle', 'description':'randomDescription'};
            chart.setSettings(settings);
            assert.deepEqual(settings, chart.settings);
        });
    });

    describe('getSettings(): ChartSettings', function(){
        it('should return the settings object of the chart',function(){
            var settings = {'randomKey1':'randomValue1', 'randomKey2':'randomValue2'};
            var chart = new ChartImpl('linechart','randomID');
            chart.settings = settings;
            assert.deepEqual(chart.settings, chart.getSettings());
        })
    });

});
