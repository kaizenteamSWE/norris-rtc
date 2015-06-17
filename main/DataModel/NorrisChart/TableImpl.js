/*
 * Name: TableImpl.js
 * Module: DataModel/NorrisChart
 * Location: Norris/Main/DataModel/NorrisChart
 * Date: 2015-04-10
 * Version: v1.00
 *
 * History:
 *
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara  Approved
 * ================================================================================
 * v0.08 2015-06-02 Bigarella Chiara   Verify
 * ================================================================================
 * v0.07 2015-05-30 Pavanello Fabio Matteo  Edit 
 * ================================================================================
 * v0.06 2015-05-21 Bigarella Chiara   Verify
 * ================================================================================
 * v0.05 2015-04-25 Dal Bianco Davide   Edit
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

var ChartImpl = require('./ChartImpl.js');
var TableInPlaceUpdater = require('./TableInPlaceUpdater.js');
var TableStreamUpdater = require('./TableStreamUpdater.js');

module.exports = TableImpl;

var defaults = {
    description : 'This is a table.',
    maxItems : 10 ,
    showTableGrid : true ,
    newLinePosition : 'bottom',
    allowFilter: false,
    allowSort: false,
    pageSize: -1
};

/**
 * Creates a new table.
 * @constructor
 * @param {String} id - the table's id.
 */
function TableImpl (id) {
    if (!(this instanceof TableImpl)) return new TableImpl(uid);
    ChartImpl.call(this, 'table',id);
    for(var key in defaults) {
        this.settings[key] = defaults[key];
    }
}

TableImpl.prototype.__proto__ = ChartImpl.prototype;

/* TableFactory ------------------------------------------------------- */

/**
 * Creates a new table factory.
 * @constructor
 */
function TableFactory() {
    if(!(this instanceof TableFactory)) return new TableFactory();
}

TableFactory.prototype.instance=new TableFactory(); // static

/**
 * Gets the TableFactory's instance.
 * @returns {TableFactory} the factory's instance.
 */
TableFactory.getInstance = function() { // static
    return TableFactory.prototype.instance;
};

/**
 * Creates a new table.
 * @param {String} id - the table's id;
 * @returns {BarChartImpl} - the created table.
 */
TableFactory.prototype.createChart = function (id) {
    return new TableImpl(id);
};

//Dependency injection:
ChartImpl.registerFactory('table' , TableFactory.getInstance());
ChartImpl.registerUpdater('table:inplace', TableInPlaceUpdater.getInstance() );
ChartImpl.registerUpdater('table:stream', TableStreamUpdater.getInstance() );

