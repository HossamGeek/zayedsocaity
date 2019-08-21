import {DataTypes} from '../../config/DB.config';
const Op = DataTypes.Op;

export default class ViewService {
    constructor(model){
         this._model = model;   
    }
    findAll () 
        {this._model.findAll();}

    findByWithOr (With,Where)
        { this._model.findAll({where   : With,[Op.or]:Where})}

    count (Where = {}) 
        {this._model.count({where   : Where})}
    
    findBy (Where) 
        {this._model.findAll({where : Where})}

}