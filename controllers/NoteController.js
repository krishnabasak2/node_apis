const Note = require("../models/NoteModel");
const User = require("../models/UserModel");

const getAllNotes = async (req, res) => {
    const notes = await Note.find({ "user_id": req.user.user_id });
    res.status(200).send({ "statsu": true, notes });
}

const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).send({ "statsu": true, note });
    } catch (error) {
        res.status(400).send({ "status": false, "message": "Somethingn went worong", error })
    }
}

const create = async (req, res) => {
    try {
        const { title, des } = req.body;
        if (!title || !des) {
            return res.status(400).send({ "status": false, "message": "Title & Description is required" });
        }
        const user_id = req.user.user_id;
        const note = await Note.create({ user_id, title, des });
        res.status(201).send({ "status": true, "message": "Note Added Successully", note });
    } catch (error) {
        res.status(400).send({ "status": false, "message": "Something Went Wrong", error });
    }
}

const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note.user_id.toString() !== req.user.user_id) {
            return res.status(401).send({ "status": false, "message": "Unauthorize" });
        }
        const update = await Note.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
        res.status(200).send({ "status": true, update });
    } catch (errors) {
        res.status(400).send({ "status": false, "message": "Note not found", "error": errors });
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.send("note not found");
        }

        if (note.user_id.toString() !== req.user.user_id) {
            return res.status(401).send({ "status": false, "message": "Unauthorize" });
        }

        const deleted = await Note.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.status(200).send({ "status": true, "message": "Deleted Successfully" });
        } else {
            res.status(400).send({ "status": false, "message": "Something Went Wrong" });
        }
    } catch (error) {
        res.status(500).send({ "status": false, "message": "Inernal Server Error" });
    }
}

module.exports = { getAllNotes, create, updateNote, getNote, deleteNote };