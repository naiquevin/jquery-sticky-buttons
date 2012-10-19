(function ($, window, undefined) {
    "use strict";

    var _bid_attr_name = 'sticky-btn-id';
    var _hidden_state_class = 'hiddenStickyBtn'

    var _defaults = {
        menuBg: '#2c2c2c',
        menuHeight: '20px;',
        menuPadding: '5px 1%',
        menuBtnMargin: '10px'
    };

    var StickyButtons = function (elem, options) {
        this.$el = elem;
        this.options = $.extend(_defaults, options);
        this.init();
    };

    StickyButtons.prototype.init = function () {

        var opts = this.options;
        var that = this;

        var stickToMenuBar = function ($elem) {
            var $menu = getOrCreateMenuBar();
            var bid = $elem.attr(_bid_attr_name);
            if (!bid) {
                bid = guid();
                $elem.attr(_bid_attr_name, bid);
                var $stickyButton = $elem.clone(1);
                $stickyButton.css({
                    'float': 'right',
                    'margin-left': opts.menuBtnMargin
                }).appendTo($menu);
            } else {
                showStickyButton(bid);
            }
            showMenuBar();
        };

        var getOrCreateMenuBar = function () {
            if (!menuBarExists()) {
                $('<div id="stickyMenu"></div>').css({
                    display: 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '98%',
                    background: opts.menuBg,
                    height: opts.menuHeight,
                    padding: opts.menuPadding
                }).appendTo("body");
            }
            return $("#stickyMenu");
        };

        var menuBarExists = function () {
            return $("#stickyMenu").length;
        };

        var showMenuBar = function () {
            getOrCreateMenuBar().show();
        };

        var hideMenuBar = function () {
            getOrCreateMenuBar().hide();
        };

        var getStickyButtons = function () {
            return getOrCreateMenuBar().children().filter(function () {
                return !(!$(this).attr(_bid_attr_name));
            });
        };

        var getStickyButton = function (bid) {
            var $btn = getStickyButtons().filter(function (index) {
                return $(this).attr(_bid_attr_name) === bid;
            }).eq(0);
            if (!$btn) {
                throw new Error('No such button with bid ' + bid + ' stuck to menu');
            }
            return $btn;
        };

        var hideStickyButton = function (bid) {
            var $btn = getStickyButton(bid);
            $btn.addClass(_hidden_state_class).hide();
            if (countVisibleButtons() === 0) {
                hideMenuBar();
            }
        };

        var showStickyButton = function (bid) {
            var $btn = getStickyButton(bid);
            $btn.removeClass(_hidden_state_class).show();
        };

        var countVisibleButtons = function () {
            var $buttons = getStickyButtons();
            return ($buttons.length - $buttons.filter('.'+_hidden_state_class).length);
        };

        var guid = function () {
            var s4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return ['id', s4(), s4()].join('-');
        };

        $(window).bind('scroll.stickybuttons', function () {
            var top = that.$el.offset().top;
            var scrollTop = $(document).scrollTop();
            if (scrollTop > top) {
                stickToMenuBar(that.$el);
            } else {
                hideStickyButton(that.$el.attr(_bid_attr_name));
            }
        });
    };

    $.fn.stickybuttons = function (options) {
        return this.each(function () {
            var instance = new StickyButtons($(this), options);
        });
    };

}) (jQuery, window);
