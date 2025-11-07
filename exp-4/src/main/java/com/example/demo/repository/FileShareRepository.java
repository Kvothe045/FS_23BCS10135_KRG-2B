package com.example.demo.repository;

import com.example.demo.model.FileShare;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileShareRepository extends JpaRepository<FileShare, Long> {
    List<FileShare> findBySharedWithUser(User user);
    List<FileShare> findByOwner(User user);
}
