import {midParse,express} from '../../config/imports.config';
import usrMidWr from '../middleware/user.midWr';
import usrCtrl from '../controllers/user.ctrl';
const usrRouter = express.Router();


usrRouter.route('')
.post(midParse,usrMidWr.configUserData,usrCtrl.create)
.get(usrCtrl.view);


module.exports = usrRouter;