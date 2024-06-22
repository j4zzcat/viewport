ARG ARCH=
FROM ${ARCH}alpine:3.20

RUN apk update \
    && apk add bash gawk ffmpeg apache2

ADD * /tmp/
ENV HOME_DIR=/opt/unifi-protect-camera-kiosk
RUN mkdir -p "$HOME_DIR" \
    && cp /tmp/kiosk-launcher.sh "$HOME_DIR" \
    && chmod a+x "$HOME_DIR/kiosk-launcher.sh" \
    && ln -s "$HOME_DIR"/kiosk-launcher.sh /usr/local/bin/ \
    && cp /tmp/kiosk.html.template "$HOME_DIR" \
    && cp /tmp/httpd.conf /etc/apache2 \
    && rm -rf /tmp/*

EXPOSE 80
ENTRYPOINT ["/bin/bash", "/usr/local/bin/kiosk-launcher.sh"]
