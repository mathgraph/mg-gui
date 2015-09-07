define(['jquery', 'utils/css', 'text!helpers/mg-toolbar.css'], function ($, css, style) {

    css.inject(style);



    var exist = false;
    var $body;
    var $document;
    var box_exist = false;
    var columns;
    var $container;

    var $box = $('<div>').attr({id:'toolbar_box', class: 'hide'}).css({position: 'absolute'});

    var create_box = function(data) {
        if(!box_exist){
            $body.append($box)
        }
        $box.show();
        $box.empty();
        var $tb = $('.enabled');
        $box.offset({left: $tb.offset().left + $tb.width(), top: $tb.offset().top});
        toolbar.on($box, 1, data);

    };
    var hide_box = function() {
        $box.hide();
    };
    var buttons = [];

    var button_click = function($td, fields, index){
        (function(){
            var idx = index;
            $td.click(function () {
                fields[idx].callback();
            })
        })();
    };


    var selectable_click = function($td, fields, index){
        (function(){
            var idx = index;
            var field = fields[idx];
            var k;

            $td.click(function () {
                if($(this).hasClass('disabled')) {

                    $(this).removeClass('disabled').addClass('enabled');

                    for(k = 0; k < buttons.length; k++){

                        if(buttons[k].off != undefined && buttons[k].id != field.id && buttons[k].id != field.parent){
                            buttons[k].off();
                            buttons[k].button.removeClass('enabled').addClass('disabled');
                        }
                    }
                    fields[idx].callback(fields[idx]);
                }else{
                    $(this).addClass('disabled').removeClass('enabled');

                    fields[idx].callback_disable();

                }
            })
        })();
    };

    var toolbar = {
        refresh: function(data){
            buttons = [];
            toolbar.on($container, columns, data)
        },
        on: function ($toolbar_container, columns_count, data) {



            var $div = $('<div>')
                .append('<table>');

            var $table = $($div.children()[0]);
            if (!exist) {
                $body = $('body');
                $document = $(document);
                exist = true;
                $container = $toolbar_container;
                columns = columns_count;
            }
            $container.empty();
            $container.append($div);
            $div.show();
            $table.empty();
            var i, j, k;
            var fields = data.fields;


            for(i = 0; i < fields.length; i += columns){
                var $tr = $('<tr>');
                for(j = i; j < columns + i; j++){
                    if(j < fields.length) {

                        if(fields[j].fields != undefined){

                            for(k = 0; k < fields[j].fields.length; k++){
                                fields[j].fields[k].parent = fields[j].id;
                            }
                        }

                        var $td = $('<td>');
                        var button = {
                            button: $td,
                            type: fields[j].type,
                            parent: fields[j].parent
                        };
                        $tr.append($td
                            .append($('<img>')
                                .attr('src', fields[j].icon)));
                        button.id = fields[j].id;
                        if (fields[j].type == 'button') {
                            button_click($td, fields, j);
                        }
                        else {
                            if(fields[j].type == 'menu'){
                                fields[j].callback = create_box;
                                fields[j].callback_disable = hide_box;
                            }
                            $td.addClass('disabled');
                            button.off = fields[j].callback_disable;
                            selectable_click($td, fields, j);
                        }
                        button.on = fields[j].callback;
                        buttons.push(button);
                    }
                }
                $table.append($tr);
            }
        }
    };
    return toolbar;
});






