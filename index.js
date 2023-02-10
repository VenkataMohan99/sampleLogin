const express=require('express');
const multer=require('multer');
const cors=require('cors');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const path=require("path");
dotenv.config();
const app=express();
app.use(cors());
app.listen(9985,()=>{
    console.log('listening to the port 9985');
})
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now()+ " "+file.originalname);
//   }
// })

// const uploads = multer({ storage: storage })
app.use(express.static(path.join(__dirname, './webclient/build')));
const uploads=multer()
;
let connection=async()=>{ 
try{ 
await mongoose.connect(`mongodb+srv://Mohan:${process.env.DB_PASSWORD}@cluster0.an77b3s.mongodb.net/sampleLogin`);
console.log("Successfully connected to Mongo DB");
}catch(error){
    console.log("Unable to connected to Mongo DB");
}
}
let userShema =new mongoose.Schema({
    userName:{
        type:String,
        minLength:[2,"Enter min 2 char of user name"],
        maxLength:[15,'Enter max 15 char of user name'],
        require:true
    },
    emailId:{  
        type:String,
        validate :
        {validator: function (v){
           return /^[A-Za-z0-9.\-\_]+\@[A-Za-z0-9-\_\.]+\.([A-Za-z]{3,4})$/.test(v)
        }   
        },
        message:"Invalid Email!",
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
let user =new mongoose.model('userDetails',userShema);   
app.post("/signUp",uploads.none(),async(req,res)=>{
    console.log(req.body);

    let saveUserDetails=async()=>{
      let hashedPassword=await bcrypt.hash(req.body.password,6);
        try{
      let newUser=await new user({
        userName:req.body.userName,
        emailId:req.body.emailId,
        password:hashedPassword
      })
      await newUser.save();
      console.log("Data add to Data Base");  
      res.json({
        status:"User Created Successfully"
      })
    }catch(error){
      console.log('unable to send data to data base');
      res.json({
        status:"Plz check the input details and enter again",
        l:error
      })
    }

    }
    let data=await user.find({userName:`${req.body.userName}`}); 
    if(data.length>0){
      res.json({status:'User already existe'});
    }else{
    saveUserDetails();
  }
})

app.post("/login",uploads.none(),async(req,res)=>{
  let data=await user.find({emailId:`${req.body.emailId}`});
  if(data.length>0){
    let comparePassword=await bcrypt.compare(req.body.password,data[0].password);
  if(comparePassword === true){
    res.json({
      login:true,
      status:"User Successfully",
      userDetails:data
    })
  }else{
    res.json({
      login:false,
      status:"Invalid Password"
    })
  }
}else{
  res.json({
    login:false,
    status:"User Not Found"
  })
}
})
connection();