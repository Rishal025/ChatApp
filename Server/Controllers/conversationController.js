const Conversation = require('../models/Conversation');

module.exports = {

    postConversation: async (req, res) => {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
    
        try {
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getConversation: async (req, res) => {

        try {
            const conversation = await Conversation.find({
                members: {$in: [req.params.userId]}
            })
            res.status(200).json(conversation);
        } catch(err) {
            console.log(err);
            res.status(200).json(err)
        }
    },

    findConversation: async(req, res) => {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [req.params.firstUserId, req.params.secondUserId] },
            })
            if(!conversation) {
                const newConversation = new Conversation({
                    members: [req.params.firstUserId, req.params.secondUserId]
                })
                const savedConversation = await newConversation.save();
                res.status(200).json(savedConversation);
            }else {
                res.status(200).json(conversation)
            }
        } catch(err) {
            res.status(500).json(err);
        }
    }
}