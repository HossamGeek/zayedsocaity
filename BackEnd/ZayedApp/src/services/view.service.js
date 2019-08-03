import {DataTypes} from '../../config/DB.config';
const Op = DataTypes.Op;

export const findAllService = Model => Model.findAll();

//With here means group of data to find by it such like this {address:"cairo"}
//Where here means as arr of objects like this [{email:{$email},{username:{$username},}
export const findByWithOrService = (Model,With,Where) => Model.findAll({where:With,[Op.or]:Where}); 

export const countService = (Model,Where = {}) => Model.count({where:Where});

export const findByService = (Model,Where) => Model.findAll({where:Where});