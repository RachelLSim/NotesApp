package com.devmountain.NotesApp.entities;

import com.devmountain.NotesApp.dtos.NoteDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Notes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "text")
    private String body;

    //@ManyToOne creates the association within Hibernate
    @ManyToOne
    //@JsonBackReference prevents infinite recursion when you deliver the resource up as JSON through the RESTful API endpoint you will create
    @JsonBackReference
    private User user;

    public Note(NoteDto noteDto) {
        if(noteDto.getBody() != null) {
            this.body = noteDto.getBody();
        }
    }

}
