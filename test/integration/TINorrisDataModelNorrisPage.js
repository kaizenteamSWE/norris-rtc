/*
 * Name: TINorrisDataModelNorrisPage.js
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
 * v0.02 2015-06-03 Bigarella Chiara Verify 
 * ================================================================================
 * v0.01 2015-05-25 Dal Bianco Davide Creation
 * ================================================================================
 */

var PageImpl = require('../../main/DataModel/NorrisPage/PageImpl.js');
var ChartImpl = require('../../main/DataModel/NorrisChart/ChartImpl.js');

var assert = require("assert");

describe('Norris::DataModel::NorrisPage',function(){
    
    it('should add charts properly', function () {
        var bc = ChartImpl.createChart('barchart', 'bc1');
        var lc = ChartImpl.createChart('linechart', 'lc1');
        var mc = ChartImpl.createChart('mapchart', 'mc1');
        var t = ChartImpl.createChart('table', 't1');

        var page = new PageImpl('ppp');

        page.add(bc).add(lc).add(t).add(mc);

        assert.deepEqual(page.charts, [bc,lc,t,mc]);
    });

    it('should remove charts properly', function () {
        var bc = ChartImpl.createChart('barchart', 'bc1');
        var lc = ChartImpl.createChart('linechart', 'lc1');
        var mc = ChartImpl.createChart('mapchart', 'mc1');
        var t = ChartImpl.createChart('table', 't1');

        var page = new PageImpl('ppp');

        page.charts = [bc,lc,t,mc];
        page.clearCharts();

        assert.deepEqual(page.charts, []);
    });

    it('should get charts properly', function () {
        var bc = ChartImpl.createChart('barchart', 'bc1');
        var lc = ChartImpl.createChart('linechart', 'lc1');
        var mc = ChartImpl.createChart('mapchart', 'mc1');
        var t = ChartImpl.createChart('table', 't1');

        var page = new PageImpl('ppp');

        page.charts = [bc,lc,t,mc];

        assert.deepEqual(page.getCharts(), [bc,lc,t,mc]);
    });

});