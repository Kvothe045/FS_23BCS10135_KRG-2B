package com.example.demo.repository;

import com.example.demo.model.FileMetadata;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {
    List<FileMetadata> findByOwner(User owner);
    List<FileMetadata> findByAccessLevel(String accessLevel);
}
