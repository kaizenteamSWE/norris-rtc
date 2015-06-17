/*
 * Name: TINorrisDataModel.js
 * Module: 
 * Location: Norris/test/integration
 * Date: 2015-05-25
 * Version: v1.00
 *
 * History:
 *
 * ================================================================================
 * Version Date Programmer Changes
 * ================================================================================
 * v1.00 2015-06-15 Carlon Chiara Approved
 * ================================================================================
 * v0.02 2015-06-03 Bigarella Chiara Verify 
 * ================================================================================
 * v0.01 2015-05-25 Bucco Riccardo Creation
 * ================================================================================
 */
var http = require('http');
var express = require('express');
var norris = require('../../main');

var assert = require("assert");


describe('Norris',function(){

    var app = express();
    var server = http.createServer(app);

    var nor = norris(server, app);

    server.listen(process.env.PORT || 9000);

    var bc = nor.createChart('barchart', 'bc');
    var lc = nor.createChart('linechart', 'lc');
    var mc = nor.createChart('mapchart', 'mc');
    var t = nor.createChart('table', 't');


    var page = nor.createPage('page');
    page.add(bc).add(lc).add(mc).add(t);

    bc.setData({
        labels: ['1','2','3','4','5'],
        datasets: [
            {name: 'pippo', color: '#123456', values: [1,2,3,4,5]},
            {name: 'pluto', color: '#af1242', values: [1,2,0,4,5]},
            {name: 'paperino', color: '#987406', values: [1,2,3,4,5]}
        ]
    });
    bc.setSettings({title:'Titolo', style: {barArea: '80%', showGrid: true, maxValue: 10, minValue: 0}})


    lc.setData({
        labels: ['1','2','3','4','5'],
        datasets: [
            {name: 'pippo', color: '#658203', values: [1,2,3,4,5]},
            {name: 'pluto', color: '#537294', values: [1,2,0,4,5]},
            {name: 'paperino', color: '#847563', values: [1,2,3,4,5]}
        ]
    });
    lc.setSettings({title:'Titolo',xLabel: 'xLabel', yLabel: 'yLabel', legendPosition: 'top', style: {showGrid: true, maxValue: 10, minValue: 0}})


    mc.setData({ datasets: [
        {name: 'pippo', color : '#37ab35', values: [{x:0, y:1}, {x:0, y:2}, {x:0, y:3}, {x:0, y:4}]},
        {name: 'pluto', color : '#7abe34', values: [{x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0}]}
    ]});
    mc.setSettings({allowFilter: true});

    t.setData({
        headers: ['pippo','pluto','paperino'],
        datasets: [
            { row: [
                {color: '#112233', background: '#acbdef', value: 'foo'},
                {color: '#ffffff', background: '#aaccdd', value: 'bar'}, 
                {color: '#aabb44', background: '#6644ff', value: 'baz'}
            ]},
            { row: [
                {color: '#fffffa', background: '#1fffff', value: 'foo'},
                {color: '#ffffff', background: '#ccccaa', value: 'bar'}, 
                {color: '#bbeedd', background: '#aaccaa', value: 'baz'}
            ]}
        ]
    });

    var update = {
        inplace : [{
            position: {
                x: 2,
                y: 3
            },
            data: 8
    }]};
    bc.update('inplace', update);


    var update = {stream: [{
        label: 'example',
        data: [
            5,
            3,
            7
        ]
    }]};
    lc.update('stream', update);

    var update = {
        inplace: [],
        delete: [],
        stream: [
            {series: 0, data: {x: 50, y: 60}},
            {series: 1, data: {x: 13, y: 30}}
        ]
    };
    mc.update('movie', update);

    var update = {stream: [
        { row: [
            {color: '#ffcfff', value: 'foo654'}, 
            {color: '#43ff56', value: 'bar653'}, 
            {color: '#876352', value: 'baz475'}
        ]}
    ]};
    t.update('stream', update);

    it('should set and update a barchart properly', function () {
        var expected = {
            data: {
                    "datasets": [
                      {
                        "color": "#123456",
                        "name": "pippo",
                        "values": [1,2,3,4,5]
                      },
                      {
                        "color": "#af1242",
                        "name": "pluto",
                        "values": [1,2,0,4,5]
                      },
                      {
                        "color": "#987406",
                        "name": "paperino",
                        "values": [1,2,3,8,5]
                      },
                    ],
                    "labels": ["1","2","3","4","5"]
            },
            settings: {
                    "description": "This is a bar chart.",
                    "legendPosition": "right",
                    "orientation": "vertical",
                    "style": {
                      "animationDuration": 1000,
                      "barArea": "80%",
                      "maxValue": 10,
                      "minValue": 0,
                      "showGrid": true,
                    },
                    "title": "Titolo",
                    "xLabel": "",
                    "yLabel": ""
            },
            type: 'barchart',
            id: 'bc'
        };

        assert.deepEqual(expected.id, bc.getId());
        assert.deepEqual(expected.type, bc.getType());
        assert.deepEqual(expected.data, bc.getData());
        assert.deepEqual(expected.settings, bc.getSettings());
    });

    it('should set and update a linechart properly', function () {
        var expected = {
            data: {
                    "datasets": [
                      {
                        "color": "#658203",
                        "name": "pippo",
                        "values": [1,2,3,4,5,5]
                      },
                      {
                        "color": "#537294",
                        "name": "pluto",
                        "values": [1,2,0,4,5,3]
                      },
                      {
                        "color": "#847563",
                        "name": "paperino",
                        "values": [1,2,3,4,5,7]
                      },
                    ],
                    "labels": ["1","2","3","4","5","example"]
            },
            settings: {
                    "description": "This is a line chart.",
                    "legendPosition": "top",
                    "maxItems": 10,
                    "style": {
                      "animationDuration": 1000,
                      "pointDotSize": 0,
                      "bezierCurve": true,
                      "maxValue": 10,
                      "minValue": 0,
                      "showGrid": true,
                    },
                    "title": "Titolo",
                    "xLabel": "xLabel",
                    "yLabel": "yLabel"
            },
            type: 'linechart',
            id: 'lc'
        };

        assert.deepEqual(expected.id, lc.getId());
        assert.deepEqual(expected.type, lc.getType());
        assert.deepEqual(expected.data, lc.getData());
        assert.deepEqual(expected.settings, lc.getSettings());
    });

it('should set and update a mapchart properly', function () {
        var expected = {
            data: {
                    "datasets": [
                      {
                        "color": "#37ab35",
                        "name": "pippo",
                        "values": [
                            {"x": 0, "y": 1},
                            {"x": 0, "y": 2},
                            {"x": 0, "y": 3},
                            {"x": 0, "y": 4},
                            {"x": 50, "y": 60}
                        ]
                      },
                      {
                        "color": "#7abe34",
                        "name": "pluto",
                        "values": [
                            {"x": 1, "y": 0},
                            {"x": 2, "y": 0},
                            {"x": 3, "y": 0},
                            {"x": 4, "y": 0},
                            {"x": 13, "y": 30}

                        ]
                      }
                    ]
            },
            settings: {
                    "description": "This is a map chart",
                    "legendPosition": "topright",
                    "scalePosition": "bottomleft",
                    "zoomPosition": "topleft",
                    "allowFilter": true,
                    "maxItems": 5,
                    "area": {
                        "x": 0,
                        "y": 0,
                        "zoom": 1
                    },
                    "title": ""
            },
            type: 'mapchart',
            id: 'mc'
        };

        assert.deepEqual(expected.id, mc.getId());
        assert.deepEqual(expected.type, mc.getType());
        assert.deepEqual(expected.data, mc.getData());
        assert.deepEqual(expected.settings, mc.getSettings());
    });

    it('should set and update a table properly', function () {
        var expected = {
            data: {
                    "headers": [
                        "pippo",
                        "pluto",
                        "paperino"
                    ],
                    "datasets": [
                      {
                        "row": [
                          {
                            "background": "#acbdef",
                            "color": "#112233",
                            "value": "foo"
                          },
                          {
                            "background": "#aaccdd",
                            "color": "#ffffff",
                            "value": "bar"
                          },
                          {
                            "background": "#6644ff",
                            "color": "#aabb44",
                            "value": "baz"
                          }
                        ]
                      },
                      {
                        "row": [
                          {
                            "background": "#1fffff",
                            "color": "#fffffa",
                            "value": "foo"
                          },
                          {
                            "background": "#ccccaa",
                            "color": "#ffffff",
                            "value": "bar"
                          },
                          {
                            "background": "#aaccaa",
                            "color": "#bbeedd",
                            "value": "baz"
                          }
                        ]
                      },
                      {
                        "row": [
                          {
                            "color": "#ffcfff",
                            "value": "foo654"
                          },
                          {
                            "color": "#43ff56",
                            "value": "bar653"
                          },
                          {
                            "color": "#876352",
                            "value": "baz475"
                          }
                        ]
                      }
                    ]
            },
            settings: {
                    "description": "This is a table.",
                    "allowFilter": false,
                    "pageSize": -1,
                    "allowSort": false,
                    "showTableGrid": true,
                    "newLinePosition": "bottom",
                    "maxItems": 10,
                    "title": ""
            },
            type: 'table',
            id: 't'
        };

        assert.deepEqual(expected.id, t.getId());
        assert.deepEqual(expected.type, t.getType());
        assert.deepEqual(expected.data, t.getData());
        assert.deepEqual(expected.settings, t.getSettings());
    });

    it('should set a page properly', function () {
        var settings = {
            "title": "Norris's page",
            "maxChartsRow": 2,
            "maxChartsCol": 3
        };


        assert.deepEqual(settings, page.getSettings());
        assert.deepEqual([bc,lc,mc,t], page.getCharts())
    });


});