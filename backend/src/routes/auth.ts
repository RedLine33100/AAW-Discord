import {Router} from "express";
export default Router()

  .post("/startAuth", (req, res) => {

    if(not('success_redirect' in req.query)){
    }

    if(not('error_redirect' in req.query)){
    }

    let s_redirect = req.query.success_redirect;
    let e_redirect = req.query.error_redirect;
    
  })

  .get("/discordAuth", (req, res) => {
    if(not('code' in req.query)){
    }

    if(not('state' in req.query)){
    }

    let code = req.query.code;
    let state = req.query.state;

  })
