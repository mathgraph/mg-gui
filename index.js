require.config({
    baseUrl: './',
    paths: {
        'jquery': './bower_components/jquery/dist/jquery',
        'text': './bower_components/text/text'
    },
    packages: [
        {
            name: 'mg-gui',
            location: './src',
            main: 'mg-gui'
        },
        {
            name: 'dat',
            location: './bower_components/dat-gui/src/dat',
            main: 'gui/GUI'
        }
    ]
});

define(['jquery', 'mg-gui'], function ($, helpers) {
    var hint = helpers.hint;
//    $(function () {
//        $(document).click(function (event) {
//            hint.off();
//            var pos = {x: event.pageX, y: event.pageY};
//            hint.data = pos;
//            hint.on(pos);
//        });
//    });
//    var additional = helpers.additional;
    var example = {
        start_position : {
            x: 0,
            y: 0
        },
        fields: [
            {folder_name:"12345",
                fields: [
                    { name: 'txt',
                        type: 'text',
//                        value: 1,
                        change: function (value) {console.log(value)},
                        init: function () {console.log(1234)}
                    },
                    { name:'sld',
                        type:'slider',
//                        value: 2,
                        min_value: 3,
                        max_value: 5,
                        step : 1,
                        change: function(value){console.log(value)}
                    }]
            },
            { name:'sm',
                type:'select',
//                value: 'ccc',
                content: ['aaa', 'bbb', 'ccc'],
                init: function () {console.log(12356454)},
                change: function(value){console.log(value)}
            },
            { name:'cb',
                type:'checkbox',
//                value: true,
                change: function(value){console.log(value)}
            },
            { name:'col',
                type:'color',
//                value: "#ffae23",
                change: function(value){console.log(value)}
            }
        ]
    };
    var example_slider = {
        start_position : {
            x: 0,
            y: 0
        },
        fields: [
            { name:'sld',
                type:'slider',
                value: 2,
                min_value: 0,
                max_value: 4,
                step : 1,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                max_value: 4,
                step : 1,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                min_value: 0,
                step : 1,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                min_value: 0,
                max_value: 4,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                min_value: 0,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                max_value: 4,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                step : 1,
                change: function(value){console.log(value)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                change: function(value){console.log(value)}
            }
        ]
    };
    var example_tool = {
        fields: [
            {   type: 'button',
                //icon: './src/images/1.png',
                icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                select: function(){console.log(1)}
            },
            {   type: 'button',
                //icon: './src/images/2.png',
                icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                select: function(){console.log(2)}
            },
            {   type: 'selectable',
                //icon: './src/images/3.png',
                icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                select: function(){console.log(75)},
                unselect: function(){console.log(70)},
                group_name: "group2"
            },
            {   type: 'selectable',
                //icon: './src/images/3.png',
                icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                select: function(){console.log(3)},
                unselect: function(){console.log(4)},
                group_name: "group1"
            },
            {   type: 'menu',
                //icon: './src/images/4.png',
                icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                fields:[
                    {   type: 'button',
                        //icon: './src/images/5.png',
                        icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                        select: function(){console.log(5)}
                    },
                    {   type: 'button',
                        //icon: './src/images/6.png',
                        icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                        select: function(){console.log(6)}
                    },
                    {   type: 'selectable',
                        group_name: "group1",
                        //icon: './src/images/7.png',
                        icon: 'http://dummyimage.com/30x30/ff0026/fff.png&text=A',
                        select: function(){console.log(7)},
                        unselect: function(){console.log(8)}
                    }
                ]

            }
        ]
    };
    var  example_tool_2 = {
        fields: [
            {id: 1,
                type: 'button',
                icon: './src/images/1.png',
                callback: function(){console.log(1)}
            },
            {id: 2,
                type: 'button',
                icon: './src/images/2.png',
                callback: function(){console.log(2)}
            },
            {id: 3,
                type: 'selectable',
                icon: './src/images/3.png',
                callback: function(){console.log(3)},
                callback_disable: function(){console.log(4)}
            }
        ]
    };

    var example_popup = {
        fields:[
            {
                type: 'input',
                group: [{
                    id: 1,
                    label: 'aaa',
                    value: "bbb"
                },{
                    id: 2,
                    label: 'ccc',
                    value: "ddd"
                },{
                    id: 3,
                    label: 'eee',
                    value: "fff"
                }]
            },
            {
                type: 'checkbox',
                group: [{
                    id: 4,
                    label: 'aaa',
                    value: true
                },{
                    id: 5,
                    label: 'ccc',
                    value: true
                },{
                    id: 6,
                    label: 'eee',
                    value: false
                }]
            },
            {
                type: 'radio',
                name:'asdf',
                group: [{
                    id: 7,
                    label: 'aaa',
                    value: true
                },{
                    id: 8,
                    label: 'ccc',
                    value: false
                },{
                    id: 9,
                    label: 'eee',
                    value: false
                }]
            },
            {
                type: 'select',
                group: [{
                    label: 'aaa',
                    id: 10,
                    options:[
                        {name:123,
                         value:1},
                        {name:1234,
                         value:2},
                        {name:12345,
                         value:3,
                         selected: true}
                    ]
                },{
                    label: 'aaa',
                    id: 11,
                    options:[
                        {name:1223,
                         value:11},
                        {name:12234,
                         value:21,
                         selected: true},
                        {name:122345,
                         value:31}
                    ]
                }]
            }
        ],
        buttons: [
            { name:'button1',
              callback: function(data){console.log(data)}
            },
            { name:'button2',
                callback: function(data){console.log(data)}
            }
        ]
    };
    $(document).ready(function() {

        //var add = helpers.additional.create(example);
        //var add2 = additional.create(example);

//        example.fields[0].value = 'aaaa';
//        console.log(add);
        helpers.toolbar.init($('#toolbar_place'), 1, 1);
        helpers.toolbar.on(example_tool);
        //helpers.toolbar.refresh(example_tool_2);
//        helpers.contextual.init($('#toolbar_place'), 2);
//        helpers.contextual.on(example_tool_2);
//        helpers.contextual.off();
//        helpers.popup.on(example_popup);
    });

});