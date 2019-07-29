import { nodemailer } from '../../config/imports.config';

let capName = name =>   name || name.length ? name[0].toUpperCase() + name.slice(1) : '';

const env = process.env;

const server = {
    host : env.mailerHost,
    port : env.mailerPort,
    email:env.mailerEmail,
    user:env.mailerUser,
    pass:env.mailerPass
};

const user = {
    email:'',
    fname:'',
    lname:'',
    generate_code:'',
};

let typeConfig = {
    type:'',
    content:'',
    subject:''
}

const letter = {
    header : (fname,lname)=>  '<p> Hello <strong>'+ capName(fname) +' '+ capName(lname) +
            '</strong> from <strong>'+ server.user +'</strong>,</p>' + '\n' ,
    footer:'<p> If you have any follow-up questions or concerns, '+
    'please contact us anytime at '+ server.email +'.</p>'+
    '<p> Best regards, </p>'+'<p><strong>'+server.user+'</strong></p>'
}


const selectTypeConfig = () => {
    if(typeConfig.type == 'resetPassword' ) {
        typeConfig.content = 'click the following link';
        typeConfig.subject = 'Reset Password';
    }
    else if(typeConfig.type == 'register'){
        typeConfig.content = '<p>We recently received your request to verification for your email '+
                            user.email + '  </p> <p>Your Generate Code is <strong>' + 
                            user.generate_code +' </strong></p>';
        typeConfig.subject = 'User Verification';           
    }
}
const mailOption = () =>{
    selectTypeConfig();
    return {
        from: server.user +' <' +server.email + '>', // sender address
        to:user.email, // list of receivers or one receive
        subject: typeConfig.subject, // Subject line
        html: letter.header(user.fname,user.lname) + typeConfig.content + letter.footer
    }
}

const transporter = nodemailer.createTransport({
    service: server.host,
    port: server.port,
    secure: false, // true for 465, false for other ports
    auth: {
        user: server.email , // generated ethereal user
        pass: server.pass  // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
});

export const sendMail = async (data,config) =>  {

    if(!data || !data['email'])
         return {data:'email not found',success:false};
    else 
     {
        Object.keys(user).map(k=>user[k] = data[k]);
        Object.keys(typeConfig).map(k=>typeConfig[k] = config[k]);
        return transporter.sendMail(mailOption())}
};