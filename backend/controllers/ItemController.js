module.exports = {
    create: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        var {store_request_id} = req.params
        var {description, brand, size, color, price, quantity, link} = req.body;
        price = parseInt(price, 10);
        quantity = parseInt(quantity, 10);
        store_request_id = parseInt(store_request_id, 10);


        console.log("create item");
        console.log(user_id, store_request_id, description, price, quantity, link);
        db.create_item({user_id, store_request_id, description, brand, size, color, price, quantity, link}).then(results=>{
            console.log("results")
            res.send(results);
        }).catch(e=>{console.log(e)});
    },
    get: (req,res)=>{
        const db = req.app.get('db');
        var {request_id} = req.params;
        console.log("original Request ID", request_id);
        request_id = parseInt(request_id, 10);
        console.log("request id number", request_id);
        db.get_items({request_id}).then(items=>{
            console.log(items);
            res.send(items);
        }).catch(e=>{console.log(e)});

    }
}
// description: "",
// image_url: "",
// price: "", 
// quantity: "",   
// link: "",   