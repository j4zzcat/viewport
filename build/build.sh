#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR="$SCRIPT_DIR/.."
cd "$ROOT_DIR"

VERSION=$(awk <src/viewport/resource/settings.toml -F '"' '/version/{print $2}')
MAJOR=$(echo "$VERSION" | awk -F '.' '{print $1}')
MINOR=$(echo "$VERSION" | awk -F '.' '{print $2}')
PATCH=$(echo "$VERSION" | awk -F '.' '{print $3}')
IMAGE_NAME='j4zzcat/viewport'
echo "Building version $MAJOR.$MINOR.$PATCH"
docker buildx create --name container --driver=docker-container 2>/dev/null

docker buildx build \
  --tag "$IMAGE_NAME:$MAJOR.$MINOR.$PATCH" \
  --tag "$IMAGE_NAME:$MAJOR.$MINOR" \
  --tag "$IMAGE_NAME:latest" \
  --platform linux/arm64,linux/amd64 \
  --builder container \
  --push \
  -f build/Dockerfile .

