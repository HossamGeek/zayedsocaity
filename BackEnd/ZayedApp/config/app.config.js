import {logger,cors,bodyParser,path,session} from './imports.config';
import Router from'../src/routers/endPoint';
import './DB.config';


const appConfig = app => {
    app.use(cors());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(session({
        secret:"@#%#$^$%",
        saveUninitialized: true,
        resave:true,
        cookie:{maxAge:1000*60*60*7*24}
    }));
    //app.use(express.static(path.join(__dirname, 'public')));
    Router(app);    
}

export default appConfig;