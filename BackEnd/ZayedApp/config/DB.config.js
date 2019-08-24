import {Sequelize} from './imports.config';

let sequelize;
const env = process.env;

const define = {   
       define: {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        timestamps: true,
        freezeTableName: true
        }
    };

    if (process.env.NODE_ENV === 'production')    {
    
        sequelize = new Sequelize(env.dbServerName,env.dbServerUser,env.dbServerPass,
            {
                    define,
                    host: env.dbServerHost,
                    port:env.dbServerPort,
                    dialect: 'mysql',
                    logging: false  
            });
    } else {
        sequelize = new Sequelize(env.dbName,env.dbUsername,env.dbPass,
            {
                   define,     
                    host: env.dbHost,
                    port:env.dbPort,
                    dialect: 'mysql',
                    logging: false  
            });
        }

const DataTypes = Sequelize;

sequelize.authenticate().then(()=>{
    console.log('Database connected');
}).catch(err=>{
    console.log("can't connect to Database cause of " + err );
})


export {sequelize,DataTypes};