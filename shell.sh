#!/bin/bash
docker stop mynginx-image
docker rm mynginx-container
docker build -t mynginx-image .
docker run \
-p 80:80 \
-d --name mynginx-container \
mynginx-image
