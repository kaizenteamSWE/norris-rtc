/*
 * Name: TUBarChartImpl.js
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

var BarChartImpl = require('../../main/DataModel/NorrisChart/BarChartImpl.js');
var assert = require("assert");

describe('BarChartImpl', function(){
    describe('BarChartImpl(id:String)', function(){
        it('should memorize the right type of the chart',function(){
            var barchart = new BarChartImpl('randomID');
            assert.equal('barchart', barchart.type);
        });
        it('should memorize the right id of the chart',function(){
            var barchart = new BarChartImpl('randomID');
            assert.equal('randomID', barchart.uid);
        });
        it('should memorize some default values for the keys of the settings',function(){
            var barchart = new BarChartImpl('randomID');
            var defaults = {
                description : 'This is a bar chart.',
                title : '',
                xLabel : '',
                yLabel : '',
                legendPosition : 'right',
                orientation : 'vertical',
                style: {
                    barArea: '60%',
                    animationDuration: 1000,
                    showGrid : false,
                    maxValue: null,
                    minValue: null
                }
            };
            assert.deepEqual(defaults,barchart.settings);
        });
    })
});