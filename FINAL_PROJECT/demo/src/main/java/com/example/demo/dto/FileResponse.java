package com.example.demo.dto;

import java.time.LocalDateTime;

public class FileResponse {
    private Long id;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private String cloudinaryUrl;
    private String ownerUsername;
    private LocalDateTime uploadedAt;
    private String accessLevel;

    public FileResponse(Long id, String fileName, String fileType, Long fileSize, 
                       String cloudinaryUrl, String ownerUsername, 
                       LocalDateTime uploadedAt, String accessLevel) {
        this.id = id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.cloudinaryUrl = cloudinaryUrl;
        this.ownerUsername = ownerUsername;
        this.uploadedAt = uploadedAt;
        this.accessLevel = accessLevel;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public Long getFileSize() { return fileSize; }
    public void setFileSize(Long fileSize) { this.fileSize = fileSize; }

    public String getCloudinaryUrl() { return cloudinaryUrl; }
    public void setCloudinaryUrl(String cloudinaryUrl) { this.cloudinaryUrl = cloudinaryUrl; }

    public String getOwnerUsername() { return ownerUsername; }
    public void setOwnerUsername(String ownerUsername) { this.ownerUsername = ownerUsername; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }

    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }
}
