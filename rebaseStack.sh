#!/bin/sh
set -e -x
git rebase syncToWebKit iframeable
git rebase iframeable remoteDebug
git rebase remoteDebug DebuggerProtocol
git rebase DebuggerProtocol extendable
git rebase extendable master

