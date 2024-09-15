const mongoose=require('mongoose')
const Joi = require('joi');
const schema = Joi.object({
    fn:Joi.string().alphanum().min(3).max(30).required(),
    lastname:Joi.string().alphanum().min(3).max(30).required(),
    em:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    ag:Joi.number(),
    phone:Joi.number().required()
})
let schemaStudent=mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    age:String,
    phone:String
})
var Student=mongoose.model('student',schemaStudent)
var url='mongodb://127.0.0.1:27017/your_database_name'
exports.testconect=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            mongoose.disconnect()
            resolve('connect')
        }).catch((err)=>reject(err))
    }).catch((err)=>reject(err))
}

exports.postnewstudent=(firstname,lastname,email,age,phone)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url).then(()=>{
            let validation=schema.validate({fn:firstname,lastname:lastname,em:email,ag:age,phone:phone });
            if(validation.error){
                reject(validation.error)

            }
           let student=new Student({
            firstname:firstname,
            lastname:lastname,
            email:email,
            age:age,
            phone:phone
           })
           student.save().then((doc)=>{
            mongoose.disconnect()
            resolve(doc)
           })
        }).catch((err)=>reject(err))
})}


exports.getallstudent = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Student.find();
            })
            .then((students) => {
                resolve(students);
            })
            .catch((err) => {
                reject(err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    });
};

exports.getallstudentbyid = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Student.findById(id);
            })
            .then((students) => {
                resolve(students);
            })
            .catch((err) => {
                reject(err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    });
};

exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Student.deleteOne({_id:id});
            })
            .then((students) => {
                resolve(students);
            })
            .catch((err) => {
                reject(err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    });
};


exports.patchestudent = (id,firstname,lastname,email,age,phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                return Student.updateOne({_id:id},{firstname:firstname,lastname:lastname,email:email,age:age,phone:phone});
            })
            .then((students) => {
                resolve(students);
            })
            .catch((err) => {
                reject(err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    });
};