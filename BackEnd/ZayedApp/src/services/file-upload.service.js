import {multer,multerS3,IBM} from '../../config/imports.config';

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


const storage = multerS3({
        s3,
      bucket: 'appimages',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TEST_META_DATA'}); //file.fieldname
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
})

const imgIsValid = (req,file,cb)=>{
  let fileName = file.fieldname;
  let fileType =file.mimetype;
  if(fileName === 'imgs' && imgsType.has(fileType))
    cb(null,true);
  else cb(new Error("invalid type,for imgs only jpeg or png or gif"),false)
}

const videoIsValid = (req,file,cb)=>{
  let fileName = file.fieldname;
  let fileType =file.mimetype;
  if(fileName === 'videos' && videosType.has(fileType))
    cb(null,true);
  else cb(new Error("invalid type,for videos only mp4 or WebM or ogg"),false)
}


export const imgFilter = multer({
  fileFilter:imgIsValid
})

export const videoFilter = multer({
  fileFilter:videoIsValid
})


export const uploadImg = multer({
  fileFilter:imgIsValid,
    storage
})

export const uploadVideo = multer({
  fileFilter:videoIsValid,
    storage
})

  