#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"/..

IMAGE_TAG='1.1.0'
IMAGE_NAME='j4zzcat/viewport'

docker buildx create --name container --driver=docker-container 2>/dev/null

docker buildx build \
  --tag "$IMAGE_NAME:$IMAGE_TAG" \
  --tag "$IMAGE_NAME:latest" \
  --platform linux/arm64,linux/amd64 \
  --builder container \
  --push \
  -f build/Dockerfile .

