#! /bin/bash
echo "running entrypoint.sh..."
pwd

#ls -la
#ls -la reports/
#ls -la reports/coverage
whoami
#echo "ls -la /home/olov/"
#ls -la /home/olov/
#echo "ls -la /home/olov/workspace/cora-jsclient"
#ls -la /home/olov/workspace/cora-jsclient
#echo "ls -la /home/olov/trams/"
#ls -la /home/olov/trams/
#echo ""
#mkdir /home/olov/trams/tramsDir


echo "ls -la "
ls -la 
echo "ls -la src"
ls -la src
ls -la 


/usr/local/bin/karma start karma.conf.js
ls -la 
ls -la reports 
echo "reports/coverage/firefox"
ls -la reports/coverage/firefox
echo "reports/tests"
ls -la reports/tests

mkdir jsReportFromDocker
cp reports/tests jsReportFromDocker/test -r
cp reports/coverage jsReportFromDocker/coverage -r


#wait 5000
