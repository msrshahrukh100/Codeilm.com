npm run build

git rm -r ../../static/js/
git rm -r ../../static/css/
#mkdir ../../static/
cp -r build/static/* ../../static/
cp -r build/index.html ../../templates/usermanagement.html
