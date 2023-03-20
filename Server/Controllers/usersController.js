const User = require('../models/User');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Types.ObjectId;

module.exports = {

    baseRoute: async (req, res) => {
        try {
            const userId = req.query.userId
            let userData = await User.findById(userId);
            console.log(userData);
            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(401).json(error);
        }
    },

    findUsers: async (req, res) => {
        try {
            let userData = await User.find({ $and: [{ _id: { $ne: [req.params.id] } }, { friends: { $ne: [req.params.id] } }] });
            console.log(userData);
            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
            res.status(401).json(error)
        }
    },

    requests: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { $addToSet: { requests: req.params.friendId } });
            await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friendRequests: req.params.id } });
            res.status(200).json();
        } catch (err) {
            console.log(err);
            res.status(401).json(err);
        }
    },

    sendRequest: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { $pull: { requests: req.params.friendId } });
            await User.findByIdAndUpdate(req.params.friendId, { $pull: { friendRequests: req.params.id } });
            res.status(200).json();
        } catch (err) {
            console.log(err);
            res.status(401).json(err);
        }
    },

    getFriendRequest: async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            let requestIds = user.friendRequests
            const requests = await User.find({ _id: { $in: requestIds } });
            console.log(requests);
            res.status(200).json(requests);

        } catch (err) {
            console.log(err);
            res.status(401).json(err);
        }
    },

    acceptRequest: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { $pull: { friendRequests: req.params.friendId } });
            await User.findByIdAndUpdate(req.params.friendId, { $pull: { requests: req.params.id } });
            await User.findByIdAndUpdate(req.params.id, { $addToSet: { friends: req.params.friendId } });
            await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.id } });

            res.status(200).json()
        } catch (err) {
            console.log(err);
            res.json(401);
        }
    },

    rejectRequest: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { $pull: { friendRequests: req.params.friendId } });
            res.status(200).json();
        } catch (err) {
            console.log(err);
            res.json(401);
        }
    },

    updateProfile: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email, _id: { $ne: req.body.id } })
            if (user) {
                res.json({ emailExists: true });
            } else {
                await User.findByIdAndUpdate(req.body.id, {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        mobile: req.body.mobile,
                    }
                })
                res.json({ success: true })
            }
        } catch (err) {
            console.log(err);
            res.status(401).json(err);
        }
    },

    changePassword: async (req, res) => {

        try {

            let user = await User.findById(req.body.id)

            const validPassword = await bcrypt.compare(req.body.currentPassword, user.password)
            if (!validPassword) {
                console.log('password not matching')
                return res.json({ passwordNotMatch: true })
            }
            console.log('password matching');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
            await user.updateOne({
                $set: {
                    password: hashedPassword
                }
            })
            console.log('password changed successfully');
            res.json({ success: true });

        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    forgotPassword: async (req, res) => {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            console.log('not found');
            res.json({ userNotFound: true });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            await user.updateOne({
                $set: {
                    password: hashedPassword
                }
            })
            res.status(200).json({ success: true })
        }
    },

    getFriends: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const friendData = await Promise.all(
                user.friends.map((ids) => {
                    return User.findById(ids);
                })
            );

            let friendsList = [];
            friendData.map((f) => {
                const { _id, name } = f
                friendsList.push({ _id, name });
            });

            res.status(200).json(friendsList)
        } catch (err) {
            res.status(500).json(err)
        }
    }

}