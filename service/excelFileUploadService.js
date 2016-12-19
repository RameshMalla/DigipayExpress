
var InventoryModels = require('./inventoryModel.js');
var AnalyticsModel = require('./analyticsModel.js');
var ArrivalModel = require('./newarrivalModel.js');
var reviewModel = require('./reviewsModel.js');

function uploadService(requestBody,responseBody){
    //Upload file
    this.uploadFile = function(data,storeId){
        //console.log(data);
        var bulk = InventoryModels.collection.initializeOrderedBulkOp();
         var counter = 0;
         console.log('datalength'+data.length);
        for(var i=0;i<data.length;i++){
            //insert the value
                   bulk.find({itemId:data[i].itemId,storeId:storeId}).upsert().update({
                       "$setOnInsert":{
                             itemName:data[i].itemName,
                             itemCategory:data[i].itemCategory,
                             itemSubCategory:data[i].itemSubCategory,
                             itemBrand:data[i].itemBrand,
                             itemPrice:data[i].itemPrice,
                             itemImage:data[i].itemImage
                       }
                   });

                   //update the value
                    bulk.find({itemId:data[i].itemId,storeId:storeId}).update({
                        $inc:{
                            itemQuantity:Number(data[i].itemQuantity)
                        },
                       $set:{
                             itemName:data[i].itemName,
                             itemCategory:data[i].itemCategory,
                             itemSubCategory:data[i].itemSubCategory,
                             itemBrand:data[i].itemBrand,
                             itemPrice:data[i].itemPrice,
                             itemImage:data[i].itemImage
                       }
                   });
                 counter++;
        if ( counter % 5 == 0 || (i == data.length-1)){
            bulk.execute(function(err,result) {
                if(err) throw err;
                bulk = InventoryModels.collection.initializeOrderedBulkOp();
                counter=0;
            });
    }

        }

        updateAnalyticsData(storeId,data);
        insertNewArrivaldata(storeId,data);
        insertReviews(data);
        }
}





 function updateAnalyticsData(storeId,dataArray){
            var analyticsArray=[0,0,0];

            var catIndex,subCatIndex,brandIndex;
            var categoryObject,subCategoryObject,brandObject;

             console.log('storeid is' + storeId);
        AnalyticsModel.findOne({'storeId':storeId},function(err,analyticsData){
         console.log('analyticsdata'+analyticsData);
                if(analyticsData!=null){
             for(var f=0;f<dataArray.length;f++)
             {
              var data = dataArray[f];
                  var categoryExist=false;
                 var subCategoryExist=false;
                  var branExist=false;
                     var nameExist=false;
               /*  */
                var categoriesArray=analyticsData.categories;
                console.log('categories is'+categoriesArray.length);

                for(var i=0;i<categoriesArray.length;i++){
                    console.log(categoriesArray[i].category);
                   if(data.itemCategory==categoriesArray[i].category){
                       categoryObject=categoriesArray[i];
                    categoryExist=true;
                    catIndex=i;
                   }
                }
                console.log('categoryExist'+categoryExist);
               if(!categoryExist){
                   var nameObj = setNameObj(data.itemName,analyticsArray);
                   var brandObj = setBrandObj(data.itemBrand,analyticsArray,nameObj);
                   var subCategoryObj = setSubCatObj(data.itemSubCategory,analyticsArray,brandObj);
                   var categoryObj = setCatObj(data.itemCategory,analyticsArray,subCategoryObj);
                    /*console.log("nameObj is"+nameObj);
                    console.log("brandObj is"+ brandObj);
                    console.log('subCategoryObj is '+subCategoryObj);
                    console.log('categoryObj is '+categoryObj);*/
                    analyticsData.categories.push(categoryObj);
                    /* analyticsData.markModified('categories');
                    analyticsData.save();*/
               }
               else{
                var subcategoryArray = categoryObject.subCategory;
                for(var k=0;k<subcategoryArray.length;k++){
                    var subcategoryValue=subcategoryArray[k].category;
                    console.log('subcategory value is '+subcategoryValue);
                     console.log('data.itemSubCategory value is '+data.itemSubCategory);
                    if(subcategoryValue == data.itemSubCategory){
                        subCategoryExist=true;
                        subCategoryObject=subcategoryArray[k];
                        subCatIndex=k;
                    }
                }
                console.log('subCategoryExist is ' + subCategoryExist);
                if(!subCategoryExist){
                  var nameObj = setNameObj(data.itemName,analyticsArray);
                   var brandObj = setBrandObj(data.itemBrand,analyticsArray,nameObj);
                   var subCategoryObj = setSubCatObjForInsertingSubCat(data.itemSubCategory,analyticsArray,brandObj);
                   /*console.log("nameObj is"+nameObj);
                    console.log("brandObj is"+ brandObj);
                    console.log('subCategoryObj is '+subCategoryObj);*/
                    analyticsData.categories[catIndex].subCategory.push(subCategoryObj);
                    /*analyticsData.markModified('subCategory');
                    analyticsData.save();*/
                }
                else if(subCategoryExist){
                    var brandArray=subCategoryObject.brand;
                     for(var l=0;l<brandArray.length;l++){
                    var brandValue=brandArray[l].category;
                    if(brandValue == data.itemBrand){
                        branExist=true;
                        brandObject=brandArray[l];
                        brandIndex=l;
                    }
                }
                console.log('branExist is ' + branExist);
                if(!branExist){
                    var nameObj = setNameObj(data.itemName,analyticsArray);
                   var brandObj = setBrandObjForInsertingBrand(data.itemBrand,analyticsArray,nameObj);
                   /*console.log("nameObj is"+nameObj);
                    console.log("brandObj is"+ brandObj);*/

                    analyticsData.categories[catIndex].subCategory[subCatIndex].brand.push(brandObj);
                     /*analyticsData.markModified('brand');
                     analyticsData.save();*/
                }

                 else if(branExist){
                      console.log('branExist is' +branExist);
                    var nameArray=brandObject.name;
                     for(var m=0;m<nameArray.length;m++){
                    var name=nameArray[m].category;
                   //console.log(nameArray[m].category);
                    console.log(data.itemName);
                      console.log(name);
                    if(name == data.itemName){
                        nameExist=true;
                    }
                }
                console.log('nameExist is' +nameExist);
                   if(!nameExist) {
                        var nameObj = setNameObjForInsertingName(data.itemName,analyticsArray);
                        //console.log("nameobj is" + nameObj);
                        analyticsData.categories[catIndex].subCategory[subCatIndex].brand[brandIndex].name.push(nameObj);
                        /* analyticsData.markModified('name');
                        analyticsData.save();*/
                   }

                 }
                }


             }
                }
                analyticsData.markModified('name');
                        analyticsData.save();
                }
               else{
                   console.log('dataarray is'+ JSON.stringify(dataArray));
                 var analyticsModels=new AnalyticsModel();
                  analyticsModels.storeId=storeId
                  var nameObj = setNameObj(dataArray[0].itemName,analyticsArray);
                   var brandObj = setBrandObj(dataArray[0].itemBrand,analyticsArray,nameObj);
                   var subCategoryObj = setSubCatObj(dataArray[0].itemSubCategory,analyticsArray,brandObj);
                   var categoryObj = setCatObj(dataArray[0].itemCategory,analyticsArray,subCategoryObj);
                    analyticsModels.categories = categoryObj
                    analyticsModels.markModified('categories');
                    analyticsModels.save(function(data){
                    dataArray.splice(0,1);
                    updateAnalyticsData(storeId,dataArray);
                    });

               }

            });



        }



