import {midParse,express} from '../../config/imports.config';
import issueMidWr from '../middleware/issue/issue.midWr';
import issueCtrl from '../controllers/issue/issue.ctrl';
import IssueForm from '../controllers/issue/issue.create.form';


const issueRouter = express.Router();
const issueForm  = new IssueForm();

issueRouter.route('')
.post(midParse,issueMidWr.configIssueData,issueCtrl.create);

issueRouter.route('/new')
    .post(midParse,issueMidWr.configIssueData,issueForm.create)
    .get(issueForm.view);



issueRouter.get('/usr',issueMidWr.userSearch,issueCtrl.view);
issueRouter.get('/id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/location_id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/issue_num',issueMidWr.customSearch,issueCtrl.view);

module.exports = issueRouter;