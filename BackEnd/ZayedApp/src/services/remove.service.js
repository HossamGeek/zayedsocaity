export default class RemoveService {
    constructor(model){
        this._model = model;
    }
    forceRemove(id) 
        { return this._model.destroy({where:id})} 
}


