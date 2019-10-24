#!/bin/sh
echo 'RUN SERVER'
pkill node
nohup npm run start &
