#!/bin/bash

php composer.phar create-project --prefer-source --no-scripts laravel/laravel foobar 5.8.25
mkdir app\\zip
mkdir app\\zip\\vendors
node ./app/js/zip.js
tree # remove this line
rm foobar -r
