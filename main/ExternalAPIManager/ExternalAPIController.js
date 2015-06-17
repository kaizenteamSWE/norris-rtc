/*
 * Name: ExternalAPIController.js
 * Module: ExternalAPIManager
 * Location: Norris/Main/ExternalAPIManager
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
 * v0.06 2015-06-02 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.05 2015-05-30 Bucco Riccardo   Edit 
 * ================================================================================
 * v0.04 2015-05-24 Carlon Chiara   Verify
 * ================================================================================
 * v0.03 2015-05-21 Pavanello Fabio Matteo   Edit
 * ================================================================================
 * v0.02 2015-04-14 Pavanello Fabio Matteo   Verify
 * ================================================================================
 * v0.01 2015-04-12 Moretto Alessandro   Creation
 * ================================================================================
 */
var NorrisImpl=require('../DataModel/NorrisImpl.js');
var ChartRef=require('./ChartRef.js');
var http=require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var events=require('events');
var express=require('express');

module.exports=ExternalAPIController;


/**
 * Creates a new ExternalAPIController.
 * @constructor
 * @param {NorrisImpl} model - a Norris' instance;
 * @param {http} server -
 * @param {String} endpoint -
 */
function ExternalAPIController(model, server, app) {
    if(!(this instanceof ExternalAPIController))
        return new ExternalAPIController(model, server, app);
    events.EventEmitter.call(this); //ExternalAPIController inherits from events.EventEmitter

    if(!model || !server || !app) {
        console.error("ERROR: some parameters are missing.");
        throw ('ExtrenalAPIController:missingParameters')
    }

    this.model = model;
    this.server = server;
    this.app = app;

    var endpoint = this.getEndpoint();

    this.app.use(function (req, res, next) {
        var hosts = model.getSettings().origins;
        hosts = hosts.join(', ');
        res.setHeader('Access-Control-Allow-Origin', hosts);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });
    this.app.use(endpoint, cookieParser(this.getSecret()));
    this.app.use(endpoint, bodyParser.urlencoded({extended: true}));
};

ExternalAPIController.prototype.__proto__=events.EventEmitter.prototype;


/**
 * Performs Norris' login.
 * @param {} cookies
 * @param {String} username
 * @param {String} password
 * @return {boolean}
 */
ExternalAPIController.prototype.performLogin= function(cookies , username, password) {
    var settings=this.model.getSettings();
    var login=settings.login(cookies, username, password);
    return login;
};

/**
* Performs Norris' logout.
* @param {} cookies
* @return {boolean}
*/
ExternalAPIController.prototype.performLogout= function(cookies) {
    var settings=this.model.getSettings();
    var logout=settings.logout(cookies);
    return logout;
};

/**
 * Performs Norris' keepAlive.
 * @param {} cookies
 * @return {boolean}
 */
ExternalAPIController.prototype.performKeepAlive= function(cookies) {
    var settings=this.model.getSettings();
    var keepAlive=settings.keepAlive(cookies);
    return keepAlive;
};

/**
 * Performs Norris' isLogged.
 * @param {} cookies
 * @return {boolean}
 */
ExternalAPIController.prototype.isLogged= function(cookies) {
    var settings=this.model.getSettings();
    var isLogged=settings.isLogged(cookies);
    return isLogged;
};


/**
 * Gets the list of chart in the represented Norris' instance
 * @return {ChartRef[]}
 */
ExternalAPIController.prototype.getCharts= function() {
    var chartR=[];
    var charts=this.model.getCharts();
    for (var key in charts) {
        chartR.push(new ChartRef(charts[key]));
    }
    return chartR;
};

/**
 * Gets the chart with the indicated id in the represented Norris' instance
 * @param {String} chartId
 * @returns {ChartRef}
 */
ExternalAPIController.prototype.getChart = function(chartId) {
    var chart=this.model.getChart(chartId);
    var chartR=new ChartRef(chart);
    return chartR;
};

/**
 * Gets the server.
 * @returns {http}
 */
ExternalAPIController.prototype.getServer = function() {
    return this.server;
};

/**
 * Gets the endpoint.
 * @returns {String}
 */
ExternalAPIController.prototype.getEndpoint = function() {
    return this.model.getSettings().endpoint;
};

/**
 * Gets the endpoint.
 * @returns {String}
 */
ExternalAPIController.prototype.getSecret = function() {
    return this.model.getSettings().secret;
};

/**
 * Gets the Express app.
 * @returns {}
 */
ExternalAPIController.prototype.getApp = function() {
    return this.app;
};


