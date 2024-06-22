version=0.11

docker buildx build \
  -f Dockerfile \
  -t j4zzcat/unifi-protect-camera-kiosk:"$version" \
  --platform linux/arm64 \
  .

docker tag j4zzcat/unifi-protect-camera-kiosk:"$version" j4zzcat/unifi-protect-camera-kiosk:latest

# other platforms:
# linux/amd64
# linux/amd64/v2
