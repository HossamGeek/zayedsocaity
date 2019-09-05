import {express} from '../../config/imports.config';
import mediaUpload ,{deleteFile} from '../services/file-upload.service';
import galleryCtrl from '../controllers/gallery.ctrl';

const mediaUploaded = mediaUpload.any();
const galleryRouter = express.Router();


const mediaIsUploaded = (req,res,next)=>mediaUploaded(req,res,err =>{   
   if(err) return res.json({data:'file upload err',err:err.message,success:false});
   next();  
});

const userIdIsFound = (req,res,next) => {
         let user_id = req.headers['user_id'];
         if(!user_id)return res.json({data:"user_id required in headers",success:false});
         req.headers = {user_id};
         next()
}
const multiDelete = (url,res)=>{
   let totalFiles = 0,deleting = [], errDeleting = [];
   url.map(file=>deleteFile(file.key).then(result=>{
      totalFiles ++;
      result.success  ? deleting.push([result.data]) : errDeleting.push([result.data]);
      if(url.length == totalFiles)
         res.json({data:`success Deleting : ${deleting.length}, failed Deleting : ${errDeleting.length}`
         ,more:{
            success:(deleting),
            failed:(errDeleting)
         },success:true});
   }))
};

galleryRouter.post('/new',mediaIsUploaded,galleryCtrl.create);
galleryRouter.get('/usr',userIdIsFound,galleryCtrl.view);

galleryRouter.delete('/single/:key',(req,res)=>{
      deleteFile(req.params.key).then(result=> res.json(result))
      .catch(err=>res.json(err));                         
});
galleryRouter.delete('/multi',(req,res)=>{multiDelete(req.body.files,res)});

module.exports = galleryRouter;