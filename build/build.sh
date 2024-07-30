#! /bin/bash

usage() {
    echo "usage: $(basename $0) [-a]"
}

error_message_file=$(mktemp /tmp/XXXXX)
valid_args=$(getopt ha "$@" 2>"$error_message_file")
if [[ $? -ne 0 ]]; then
    echo "error. $(cat "$error_message_file")" 2>/dev/stderr
    usage && exit 129
fi

eval set -- "$valid_args"
while :; do
  case "$1" in
    -a | --all)
      shift 1
      ALL='true'
      ;;

    -h | --help)
      shift 1
      usage && exit 0
      ;;

    --) shift;
      break
      ;;
  esac
done

image_tag=$(git describe --tags 2>/dev/null || echo 'latest')
image_name='j4zzcat/viewport'

if [[ "$ALL" == 'true' ]]; then
  docker buildx create --name container --driver=docker-container 2>/dev/null

  docker buildx build \
    --tag "$image_name:$image_tag" \
    --tag "$image_name:latest" \
    --platform linux/arm64,linux/amd64 \
    --builder container \
    --push \
    -f docker/Dockerfile .

else
  # Default, no hassle build
  docker buildx build \
    -t "$image_name:$image_tag" \
    -t "$image_name:latest" \
    -f docker/Dockerfile .
fi

