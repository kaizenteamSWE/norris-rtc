/*
 * Name: TableInPlaceUpdater.js
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
 * v0.08 2015-06-02 Bucco Riccardo   Verify
 * ================================================================================
 * v0.07 2015-05-30 Carlon Chiara  Edit 
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
 * v0.01 2015-04-10 Carlon Chiara   Creation
 * ================================================================================
 */
module.exports=TableInPlaceUpdater;

/**
 * Creates a new TableInPlaceUpdater.
 * @constructor
 */
function TableInPlaceUpdater() {
    if(!(this instanceof TableInPlaceUpdater)) return new TableInPlaceUpdater();
}

TableInPlaceUpdater.prototype.instance=new TableInPlaceUpdater(); // static

/**
 * Gets the TableInPlaceUpdater's instance.
 * @returns {MapChartInPlaceUpdater} the TableInPlaceUpdater's instance.
 */
TableInPlaceUpdater.getInstance = function() { // static
    return TableInPlaceUpdater.prototype.instance;
};

/**
 * Updates a table with in place method. The table data should not be empty.
 * @param {TableImpl} chart - the table to update;
 * @param updateData - the updating.
 */
TableInPlaceUpdater.prototype.update = function (chart, updateData) {
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
                data.datasets[x].row[y].color=update[i].data.color;
                data.datasets[x].row[y].background=update[i].data.background;
                data.datasets[x].row[y].value=update[i].data.value;
            }
            chart.setData(data);
        }
        else {
            console.error("ERROR: the chart has no data to update.");
            throw ("TableInPlaceUpdater:emptyChart");
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

 table:inplace:
 update = {
    inplace: [
        { position: {x:0, y:0}, data: {color: '#000000', background: '#fffffff', value:'1'} },
        { position: {x:0, y:1}, data: {color: '#000000', background: '#fffffff', value:'1'} }
    ] // modifico 2 valori già esistenti
 }
 

*/
