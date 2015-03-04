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
        console.log(images);
    }
    
    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
        
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
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
                return undefined;
            }
            
            var canvas = document.createElement("canvas");
            canvas.width = mWidth;
            canvas.height = mHeight;
            var context = canvas.getContext("2d");
            
            //get variables from arguments
            var username = mArgs.avatarText != undefined ? mArgs.avatarText : "@Username";
            var usernameTextSize = mArgs.avatarTextSize != undefined ? mArgs.avatarTextSize : 16;
            var usernameTextFont = mArgs.avatarTextFont != undefined ? mArgs.avatarTextFont : "Avenir Heavy, Sans-serif";
            var usernameTextColor = mArgs.avatarTextColor != undefined ? mArgs.avatarTextColor : "#FFFFFF";
            var usernameTextShadowColor = mArgs.avatarTextShadowColor != undefined ? mArgs.avatarTextShadowColor : "#000000";
            
            var title = mArgs.titleText != undefined ? mArgs.titleText : "Story Title";
            var titleTextFont = mArgs.titleTextFont != undefined ? mArgs.titleTextFont : "Avenir Heavy, Sans-serif";
            var titleTextSize = mArgs.titleTextSize != undefined ? mArgs.titleTextSize : 50;
            var titleTextColor = mArgs.titleTextColor != undefined ? mArgs.titleTextColor : "#FFFFFF";
            
            var mainImage = mImages[0] != undefined ? mImages[0] : new Image();
            var avatarImage = mImages[1] != undefined ? mImages[1] : new Image();
            var brandingImage = mImages[2] != undefined ? mImages[2] : new Image();
            
            //drawing constants
            var threeFifthsHeight = (3/5) * mHeight;
            var twoFifthsHeight = (2/5) * mHeight;
            var nintyThreePercentHeight = (93/100) * mHeight;
            var sevenPercentHeight = (7/100) * mHeight;
            
            var nintyPercentWidth = (9/10) * mWidth;
            
            
            //background
            context.fillRect(0, 0, mWidth, mHeight);
                                
            //top image
            context.drawImage(mainImage, 0, 0, mWidth, threeFifthsHeight);
            
            //bottom third
            context.fillStyle = "#FF0000";
            context.fillRect(0, threeFifthsHeight, mWidth, twoFifthsHeight);
            
            //branding bar
            context.fillStyle = "#CC0000";
            context.fillRect(0, nintyThreePercentHeight, mWidth, sevenPercentHeight);
            
            //avatar image
            context.drawImage(avatarImage, 10, 10, 42, 42);
            
            //branding image
            var bX = (mWidth - brandingImage.width) - 10;
            var bY = (mHeight - brandingImage.height) - 10;
            
            context.drawImage(brandingImage, bX, bY, brandingImage.width, brandingImage.height);
            
            //username text            
            context.fillStyle = usernameTextColor;
            
            context.font =  usernameTextSize+ "pt " + usernameTextFont;
            context.shadowColor = usernameTextShadowColor;
            context.shadowOffsetX = 2;
            context.fillStyle = usernameTextColor;
            context.fillText(username, 62, 42);
            
            //title
            context.font = "50pt Avenir Heavy, Sans-serif";            
            context.shadowOffsetX = 0;
            context.fillStyle = titleTextColor;
            
            var titleY = threeFifthsHeight + titleTextSize + 15;
            
            wrapText(context, title, 10, titleY, mWidth - 10, titleTextSize + 10)
            //context.fillText(title, 10, threeFifthsHeight + titleTextSize + 15);
            
            
            
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image;        
        }    
    }    
}();