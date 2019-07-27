const createService = (Model,modelData) =>  
                        Model.sync({ force: false }).then(() =>  Model.create(modelData));

                                    

export default createService;