function setNameObj(name,analyticsArray){
        var nameObj=[{
            category:name,
             analytics:analyticsArray
            }];

        return nameObj;
    }

function setNameObjForInsertingName(name,analyticsArray){
        var nameObj={
            category:name,
             analytics:analyticsArray
            };

        return nameObj;
    }

function setBrandObj(name,analyticsArray,nameObj){
       var brandObj=[{
             category:name,
             name:nameObj,
                analytics:analyticsArray
                }];
                 return brandObj;
            }

function setBrandObjForInsertingBrand(name,analyticsArray,nameObj){
       var brandObj={
             category:name,
             name:nameObj,
                analytics:analyticsArray
                };
                 return brandObj;
            }

  function setSubCatObj(name,analyticsArray,brandObj){
       var subCatObj=[{
             category:name,
             brand:brandObj,
                analytics:analyticsArray
                }];
                return subCatObj;
            }

function setSubCatObjForInsertingSubCat(name,analyticsArray,brandObj){
       var subCatObj={
             category:name,
             brand:brandObj,
                analytics:analyticsArray
                };
                return subCatObj;
            }

 function setCatObj(name,analyticsArray,subCatObj){
       var catObj={
             category:name,
             subCategory:subCatObj,
                analytics:analyticsArray
                };
                 return catObj;
            }

function insertNewArrivaldata(storeId,data){
    var counter=0;
    var bulk=ArrivalModel.collection.initializeOrderedBulkOp();
     for(var i=0;i<data.length;i++){
            //insert the value
                   bulk.find({itemId:data[i].itemId,storeId:storeId}).upsert().update({
                       "$setOnInsert":{
                           itemCategory:data[i].itemCategory,
                           itemSubCategory:data[i].itemSubCategory
                       }
                   });

                 counter++;
        if ( counter % 5 == 0 || (i == data.length-1)){
            bulk.execute(function(err,result) {
                if(err) throw err;
                bulk = ArrivalModel.collection.initializeOrderedBulkOp();
                counter=0;
            });
    }

        }
}

function insertReviews(data){
     var counter=0;
    var bulk=reviewModel.collection.initializeOrderedBulkOp();
     for(var i=0;i<data.length;i++){
            //insert the value
                   bulk.find({itemId:data[i].itemId}).upsert().update({
                       "$setOnInsert":{
                          userReviews:[]
                       }
                   });

                 counter++;
        if ( counter % 5 == 0 || (i == data.length-1)){
            bulk.execute(function(err,result) {
                if(err) throw err;
                bulk = ArrivalModel.collection.initializeOrderedBulkOp();
                counter=0;
            });
    }

        }
}


module.exports = uploadService;
