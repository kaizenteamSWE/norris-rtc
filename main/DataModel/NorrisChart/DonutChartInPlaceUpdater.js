/*
 * Name: DonutChartInPlaceUpdater.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
 * Date: 2015-09-04
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v0.01 2015-09-04 Bigarella Chiara   Creation
 * ================================================================================
 */
module.exports=DonutChartInPlaceUpdater;

/**
 * Creates a new DonutChartInPlaceUpdater.
 * @constructor
 */
function DonutChartInPlaceUpdater() {
    if(!(this instanceof DonutChartInPlaceUpdater)) return new DonutChartInPlaceUpdater();
}

DonutChartInPlaceUpdater.prototype.instance=new DonutChartInPlaceUpdater(); // static

/**
 * Gets the DonutChartInPlaceUpdater's instance.
 * @returns {DonutChartInPlaceUpdater} the DonutChartInPlaceUpdater's instance.
 */
DonutChartInPlaceUpdater.getInstance = function() { // static
    return DonutChartInPlaceUpdater.prototype.instance;
};

/**
 * Updates a donut chart with in place method. The donut chart data should not be empty.
 * @param {DonutChartImpl} chart - the donut chart to update;
 * @param updateData - the updating.
 */
DonutChartInPlaceUpdater.prototype.update = function (chart, updateData) {
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
                var name=update[i].name;
                for(var j=0; j<data.datasets.length; j++) {
                    if (data.datasets[j].name==name) {
                        data.datasets[j].value=update[i].newValue;
                    }
                }
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("DonutChartInPlaceUpdater:emptyChart");
        }
    }
};

/*
DonutChart:
data = {
    datasets: [
        {name: 'pippo', color : '', value: 1}, // serie1
        {name: 'pluto', color : '', value: 4}, // serie2
        {name: 'paperino', color : '', value: 9} // serie3
    ]
}

donutchart:inplace:
update = {
    inplace: [
        {name: 'paperino', newValue: 2},
        {name: 'pluto', newValue: 5}
    ] // modifico 2 valori già esistenti
}
*/
