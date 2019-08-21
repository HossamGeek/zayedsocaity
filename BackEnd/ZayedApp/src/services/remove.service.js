export default class RemoveService {
    constructor(model){
        this._model = model;
    }
    forceRemove(id) 
        {this._model.destroy({where:id})} 
}


