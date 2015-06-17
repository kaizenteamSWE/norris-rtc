/*
 * Name: TUPageImpl.js
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
 * v0.02 2015-06-02 Bucco Riccardo Verify
 * ================================================================================
 * v0.01 2015-05-25 Pavanello Fabio Matteo Creation
 * ================================================================================
 */
var NorrisImpl = require('../../main/DataModel/NorrisImpl.js')
var PageImpl = require('../../main/DataModel/NorrisPage/PageImpl.js');
var assert = require("assert");

describe('PageImpl', function(){

    describe('add(chart : ChartImpl): PageImpl',function(){
        it('should add a chart to page',function(){
            var endpoint = 'endpoint';
            var norris = new NorrisImpl(endpoint);
            var chart = norris.createChart('barchart','randomid');
            var page = new PageImpl('randomid');
            
            page.add(chart);
            assert.deepEqual(chart,page.charts[0]);
        });
    });

    describe('setSettings(settings: Settings): void',function(){
        it('should set settings of a page',function(){
            var settings = {'title':'my page','maxChartsRow':7,'maxChartsCol':7};
            var page = new PageImpl('randomid');
            page.setSettings(settings);
            assert.deepEqual(settings,page.settings);
        });
    });

    describe('getId(): String',function(){
        it('should return the id of the page', function(){
            var page = new PageImpl('randomid');
            assert.equal('randomid',page.getId());
        });
    });
    
    describe('getSettings(): PageSettings',function(){
        it('should return the settings of the page', function(){
            var settings = {'title':'my page','maxChartsRow':7,'maxChartsCol':7};
            var page = new PageImpl('randomid');
            page.setSettings(settings);
            assert.deepEqual(settings,page.getSettings());
        });
    });
    
    describe('getCharts(): ChartImpl[]',function(){
        it('should return an array of charts in the page', function(){
            var endpoint = 'endpoint';
            var norris = new NorrisImpl(endpoint);
            var chart1 = norris.createChart('barchart','01');
            var chart2 = norris.createChart('linechart','02')
            var page = new PageImpl('randomid');
            page.add(chart1);
            page.add(chart2);
            var arrayChart = [chart1, chart2];
            assert.deepEqual(arrayChart, page.getCharts());
        });
    });
    
    describe('clearCharts(): void',function(){
        it('should return an array of charts in the page', function(){
            var endpoint = 'endpoint';
            var norris = new NorrisImpl(endpoint);
            var chart1 = norris.createChart('barchart','01');
            var chart2 = norris.createChart('linechart','02')
            var page = new PageImpl('randomid');
            page.add(chart1);
            page.add(chart2);
            page.clearCharts();
            assert.equal(0, page.getCharts().length);
        });
    });
    
    
});
