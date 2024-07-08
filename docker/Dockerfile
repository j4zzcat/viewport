ARG ARCH=
FROM ${ARCH}alpine:3.20

RUN apk update \
    && apk add bash gawk ffmpeg apache2

ADD src/* /opt/viewport/
RUN sed --in-place -e 's|\(<Directory "/usr/local/apache2/htdocs">\)|\1\nHeader set Access-Control-Allow-Origin "*"|' /etc/apache2/httpd.conf
RUN echo >/opt/viewport/starter.sh '/usr/sbin/httpd -k start && /opt/viewport/viewport.sh "$@"'

EXPOSE 80
ENTRYPOINT [ "/bin/bash", "/opt/viewport/starter.sh" ]
