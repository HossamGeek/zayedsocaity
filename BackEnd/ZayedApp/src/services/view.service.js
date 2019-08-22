import {DataTypes} from '../../config/DB.config';
const Op = DataTypes.Op;

export default class ViewService {
    constructor(model){
         this._model = model;   
    }
    findAll (Where = {}) 
        {return this._model.findAll({where : Where})}

    compare (compareData,Where ={})
        {return this._model.findAll({where   : Where,[Op.or]:compareData})}

    numberRows (Where = {}) 
        {return this._model.count({where   : Where})}
    
    
    sort (Where = {},include = [],limit = 1,sort = 'DESC')    
        {
            return this._model.findAll({
                limit,
                include,
                where : Where,
                order: [ [ 'createdAt', sort ]]
            })
        }

}