#!/bin/bash
echo "updating Inspector to $1"
pushd /tmp
rm -r -f /tmp/inspector
# convert the Chrome release number to an SVN version number
curl http://src.chromium.org/svn/releases/$1/DEPS | grep '/trunk/Source@' | sed -e "s/^.*@//;s/'.*$//" | xargs -i svn co http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/inspector@{} inspector
find inspector/ -name ".svn" | xargs rm -r -f
popd
# All of front-end
cp -r -f /tmp/inspector/front-end/* ./inspector/front-end
# But only the json file from the rest
cp -f /tmp/inspector/Inspector.json ./inspector



