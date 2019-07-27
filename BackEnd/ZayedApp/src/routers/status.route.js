import {midParse,express} from '../../config/imports.config';
import statusMidWr from '../middleware/status.midWr';
import statusCtrl from '../controllers/status.ctrl';
const statusRouter = express.Router();

statusRouter.route('')
.post(midParse,statusMidWr.configStatusData,statusCtrl.create)
.get(statusCtrl.view);


module.exports = statusRouter;