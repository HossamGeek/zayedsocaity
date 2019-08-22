export default class CreateService{
    constructor(model){
        this._model = model;
    }
    create (modelData)   
            {
                return this._model.sync({ force    : false })
                .then(() =>  this._model.create(modelData))
            }
   createMulti (modelData){
        return this._model.sync({ force    : false })
        .then(() =>  this._model.bulkCreate(modelData))
   }         
}