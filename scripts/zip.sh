#!/bin/bash

php composer.phar create-project --prefer-dist --no-scripts laravel/laravel 5.8.29 foobar
mkdir app\\zip
mkdir app\\zip\\vendors
node ./app/js/zip.js
tree # remove this line
rm foobar -r
