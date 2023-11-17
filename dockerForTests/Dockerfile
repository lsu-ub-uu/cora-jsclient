FROM fedora:32
# Set a useful default locale
RUN echo "export LANG=en_US.UTF-8" > /opt/export_LANG.sh
RUN echo "export LANGUAGE=en_US.UTF-8" >> /opt/export_LANG.sh
RUN echo "export LC_ALL=en_US.UTF-8" >> /opt/export_LANG.sh
ENV BASH_ENV=/opt/export_LANG.sh \
    ENV=/opt/export_LANG.sh \
    PROMPT_COMMAND="source /opt/export_LANG.sh"
 
RUN dnf clean all && \
  dnf install \
  glibc-langpack-en \
  google-noto-sans-runic* \
  google-noto-sans-math-fonts \
  google-noto-sans-arabic* \
  firefox \
  chromium \
  node \
  npm -y && \
  dnf clean all
  

RUN npm install karma@latest karma-chrome-launcher@latest karma-firefox-launcher@latest \
karma-qunit@latest karma-coverage@latest karma-html-reporter@latest qunit@latest \
karma-junit-reporter@latest -g --save-dev

WORKDIR /workspace

COPY ./dockerForTests/entrypoint.sh .
COPY ./dockerForTests/karma.conf.js .
COPY ./karma.core.js .

COPY ./src ./src
RUN chmod a+x ./entrypoint.sh
CMD  ./entrypoint.sh
