var Banner = function(){
    var isInit = false;
    
    var mWidth = 0; var mHeight = 0;
    var mMainImageURL; var mAvatarImageURL; var mBrandingImageUrl;
    var mImages = {};
    var mSources = [];
    
    function loadImages(sources, callback){
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        
        for (var src in sources){ numImages++;}
        
        for (var src in sources){
            images[src] = new Image();
            images[src].onload = function(){
                if (++loadedImages >= numImages){
                    callback(images)
                }
            }
            images[src].src = sources[src];            
        }  
    }
    
    function onImagesLoaded(images){
        mImages = images;
    }
    
    return{
        "init": function(width, height){
            mWidth = width;
            mHeight = height;
            isInit = true;
        },
        "setMainImageURL" : function(imageURL){
            mMainImageURL = imageURL;
        },
        "setAvatarImageURL" : function (avatarURL){
            mAvatarImageURL = avatarURL;
        },
        "setBrandingImageURL": function (brandingURL){
            mBrandingImageURL = brandingURL;
        },
        "stageImages" : function(){
            if (mMainImageURL != undefined){
                mSources.push({mainImage: mMainImageURL});
            }
            
            if (mAvatarURLImage != undefined){
                mSources.push({avatarImage: mAvatarURLImage});
            }
            
            if (mBrandingImageURL != undefined){
                mSources.push({brandingImage: mBrandingImageURL});
            }
            
            loadImages(mSources, onImagesLoaded);            
        }
        
    }    
}();