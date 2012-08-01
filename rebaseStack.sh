#!/bin/sh
set -e -x
git checkout syncToWebKit
git checkout remoteDebug
git checkout DebuggerProtocol
git checkout extendable
git checkout purple

git rebase syncToWebKit remoteDebug
git rebase remoteDebug DebuggerProtocol
git rebase DebuggerProtocol extendable
git rebase extendable purple
git rebase purple master
