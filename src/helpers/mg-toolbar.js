define(['jquery', 'mg-gui/utils/css', 'text!mg-gui/helpers/mg-toolbar.css'], function ($, css, style) {
    var exist,
        $body,
        $document,
        columns,
        box_columns,
        $container,
        $box,
        buttons,
        toolbar,
        count;

    css.inject(style);

    exist = false;

    $box = $('<div>').attr({id: 'toolbar_box', class: 'hide'}).css({position: 'absolute'});

    function create_box(data) {
        var $tb = $('.enabled');
        $box.show();
        $box.empty();
        $box.offset({left: $tb.offset().left + $tb.width(), top: $tb.offset().top});
        $box.append(create_toolbar(data, box_columns))

    }
    function hide_box() {
        $box.hide();
    }
    buttons = [];

    function create_toolbar(data, columns) {
        var $div,
            $table,
            i, j, k,
            fields,
            $tr,
            $td,
            button;
        $div = $('<div>')
            .append('<table>');

        $table = $($div.children()[0]);


        fields = data.fields;


        for (i = 0; i < fields.length; i += columns) {
            $tr = $('<tr>');
            for (j = i; j < columns + i; j++) {
                if (j < fields.length) {
                    button = {};
                    if (fields[j].id) {
                        button.id = fields[j].id
                    }else {
                        fields[j].id = count;
                        button.id = count;
                        count++;
                    }

                    if (fields[j].fields != undefined) {

                        for (k = 0; k < fields[j].fields.length; k++) {
                            fields[j].fields[k].parent = fields[j].id;
                        }
                    }

                    $td = $('<td>');
                    button = {
                        button: $td,
                        type: fields[j].type,
                        parent: fields[j].parent
                    };
                    $tr.append($td
                        .append($('<img>')
                            .attr('src', fields[j].icon)));
                    if (fields[j].type == 'button') {
                        button_click($td, fields, j);
                    }else {
                        if (fields[j].type == 'menu') {
                            fields[j].select = create_box;
                            fields[j].unselect = hide_box;
                        }
                        $td.addClass('disabled');
                        button.off = fields[j].unselect;
                        selectable_click($td, fields, j);
                    }
                    button.on = fields[j].select;
                    buttons.push(button);
                }
            }
            $table.append($tr);
        }
        return $div;
    }

    function button_click($td, fields, index) {
        (function () {
            var idx = index;
            $td.click(function () {
                if (fields[idx].select) {
                    fields[idx].select();
                }
            })
        })();
    }


    function selectable_click($td, fields, index) {
        (function () {
            var idx,
                field,
                k;
            idx = index;
            field = fields[idx];
            $td.click(function () {
                if ($(this).hasClass('disabled')) {

                    $(this).removeClass('disabled').addClass('enabled');

                    for (k = 0; k < buttons.length; k++) {

                        if (buttons[k].off != undefined && buttons[k].id != field.id && buttons[k].id != field.parent) {
                            buttons[k].off();
                            buttons[k].button.removeClass('enabled').addClass('disabled');
                        }
                    }
                    if (fields[idx].select) {
                        fields[idx].select(fields[idx]);
                    }
                }else {
                    $(this).addClass('disabled').removeClass('enabled');
                    if (fields[idx].unselect) {
                        fields[idx].unselect();
                    }
                }
            })
        })();
    }

    toolbar = {
        refresh: function (data) {
            buttons = [];
            $container.append(create_toolbar(data, columns))
        },
        init: function ($toolbar_container, columns_count, box_columns_count) {
            $body = $('body');
            $document = $(document);
            exist = true;
            if ($toolbar_container) {
                $container = $($toolbar_container);
            }else {
                $container = $body;
            }
            if (columns_count) {
                columns = columns_count;
            }else {
                columns = 2;
            }
            if (box_columns_count) {
                box_columns = box_columns_count;
            }else {
                box_columns = 3;
            }
            $body.append($box);
            $box.hide();

            count = 1;
        },
        on: function (data) {

            if (exist) {
                $container.empty();
                $container.append(create_toolbar(data, columns));

            }
        }
    };
    return toolbar;
});






