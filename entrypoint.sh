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
touch testCreated.txt
echo "testing" > testCreated.txt
ls -la 


/usr/local/bin/karma start karma.conf.js
ls -la 
ls -la reports 
echo "reports/coverage/firefox"
ls -la reports/coverage/firefox
echo "reports/test"
ls -la reports/tests


#wait 5000
