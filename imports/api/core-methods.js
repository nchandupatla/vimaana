import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import {
    Email
} from 'meteor/email';
import { Rides } from './rides';

export function verifyUserEmail(email){
    return Accounts.findUserByEmail(email);
}

export function verifyAccount(obj){
 var decodedString = Meteor.call('base64Decode',obj.id);
 var ride=Rides.findOne({_id: decodedString});
    Rides.update({
      _id: decodedString
    }, {
      $set: {
        verified: true
      }
    }
    );
    var user = Accounts.findUserByEmail(ride.contact.email);
    Meteor.users.update(user._id, {$set: {emails: 
      [{
        "address":user.emails[0].address,
        "verified":true
      }]
    }});
    
    return true;
}

export function sendEmail(obj) {
    if (Meteor.isServer) {
        var encodedString = Meteor.call('base64Encode',obj.id);
        SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));
        var emailData = {
            link: Meteor.absoluteUrl() + "verify/" + encodedString,
            password: obj.password,
            userExists:obj.userExists
        };

        Email.send({
            to: obj.toEmail,
            from: "Team Vimaana <no-reply@thevimaana.com>",
            subject: "Welcome to Vimaana",
            html: SSR.render('htmlEmail', emailData)
        });
    }
}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
export function createNewAccount(userObj) {
     var user = Accounts.findUserByEmail(userObj.email);
      if(user == null){
     Accounts.createUser({email:userObj.email, password:userObj.password});
     sendEmail({toEmail:userObj.email, id:'fsdf', userExists:null, password:userObj.password});
}
}


export function createAccount(userObj) {
    var userExists = Accounts.findUserByEmail(userObj.email);
    console.log('inside user '+JSON.stringify(userExists));
    if(userExists==null){
     var password=generatePassword();
     var user_id=Accounts.createUser({email:userObj.email, password:password});
     console.log('successfully created user '+user_id);
     sendEmail({toEmail:userObj.email, id:userObj.id, userExists:null, password:password});
    }else{
      sendEmail({toEmail:userObj.email, id:userObj.id, userExists:true, password:password});  
    }
}

Meteor.methods({
    sendEmail,
    createAccount,
    verifyAccount,
    createNewAccount,
    verifyUserEmail
});