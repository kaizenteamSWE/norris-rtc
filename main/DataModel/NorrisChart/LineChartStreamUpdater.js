/*
 * Name: LineChartStreamUpdater.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
 * Date: 2015-04-10
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-01 Dal Bianco Davide   Verify
 * ================================================================================
 * v0.07 2015-05-28 Bigarella Chiara   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bigarella Chiara   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ===============================================================================
 */
module.exports=LineChartStreamUpdater;

/**
 * Creates a new LineChartStreamUpdater.
 * @constructor
 */
function LineChartStreamUpdater() {
    if(!(this instanceof LineChartStreamUpdater)) return new LineChartStreamUpdater();
}

LineChartStreamUpdater.prototype.instance=new LineChartStreamUpdater(); // static

/**
 * Gets the LineChartStreamUpdater's instance.
 * @returns {LineChartStreamUpdater} the LineChartStreamUpdater's instance.
 */
LineChartStreamUpdater.getInstance = function() { // static
    return LineChartStreamUpdater.prototype.instance;
};

/**
 * Updates a line chart with stream method. The line chart data should not be empty.
 * @param {LineChartImpl} chart - the line chart to update;
 * @param updateData - the updating.
 */
LineChartStreamUpdater.prototype.update = function (chart, updateData) {
    var isEmpty=function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    if (!isEmpty(updateData)) {
        var data=chart.getData();
        var update=updateData['stream'];
        if (!isEmpty(data)) {
            for(var i=0; i<update.length; i++) {
                if (update[i].data.length==data.datasets.length) {
                    for(var k=0; k<data.datasets.length; k++) {
                        data.datasets[k].values.push(update[i].data[k]);
                        if (data.datasets[k].values.length>chart.getSettings().maxItems) {
                            data.datasets[k].values.shift();
                        }
                    }
                    data.labels.push(update[i].label);
                    if (data.labels.length>chart.getSettings().maxItems) {
                        data.labels.shift();
                    }

                }
                else {
                    console.error("ERROR: wrong updating data.");
                    throw ("LineChartStreamUpdater:wrongUpdatingData");
                }
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("LineChartStreamUpdater:emptyChart");
        }
    }
};

/*
 data = {
    labels: ['2010','2011','2012','2013'], // asse indipendente
    datasets: [
        {name: 'pippo', color : '#aaaaaa', values: [1,2,3,4]}, // linea1
        {name: 'pluto', color : '#bbbbbb', values: [1,2,3,4]}, // linea2
        {name: 'paperino', color : '#cccccc' , values: [1,2,3,4]} // linea3
    ]
 }

 linechart:stream
 update = {
    stream: [
        {label: 'foo', data: [1,2,3,4,5]},
        {label: 'bar', data: [1,2,3,4,5]}
    ] // aggiungo 2 valori indipendenti con i rispettivi valori dipendenti per ogni linea
 }
*/
