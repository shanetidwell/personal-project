module.exports = {
    create: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const years_old = req.body.age;
        const favorite_colors = req.body.favoriteColors
        const {gender, interests, size, notes} = req.body;
        db.create_request({user_id, gender, years_old, interests, size, favorite_colors,notes}).then(results=>{
            // console.log("gift Request")
            res.send(results);
        }).catch(e=>console.log(e));
    },

    get: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id
        // console.log("user_id", user_id);
        db.get_requests({user_id}).then(results=>{
            // console.log("get requests", results)
            res.send(results);
        }).catch(e=>console.log(e));
    },
    getStoreName: (req,res) =>{
        const db = req.app.get('db');
        const {id} = req.params;
        // console.log(id);
        db.getStoreName({id}).then(results=>{
            // console.log("get Store Name", results)
            res.send(results);
        }).catch(e=>console.log(e));
    },
    addDeliveryRequest: (req,res) =>{
        const db = req.app.get('db');
        // console.log("adding Delivery Request")
        // const {status} = req.query;
        const gift_request_id = req.params.id;
        const user_id = req.user.id;
        // console.log(status, gift_request_id, user_id);
        db.add_delivery_request({user_id, gift_request_id}).then(response=>{
            // console.log("ADDED DELIVERY REQUEST")
            console.log("cheking boolean", response);
            res.status(200).send(response);
        }).catch(e=>console.log(e));
        // db.change_request_status({status, gift_request_id, user_id}).then(results=>{
        //     console.log("changed request status", results);
        //     res.send(results);
        // }).catch(e=>console.log(e));    
    },
    getMyRequests: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        db.get_my_requests({user_id}).then(results=>{
            var response = {
                requests: results
            }
            // console.log("get my gift requests", results);
            db.gift_request_notifications({user_id}).then(count=>{
                response.deliveryNotifications = count
                res.status(200).send(response);
            })
            
        }).catch(e=>console.log(e));
    },
    getDeliveries: (req,res) =>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const gift_request_id = req.params.id;
        db.get_delivery_requests({gift_request_id}).then(results=>{
            // console.log("get Delivery Requests", results);
            res.send(results);
        }).catch(e=>console.log(e));

    },
    acceptDeliveryRequest: (req,res)=>{
        const db = req.app.get('db');
        const delivery_request_id = req.params.id;
        const deliverer_id = req.body.user_id;
        const user_id = req.user.id;
        const gift_request_id = req.body.gift_request_id;
        db.accept_request({delivery_request_id, deliverer_id, user_id, gift_request_id}).then(results=>{
            // console.log("accept request", results);
            res.send(results);
        }).catch(e=>console.log(e));
    },
    declineDeliveryRequest: (req,res)=>{
        const db = req.app.get('db');
        const delivery_request_id = req.params.id;
        const user_id = req.user.id;        
        db.decline_request({delivery_request_id}).then(results=>{
            // console.log("decline request", results);
            res.send(results);
        }).catch(e=>console.log(e));
    },
    getMyDeliveries: (req, res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id
        db.get_my_deliveries({user_id}).then(results=>{
            var response = {
                deliveries: results
            }
            db.get_acceptance_notification({user_id}).then(count=>{
                response.count = count
                res.status(200).send(response);
            })// console.log("my Deliveries", results);
            //
        }).catch(e=>console.log(e));
    },
    clearDeliveryNotifications: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        console.log("clearing Delivery Notifications")
        db.clear_delivery_notifications({user_id}).then(response=>{
            
            db.gift_request_notifications({user_id}).then(notifications=>{
                console.log("counttttt", notifications);
                const count = {count: parseInt(notifications[0].count)}
                // response.deliveryNotifications = count
                res.status(200).send(count);
            })
            
        }).catch(e=>console.log(e));
    },
    clearAcceptanceNotifications: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id
        console.log("clearing Acceptance Notifications")
        db.clear_acceptance_notifications({user_id}).then(response=>{
            
            db.get_acceptance_notification({user_id}).then(notifications=>{
                console.log("counttttt", notifications);
                const count = {count: parseInt(notifications[0].count)}
                res.status(200).send(count);
            })
        }).catch(e=>console.log(e));
    }

}