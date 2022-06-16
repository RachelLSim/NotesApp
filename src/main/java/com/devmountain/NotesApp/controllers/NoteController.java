package com.devmountain.NotesApp.controllers;

import com.devmountain.NotesApp.dtos.NoteDto;
import com.devmountain.NotesApp.entities.Note;
import com.devmountain.NotesApp.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//this annotation lets Spring MVC know that this class is a controller
// --that this will respond to payloads incoming and outgoing as JSON REST endpoints

@RestController
//this annotation tells the router what the mapping URL will look like. All
//request sent to this URL will be sent to this controller
@RequestMapping("/api/v1/notes")
public class NoteController {
    //Spring will Autowire our NoteService and create an instance of this onto our class
    @Autowired
    private NoteService noteService;
    //get all notes by user
    @GetMapping("/users/{userId}")
    public List<NoteDto> getNotesByUser(@PathVariable Long userId){
        return noteService.getAllNoteByUserID(userId);
    }
    @PostMapping("/users/{userId}")
    public void addNote(@RequestBody NoteDto noteDto, @PathVariable Long userId){
        noteService.addNote(noteDto, userId);
    }

    @DeleteMapping("/{noteId}")
    public void deleteNoteById(@PathVariable Long noteId){
        noteService.deleteNoteById(noteId);
    }

    @PutMapping
    public void updateNote(@RequestBody NoteDto noteDto){
        noteService.updateNoteById(noteDto);
    }
    @GetMapping("/{noteId}")
    public Optional<NoteDto> getNoteById(@PathVariable Long noteId){
        return noteService.getNoteById(noteId);
    }
}

    // Update a Note
//    @PutMapping("/notes/{id}")
//    public Note updateNote(@PathVariable(value = "id") Long noteId, @Validated @RequestBody Note noteDetails) {
//
//        Note note = noteRepository.findById(noteId)
//                .orElseThrow(() -> new ResourceNotFoundException("Note", "id", noteId));
//
//        note.setTitle(noteDetails.getTitle());
//        note.setContent(noteDetails.getContent());
//
//        Note updatedNote = noteRepository.save(note);
//        return updatedNote;
//    }