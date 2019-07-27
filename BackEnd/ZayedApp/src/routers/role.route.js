import {midParse,express} from '../../config/imports.config';
import roleMidWr from '../middleware/role.midWr';
import roleCtrl from '../controllers/role.ctrl';
const roleRouter = express.Router();

roleRouter.route('')
.post(midParse,roleMidWr.configRoleData,roleCtrl.create)
.get(roleCtrl.view);


module.exports = roleRouter;