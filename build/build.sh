#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd "$SCRIPT_DIR"/..

MAJOR='1'
MINOR='1'
PATCH='5'
IMAGE_NAME='j4zzcat/viewport'

docker buildx create --name container --driver=docker-container 2>/dev/null

docker buildx build \
  --tag "$IMAGE_NAME:$MAJOR.$MINOR.$PATCH" \
  --tag "$IMAGE_NAME:$MAJOR.$MINOR" \
  --tag "$IMAGE_NAME:latest" \
  --platform linux/arm64,linux/amd64 \
  --builder container \
  --push \
  -f build/Dockerfile .

