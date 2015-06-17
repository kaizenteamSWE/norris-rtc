/*
 * Name: MapChartMovieUpdater.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel
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
 * v0.08 2015-06-02 Dal Bianco Davide   Verify
 * ================================================================================
 * v0.07 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
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
module.exports=MapChartMovieUpdater;

/**
 * Creates a new MapChartMovieUpdater.
 * @constructor
 */
function MapChartMovieUpdater() {
    if(!(this instanceof MapChartMovieUpdater)) return new MapChartMovieUpdater();
}

MapChartMovieUpdater.prototype.instance=new MapChartMovieUpdater(); // static

/**
 * Gets the MapChartMovieUpdater's instance.
 * @returns {MapChartMovieUpdater} the MapChartMovieUpdater's instance.
 */
MapChartMovieUpdater.getInstance = function() { // static
    return MapChartMovieUpdater.prototype.instance;
};

/**
 * Updates a map chart with movie method. The map chart data should not be empty.
 * @param {MapChartImpl} chart - the map chart to update;
 * @param updateData - the updating.
 */
MapChartMovieUpdater.prototype.update = function (chart, updateData) {
    var isEmpty=function(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };

    if (!isEmpty(updateData)) {
        var data=chart.getData();
        if (!isEmpty(data)) {
            /* In place: */
            if (updateData.hasOwnProperty('inplace')) {
                for(var i=0; i<updateData.inplace.length; i++) {
                    var series=updateData.inplace[i].position.series;
                    var index=updateData.inplace[i].position.index;
                    data.datasets[series].values[index].x=updateData.inplace[i].data.x;
                    data.datasets[series].values[index].y=updateData.inplace[i].data.y;
                }
            }
            /* Delete: */
            if (updateData.hasOwnProperty('delete')) {
                var index={};
                var update=[];
                var k=0;
                for (var j=0; j<data.datasets.length; j++) {
                    index[j]=[];
                    for (var i=0; i<updateData.delete.length; i++) {
                        if (j==updateData.delete[i].series) {
                            update[k]=updateData.delete[i];
                            k++;
                            index[j].push(updateData.delete[i].index);
                            //console.log("update.length: "+ update.length + " --- "+JSON.stringify(update));

                        }
                    }
                } /*the update array contains the element sorted by the series*/

                for(var serie in index) {
                    index[serie].sort(function(a,b){return a - b});
                }

                var offset=0;
                for(var serie in index) {
                    for (var i=offset; i<index[serie].length; i++) {
                        update[i].index=index[serie][i];
                    }
                    offset=offset+index[serie].length;
                }

                for(var i=update.length-1; i>=0; i--) {
                    //console.log("update.length: "+ update.length + " --- "+JSON.stringify(update));
                    var series=update[i].series;
                    var index=update[i].index;
                    /*for (var k=i; k<updateData.delete; k++) {
                        if ( series== updateData.delete[k].series ){
                            updateData.delete[k].index--;
                        }
                    }*/
                    data.datasets[series].values[index]=null;
                    data.datasets[series].values = data.datasets[series].values.filter(function (e) {return e!=null;});
                }

            }
            /* Stream: */
            if (updateData.hasOwnProperty('stream')) {
                for(var i=0; i<updateData.stream.length; i++) {
                    var series=updateData.stream[i].series;
                    var val=updateData.stream[i].data;
                    data.datasets[series].values.push(val);
                    if (data.datasets[series].values.length > chart.getSettings().maxItems) {
                        data.datasets[series].values.shift();
                    }
                }
            }
            // validazione di data rispetto allo schema JSON
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("MapChartMovieUpdater:emptyChart");
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

 mapchart:movie:
 update = {
    inplace : [
        { position: {series:0, index:0}, data: {x:1, y:1} },
        { position: {series:0, index:1}, data: {x:2, y:2} }
    ], // modifico 2 valori già esistenti
    stream: [
        {series : 1, data : {x: 1, y: 2} },
        {series : 3, data: {x: 1, y: 3} }
    ],
    delete: [
        {series:0, index:0},
        {series:0, index:1},
        {series:0, index:3}
    ] // elimino 3 punti
 }

 series : 1, data {x: 1, y: 2}

*/

