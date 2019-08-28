import issue_status_mediaModel from '../../../models/issue/status/issue_status_media.mdl';
import ViewService from '../../../services/view.service';
import CreateService from '../../../services/create.service';

const viewService = new ViewService(issue_status_mediaModel);
const createService = new CreateService(issue_status_mediaModel);


export const issueStatusMediaService = {
    create : (bdy) =>  createService.createMulti(bdy),
    forceRemove : (id) =>  removeService.forceRemove(id),
}

