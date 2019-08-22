import statusModel from '../models/status.mdl';
import CreateService from '../services/create.service';
import ViewService from '../services/view.service';

const viewService = new ViewService(statusModel);
const createService = new CreateService(statusModel);

let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}


export const statusService = {
    getStatusByNum :(status_num)=> viewService.findAll({status_num}),
}

const statusCtrl = {
    create : (req,res) => {
        createService.create(req.body)
        .then(result=>res.json({data:result,success:true}))
        .catch(err=> res.json(errMsg(err)))
    },
    view:(req,res)=> {
        viewService.findAll()
        .then(result=>res.json({data:result,success:true}))
        .catch(err=>res.json(errMsg(err)))
    }
}

export default statusCtrl;
