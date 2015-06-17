/*
 * Name: TUChartBridge.js
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
 * v0.01 2015-05-25 Bigarella Chiara Creation
 * ================================================================================
 */
var ChartBridge = require('../../main/InternalAPIManager/ChartBridge.js');
var assert = require("assert");

describe('ChartBridge', function(){

	describe('ChartBridge(chart): ChartBridge',function(){
		it('should return the data object of the chart bridge',function(){
			var jsontest={'randomKey1':'randomValue1', 'randomKey2':'randomValue2'}
			var charttest = new ChartBridge(jsontest)
			assert.deepEqual(jsontest, charttest.chart);
		});
	});

	describe('getChartModel(): ChartBridge',function(){
		it('should Returns the instance of the represented chart.',function(){
			var chart={dsds:"wefwe"}
			var bridge = new ChartBridge(chart);
			assert.deepEqual(bridge.chart,bridge.getChartModel());
		});
	});

	describe('getId(): String',function(){
		it('should Return the chart s id.',function(){
			var chart={}
			chart.getId=function(){
				return "done"
			}
			var bridge = new ChartBridge(chart);
			assert.deepEqual("done",bridge.getId());
		});
	});

	describe('getType(): String',function(){
		it('should Return the chart s type.',function(){
			var chart={}
			chart.getType=function(){
				return "done"
			}
			var bridge = new ChartBridge(chart);
			assert.deepEqual("done",bridge.getType());
		});
	});

	describe('getData(): String',function(){
		it('should Return the chart s data.',function(){
			var chart={}
			chart.getData=function(){
				return "done"
			}
			var bridge = new ChartBridge(chart);
			assert.deepEqual("done",bridge.getData());
		});
	});

	describe('getSettings(): String',function(){
		it('should Return the chart s settings.',function(){
			var chart={}
			chart.getSettings=function(){
				return "done"
			}
			var bridge = new ChartBridge(chart);
			assert.deepEqual("done",bridge.getSettings());
		});
	});

	describe('setData(data)',function(){
		it('should Sets the chart s data.',function(){
			var chart={ data: "notDone" }
			chart.setData=function(par){
				this.data=par
			}
			var bridge = new ChartBridge(chart);
			bridge.setData("done")
			assert.deepEqual("done",chart.data);
		});
	});

	describe('setSettings()',function(){
		it('should Sets the chart s settings.',function(){
			var chart={ settings: "notDone" }
			chart.setData=function(par){
				this.settings=par
			}
			var bridge = new ChartBridge(chart);
			bridge.setData("done")
			assert.deepEqual("done",chart.settings);
		});
	});
});