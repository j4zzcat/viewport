ARG ARCH=
FROM ${ARCH}alpine:3.20


RUN apk update \
    && apk add bash gawk ffmpeg mc python3 py3-pip nodejs npm

ENV TARGET_DIR=/opt/viewport
ENV VIEWPORT_SRC_DIR=${TARGET_DIR}/src/viewport
ENV REFLECTOR_SRC_DIR=${TARGET_DIR}/src/reflector
ENV PLAYER_SRC_DIR=${TARGET_DIR}/src/player

ADD / /opt/viewport/
RUN python -m venv ${VIEWPORT_SRC_DIR}/.venv \
      && source ${VIEWPORT_SRC_DIR}/.venv/bin/activate \
      && pip install -r ${VIEWPORT_SRC_DIR}/requirements.txt \
      && cd ${REFLECTOR_SRC_DIR} \
      && npm i --save \
      && cd ${PLAYER_SRC_DIR} \
      && npm i --save \
      && npx webpack

EXPOSE 8001
ENTRYPOINT [ "/bin/bash", "/opt/viewport/bin/viewport" ]
