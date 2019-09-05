import {midParse,express} from '../../config/imports.config';
import evaluationMidWr from '../middleware/evaluation.midWr';
import evaluationCtrl from '../controllers/evaluation.ctrl';
const evaluationRouter = express.Router();

evaluationRouter.route('')
.post(midParse,evaluationMidWr.configEvaluationData,evaluationCtrl.create)
.get(evaluationCtrl.view);


module.exports = evaluationRouter;