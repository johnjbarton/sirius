#!/bin/sh
set -e -x
git push -f origin  syncToWebKit 
git push -f origin  iframeable  
git push -f origin  remoteDebug  
git push -f origin  DebuggerProtocol  
git push -f origin  extendable  
git push -f origin  purple  
git push -f origin  master  
