import {express} from './config/imports.config';
import appConfig from './config/app.config';

const app = express(),
     http = require('http').Server(app),
     port = 3333;
     
     appConfig(app);

http.listen(process.env.port || port,()=>{
    console.log('running in port ' + port);    
})