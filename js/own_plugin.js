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
            var sx = evt.pageX;
            var sy = evt.pageY;
            console.log("1. sX " + sx + " sY " + sy);
            data.elements = {
                sx: sx,
                sy: sy
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
            var ex = evt.pageX,
            ey = evt.pageY,
            sx = data.elements.sx,
            sy = data.elements.sy;

            //console.log("X " + x + sx + " Y " + y + sy);
            if (sx>ex)
            {
                data.elements = {
                    width: sx + ex,
                    height: sy + ey,                    
                    deg: (sx + ex)/(sy + ey)*10
                };
                console.log('greather');
            }
            else
            {
                data.elements = {
                    width: (ex-sx),
                    height: (ey - sy),
                    sx: sx,
                    sy: sy,
                    deg: (Math.sqrt((Math.pow((ex-sx),2))+(Math.pow(5,2))))
                };
                
                setTimeout(function()
                {
                    createObj.call(this);
                },200);                
            }
            console.log("2. sx "+sx +" sy "+sy);
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
        sx = data.elements.sx,
        syeredeti = data.elements.sy, 
        sy = data.elements.sy,//(data.elements.height)/2+ +(syeredeti),
        h = data.elements.height,
        top = h/2,
        deg = data.elements.deg;
        
        $('body').append('<div style="background:' + c + '; width:'+w+';height:'+h+';position:absolute; left:'+sx+';top:'+top+';transform: rotate('+deg+'deg)"></div>');
        
        console.log('3. w->'+w+'h-> '+h+' deg-> '+deg +" sx "+sx+" sy "+sy);
        
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