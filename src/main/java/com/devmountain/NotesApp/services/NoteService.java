package com.devmountain.NotesApp.services;

import com.devmountain.NotesApp.dtos.NoteDto;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface NoteService {
    @Transactional
    void addNote(NoteDto noteDto, Long userId);
    @Transactional
    void updateNoteById(NoteDto noteDto);

    List<NoteDto> getAllNoteByUserID(Long userId);

    Optional<NoteDto> getNoteById(Long noteID);

    @Transactional
    void deleteNoteById(Long noteId);
}
