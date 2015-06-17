/*
 * Name: TSPageImpl.js
 * Module: 
 * Location: Norris/test/strength
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
 * v0.01 2015-05-25 Pavanello Fabio Matteo Creation
 * ================================================================================
 */

var assert = require("assert");
var PageImpl = require('../../main/DataModel/NorrisPage/PageImpl.js');
var NorrisChart = require('../../main/DataModel/NorrisChart');

describe('PageImpl',function(){
	describe('add(chart: NorrisChart): void',function(){
		it('should refuse the addition of a chart because it is not indicated an NorrisChart object as parameter',function(){
			var chart = 'this is a stub';
			
			var page = new PageImpl(01);
			
			assert.throws(function(){page.add(chart)});
		});
	});
	
	describe('add(chart: NorrisChart): void',function(){
		it('should refuse the addition of a chart because it is reached the maximum number of chart in the page',function(){
			NorrisImpl = function (endpoint) {
				if (!(this instanceof NorrisImpl)) return new NorrisImpl();
				if (endpoint != undefined) {
					this.endpoint=endpoint;
					this.settings = {};
					this.charts = {};
					this.pages = {};
				}
			};
			NorrisImpl.prototype.createChart = function(chartType, chartId) {
				if (!this.charts.hasOwnProperty(chartId)) {     
					var chart = NorrisChart.createChart(chartType, chartId);
					if (chart != null) {
						this.charts[chartId] = chart;
					}
					return chart;
				}
				else {
					throw("NorrisImpl:IDAlreadyUsed");
				}
			};
			
			var norris = new NorrisImpl('endpoint');
			var chart1 = norris.createChart('barchart','01');
			var chart2 = norris.createChart('barchart','02');
			
			var page = new PageImpl(01);
			page.setSettings({maxChartsRow: 1, maxChartsCol:1 });
			page.add(chart1);
			
			assert.throws(function(){page.add(chart2)});
		});
	});

});
