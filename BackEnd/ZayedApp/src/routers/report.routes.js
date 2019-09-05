import {midParse,express} from '../../config/imports.config';
import reportMidWr from '../middleware/report.midWr';
import reportCtrl from '../controllers/report.ctrl';
const reportRouter = express.Router();

reportRouter.route('')
.post(midParse,reportMidWr.configReportData,reportCtrl.create)
.get(reportCtrl.view);


module.exports = reportRouter;