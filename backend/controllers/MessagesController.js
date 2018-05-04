module.exports = {
    getMessages: (req,res)=>{
        const db = req.app.get('db')
        const user_id = req.user.id
        console.log("body", req.body);
        const recipientId = req.params.id
        console.log("stuff", user_id, recipientId);
        db.check_for_message_thread({user_id, recipientId}).then(response=>{
            console.log("message thread", response);
            console.log(response.length)
            if(response.length === 0){
                db.create_message_thread({user_id, recipientId}).then(response=>{
                    console.log("message_id", response);
                    const stuffToSend = {
                        status: "new_message_thread",
                        id: response[0].id
                    }
                    res.send(stuffToSend)
                })
            }else {
                // thread_id = response[0].id
                const stuffToSend={
                    status: "thread_id",
                    id: response[0].id
                }
                res.send(stuffToSend)
                // db.get_messages({thread_id}).then(response=>{
                //     console.log("messages", response);
                //     const messagesToSend = {
                //         status: "messages",
                //         messages: response
                //     }
                //     res.send(messagesToSend);
                // }).catch(e=>console.log(e))
            }
        }).catch(e=>console.log(e))
    },
    getThreadMessages: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const thread_id = req.params.id;
        db.get_messages({thread_id}).then(response=>{
            console.log("tread messages response", response);
            res.send(response);
        }).catch(e=>console.log(e))
    },
    addMessage: (req,res)=>{
        const db = req.app.get('db');
        const user_id = req.user.id;
        const thread_id = req.params.id;
        const {message, recipientId} = req.body
        db.add_message({thread_id, message, user_id, recipientId}).then(response=>{
            console.log("added message", response)
            res.send(response);
        })
    },
    getMessageThreads: (req,res)=>{
        console.log("88888")
        const db = req.app.get('db');
        const user_id = req.user.id;
        console.log("userid", user_id)
        db.get_message_threads({user_id}).then(response=>{
            console.log("message Threads", response);
            res.send(response);
        }).catch(e=>console.log(e));
    }
}