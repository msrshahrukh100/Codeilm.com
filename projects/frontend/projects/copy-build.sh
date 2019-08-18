npm run build
{
echo "Trying git rm" &&
git rm -r ../../static/js/ &&
git rm -r ../../static/css/ &&
git rm -r ../../static/media/ &&
echo "Git rm successful" &&
mkdir ../../static/
} ||
{
echo "Some error occured while doing git rm, removing them using rm"
rm -r ../../static &&
echo "rm successful" &&
mkdir ../../static/
}

echo "Compying files now"
cp -r build/static/* ../../static/
cp -r build/index.html ../../templates/projects.html
echo "*** Build successfully copied ***"