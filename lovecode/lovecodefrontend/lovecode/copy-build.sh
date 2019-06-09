npm run build

git rm -r ../../lovecodebackend/static/js/
git rm -r ../../lovecodebackend/static/css/
mkdir ../../lovecodebackend/static/
cp -r build/static/* ../../lovecodebackend/static/
cp -r build/index.html ../../lovecodebackend/templates/lovecode.html
#
# cat build/static/css/main*.css >  ../../lovecodebackend/static/lovecodebackend/css/main.css
# cat build/static/js/main*.js > ../../lovecodebackend/static/lovecodebackend/js/main.js
# cat build/static/js/*.chunk.js > ../../lovecodebackend/static/lovecodebackend/js/chunk.js
#
# cat build/asset-manifest.json > ../../lovecodebackend/static/lovecodebackend/manifest/asset-manifest.json
