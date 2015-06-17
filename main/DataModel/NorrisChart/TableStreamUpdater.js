/*
 * Name: TableStreamUpdater.js
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
 * v0.08 2015-06-02 Pavanello Fabio Matteo  Verify
 * ================================================================================
 * v0.07 2015-05-30 Dal Bianco Davide   Edit
 * ================================================================================
 * v0.06 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.05 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.04 2015-04-27 Bigarella Chiara   Verify
 * ================================================================================
 * v0.03 2015-04-25 Bucco Riccardo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Carlon Chiara   Verify
 * ================================================================================
 * v0.01 2015-04-10 Pavanello Fabio Matteo   Creation
 * ================================================================================
 */
module.exports=TableStreamUpdater;

/**
 * Creates a new TableStreamUpdater.
 * @constructor
 */
function TableStreamUpdater() {
    if(!(this instanceof TableStreamUpdater)) return new TableStreamUpdater();
}

TableStreamUpdater.prototype.instance=new TableStreamUpdater(); // static

/**
 * Gets the TableStreamUpdater's instance.
 * @returns {TableStreamUpdater} the TableStreamUpdater's instance.
 */
TableStreamUpdater.getInstance = function() { // static
    return TableStreamUpdater.prototype.instance;
};

/**
 * Updates a table with stream method. The table data should not be empty.
 * @param {TableImpl} chart - the table to update;
 * @param updateData - the updating.
 */
TableStreamUpdater.prototype.update = function (chart, updateData) {
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
        var newLinePosition=chart.getSettings().newLinePosition;
        if (!isEmpty(data)) {
            for(var i=0; i<update.length; i++) {
                if (update[i].row.length==data.headers.length) {
                    if(newLinePosition=='bottom') {
                        data.datasets.push(update[i]);
                        if (data.datasets.length>chart.getSettings().maxItems) {
                            data.datasets.shift();
                        }
                    }
                    else {
                        data.datasets.unshift(update[i]); /* inserts in top */
                        if (data.datasets.length>chart.getSettings().maxItems) {
                            data.datasets.pop();
                        }
                    }

                }
                else {
                    console.error("ERROR: wrong updating data.");
                    throw ("TableStreamUpdater:wrongUpdateData");
                }
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("TableStreamUpdater:emptyChart");
        }
    }
};

/*

Table:
 data = {
    headers: ['anno','mese','giorno'], // intestazioni colonne
    datasets: [
        { row: [ 
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'}
        ]}, // riga1
        { row: [ 
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'}
        ]} // riga2
    ]
 }

table:stream:
update = {
    stream: [
        { row: [ 
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'}
        ]}, // riga1
        { row: [ 
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'},
            {color : '#000000', background : '#fffffff', value: '1'}
        ]} // riga2
    ] // aggiungo 2 righe nella posizione indicata nelle impostazioni (in testa o in coda)
}
*/
