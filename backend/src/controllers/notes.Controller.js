import Note from '../models/Note.js';

export const getNotes = async (req,res,next) => {
    try {
        const notes = await Note.find().sort({
            createdAt: -1
        });
        res.status(200).json({
            message: "success",
            notes
        })
    } catch (error) {
        console.error("Error in getnotes controller", error);
        res.status(500).json({
            message: "Internal server error", error
        })
        process.exit(1);
    }
}

export const createNotes = async (req,res,next) => {
    try {
        const {title, content} = req.body;
        if(!title || !content){
            res.status(401).json({
                message:"failed",
                error: "Content and title both are required fields"
            })
        }

        const newNote = new Note({
            title,
            content
        });
        await newNote.save();
        res.status(200).json({
            message:"Success",
            newNote
        })

    } catch (error) {
        console.error("Error in createnotes controller", error);
        res.status(500).json({
            message: "failed",
            error:"Internal server Error"
        })
        process.exit(1);
    }
}

export const updateNote = async (req,res,next) => {
    try {
        const {title, content} = req.body;
        const noteId = req.params.id;
        if(!title){
            res.status(401).json({
                message:"failed",
                error: "title is a required field"
            })
        }

        const updatedNote = await Note.findByIdAndUpdate(noteId, {
            title,
            content
        },{
            new: true
        });
        if(!updatedNote) return res.status(404).json({message:"failed", error:"Note not found"})
        return res.status(201).json({
            message:"success",
            updatedNote
        })
         
    } catch (error) {
        console.error("Error in updatenotes controller", error);
        res.status(500).json({
            message:"failed",
            error:"Internal server error"
        })
        process.exit(1);
    }
}

export const deleteNote = async (req,res,next) => {
    try {
        const noteId = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if(!deletedNote) return res.status(404).json({message:"note not found"})
        res.status(200).json({
            message: "Note deleted successfully"
        })
    } catch (error) {
        console.error("Error in deletenotes controller", error);
        res.status(500).json({
            message:"internal server error"
        })
        process.exit(1);
    }
}

export const getNoteById = async (req,res) => {
    try {

        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if(!note) return res.status(404).json({message: "note not found"});
        res.status(200).json({
            message: "success",
            note
        })
        
    } catch (error) {
        console.error("error occured in get note by id controller", error);
        res.status(500).json({
            message: "internal server error"
        })
    }
}