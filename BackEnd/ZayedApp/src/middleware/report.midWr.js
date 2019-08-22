const reportMidWr = {
    configReportData : (req,res,next)=>{
        let reportBdy = req.body;
        if(!reportBdy['report_name'] || !reportBdy['report_name'].length)
            res.json({data:'report_name is required please define it',success:false});
        else {req.body = reportBdy; next();}
    }
};

export default reportMidWr;