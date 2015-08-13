require.config({
    baseUrl: './src',
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'text': '../bower_components/text/text'
    },
    packages: [
        {
            name: 'dat',
            location: '../bower_components/dat-gui/src/dat',
            main: 'gui/GUI'
        }
    ]
});

define(['jquery', 'mg-gui'], function ($, helpers) {
    var hint = helpers.hint;
    $(function () {
        $(document).click(function (event) {
            hint.off();
            var pos = {x: event.pageX, y: event.pageY};
            hint.data = pos;
            hint.on(pos);
        });
    });
    var additional = helpers.additional;
    var example = {
        start_position : {
            x: 0,
            y: 0
        },
        fields: [
            { name:'txt',
                type:'text',
                value: 1,
                change: function(){console.log(1)}
            },
            { name:'sld',
                type:'slider',
                value: 2,
                min_value: 0,
                max_value: 4,
                step : 1,
                change: function(){console.log(2)}
            },
            { name:'sm',
                type:'select',
                value: 'ccc',
                content: ['aaa', 'bbb', 'ccc'],
                change: function(){console.log(3)}
            },
            { name:'cb',
                type:'checkbox',
                value: true,
                change: function(){console.log(4)}
            },
            { name:'col',
                type:'color',
                value: "#ffae23",
                change: function(){console.log(5)}
            }
        ]
    };
    $(document).ready(function() {
        var add = additional.create(example);
        example.fields[0].value = 'aaaa';
        console.log(add);
    });
});