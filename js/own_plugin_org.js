(function ($) {
    /**
     * 	Inicialise
     */
    var getCords = function ()
    {
        if (typeof $(this).data('getCoordsPosition') === 'undefined')
        {
            var data = new Object();
            data.elements = {};
            data.count = 0;
            $(this).data('getCoordsPosition', data);
        }
        else
        {
            var data = $(this).data('getCoordsPosition');
        }

        return data;
    };
    /**
     * 	Set start
     */
    var construct = function ()
    {
        var data = getCords.call(document);
        $(document).on('mousedown', function (evt)
        {
            var x = evt.pageX;
            var y = evt.pageY;
            console.log("X " + x + " Y " + y);
            data.elements = {
                x: x,
                y: y
            };
        });
    };
    /**
     * 	detach 
     */
    var destruct = function (data, evt)
    {
        var data = getCords.call(document);
        $(document).on('mouseup', function (evt)
        {
            var startpos = construct.call(this);
            var x = evt.pageX,
                    y = evt.pageY,
                    sx = data.elements.x,
                    sy = data.elements.y;

            console.log("X " + x + sx + " Y " + y + sy);
            if (sx>x)
            {
                data.elements = {
                    width: (sx - x) * -1,
                    height: (sy - y) * -1
                };
                console.log('greather');
            }
            else
            {
                data.elements = {
                    width: (x-sx),
                    height: (y - sy) 
                };
            }

            createObj.call(this);
        });
    };
    /**
     * random color
     */
    var randColor = function ()
    {
        return '#' + Math.random().toString(16).slice(2, 8);
    };
    /**
     * create div element, obj
     */
    var createObj = function ()
    {
        var data = getCords.call(document),
        c = randColor.call(this),
        w = data.elements.width,
        h = data.elements.height;
                $('body').append('<div style="background:' + c + '; width:'+w+';height:'+h+';position:absolute; left:'+w+';top:'+h+';"></div>');
    };

    var pubMethod = function ()
    {

        var data = getCords.call(document);
        data.elements =
                {
                    start: construct.call(this, data),
                    end: destruct.call(this, data)
                };
    };
    $.fn.getCoordsPosition = function ()
    {
        return pubMethod();
    };
})(jQuery);