#!/bin/bash
set -e

# Build docker image
sudo docker build --no-cache -t $IMAGE .