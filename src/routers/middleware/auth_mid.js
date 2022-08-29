import Response from '../../models/Response'
import Helper from '../../utlis/Helper'


const auth_mid =(req,res,next)=>{
  try{
  const token = req.cookies.token
    if(!token){
      throw new Error("Unauthorized Access");
    }
    //Check Token validation
    const phone = Helper.verifyJWTtoken(token)
    
    // Set Phone User
    req.phone = phone;

    next()
  }catch(err){
    res.status(401).json(new Response(true,error.message,e))
  }
}
