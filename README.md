# LMD Websites Monitoring

LMD Websites Monitoring is a Node.JS application which monitor your websites.
When a problem is detected (URL broken, expired SSL certificat), you are notified by e-mail.

LMD Websites Monitoring give a web interface to check the status of your websites.

# Installation
 1. Download files on your server
 2. Create a database on your DBMS
 3. Update settings with your data
 4. Start the node.js app "/monitoring.js" 
 5. Import /sql/create-default-user.sql to create the default user
 6. Enjoy !

You have to use the default user (waiting users management is done) : 
 - User : lmd
 - Password : lmd
 - Email : needs to be updated from the database

# Settings

The settings of the application can be edited with the /settings.js file

### Monitoring
 - interval : The delay between two checking of the status of the websites

### Database
 - dialect : The dialect to use for the database : "mysql" | "postgres" | "mariadb" | "mssql"
 - host : Database server hostname or address
 - port : Database server port
 - dbName : Database name
 - user : Database user account
 - password : Database user password
 - logging : Does Sequelize have to log everything ?
 - force : Do you want Sequelize to initialize database tables ? (usefull the first start)

### SMTP
 - host : SMTP hostname or address
 - port : SMTP port to use
 - secure : true if port is 465, false else
 - user : SMTP user account
 - password : SMTP user password

### HTTP
 - port : Listening port for HTTP server

### HTTPS
 - enable : Do you want to enable HTTPS ?
 - port : Listening port for HTTPS server
 - keyFile : path to the key file of the certificate
 - certFile : path to the certificate file

### Sessions
 - secretKey : Sessions encryption key
 - httpsOnly : Use session only on HTTPS connections

# Coming soon

 - Users management




