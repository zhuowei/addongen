#!/bin/sh
rm template.zip
cd ../template
7z a ../skelgen/template.zip *
cd ../skelgen
echo -n "var templateJs = \"" >template.zip.js
base64 -w 0 template.zip >>template.zip.js
echo -n "\";" >>template.zip.js
