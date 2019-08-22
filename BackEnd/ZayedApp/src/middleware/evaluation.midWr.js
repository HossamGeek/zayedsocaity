const evaluationMidWr = {
    configEvaluationData : (req,res,next)=>{
        let evaluationBdy = req.body;
        if(!evaluationBdy['evaluation_name'] || !evaluationBdy['evaluation_name'].length)
            res.json({data:'evaluation_name is required please define it',success:false});
        else {req.body = evaluationBdy; next();}
    }
};

export default evaluationMidWr;