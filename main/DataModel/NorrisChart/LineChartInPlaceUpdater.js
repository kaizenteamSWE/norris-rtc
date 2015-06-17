/*
 * Name: LineChartInPlaceUpdater.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
 * Date: 2015-04-12
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Bigarella Chiara   Verify
 * ================================================================================
 * v0.07 2015-05-29 Pavanello Fabio Matteo   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bigarella Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-12 Bucco Riccardo   Creation
 * ================================================================================
 */
module.exports=LineChartInPlaceUpdater;

/**
 * Creates a new LineChartInPlaceUpdater.
 * @constructor
 */
function LineChartInPlaceUpdater() {
    if(!(this instanceof LineChartInPlaceUpdater)) return new LineChartInPlaceUpdater();
}

LineChartInPlaceUpdater.prototype.instance=new LineChartInPlaceUpdater(); // static

/**
 * Gets the LineChartInPlaceUpdater's instance.
 * @returns {LineChartInPlaceUpdater} the LineChartInPlaceUpdater's instance.
 */
LineChartInPlaceUpdater.getInstance = function() { // static
    return LineChartInPlaceUpdater.prototype.instance;
};

/**
 * Updates a line chart with in place method. The line chart data should not be empty.
 * @param {LineChartImpl} chart - the line chart to update;
 * @param updateData - the updating.
 */
LineChartInPlaceUpdater.prototype.update = function (chart, updateData) {
    var isEmpty=function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    if (!isEmpty(updateData)) {
        var data=chart.getData();
        var update=updateData['inplace'];
        if (!isEmpty(data)) {
            for(var i=0; i<update.length; i++) {
                var x=update[i].position.x;
                var y=update[i].position.y;
                data.datasets[x].values[y]=update[i].data;
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("LineChartInPlaceUpdater:emptyChart");
        }
    }
};

/*
 data = {
    labels: ['2010','2011','2012','2013'], // asse indipendente
    datasets: [
        {name: 'pippo', color : {r: 255, g: 255, b: 255}, values: [1,2,3,4]}, // linea1
        {name: 'pluto', color : {r: 255, g: 255, b: 255}, values: [1,2,3,4]}, // linea2
        {name: 'paperino', color : {r: 255, g: 255, b: 255}, values: [1,2,3,4]}, // linea3
    ]
 }

 linechart:inplace:
 update = {
    inplace = [
        { position: {x:0, y:0}, data='0' },
        { position: {x:0, y:1}, data='1' }
    ] // modifico 2 valori già esistenti
 }
    
*/