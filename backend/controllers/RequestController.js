module.exports = {
    create: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const {store_name, city, zip} = req.body;
        db.create_request({user_id, store_name, city, zip}).then(results=>{
            console.log("results")
            res.send(results);
        }).catch(e=>console.log(e));
    },

    get: (req,res)=>{
        const db = req.app.get('db');
        db.get_requests().then(results=>{
            console.log("get requests", results)
            res.send(results);
        }).catch(e=>console.log(e));
    },
    getStoreName: (req,res) =>{
        const db = req.app.get('db');
        const {id} = req.params;
        console.log(id);
        db.getStoreName({id}).then(results=>{
            console.log("get Store Name", results)
            res.send(results);
        }).catch(e=>console.log(e));
    },
    changeStatus: (req,res) =>{
        const db = req.app.get('db');
        console.log("Changing status")
        const {status} = req.query;
        const store_request_id = req.params.id;
        const user_id = req.user.id;
        console.log(status, store_request_id, user_id);
        db.change_request_status({status, store_request_id, user_id}).then(results=>{
            console.log("changed request status", results);
            res.send(results);
        }).catch(e=>console.log(e));
        
    }
}