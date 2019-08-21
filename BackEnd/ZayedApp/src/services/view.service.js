import {DataTypes} from '../../config/DB.config';
const Op = DataTypes.Op;

export default class ViewService {
    constructor(model){
         this._model = model;   
    }
    findAll () 
        {return this._model.findAll();}

    findByWithOr (With,Where)
        {return this._model.findAll({where   : With,[Op.or]:Where})}

    count (Where = {}) 
        {return this._model.count({where   : Where})}
    
    findBy (Where) 
        {return this._model.findAll({where : Where})}

}