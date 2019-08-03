export const configResultData = (data) => {
    return data.length ? {data:data,success:true}:
     {data:'Transaction Failed',err:'data your search it not found',success:false}}