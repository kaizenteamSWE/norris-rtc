var DataModel = require('./DataModel');
var InternalAPIManager = require('./InternalAPIManager');
var ExternalAPIManager = require('./ExternalAPIManager');

module.exports = function (server, app, settings) {
    var model = new DataModel(settings);
    var internalAPI = new InternalAPIManager(model);
    var externalAPI = ExternalAPIManager.getInstance().construct(model, server, app);
    return internalAPI;
};
