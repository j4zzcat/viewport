ARG ARCH=
#FROM ${ARCH}ubuntu:24.10
FROM ${ARCH}alpine:3.20

RUN apk update \
      && apk add bash curl ffmpeg \
               python3 py3-pip py3-virtualenv \
               nodejs npm

ENV SWS_VERSION=2.32.2
WORKDIR /tmp
RUN curl -Lo sws.tgz https://github.com/static-web-server/static-web-server/releases/download/v"$SWS_VERSION"/static-web-server-v"$SWS_VERSION"-$(uname -m)-unknown-linux-musl.tar.gz \
      && tar -xzvf sws.tgz \
      && cp /tmp/static-web-server-v"$SWS_VERSION"-$(uname -m)-unknown-linux-musl/static-web-server /usr/local/bin \
      && rm -rf /tmp

ENV VIEWPORT_DIR=/opt/viewport
ENV VIEWPORT_SRC_DIR=${VIEWPORT_DIR}/src/viewport
ENV REFLECTOR_SRC_DIR=${VIEWPORT_DIR}/src/reflector
ENV PLAYER_SRC_DIR=${VIEWPORT_DIR}/src/player

ADD / /opt/viewport/
RUN pip install --break-system-packages -r ${VIEWPORT_SRC_DIR}/requirements.txt \
      && cd ${REFLECTOR_SRC_DIR} \
      && npm i --save --no-package-lock \
      && cd ${PLAYER_SRC_DIR} \
      && npm i --save --no-package-lock

WORKDIR /

EXPOSE 8001
EXPOSE 8002
EXPOSE 8003
EXPOSE 8004
ENTRYPOINT [ "/bin/bash", "/opt/viewport/bin/viewport" ]
