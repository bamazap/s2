mkdir api
cd backend
git ls-files . | grep -v tests | xargs -I '{}' rsync -R '{}' ../api
cp index.fcgi ../api
cd ..
if [ $# -eq 0 ]; then
    scp -r frontend/dist/* api .htaccess athena.dialup.mit.edu:web_scripts/s2
else
    scp -r frontend/dist/* api .htaccess athena.dialup.mit.edu:/afs/athena.mit.edu/activity/c/crossp/web_scripts/s2
fi
rm -r api
