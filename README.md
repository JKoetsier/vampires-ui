# Vampires Frontend

## Local usage:

* The [Vampires back-end](https://bitbucket.org/cdumitru/vampires-akka)
  has to be installed and run. The default port it listens to is 4567,
  which is the default port the Vampires UI communicates with. On the
  Vampires UI side this can be changed in app/src/config.js

* Install Node.js and NPM. These are needed for dependency management.

        yum install nodejs npm
        
            or
            
        dnf install nodejs npm

            or
            
        apt-get install nodejs npm
        
            or
            
        ...


* In project root, do:

        npm install
        grunt run

* Navigate to http://localhost:8080 in your browser to load the user
  interface.

