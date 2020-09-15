#FROM ubuntu:latest
#ENV MOZ_FORCE_DISABLE_E10S=true
#ARG uid
#ARG gid
#ARG sut_path
#
#RUN groupadd -g ${gid} -o olov
#RUN useradd -m -u ${uid} -g ${gid} -o -s /bin/bash olov
#
#RUN mkdir -p ${sut_path}
#RUN chown olov:olov ${sut_path}
#
#RUN apt update
#RUN apt --yes install chromium-browser chromium-browser-l10n
#
#RUN apt --yes install firefox
#
#RUN apt --yes install nodejs npm
#
#COPY package.json /tmp/package.json
#
#RUN apt --yes install jq
#
#RUN jq '.dependencies | keys[] as $k | "\($k)@\(.[$k])"' /tmp/package.json | xargs -i npm install --global --save '{}'
#
#RUN jq '.devDependencies | keys[] as $k | "\($k)@\(.[$k])"' /tmp/package.json | xargs -i npm install --global --save '{}'
#
#USER olov
#WORKDIR ${sut_path}
#
#ENTRYPOINT /usr/local/bin/karma start karma.conf.js

FROM fedora:32
# Set a useful default locale
RUN echo "export LANG=en_US.UTF-8" > /opt/export_LANG.sh
RUN echo "export LANGUAGE=en_US.UTF-8" >> /opt/export_LANG.sh
RUN echo "export LC_ALL=en_US.UTF-8" >> /opt/export_LANG.sh
ENV BASH_ENV=/opt/export_LANG.sh \
    ENV=/opt/export_LANG.sh \
    PROMPT_COMMAND="source /opt/export_LANG.sh"
 
ARG uid
ARG gid
ARG sut_path
ENV user=olov
#ARG user
#ARG userid
#ARG dockergroupid

#RUN useradd -d "/home/$user" -u $uid -U -G $gid -m -s /bin/bash $user
#RUN groupadd -r olov -g$gid && useradd -d "/home/$user" -u $uid -U -G $gid -m -s /bin/bash $user
RUN  useradd -d "/home/$user" -u $uid -U  -m -s /bin/bash $user

RUN dnf clean all && \
  dnf install \
  glibc-langpack-en \
  google-noto-sans-runic* \
  google-noto-sans-math-fonts \
  google-noto-sans-arabic* \
  firefox \
  node \
  npm -y && \
  dnf clean all
  

#RUN chown $user:$user /home/$user -R

#RUN chown $user:$user /opt/ -R
#RUN npm install -g karma-cli

#USER $user

#CMD  /home/$user/entrypoint.sh
#COPY ./src /home/$user/src
#COPY ./karma.core.js /home/$user/

#COPY ./package.json /home/$user/
#COPY ./karma-dev.conf.js /home/$user/
#COPY ./karma.conf.js /home/$user/

#RUN chown olov:olov /home/olov -R

#WORKDIR /home/olov
#USER olov
#RUN npm install karma@latest karma-chrome-launcher@latest karma-firefox-launcher@latest \
#karma-qunit@latest karma-coverage@latest karma-html-reporter@latest qunit@latest \
#karma-junit-reporter@latest --save-dev

#RUN mkdir -p ${sut_path}
#RUN chown olov:olov ${sut_path}
#RUN chown olov:olov /home/olov -R

#COPY ./entrypoint.sh /home/$user/
#RUN chmod a+x /home/$user/entrypoint.sh

#RUN mkdir /home/olov/trams
#RUN chown olov:olov /home/olov -R


#USER olov
WORKDIR /workspace


#ENTRYPOINT /usr/local/bin/karma start karma.conf.js
#ENTRYPOINT /usr/local/bin/karma start karma-dev.conf.js
#ENTRYPOINT /usr/local/bin/karma start karma-dev.conf.js

#CMD  /home/$user/entrypoint.sh

COPY ./entrypoint.sh .
COPY ./src ./src
RUN chmod a+x ./entrypoint.sh
CMD  ./entrypoint.sh
