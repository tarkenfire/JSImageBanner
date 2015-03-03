var Banner = function(){
    var isInit = false;
    var areImagesStaged = false;
    
    var mWidth = 0; var mHeight = 0;
    var mArgs;
    var mImages = {};
    
    function loadImages(sources, callback, loadCallback){
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        
        for (var src in sources){ numImages++;}
        
        for (var src in sources){
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages){
                    callback(images, loadCallback)
                }
            }
            images[src].src = sources[src];            
        }  
    }
    
    function onImagesLoaded(images, loadCallback){
        mImages = images;
        areImagesStaged = true;
        loadCallback();
        console.log("images loaded");
    }
    
    return{
        "init": function(width, height, args){
            mWidth = width;
            mHeight = height;
            mArgs = args;
            
            console.log (args);
            isInit = true;            
        },        
        "stageImages" : function(onLoad){            
            var urls = [];
            
            if (mArgs.mainImage != undefined){
                urls.push(mArgs.mainImage);                
            }
            
            if (mArgs.avatarImage != undefined){
                urls.push(mArgs.avatarImage);                
            }
            
            if (mArgs.brandingImage != undefined){
                urls.push(mArgs.brandingImage);                
            }
            
            loadImages(urls, onImagesLoaded, onLoad);
        },
        "getImage" : function(){
            if (!areImagesStaged){
                console.log("Images not staged");
                return;
            }
            
            console.log("Image staged");
            
            
        }    
    }    
}();