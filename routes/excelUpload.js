var express = require("express");
var router = express.Router();
var xls = require("excel");


//var formidable = require('formidable');
var uploadService = require("../service/excelFileUploadService.js");

router.get('/feedUploadView', function(req, res, next) {
  console.log('inside view');
  res.render('fileUpload');
});


router.post('/upload', function(req, res, next) {
  console.log("Inside  file upload");
  var file;
  var fileName;
  if (!req.files) {
    res.send('No files were uploaded');
    return;
  }

  file = req.files.fileName;
  fileName = req.files.fileName.name;
  console.log("name is " + fileName)
  file.mv('./public/file/guru.xlsx', function(err) {
    if (err)
      throw err;

  });
  console.log(file);
   xls('./public/file/guru.xlsx', function(err, data) {
     if (err)
       throw err;
     //convertToJSON(JSON.stringify(convertToJSON(data)));
     //var storeIdsess = req.session.storeId;
    var arr = fileName.split("_");
     var storeId = arr[1];
     console.log("storeId is" + storeId);
     new uploadService(req, res).uploadFile(convertToJSON(data), storeId);
   });
   res.render('fileUpload',{ message: 'File uploaded successfully'});

});

function convertToJSON(array) {
  var first = array[0].join();
  var headers = first.split(',');

  var jsonData = [];
  for (var i = 1, length = array.length; i < length; i++) {

    var myRow = array[i].join();
    var row = myRow.split(',');

    var data = {};
    for (var x = 0; x < row.length; x++) {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);

  }
  return jsonData;
}
;

module.exports = router;
