#! /bin/bash
echo "running entrypoint.sh..."
/usr/local/bin/karma start karma.conf.js

mkdir jsReportFromDocker
cp reports/tests jsReportFromDocker/test -r
cp reports/coverage jsReportFromDocker/coverage -r
