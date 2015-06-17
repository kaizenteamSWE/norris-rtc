/*
 * Name: MapChartInPlaceUpdater.js
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
 * v0.08 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bigarella Chiara   Edit 
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bucco Riccardo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */
module.exports=MapChartInPlaceUpdater;

/**
 * Creates a new MapChartInPlaceUpdater.
 * @constructor
 */
function MapChartInPlaceUpdater() {
    if(!(this instanceof MapChartInPlaceUpdater)) return new MapChartInPlaceUpdater();
}

MapChartInPlaceUpdater.prototype.instance=new MapChartInPlaceUpdater(); // static

/**
 * Gets the MapChartInPlaceUpdater's instance.
 * @returns {MapChartInPlaceUpdater} the MapChartInPlaceUpdater's instance.
 */
MapChartInPlaceUpdater.getInstance = function() { // static
    return MapChartInPlaceUpdater.prototype.instance;
};

/**
 * Updates a map chart with in place method. The map chart data should not be empty.
 * @param {MapChartImpl} chart - the map chart to update;
 * @param updateData - the updating.
 */
MapChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
                var series=update[i].position.series;
                var index=update[i].position.index;
                data.datasets[series].values[index].x=update[i].data.x;
                data.datasets[series].values[index].y=update[i].data.y;
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("MapChartInPlaceUpdater:emptyChart");
        }
    }
};

/*

 MapChart:
 data = {datasets: [
    {name: 'pippo', marker: '', color : '#FF00FF', values: [{x:1, y:1}, {x:1, y:1}, {x:1, y:1}, {x:1, y:1}]}, // serie1
    {name: 'pluto', marker: '', color : '#FF0000', values: [{x:1, y:1}, {x:1, y:1}, {x:1, y:1}, {x:1, y:1}]}, // serie2
    {name: 'paperino', marker: '', color : '#0000FF', values: [{x:1, y:1}, {x:1, y:1}, {x:1, y:1}, {x:1, y:1}]} // serie3
 ]}

 mapchart:inplace:
 update = {
    inplace = [
        { position: {series:0, index:0}, data: {x:1, y:1} },
        { position: {series:0, index:1}, data: {x:1, y:1} }
    ] // modifico 2 valori già esistenti
 }
 */
