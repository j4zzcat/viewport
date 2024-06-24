#! /bin/bash

usage() {
    echo "usage: $(basename $0) [-p]"
}

error_message_file=$(mktemp /tmp/XXXXX)
valid_args=$(getopt hp "$@" 2>"$error_message_file")
if [[ $? -ne 0 ]]; then
    echo "error. $(cat "$error_message_file")" 2>/dev/stderr
    usage && exit 129
fi

eval set -- "$valid_args"
while :; do
  case "$1" in
    -p | --push)
      OPTION_PUSH='true'
      shift 1
      ;;

    -h | --help)
      usage && exit 0
      ;;

    --) shift;
      break
      ;;
  esac
done

version=$(git describe --tags 2>/dev/null || echo 'latest')
image_name='j4zzcat/live-stream-viewport'

docker buildx build \
  -f Dockerfile \
  -t "$image_name":"$version" \
  --platform linux/arm64 \
  ..

if [[ "$version" != "latest" ]]; then
  docker tag "$image_name:$version" "$image_name:latest"
fi

if [[ ! -z "$OPTION_PUSH" ]]; then
  docker push "$image_name":"$version"
  if [[ "$version" != "latest" ]]; then
    docker push "$image_name:latest"
  fi
fi


# other platforms:
# linux/amd64
# linux/amd64/v2
