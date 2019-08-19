import {express} from '../../config/imports.config';
import mediaUpload ,{deleteFile} from '../services/file-upload.service';

const mediaUploaded = mediaUpload.any();

const imgRouter = express.Router();


const mediaIsUploaded = (req,res,next)=>mediaUploaded(req,res,err =>{
   if(err) return res.json({data:'file upload err',err:err.message,success:false});
   return res.json({url:req.files}) 
})

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
}

imgRouter.post('/new',mediaIsUploaded)
imgRouter.delete('/single/:key',(req,res)=>{
      deleteFile(req.params.key).then(result=> res.json(result))
      .catch(err=>res.json(err));                         
})
imgRouter.delete('/multi',(req,res)=>{multiDelete(req.body.url,res)});

module.exports = imgRouter;