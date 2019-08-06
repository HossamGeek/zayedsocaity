import {midParse,express} from '../../config/imports.config';
import issueMidWr from '../middleware/issue/issue.midWr';
import issueCtrl from '../controllers/issue/issue.ctrl';
import issueForm from '../controllers/issue/issue.create.form';
const issueRouter = express.Router();

issueRouter.route('')
.post(midParse,issueMidWr.configIssueData,issueCtrl.create);

issueRouter.post('/new',midParse,issueForm.createIssue)

issueRouter.get('/usr',issueMidWr.userSearch,issueCtrl.view);
issueRouter.get('/id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/location_id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/issue_num',issueMidWr.customSearch,issueCtrl.view);

module.exports = issueRouter;