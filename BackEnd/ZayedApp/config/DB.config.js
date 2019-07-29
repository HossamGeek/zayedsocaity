import {Sequelize} from './imports.config';

let sequelize;
const env = process.env;


if (process.env.NODE_ENV === 'production')    {
        sequelize = "";
    } else {
        sequelize = new Sequelize(env.dbName,env.dbUsername,env.dbPass,
            {
                    define: {
                    charset: 'utf8',
                    collate: 'utf8_general_ci', 
                    timestamps: true
                    },
                
                    host: env.dbHost,
                    port:env.dbPort,
                    dialect: 'mysql',
                    logging: false  
            });
        }

const DataTypes = Sequelize;

sequelize.authenticate().then(()=>{
    console.log('Database is connection');
}).catch(err=>{
    console.log("can't connection Database cause of " + err );
})


export {sequelize,DataTypes};