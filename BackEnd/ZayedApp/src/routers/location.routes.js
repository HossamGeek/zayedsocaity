import {midParse,express} from '../../config/imports.config';
import locationMidWr from '../middleware/location.midWr';
import locationCtrl from '../controllers/location.ctrl';
const locationRouter = express.Router();

locationRouter.route('')
.post(midParse,locationMidWr.configLocationData,locationCtrl.create)
.get(locationCtrl.view);


module.exports = locationRouter;