/**
 * @namespace toolbar
 */
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
        all_fields,
        count;

    css.inject(style);

    exist = false;

    $box = $('<div>').attr({id: 'toolbar_box', class: 'hide'}).css({position: 'absolute'});
    $box.addClass('mg-gui-toolbar-box');

    function create_box(data) {
        var $tb = $('.enabled');
        $(".current_toolbar_menu").removeClass("current_toolbar_menu");
        $tb.addClass("current_toolbar_menu");
        $box.show();
        $box.empty();
        $box.offset({left: $tb.offset().left + $tb.width() + 1, top: $tb.offset().top});
        $box.append(create_toolbar(data, box_columns, true))

    }
    function hide_box(button) {
        $box.hide();
        $(button.$button.find('img')).attr('src', button.icon);
        button.off = field_by_button(button).unselect;
        $box.find('.enabled').removeClass('enabled').addClass('disabled')
    }
    buttons = [];
    function field_by_button(button) {
        var i, j;
        for (i = 0; i < all_fields.length; i++) {
            if (button.$__toolbar_id == all_fields[i].$__toolbar_id) {
                return all_fields[i]
            }
            if (all_fields[i].fields) {
                for (j = 0; j < all_fields[i].fields.length; j++) {
                    if (button.$__toolbar_id == all_fields[i].fields[j].$__toolbar_id) {
                        return all_fields[i].fields[j]
                    }
                }
            }
        }
    }
    function button_by_field(field) {
        var i;
        for (i = 0; i < buttons.length; i++) {
            if (field.$__toolbar_id == buttons[i].$__toolbar_id) {
                return buttons[i]
            }
        }
    }
    function create_toolbar(data, columns, is_box) {
        var $div,
            $table,
            i, j, k,
            $tr,
            $td,
            button,
            fields;
        $div = $('<div>')
            .append('<table>');

        $table = $($div.children()[0]);
        if (!is_box) {
            all_fields = data.fields;
        }

        fields = data.fields;


        for (i = 0; i < fields.length; i += columns) {
            $tr = $('<tr>');
            for (j = i; j < columns + i; j++) {
                if (j < fields.length) {
                    $tr.addClass('mg-gui-toolbar-' + fields[j].type);
                    button = {};
                    if (fields[j].$__toolbar_id) {
                        button.$__toolbar_id = fields[j].$__toolbar_id
                    }else {
                        fields[j].$__toolbar_id = count;
                        button.$__toolbar_id = count;
                        count++;
                    }

                    if (fields[j].fields != undefined) {

                        for (k = 0; k < fields[j].fields.length; k++) {
                            fields[j].fields[k].parent = fields[j].$__toolbar_id;
                        }
                    }

                    $td = $('<td>');
                    //$td.addClass(';asldkfj');
                    button.$button = $td;
                    button.type = fields[j].type;
                    button.icon = fields[j].icon;
                    button.parent = fields[j].parent;


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
            var k,
                field,
                parent,
                idx = index;
            $td.click(function (event) {
                field = fields[idx];
                if (field.select) {
                    field.select();
                }
                for (k = 0; k < buttons.length; k++) {
                    //if (buttons[k].off != undefined && buttons[k].$__toolbar_id != field.$__toolbar_id &&
                    //    buttons[k].$__toolbar_id != field.parent) {
                    //    if (buttons[k].$button.hasClass('enabled')) {
                    //        buttons[k].off(buttons[k]);
                    //        buttons[k].$button.removeClass('enabled').addClass('disabled');
                    //    }
                    //}
                    if (buttons[k].$__toolbar_id == field.parent) {
                        parent = buttons[k];
                    }
                }
                if (field.type == "button" && parent) {
                    event.stopPropagation();
                }
            })
        })();
    }


    function selectable_click($td, fields, index) {
        (function () {
            var idx,
                field,
                k,
                parent,
                button,
                old;
            parent = undefined;
            idx = index;
            field = fields[idx];
            $td.click(function (event) {
                if ($(this).hasClass('disabled')) {

                    $(this).removeClass('disabled').addClass('enabled');

                    for (k = 0; k < buttons.length; k++) {
                        if (buttons[k].off != undefined && buttons[k].$__toolbar_id != field.$__toolbar_id &&
                            buttons[k].$__toolbar_id != field.parent && buttons[k].group_name == field.group_name) {
                            if (buttons[k].$button.hasClass('enabled')) {
                                buttons[k].off(buttons[k]);
                                buttons[k].$button.removeClass('enabled').addClass('disabled');
                            }
                        }
                        if (buttons[k].$__toolbar_id == field.parent) {
                            parent = buttons[k];
                        }
                    }
                    button = button_by_field(field);
                    if (button.on) {
                        button.on(fields[idx]);
                    }
                }else {
                    $(this).addClass('disabled').removeClass('enabled');
                    button = button_by_field(field);
                    if (button.off) {
                        button.off(button)
                    }
                }
                if (field.type == 'menu') {
                    event.stopPropagation();

                }
                if (parent && field.type != "button") {
                    $(parent.$button.find('img')).attr('src', field.icon);
                    old = parent.off;
                    parent.off = function () {
                        field.unselect();
                        old(parent)
                    };
                }
            })
        })();
    }

    /**
     * Toolbar is tool panel. It can contain three types of buttons. Simple button, selectable, button and menu button.
     * Singleton.
     * @example
     *     var example_tool = {
     *     fields: [
     *      {   type: 'button',
     *          icon: './src/images/1.png',
     *          select: function(){console.log(1)}
     *      },
     *      {   type: 'selectable',
     *          icon: './src/images/2.png',
     *          select: function(){console.log(3)},
     *          unselect: function(){console.log(4)}
     *      },
     *      {   type: 'menu',
     *          icon: './src/images/3.png',
     *          fields:[
     *              {   type: 'button',
     *                  icon: './src/images/4.png',
     *                  select: function(){console.log(5)}
     *              },
     *              {   type: 'selectable',
     *                  icon: './src/images/5.png',
     *                  select: function(){console.log(6)},
     *                  unselect: function(){console.log(7)}
     *              }
     *          ]
     *        }
     *      ]
     *      };
     *      toolbar.init($('#toolbar_place'), 2, 1);
     *      toolbar.on(example_tool);
     *
     * @typedef {Object} toolbar
     */

    toolbar = {
        /**
         * Refresh toolbar
         * @method toolbar.refresh
         * @param {Object} data
         * @param {Array} data.fields List of buttons in toolbar.
         * @param {string} data.fields.type Type of button. It can be 'button', 'selectable' or 'menu'.
         * @param {string} data.fields.icon Source of image.
         * @param {function} [data.fields.select] Run on click or select.
         * @param {function} [data.fields.unselect] Run on deactivating.
         * @param {Object} [data.fields.fields] List of buttons in child menu.
        */
        refresh: function (data) {
            buttons = [];
            $container.append(create_toolbar(data, columns))
        },
        /**
         * Save options of toolbar.
         * @method toolbar.init
         * @param {Object} $toolbar_container Set container of toolbar. It can be jquery or DOM element.
         * @param {number} columns_count Column count in toolbar.
         * @param {number} box_columns_count Column count in child menu.
         */
        init: function ($toolbar_container, columns_count, box_columns_count) {
            $body = $('body');
            $document = $(document);
            exist = true;
            if ($toolbar_container) {
                $container = $($toolbar_container);
            }else {
                $container = $body;
            }
            $container.addClass('mg-gui-toolbar-container');
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
            $body.click(function () {
                $box.hide();
                if ($box.find('.enabled').length == 0) {
                    $('.current_toolbar_menu').removeClass('enabled').addClass('disabled')
                }
            });
            count = 1;
        },
        /**
         * Create and show toolbar
         * @method toolbar.on
         * @param {Object} data
         * @param {Array} data.fields List of buttons in toolbar.
         * @param {String} data.fields.type Type of button. It can be 'button', 'selectable' or 'menu'.
         * @param {String} data.fields.icon Source of image.
         * @param {Function} [data.fields.select] Run on click or select.
         * @param {Function} [data.fields.unselect] Run on deactivating.
         * @param {Object} [data.fields.fields] List of buttons in child menu.
         */
        on: function (data) {

            if (exist) {
                $container.empty();
                $container.append(create_toolbar(data, columns, false));

            }
        }
    };
    return toolbar;
});






