module.exports = {
    addReview: (req,res)=>{
        const db = req.app.get('db');
        const reviewer_id = req.user.id;
        const user_id = req.params.id;
        const {stars, review} = req.body;
        console.log("I want to add a review");
        console.log(user_id,  reviewer_id, stars, review );
        db.add_review({user_id, reviewer_id, stars, review}).then(results=>{
            console.log("review results", results);
            db.get_reviews({user_id}).then(response=>{
                res.send(response);
            })
            // res.send(results);
        }).catch(e=>console.log(e));
    },

    getReviews: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.params.id;
        // console.log("user_id", user_id);
        db.get_reviews({user_id}).then(results=>{
            console.log("get reviews", results)
            res.send(results);
        }).catch(e=>console.log(e));
    },
    getName:(req,res)=>{
        const db = req.app.get('db');
        const user_id = req.params.id;
        db.get_name({user_id}).then(response=>{
            res.send(response);
        }).catch(e=>console.log(e));
    }
}