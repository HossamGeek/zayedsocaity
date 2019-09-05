import {midParse,express} from '../../config/imports.config';
import registerMidWr from '../middleware/register.midWr';
import registerCtrl from '../controllers/register.ctrl';
const registerRouter = express.Router();


registerRouter.post('',midParse,registerMidWr.configUserData,registerCtrl.create);



module.exports = registerRouter;