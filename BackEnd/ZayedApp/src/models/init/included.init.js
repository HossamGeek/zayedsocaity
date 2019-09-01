import issueModel from "../issue/issue.mdl";
import roleModel from "../role.mdl";
import locationModel from "../location.mdl";
import userModel from "../user.mdl";
import issue_mediaModel from "../issue/issue_media.mdl";
import galleryModel from "../gallery.mdl";
import issue_statusModel from "../issue/status/issue_status.mdl";
import statusModel from "../status.mdl";
import issue_status_mediaModel from "../issue/status/issue_status_media.mdl";
import issue_likeModel from "../issue/like/issue_like.mdl";


const is_in_active = false;
const approved = false;

const includeOf = {};


const role  = {model:roleModel};
const location = {model:locationModel};
const gallery = {model:galleryModel };
const user = (where = {}) => ({model:userModel,
                include:[{model:roleModel},{model:locationModel}],
                where,
                attributes: ['fname', 'lname', 'username',"male","approved","role_id","location_id"]});
const issue_media = {model:issue_mediaModel,include:[{model:galleryModel }]};
const issue_status_media = {model:issue_status_mediaModel,include:[{model:galleryModel }]};
const status = {model:statusModel};
const issue_status = {model:issue_statusModel,include:[status,issue_status_media],as:'issue_status'};
const issue_like = {model:issue_likeModel};
const issue  = (whereUser = {}) => 
    ({model:issueModel,include:[location,user(whereUser),
     issue_like,issue_status,issue_media]});

includeOf.issueModel = issue().include;
includeOf.issue_status = issue_status.include;


export default includeOf;