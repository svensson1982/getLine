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
            
            if (sx>ex && sy>ey)
            {
                data.elements = {
                    width: sx - ex,
                    height: sy - ey,
                    sx: ex,
                    sy: ey,
                    ex: ex,
                    ey: ey                    
                    //deg: (sx + ex)/(sy + ey)*10
                };
                
                setTimeout(function()
                {
                    createObj.call(this);
                },200); 
            }
            else if(sy>ey && sx<ex)
            {
                data.elements = {
                    width: (ex-sx),
                    height: (sy-ey),
                    sx: sx,
                    sy: sy,
                    ex: ex,
                    ey: ey
                    //deg: (Math.sqrt((Math.pow((ex-sx),2))+(Math.pow(5,2))))
                };
                
                console.log('lower');
                setTimeout(function()
                {
                    createObj.call(this);
                },200);                
            }
            else if(ex>sx && ey>sy)
            {
                data.elements = {
                    width: (ex-sx),
                    height: (ey - sy),
                    sx: sx,
                    sy: sy,
                    ex: ex,
                    ey: ey
                    //deg: (Math.sqrt((Math.pow((ex-sx),2))+(Math.pow(5,2))))
                };
                
                setTimeout(function()
                {
                    createObj.call(this);
                },200);                
            }
            else
            {
                data.elements = {
                        width: (sx-ex),
                        height: (ey - sy),
                        sx: ex,
                        sy: sy,
                        ex: ex,
                        ey: ey
                        //deg: (Math.sqrt((Math.pow((ex-sx),2))+(Math.pow(5,2))))
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
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    };
    /**
     * create div element, obj
     */
    var createObj = function ()
    {
        var data = getCords.call(document),
        c = randColor.call(this),
        w = data.elements.width*2,
        sx = data.elements.sx,
        ey = data.elements.ey,
        sy = data.elements.sy,//(data.elements.height)/2+ +(syeredeti),
        h = data.elements.height,
        ex = data.elements.ex,
        deg = 45;//data.elements.deg;
        //x1="'+sx+'" y1="'+sy+'"
        $('body').append('<svg height="'+h+'" width="'+w+'" style="position: absolute; top:'+sy+'">'+
                          '<line x1="'+0+'" y1="'+0+'" x2="'+ex+'" y2="'+ey+'" style="stroke:'+c+';stroke-width:4" />'+
                          '</svg>');
        //$('body').append('<div style="background:' + c + '; width:'+w+';height:'+h+';position:absolute; left:'+sx+';top:'+sy+';transform: rotate('+deg+'deg)"></div>');
        
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