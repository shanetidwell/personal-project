module.exports = {
    create: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        var {store_request_id} = req.params
        var {description, image_url, price, quantity, link} = req.body;
        price = parseInt(price, 10);
        quantity = parseInt(quantity, 10);
        store_request_id = parseInt(store_request_id, 10);


        console.log("create item");
        console.log(user_id, store_request_id, description, image_url, price, quantity, link);
        db.create_item({user_id, store_request_id, description, image_url, price, quantity, link}).then(results=>{
            console.log("results")
            res.send(results);
        }).catch(e=>{console.log(e)});
    }
}
// description: "",
// image_url: "",
// price: "", 
// quantity: "",   
// link: "",   