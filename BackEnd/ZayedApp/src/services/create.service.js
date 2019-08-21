export default class CreateService{
    constructor(model){
        this._model = model;
    }
    create (modelData)   
            {
                this._model.sync({ force    : false })
                .then(() =>  this._model.create(modelData))
            }
}