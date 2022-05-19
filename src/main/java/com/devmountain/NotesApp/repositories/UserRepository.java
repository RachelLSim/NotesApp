package com.devmountain.NotesApp.repositories;

import com.devmountain.NotesApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.devmountain.NotesApp.services.UserServiceImpl;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String userName);
}
