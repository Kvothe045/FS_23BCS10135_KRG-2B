package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "file_share")
public class FileShare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "file_id")
    private FileMetadata file;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "shared_with_user_id")
    private User sharedWithUser;

    private String accessLevel; // "VIEW", "EDIT", "DOWNLOAD"

    private LocalDateTime sharedAt = LocalDateTime.now();

    public FileShare() {}

    public FileShare(FileMetadata file, User owner, User sharedWithUser, String accessLevel) {
        this.file = file;
        this.owner = owner;
        this.sharedWithUser = sharedWithUser;
        this.accessLevel = accessLevel;
    }

    // getters and setters...
    public Long getId() { return id; }
    public FileMetadata getFile() { return file; }
    public void setFile(FileMetadata file) { this.file = file; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public User getSharedWithUser() { return sharedWithUser; }
    public void setSharedWithUser(User sharedWithUser) { this.sharedWithUser = sharedWithUser; }
    public String getAccessLevel() { return accessLevel; }
    public void setAccessLevel(String accessLevel) { this.accessLevel = accessLevel; }
    public LocalDateTime getSharedAt() { return sharedAt; }
    public void setSharedAt(LocalDateTime sharedAt) { this.sharedAt = sharedAt; }
}
