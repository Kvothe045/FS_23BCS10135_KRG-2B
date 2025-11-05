package com.example.demo.dto;

public class FileShareRequest {
    private Long fileId;
    private Long sharedWithUserId;
    private String accessLevel; // "VIEW", "EDIT", "DOWNLOAD"

    // getters and setters
    public Long getFileId() { return fileId; }
    public void setFileId(Long fileId) { this.fileId = fileId; }
    public Long getSharedWithUserId() { return sharedWithUserId; }
    public void setSharedWithUserId(Long sharedWithUserId) { this.sharedWithUserId = sharedWithUserId; }
    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }
}
