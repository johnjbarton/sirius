#!/bin/bash
pushd /tmp
rm -r -f /tmp/inspector
curl http://src.chromium.org/svn/releases/$1/DEPS | grep '/trunk/Source@' | sed -e "s/^.*@//;s/'.*$//" | xargs -i svn co http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/inspector/front-end@{} inspector/front-end/
find inspector/ -name ".svn" | xargs rm -r -f
popd
cp -r -f /tmp/inspector/* ./inspector

