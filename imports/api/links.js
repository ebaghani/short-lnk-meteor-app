import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';


export const Links = new Mongo.Collection('links');

if (Meteor.isServer){
    Meteor.publish('links', function() {
        return Links.find({userId: this.userId});
    });
}

// Meteor.methods({
//     greetUser(name) {
//         console.log("greetUser is running");
//         if (!name) {
//             throw new Meteor.Error('Invalid error code', 'Name is required');
//         }
//         return `Hello ${name}!`;
//     }
// });

// Meteor.methods({
//     addNumbers(num1, num2) {
//         console.log("add Numbers is running");
//         if (!(typeof num1 === 'number') || !(typeof num2 === 'number')) {
//             throw new Meteor.Error('Invalid error code', 'Numbers required');
//         }
//         return `${num1} added to ${num2} is equal to ${num1 + num2}!`;
//     }
// });
Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        } 

        new SimpleSchema({
            url: {
            type: String,
            label: "Your link",
            regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });
              
        Links.insert({
            url,
           userId: this.userId,
           visible: true,
           visitedCount: 0,
           lastVisitedAr: null
        });
    },
    'links.setVisibility' (_id, visible){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        } 

        new SimpleSchema({
            _id: {
            type: String,
            min: 2
            },
            visible: {
                type: Boolean,
            }
        }).validate({ _id, visible });

        //const link = Links.find({_id}).fetch();
             
        // if (this.userId === link.userId && _id === link._id) {
        //     console.log("inside the if satament");
        //     Links.updateOne(_id, {$set: {visible: visible}});
        // } 
        Links.update({_id, userId: this.userId}, {$set: {visible: visible}});

    },
    'links.trackVisit' (_id) {
        new SimpleSchema({
            _id: {
            type: String,
            min: 2
            }
        }).validate({ _id });

        Links.update({_id}, {$set: {lastVisitedAr: new Date().getTime()},
            $inc: {
                visitedCount: 1
            }})
    }
});

