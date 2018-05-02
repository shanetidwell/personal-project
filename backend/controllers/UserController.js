module.exports = {
    addAddress: (req, res) =>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const{street, city, state, zip} = req.body;
        db.add_address({street, city, state, zip, user_id}).then(response=>{
            console.log("add address", response )
            res.status(200).send(response);
        }).catch(e=>console.log(e))
    }
}