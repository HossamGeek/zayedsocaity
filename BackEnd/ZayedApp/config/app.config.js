import {logger,cors,bodyParser,path} from './imports.config';
import Router from'../src/routers/endPoint';
import './DB.config';


const appConfig = app => {
    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    //app.use(express.static(path.join(__dirname, 'public')));
    Router(app);    
}

export default appConfig;