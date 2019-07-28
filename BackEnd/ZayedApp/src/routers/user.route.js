import {midParse,express} from '../../config/imports.config';
import registerMidWr from '../middleware/register.midWr';
import registerCtrl from '../controllers/register.ctrl';
const usrRouter = express.Router();


usrRouter.post('/register',midParse,registerMidWr.configUserData,registerCtrl.create);



module.exports = usrRouter;