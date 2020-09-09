FROM ubuntu:latest
ENV MOZ_FORCE_DISABLE_E10S=true
ARG uid
ARG gid
ARG sut_path

RUN groupadd -g ${gid} -o karmare
RUN useradd -m -u ${uid} -g ${gid} -o -s /bin/bash karmare

RUN mkdir -p ${sut_path}
RUN chown karmare:karmare ${sut_path}

RUN apt update
RUN apt --yes install chromium-browser chromium-browser-l10n

RUN apt --yes install firefox=77.0.1

RUN apt --yes install nodejs npm

COPY package.json /tmp/package.json

RUN apt --yes install jq

RUN jq '.dependencies | keys[] as $k | "\($k)@\(.[$k])"' /tmp/package.json | xargs -i npm install --global --save '{}'

RUN jq '.devDependencies | keys[] as $k | "\($k)@\(.[$k])"' /tmp/package.json | xargs -i npm install --global --save '{}'

USER karmare
WORKDIR ${sut_path}

ENTRYPOINT karma start karma.conf.js