import {midParse,express} from '../../config/imports.config';
import issueMidWr from '../middleware/issue.midWr';
import issueCtrl from '../controllers/issue.ctrl';
const issueRouter = express.Router();

issueRouter.route('')
.post(midParse,issueMidWr.configIssueData,issueCtrl.create)
.get(issueCtrl.view);


module.exports = issueRouter;