/*
 * Name: TUMapChartImpl.js
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

var MapChartImpl = require('../../main/DataModel/NorrisChart/MapChartImpl.js');
var assert = require("assert");

describe('MapChartImpl', function(){
    describe('MapChartImpl(id:String)', function(){
        it('should memorize the right type of the chart',function(){
            var mapchart = new MapChartImpl('randomID');
            assert.equal('mapchart', mapchart.type);
        });
        it('should memorize the right id of the chart',function(){
            var mapchart = new MapChartImpl('randomID');
            assert.equal('randomID', mapchart.uid);
        });
        it('should memorize some default values for the keys of the settings',function(){
            var mapchart = new MapChartImpl('randomID');
            var defaults = {
                area : {
                    x : 0,
                    y : 0,
                    zoom : 1
                },
                title : '',
                description : 'This is a map chart',
                legendPosition : 'topright',
                zoomPosition : 'topleft',
                scalePosition : 'bottomleft',
                allowFilter : false,
                maxItems : 5
            };
            assert.deepEqual(defaults,mapchart.settings);
        });
    })
});
