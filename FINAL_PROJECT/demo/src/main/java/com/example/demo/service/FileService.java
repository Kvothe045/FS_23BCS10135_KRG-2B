package com.example.demo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.model.FileMetadata;
import com.example.demo.model.User;
import com.example.demo.repository.FileMetadataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class FileService {

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    @Autowired
    private Cloudinary cloudinary;

    public FileMetadata uploadFile(MultipartFile file, User owner) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String publicId = UUID.randomUUID().toString() + "_" + 
                         originalFilename.substring(0, originalFilename.lastIndexOf('.'));

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), 
            ObjectUtils.asMap(
                "public_id", publicId,
                "resource_type", "auto",
                "use_filename", true,
                "unique_filename", false
            )
        );

        String cloudinaryUrl = (String) uploadResult.get("secure_url");
        String cloudinaryPublicId = (String) uploadResult.get("public_id");

        FileMetadata metadata = new FileMetadata(
                originalFilename,
                file.getContentType(),
                file.getSize(),
                cloudinaryUrl,
                cloudinaryPublicId,
                owner
        );

        return fileMetadataRepository.save(metadata);
    }

    public List<FileMetadata> getUserFiles(User user) {
        return fileMetadataRepository.findByOwner(user);
    }

    public List<FileMetadata> getAllFiles() {
        return fileMetadataRepository.findAll();
    }

    public FileMetadata getFileById(Long id) {
        return fileMetadataRepository.findById(id).orElse(null);
    }

    public void deleteFile(Long id) throws IOException {
        FileMetadata metadata = fileMetadataRepository.findById(id).orElse(null);
        if (metadata != null) {
            cloudinary.uploader().destroy(metadata.getCloudinaryPublicId(), 
                ObjectUtils.emptyMap());
            fileMetadataRepository.deleteById(id);
        }
    }

    public String getFileUrl(Long id) {
        FileMetadata metadata = fileMetadataRepository.findById(id).orElse(null);
        return metadata != null ? metadata.getCloudinaryUrl() : null;
    }
}
