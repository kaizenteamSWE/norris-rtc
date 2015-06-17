/*
 * Name: TUNorrisBridge.js
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

describe('NorrisImpl', function(){
    require.cache = {};
    var NorrisImpl = require('../../main/DataModel/NorrisImpl.js');
    var PageImpl = require('../../main/DataModel/NorrisPage/PageImpl.js');
    var NorrisBridge = require('../../main/InternalAPIManager/NorrisBridge.js');
    var ChartBridge = require('../../main/InternalAPIManager/ChartBridge.js');
    var assert = require("assert");

    describe('createPage(pageId: String): void',function(){
        it('should create a page with the indicated id',function(){
            var page = {'charts': [],'settings': {'maxChartsCol': 3,'maxChartsRow': 2,'title': "Norris's page"},'uid': '00'};
            var endpoint = 'endpoint';
            var norrisImpl = new NorrisImpl(endpoint);
            assert.deepEqual(page,norrisImpl.createPage('00'));
        });
    });
    
    describe('getSettings(): NorrisSettings',function(){
        it('should return the settings of a NorrisBridge object', function(){
            var settings = {
                randomkey: 'random value',
                examplefunc: function () {},
                circular: settings,
                numeric: 5,
                boolean: true
            };
            
            var norrisImpl = new NorrisImpl();
            norrisImpl.settings = settings
            
            assert.deepEqual(settings,norrisImpl.getSettings());
        });
    });

    
    describe('getChart(Id: String): ChartImpl',function(){
        it('should return a chart in the page', function(){
            var endpoint = 'endpoint';
            var norrisImpl = new NorrisImpl(endpoint);

            norrisImpl.createChart('mapchart','01');
            var chart = {
                _events: {},
                _maxListeners: 10,
                data: {},
                domain: null,
                settings: {
                area : {
                    x: 0,
                    y:0,
                    zoom : 1
                },
                description: 'This is a map chart',
                legendPosition: 'topright',
                zoomPosition: 'topleft',
                scalePosition: 'bottomleft',
                allowFilter: false,
                maxItems: 5,
                title: ''
                },
                type: 'mapchart',
                uid: '01'
            };

            assert.deepEqual(chart,norrisImpl.getChart('01'));
        });
    });

});
