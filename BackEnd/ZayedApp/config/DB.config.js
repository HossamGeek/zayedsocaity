import Sequelize from 'sequelize';
const DBName = "";
const root = '';
const pass = '';

const sequelize = new Sequelize(DBName,root,pass,{
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        timestamps: true
      },
     
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
});
const DataTypes = Sequelize;

sequelize.authenticate().then(()=>{
    console.log('Database is connection');
    
}).catch(err=>{
    console.log("can't connection Database cause of " + err );
})


export {sequelize,DataTypes};