const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
 
  const accessToken = sign(
    { name: user.name, id_user: user.id_user },
    "jwtsecretplschange"
  );

  
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
 
  
  if (!accessToken)
    return res.status(400).json({ error: "Niezalogowany" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const validateRole = (role)=>{
return(req,res,next) =>{
  if (!role.includes(req.cookies["role"]))
  {
    res.status(401)
    return res.send("Brak uprawnień")
  }
  else
  {
    next();
  }
}
}

module.exports = { createTokens, validateToken,validateRole};
