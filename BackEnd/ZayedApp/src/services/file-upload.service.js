import {multer,multerS3,IBM} from '../../config/imports.config';

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

const fileFilter = (req,file,cb)=>{
    let fileName = file.fieldname;
    let fileType =file.mimetype;
    let videosType = new Set(['video/WebM','video/mp4','video/ogg']);
    let imgsType = new Set(['image/jpeg','image/png']);
    if(fileName === 'imgs' && imgsType.has(fileType))
        cb(null,true);
    else if(fileName === 'videos' && videosType.has(fileType))
        cb(null,true);
    else
        cb(new Error("invalid type,for imgs only jpeg or png and videos only mp4 or WebM or ogg"),false)    
}

const upload = multer({
    fileFilter,
    storage: multerS3({
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
  })

  export default upload;
  