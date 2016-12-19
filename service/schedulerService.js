var AnalyticsModel = require('./analyticsModel.js');
var NewArrivalModel = require('./newarrivalModel.js');

function schedulerService(){
    this.updatedata=function(updateType){
        AnalyticsModel.find({},function(err,analyticsModel){
            if(err) throw err;
            analyticsModel.forEach(function(analytics){
                console.log(JSON.stringify(analytics));
                var categoriesArray = analytics.categories;
                for(var i=0;i<categoriesArray.length;i++){
                    var categoryObj=categoriesArray[i];
                    var analyticsArray=categoryObj.analytics;
                    analyticsArray[updateType]=0;
                    var subcategoryarray=categoryObj.subCategory;
                    for(var j=0;j<subcategoryarray.length;j++){
                        var subCategoryObj=subcategoryarray[j];
                        var subCatAnalytics=subCategoryObj.analytics;
                        subCatAnalytics[updateType]=0;
                        var brandArray=subCategoryObj.brand;
                        for(var k=0;k<brandArray.length;k++){
                            var brandObj=brandArray[k];
                            var brandAnalytics=brandObj.analytics;
                            brandAnalytics[updateType]=0;
                            var nameArray=brandObj.name;
                            for(var l=0;l<nameArray.length;l++){
                                var nameObj=nameArray[l];
                                var nameAnalytics=nameObj.analytics;
                                nameAnalytics[updateType]=0;
                            }
                        }
                    }
                    
                }
                
                analytics.markModified('categories');
                analytics.save();
            });
           // analyticsModel[0].save();
             console.log(JSON.stringify(analyticsModel))
        });
    }
    
    this.updateNewArrivals =function(){
        var expiredArray=[];
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate()-7);
        NewArrivalModel.find({},function(err,result){
            for(var i=0;i<result.length;i++){
              if(todayDate<result[i].itemAddedOn){
                  expiredArray.push(result[i].itemId);
              }
            }
            NewArrivalModel.remove({itemId:{$in:{expiredArray}}},function(err,data){
                if(err) throw err;
            })
        })
    }
}

module.exports = schedulerService;