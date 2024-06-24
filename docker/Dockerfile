ARG ARCH=
FROM ${ARCH}alpine:3.20

RUN apk update \
    && apk add bash gawk ffmpeg apache2

ADD src/* /opt/live-stream-viewport/
ADD docker/httpd.conf /etc/apache2

RUN echo >/opt/live-stream-viewport/starter.sh '/usr/sbin/httpd -k start && /opt/live-stream-viewport/live-stream-viewport.sh "$@"'

EXPOSE 80
ENTRYPOINT [ "/bin/bash", "/opt/live-stream-viewport/starter.sh" ]
