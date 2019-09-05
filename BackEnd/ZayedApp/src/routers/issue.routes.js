import {midParse,express} from '../../config/imports.config';
import issueMidWr from '../middleware/issue/issue.midWr';
import issueCtrl from '../controllers/issue/issue.ctrl';
import IssueForm from '../controllers/issue/issue.create.form';
import issueStatusCtrl from '../controllers/issue/status/issue.status.ctrl';
import issueStatusMidWr from '../middleware/issue/issueStatus.midWr';
import issueLikeCtrl from '../controllers/issue/like/issue_like.ctrl';
import issueDisLikeCtrl from '../controllers/issue/dislike/issue_dislike.ctrl';


const issueRouter = express.Router();
const issueForm  = new IssueForm();

issueRouter.route('')
.post(midParse,issueMidWr.configIssueData,issueCtrl.create);

issueRouter.route('/new')
    .post(midParse,issueMidWr.configIssueData,issueForm.create)
    .get(issueForm.view);


issueRouter.route('/status')
 .post(issueStatusMidWr.checkIssueStatusBody,issueStatusCtrl.create)
 .get(issueStatusCtrl.view);


 issueRouter.route('/like')
     .post(issueMidWr.issueLikeData,issueLikeCtrl.pullUser)
     .get(issueLikeCtrl.find);

issueRouter.route('/dislike')
     .post(issueMidWr.issueDisLikeData,issueDisLikeCtrl.pullUser)
     .get(issueDisLikeCtrl.find);


issueRouter.get('/usr',issueMidWr.userSearch,issueCtrl.view);
issueRouter.get('/id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/location_id',issueMidWr.customSearch,issueCtrl.view);
issueRouter.get('/issue_num',issueMidWr.customSearch,issueCtrl.view);

module.exports = issueRouter;