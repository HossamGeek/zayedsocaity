import gallery from '../models/gallery.mdl';
import CreateService from '../services/create.service';
import ViewService from '../services/view.service';
import {deleteFile} from '../services/file-upload.service';

const viewService = new ViewService(gallery);
const createService = new CreateService(gallery);


let errMsg = (err) => {return {data:'Transaction Failed',err:err,success:false}}

const createFiles =(bdy)=>createService.create(bdy);


const initFiles = (req,res)=>{
    let url = [];
    let user_id = req.session['authorization']['id'];
    let successUploaded = 0;
    let failedUploaded = 0;
    req.files.map(file=>{
        let fileData = {
            user_id,
            mime_type : file['mimetype'],
            location  : file['location'],
            id        : file['key']
        }
        createFiles(fileData)
        .then(result=>{
                successUploaded ++;
                url.push(result);
                if(req.files.length == (successUploaded+failedUploaded))
                    return res.json({data:url,success:true});
        })
        .catch(err=>{
                failedUploaded++;
                deleteFile(file['key'])
                if(req.files.length == (successUploaded+failedUploaded))
                    return res.json({data:url,err,success:false});
            })
    })
}

const galleryCtrl = {
    create : (req,res) => {
        initFiles(req,res)
    },
    view:(req,res)=> {
        viewService.findBy(req.headers)
                .then(result=>res.json({data:result,success:true}))
                .catch(err=>res.json(errMsg(err)))
    }
}

export default galleryCtrl;
