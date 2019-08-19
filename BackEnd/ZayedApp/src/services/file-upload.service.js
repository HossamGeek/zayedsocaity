import {multer,multerS3,IBM} from '../../config/imports.config';
let videosType = new Set(['video/WebM','video/mp4','video/ogg']);
let imgsType = new Set(['image/jpeg','image/png','image/gif']);

let videosType = new Set(['video/WebM','video/mp4','video/ogg']);
let imgsType = new Set(['image/jpeg','image/png','image/gif']);

IBM.config.update ( {
    endpoint: process.env.ibmEndpoint,
    apiKeyId: process.env.ibmApiKeyId,
    cos_hmac_keys:process.env.ibmCosHmacKeys,
    ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
    serviceInstanceId:process.env.ibmServiceInstanceId,
    secretAccessKey: process.env.ibmAccess_key_id,
    accessKeyId: process.env.ibmSecret_access_key,
    region:"eu-de"
});

const s3 = new IBM.S3();

const bucket = 'appimages';

const storage = multerS3({
      s3,
    bucket,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname}); //file.fieldname
    },
    key: function (req, file, cb) {
      cb(null, (Math.floor(Date.now() * Math.random(1))).toString())
    }
});


const fileFilter = (req,file,cb)=>{
    let fileName = file.fieldname;
    let fileType =file.mimetype;

    if(fileName === 'imgs' && imgsType.has(fileType))
        cb(null,true);
    else if(fileName === 'videos' && videosType.has(fileType))
        cb(null,true);
    else
        cb(new Error("invalid type,for imgs only jpeg or png and videos only mp4 or WebM or ogg"),false)    
}

const mediaUpload = multer({
    fileFilter,
    storage
  })




export const deleteFile  =  (key) => {
    return s3.deleteObject({
        Bucket: bucket,
        Key: key
    }).promise()
    .then(() =>{
        return({data:`Item: ${key} deleted!`,success:true});
    })
    .catch((err) => {
        return({data:`Item: ${key} can't deleted!`,err,success:false});
       
    });
}


  export default mediaUpload;


  