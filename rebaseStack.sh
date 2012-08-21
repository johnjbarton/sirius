#!/bin/sh
set -e -x
git checkout syncToWebKit
git checkout built-devtools
git checkout remoteDebug
git checkout DebuggerProtocol
git checkout extendable
git checkout purple

git rebase syncToWebKit  built-devtools
git rebase remoteDebug DebuggerProtocol
git rebase DebuggerProtocol extendable
git rebase extendable purple
git rebase purple master
