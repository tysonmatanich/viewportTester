/*! viewportTester | Author: Tyson Matanich, 2013 | License: MIT */
(function (window) {
    var settings = viewportTesterSettings;

    var init = function () {
        var start = 0;
        var end = 4000;
        var id = "vp-tester";
        var selector = "#" + id;
        var css = '';

        // Get layout settings
        var stacked = true;
        if (settings.layout == "side-by-side") {
            stacked = false;
        }

        // Get position settings
        var i = settings.position.indexOf('-');
        var vert = settings.position.substring(0, i);
        var horz = settings.position.substring(i + 1);

        // Defaults
        css += selector + ' { position: absolute; position: fixed; ' + vert + ': 0; ' + horz + ': 0; z-index: 9999999999999; background-color: ' + settings.backgroundColor + '; color: ' + settings.textColor + '; opacity: ' + settings.opacity + '; filter: alpha(opacity=' + (settings.opacity * 100) + '); font-family: ' + settings.fontFamily + '; font-size: ' + settings.fontSize + '; }';
        css += selector + ' > div { padding: 0.375em; }';
        css += selector + ' > div + div { padding-top: 0; }';
        css += selector + ':hover { opacity: 1; filter: alpha(opacity=100); }';
        css += selector + ':hover { opacity: 1; filter: alpha(opacity=100); }';

        if (!stacked) {
            css += selector + ' > div { display: inline-block; }';
            css += selector + ' > div + div:before { content: "x"; margin-right: 0.75em; }';
        }

        css += buildStyles("width", start, end, selector + ' .mq-width');
        css += buildStyles("height", start, end, selector + ' .mq-height');

        // Clean up existing elements
        removeExistingElement(id);
        removeExistingElement(id + "_style");

        // Append the styles to the head
        var styleElement = document.createElement("style");
        styleElement.id = id + "_style";
        styleElement.appendChild(document.createTextNode(css));
        document.getElementsByTagName("head")[0].appendChild(styleElement);

        // Append markup
        var mainElement = document.createElement("div");
        mainElement.id = id;

        var widthElement = document.createElement("div");
        widthElement.setAttribute("class", "mq-width");
        if (stacked) {
            widthElement.innerHTML = "Width: ";
        }

        var heightElement = document.createElement("div");
        heightElement.setAttribute("class", "mq-height");
        if (stacked) {
            heightElement.innerHTML = "Height: ";
        }

        mainElement.appendChild(widthElement);
        mainElement.appendChild(heightElement);

        document.getElementsByTagName("body")[0].appendChild(mainElement);
    };

    var removeExistingElement = function (id) {
        var existingElement = document.getElementById(id);
        if (existingElement != null && typeof existingElement.remove === "function") {
            existingElement.remove();
        }
    };

    var buildStyles = function (distance, start, end, selector) {
        var css = '';

        // In range
        for (var i = start; i < end; i++) {
            css += '@media screen and (min-' + distance + ': ' + i + 'px) { ' + selector + ':after { content: "' + i + 'px"; } }';
        }

        // Greater than
        css += '@media screen and (min-' + distance + ': ' + (end + 1) + 'px) { ' + selector + ':after { content: "> ' + end + 'px"; } }';

        return css;
    };

    init();

})(this);