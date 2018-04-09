module.exports = {
    create: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const {store_name, city, zip} = req.body;
        db.create_request({user_id, store_name, city, zip}).then(results=>{
            console.log("results")
            res.send(results);
        })
    }
}