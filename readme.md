**jsclient is the js client for Cora.**

**Build and test**
The docker image that is built require two parameters, gid and uid for the user running the maven command. These are provided by either setting the "docker.buildArg.uid" (usually "id -u") and "docker.buildArg.gid" (usually "id -g") pair to correct values in the settings.xml file or by invoking mvn with the appropriate flags.
