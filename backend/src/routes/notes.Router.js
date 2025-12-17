import express from 'express';
import { getNotes, deleteNote, createNotes, updateNote, getNoteById } from '../controllers/notes.Controller.js';

const router =  express.Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', createNotes);
router.delete('/:id', deleteNote);
router.put("/:id", updateNote);

export default router;