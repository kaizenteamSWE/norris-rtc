/*
 * Name: BarChartInPlaceUpdater.js
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
 * v0.08 2015-06-02 Bigarella Chiara   Verify
 * ================================================================================
 * v0.07 2015-05-30 Dal Bianco Davide   Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.04 2015-04-27 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.03 2015-04-25 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.02 2015-04-14 Bigarella Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */
module.exports=BarChartInPlaceUpdater;

/**
 * Creates a new BarChartInPlaceUpdater.
 * @constructor
 */
function BarChartInPlaceUpdater() {
    if(!(this instanceof BarChartInPlaceUpdater)) return new BarChartInPlaceUpdater();
}

BarChartInPlaceUpdater.prototype.instance=new BarChartInPlaceUpdater(); // static

/**
 * Gets the BarChartInPlaceUpdater's instance.
 * @returns {BarChartInPlaceUpdater} the BarChartInPlaceUpdater's instance.
 */
BarChartInPlaceUpdater.getInstance = function() { // static
    return BarChartInPlaceUpdater.prototype.instance;
};

/**
 * Updates a bar chart with in place method. The bar chart data should not be empty.
 * @param {BarChartImpl} chart - the bar chart to update;
 * @param updateData - the updating.
 */
BarChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
            throw ("BarChartPlaceInPlaceUpdater:emptyChart");
        }
    }
};

/*
BarChart:
data = {
    labels: ['2010','2011','2012','2013'], // asse indipendente
    datasets: [
        {name: 'pippo', color : '#aaaaaa', values: [1,2,3,4]}, // serie1
        {name: 'pluto', color : '#bbbbbb' , values: [1,2,3,4]}, // serie2
        {name: 'paperino', color : '#cccccc' , values: [1,2,3,4]}, // serie3
    ]
}

barchart:inplace:
update = {
    inplace: [
        { position: {x:0, y:0}, data='0' },
        { position: {x:0, y:1}, data='1' }
    ] // modifico 2 valori già esistenti
}
*/
