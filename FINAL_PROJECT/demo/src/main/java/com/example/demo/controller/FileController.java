package com.example.demo.controller;

import com.example.demo.dto.FileResponse;
import com.example.demo.dto.FileShareRequest;
import com.example.demo.model.FileMetadata;
import com.example.demo.model.FileShare;
import com.example.demo.model.User;
import com.example.demo.repository.FileMetadataRepository;
import com.example.demo.repository.FileShareRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.FileService;
import com.example.demo.service.FileShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    @Autowired
    private FileShareService fileShareService;

    @Autowired
    private FileShareRepository fileShareRepository;

    @Autowired
    private UserRepository userRepository;

    // --- Upload a file ---
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            FileMetadata metadata = fileService.uploadFile(file, user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "File uploaded successfully to Cloudinary");
            response.put("fileId", metadata.getId());
            response.put("fileName", metadata.getFileName());
            response.put("cloudinaryUrl", metadata.getCloudinaryUrl());
            response.put("fileSize", metadata.getFileSize());

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    // --- List all files of a user ---
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserFiles(@PathVariable Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        List<FileMetadata> files = fileService.getUserFiles(user);

        List<FileResponse> response = files.stream()
                .map(f -> new FileResponse(
                        f.getId(),
                        f.getFileName(),
                        f.getFileType(),
                        f.getFileSize(),
                        f.getCloudinaryUrl(),
                        f.getOwner().getUsername(),
                        f.getUploadedAt(),
                        f.getAccessLevel()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // --- List all files in DB ---
    @GetMapping("/all")
    public ResponseEntity<?> getAllFiles() {
        List<FileMetadata> files = fileService.getAllFiles();
        List<FileResponse> response = files.stream()
                .map(f -> new FileResponse(
                        f.getId(),
                        f.getFileName(),
                        f.getFileType(),
                        f.getFileSize(),
                        f.getCloudinaryUrl(),
                        f.getOwner().getUsername(),
                        f.getUploadedAt(),
                        f.getAccessLevel()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    // --- Get File by ID ---
    @GetMapping("/{id}")
    public ResponseEntity<?> getFile(@PathVariable Long id) {
        FileMetadata file = fileService.getFileById(id);
        if (file == null) {
            return ResponseEntity.notFound().build();
        }
        FileResponse response = new FileResponse(
                file.getId(),
                file.getFileName(),
                file.getFileType(),
                file.getFileSize(),
                file.getCloudinaryUrl(),
                file.getOwner().getUsername(),
                file.getUploadedAt(),
                file.getAccessLevel()
        );
        return ResponseEntity.ok(response);
    }

    // --- Delete a file ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) {
        try {
            fileService.deleteFile(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "File deleted successfully");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error deleting file: " + e.getMessage());
        }
    }

    // ======== SHARING APIs ========

    // -- 1. Create Share Record --
    @PostMapping("/share")
    public ResponseEntity<?> shareFile(@RequestBody FileShareRequest request) {
        FileMetadata file = fileMetadataRepository.findById(request.getFileId()).orElse(null);
        if (file == null) return ResponseEntity.badRequest().body("File not found");
        User owner = file.getOwner();
        FileShare share = fileShareService.shareFile(
                owner != null ? owner.getId() : null,
                request.getFileId(),
                request.getSharedWithUserId(),
                request.getAccessLevel()
        );
        if (share == null) {
            return ResponseEntity.badRequest().body("Invalid request (user or file does not exist)");
        }
        return ResponseEntity.ok(Map.of("message", "File shared successfully", "shareId", share.getId()));
    }

    // -- 2. Get Shared Files for a User --
@GetMapping("/shared/{userId}")
public ResponseEntity<?> getSharedFiles(@PathVariable Long userId) {
    List<FileShare> sharedList = fileShareService.getSharedFilesForUser(userId);
    List<Map<String, Object>> response = new ArrayList<>();
    for (FileShare share : sharedList) {
        Map<String, Object> map = new HashMap<>();
        map.put("shareId", share.getId());
        map.put("id", share.getFile().getId());
        map.put("fileName", share.getFile().getFileName());
        map.put("fileType", share.getFile().getFileType());
        map.put("fileSize", share.getFile().getFileSize());
        map.put("cloudinaryUrl", share.getFile().getCloudinaryUrl());
        map.put("ownerUsername", share.getOwner().getUsername());
        map.put("sharedAt", share.getSharedAt());
        map.put("accessLevel", share.getAccessLevel());
        map.put("sharedByUsername", share.getOwner().getUsername());
        response.add(map);
    }
    return ResponseEntity.ok(response);
}


    // -- 3. Revoke Shared Access --
    @DeleteMapping("/share/{shareId}")
    public ResponseEntity<?> revokeFileShare(@PathVariable Long shareId) {
        fileShareService.revokeShare(shareId);
        return ResponseEntity.ok(Map.of("message", "Share revoked successfully"));
    }
}
