module.exports = {
    login: (req,res,next)=>{
        // console.log("login")
        const db = req.app.get('db');
        const {username, password} = req.body
        db.login({username, password}).then(user=>{
            // console.log("user", user)
            req.session.userid = user[0].id
            // console.log("session", req.session);
            res.status(200).send(user);
        }).catch((error)=>res.status(500).send(error));
    },
    register: (req,res,next)=>{
        // console.log("register")
        const db = req.app.get('db');
        const {username, password, email} = req.body
        db.register({username, password, email}).then(user=>{
            // console.log("user", user)
            req.session.userid = user[0].id;
            // console.log("session", req.session);
            res.status(200).send(user);
        }).catch((error)=>res.status(500).send(error));
    },
    logout: (req, res, next)=>{
        // console.log("logout")
        req.session.destroy();
        res.send()
    },
    checkLogin: (req, res, next)=>{
        console.log("check Login");
        const db = req.app.get('db');
        console.log("req.session.id", req.session)
        db.get_user_info({userid: req.session.userid}).then(user=>{
            console.log("user",user)
            res.status(200).send(user)
        }).catch((error)=>res.status(500).send(error));
        
        
    }
}