import {midParse,express} from '../../config/imports.config';
import loginMidWr from '../middleware/login.midWr';
import loginCtrl from '../controllers/login.ctrl';
const loginRouter = express.Router();


loginRouter.post('',midParse,loginMidWr.configUserData,loginCtrl.view);



module.exports = loginRouter;