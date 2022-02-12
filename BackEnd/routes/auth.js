const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'UddhavIsGoodBoy';


//Route 2
router.post('/createuser',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 }),
],async (req,res)=>{
    
   
    //javascript validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the user exists already.
    let user = await User.findOne({email: req.body.email});
    if(user)
    {
      return res.status(400).json({error:"Sorry User Already Exists."});
    }

    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      })
      
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken= jwt.sign(data, JWT_SECRET);
      
      res.json({authtoken})
   
});

//Route 2
router.post('/login',[
  body('email').isEmail(),
  body('password').exists()

],async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Please try to login with credentials."});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare)
    {
      return res.status(400).json({error:"Please try to login with credentials."});
    }

    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken= jwt.sign(data, JWT_SECRET);
      
    res.json({authtoken})

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }

})


//Route 3

router.post('/getuser',fetchuser ,async (req,res)=>{
  try {
    let userId = req.user.id;;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error.");
  }
})

module.exports = router;