var AdmZip = require('adm-zip');
var fs = require("fs");

var vendors = [], laravel = [], laravelFolders = [], laravelFiles = [];

// Get vendors' name
getFolders("./foobar/vendor/", vendors);
removeFromArray(vendors, "autoload.php");

// Get Laravel folders
getFolders("./foobar/", laravel);
removeFromArray(laravel, 'vendor');

for (var i = laravel.length - 1; i >= 0; i--) {
    if(laravel[i].includes(".")) {
        laravelFiles.push(laravel[i]);
    } else {
        laravelFolders.push(laravel[i]);
    }
}
laravelFiles.push("artisan");
removeFromArray(laravelFolders, "artisan");

// Zip vendors
for (var i = vendors.length - 1; i >= 0; i--) {
    var zip = new AdmZip();
    zip.addLocalFolder("./foobar/vendor/" + vendors[i], vendors[i]);
    zip.writeZip("./app/zip/vendors/" + vendors[i] + ".zip");
    console.log("zip success: " + vendors[i]);
}
console.log("ZIP SUCCESS: VENDORS");

// Zip vendor/autoload.php
var azip = new AdmZip();
azip.addLocalFile("./foobar/vendor/autoload.php");
azip.writeZip("./app/zip/vendors/autoload.php.zip"); 
console.log("ZIP SUCCESS: AUTOLOAD.PHP");

// Zip Laravel
var lzip = new AdmZip();
for (var i = laravelFolders.length - 1; i >= 0; i--) {
    lzip.addLocalFolder("./foobar/" + laravelFolders[i], laravelFolders[i]);
}
for (var i = laravelFiles.length - 1; i >= 0; i--) {
    lzip.addLocalFile("./foobar/" + laravelFiles[i]);
}
lzip.writeZip("./app/zip/laravel.zip");
console.log("ZIP SUCCESS: LARAVEL");


function removeFromArray(array, element) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === element) {
            array.splice(i, 1);
        }
    }
}

function getFolders (parent, array) {
    fs.readdirSync(parent).forEach(function (folder) {
        array.push(folder);
    })
}
