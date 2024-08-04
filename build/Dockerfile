ARG ARCH=
FROM ${ARCH}ubuntu:24.10

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update \
      && apt install -y bash git vim mc gawk ffmpeg \
               python3 python3-all-venv python3-pip \
               nodejs npm \
               git g++ unzip automake tclsh cmake pkg-config

ENV SRS_BUILD_DIR=/opt/srs-build
ENV SRS_DIR=/opt/srs

RUN git clone https://github.com/ossrs/srs.git ${SRS_BUILD_DIR} \
      && cd ${SRS_BUILD_DIR} \
      && git checkout v6.0.48 \
      && cd trunk \
      && ./configure \
      && make \
      && mkdir -p ${SRS_DIR}/objs \
      && cp -r ${SRS_BUILD_DIR}/trunk/conf ${SRS_DIR} \
      && cp ${SRS_BUILD_DIR}/trunk/objs/srs ${SRS_DIR}/objs \
      && cp -r ${SRS_BUILD_DIR}/trunk/objs/nginx ${SRS_DIR}/objs \
      && ln -s ${SRS_DIR}/objs/srs /usr/local/bin/srs \
      && rm -rf ${SRS_BUILD_DIR}

ENV VIEWPORT_DIR=/opt/viewport
ENV VIEWPORT_SRC_DIR=${VIEWPORT_DIR}/src/viewport
ENV REFLECTOR_SRC_DIR=${VIEWPORT_DIR}/src/reflector
ENV PLAYER_SRC_DIR=${VIEWPORT_DIR}/src/player

ADD / /opt/viewport/
RUN pip install --break-system-packages -r ${VIEWPORT_SRC_DIR}/requirements.txt \
      && cd ${REFLECTOR_SRC_DIR} \
      && npm i --save \
      && cd ${PLAYER_SRC_DIR} \
      && npm i --save

EXPOSE 8001
ENTRYPOINT [ "/bin/bash", "/opt/viewport/bin/viewport" ]
