import {uniqId} from '../../config/imports.config';
const evaluationMidWr = {
    configEvaluationData : (req,res,next)=>{
        let evaluationBdy = req.body;
        evaluationBdy['id'] = uniqId('evaluation@%');
        if(!evaluationBdy['evaluation_name'] || !evaluationBdy['evaluation_name'].length)
            res.json({data:'evaluation_name is required please define it',success:false});
        else {req.body = evaluationBdy; next();}
    }
};

export default evaluationMidWr;