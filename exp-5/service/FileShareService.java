package com.example.demo.service;

import com.example.demo.model.FileMetadata;
import com.example.demo.model.FileShare;
import com.example.demo.model.User;
import com.example.demo.repository.FileMetadataRepository;
import com.example.demo.repository.FileShareRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FileShareService {

    @Autowired
    private FileShareRepository fileShareRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    public FileShare shareFile(Long ownerId, Long fileId, Long sharedWithUserId, String accessLevel) {
        User owner = userRepository.findById(ownerId).orElse(null);
        User recipient = userRepository.findById(sharedWithUserId).orElse(null);
        FileMetadata file = fileMetadataRepository.findById(fileId).orElse(null);
        if (owner == null || recipient == null || file == null) return null;

        FileShare share = new FileShare(file, owner, recipient, accessLevel);
        return fileShareRepository.save(share);
    }

    public List<FileShare> getSharedFilesForUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return List.of();
        return fileShareRepository.findBySharedWithUser(user);
    }

    public void revokeShare(Long shareId) {
        fileShareRepository.deleteById(shareId);
    }
}
