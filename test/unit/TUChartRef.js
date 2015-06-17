/*
 * Name: TUChartRef.js
 * Module: 
 * Location: Norris/test/unit
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
 * v0.02 2015-06-02 Pavanello Fabio Matteo Verify
 * ================================================================================
 * v0.01 2015-05-26 Bigarella Chiara Creation
 * ================================================================================
 */
 
var ChartRef = require('../../main/ExternalAPIManager/ChartRef.js');
var BarChartImpl = require('../../main/DataModel/NorrisChart/BarChartImpl.js');
var assert = require("assert");

describe('ChartRef(chart: ChartImpl)', function(){

    describe('getId() : String', function(){
        it('should get the right ID of the chart', function(){
            var barchart = new BarChartImpl('randomID');
            var chart = new ChartRef(barchart);
		    assert.equal('randomID', chart.getId());
        });
    });
    
    describe('getType() : String', function(){
        it('should get the right type of the chart', function(){
            var barchart = new BarChartImpl('randomID');
            var chart = new ChartRef(barchart);
		    assert.equal('barchart', chart.getType());
        });
    });
    
    describe('getData() : ChartData', function(){
        it('should get the right data of the chart', function(){
			var data = {
                labels: ['1','2','3','4','5'],
                datasets: [
                    {name: 'pippo', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,3,4,5]},
                    {name: 'pluto', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,0,4,5]},
                    {name: 'paperino', color: "#"+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9), values: [1,2,3,4,5]}
                ]
            };
            var barchart = new BarChartImpl('randomID');
            barchart.setData(data);
            var chart = new ChartRef(barchart);
		    assert.deepEqual(data, chart.getData());
        });
    });
    
    describe('getSettings() : ChartSettings', function(){
         it('should get the right settings of the chart', function(){
            var barchart = new BarChartImpl('randomID');
            var chart = new ChartRef(barchart);
	    var defaults = {
		    title : '',
	            description : 'This is a bar chart.',
	            xLabel : '',
	            yLabel : '',
		    style : {
			animationDuration : 1000,
			barArea : "60%",
			maxValue: null,
			minValue: null, 
			showGrid : false,
		    },
	            legendPosition : 'right',
	            orientation : 'vertical'
	    };
	    assert.deepEqual(defaults, chart.getSettings() );
        });
    
    });
});
