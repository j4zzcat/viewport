ARG ARCH=
FROM ${ARCH}alpine:3.20

RUN apk update \
    && apk add bash gawk ffmpeg apache2

ADD src/* /opt/live-stream-viewport/
RUN sed --in-place -e 's|\(<Directory "/usr/local/apache2/htdocs">\)|\1\nHeader set Access-Control-Allow-Origin "*"|' /etc/apache2/httpd.conf
RUN echo >/opt/live-stream-viewport/starter.sh '/usr/sbin/httpd -k start && /opt/live-stream-viewport/live-stream-viewport.sh "$@"'

EXPOSE 80
ENTRYPOINT [ "/bin/bash", "/opt/live-stream-viewport/starter.sh" ]
