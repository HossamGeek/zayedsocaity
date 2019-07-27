import {express} from './config/imports.config';
import appConfig from './config/app.config';

const app = express(),
     http = require('http').Server(app),
     port = 8000;

appConfig(app);

http.listen(process.env.PORT || port,()=>{
    console.log('running in port ' + port);    
})