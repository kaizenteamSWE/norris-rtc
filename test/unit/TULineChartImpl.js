/*
 * Name: TULineChartImpl.js
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

var LineChartImpl = require('../../main/DataModel/NorrisChart/LineChartImpl.js');
var assert = require("assert");

describe('LineChartImpl', function(){
    describe('LineChartImpl(id: String)', function(){
        it('should memorize the right type of the chart',function(){
            var linechart = new LineChartImpl('randomID');
            assert.equal('linechart', linechart.type);
        });
        it('should memorize the right id of the chart',function(){
            var linechart = new LineChartImpl('randomID');
            assert.equal('randomID', linechart.uid);
        });
        it('should memorize some default values for the keys of the settings',function(){
            var linechart = new LineChartImpl('randomID');
            var defaults = {
                title: '',
                description : 'This is a line chart.',
                xLabel : '',
                yLabel : '',
                legendPosition : 'right',
                maxItems : 10,
                style : {
                    maxValue: null,
                    minValue: null,
                    animationDuration : 1000,
                    bezierCurve : true,
                    pointDotSize : 0,
                    showGrid : false,
                }
            };
            assert.deepEqual(defaults,linechart.settings);
        });
    })
});