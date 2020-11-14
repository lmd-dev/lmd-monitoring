/**
 * LMD Websites Monitoring Settings
 */
const settings = {
    //Monitoring settings
    monitoring: {
        //Interval between to checks (in ms)
        interval: 90000
    },

    //Database settings
    database: {
        //DBMS dialect 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
        dialect: 'mysql',
        //DBMS host address/name
        host: '127.0.0.1',              
        //DBMS listening port
        port: '3306',                   
        //Database name
        dbName: 'lmd-monitoring',
        //User login
        user: 'lmd',         
        //User password
        password: 'lmd',     
        //Does Sequelize have to log everything ?
        logging: false,
        //Force Sequelize to initialize tables
        force: false
    },

    //SMTP settings
    smtp: {
        //SMTP host address/name
        host: 'smtp.ethereal.email',
        //SMTP port
        port: 587,
        //Set to false for 587 et 25 ports. Set to true for 465 port
        secure: false,
        //User account to send mail from the given SMTP
        user: 'zkr2hrdfcc6xqkv2@ethereal.email',
        //User password
        password: 'NwTFw2qHGqj7vdwdJa'
    },

    //HTTP options
    http: {
        port: 80
    },

    //HTTPS options
    https: {
        enable: true,
        port: 443,
        keyFile: 'src/web-server/ssl/key.pem',
        certFile: 'src/web-server/ssl/cert.pem'
    },

    //Web sessions
    sessions: {
        secretKey: 'lmd-secret-passphrase',
        httpsOnly: true
    }
}

module.exports = settings;
