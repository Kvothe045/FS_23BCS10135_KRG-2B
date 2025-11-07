// fsproject/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, Download, Trash2, Share2, LogOut, Eye, XCircle } from 'lucide-react';

interface User {
  userId: number;
  username: string;
  email: string;
}
interface FileData {
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryUrl: string;
  ownerUsername: string;
  uploadedAt: string;
}
interface SharedFile {
  shareId: number;
  id: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  cloudinaryUrl: string;
  ownerUsername: string;
  sharedAt: string;
  accessLevel: string;
  sharedByUsername: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'files' | 'share' | 'sharedwithme'>('files');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchFiles();
      fetchSharedFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api-backend-spring.onrender.com/api/files/user/${user?.userId}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      }
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  };

  const fetchSharedFiles = async () => {
    try {
      const response = await fetch(`https://api-backend-spring.onrender.com/api/files/shared/${user?.userId}`);
      if (response.ok) {
        const data = await response.json();
        setSharedFiles(data);
      }
    } catch { }
  };

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUploading(true);

    try {
      const response = await fetch('https://api-backend-spring.onrender.com/api/files/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        await fetchFiles();
        (e.target as HTMLFormElement).reset();
        setActiveTab('files');
      } else {
        alert('Upload failed');
      }
    } catch {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      const response = await fetch(`https://api-backend-spring.onrender.com/api/files/${fileId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchFiles();
      }
    } catch {
      alert('Failed to delete file');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              VaultShare
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, <strong className="text-cyan-400">{user.username}</strong></span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-500/20 hover:border-red-500/40"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 flex-wrap">
          <button onClick={() => setActiveTab('files')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'files' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>My Files</button>
          <button onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'upload' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>Upload File</button>
          <button onClick={() => setActiveTab('share')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'share' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>Share File</button>
          <button onClick={() => setActiveTab('sharedwithme')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${activeTab === 'sharedwithme' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}>Shared With Me</button>
        </div>

        {/* Upload tab */}
        {activeTab === 'upload' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 max-w-2xl mx-auto border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 text-white">Upload New File</h2>
            <form onSubmit={handleFileUpload} className="space-y-6">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500 transition bg-gray-900/30">
                <Upload className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                <input type="file" name="file" required className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white file:font-semibold hover:file:bg-cyan-600 file:transition" />
              </div>
              <input type="hidden" name="userId" value={user.userId} />
              <button type="submit" disabled={uploading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition disabled:opacity-50 shadow-lg shadow-cyan-500/50">
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
            </form>
          </div>
        )}

        {/* Files tab */}
        {activeTab === 'files' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 text-white">My Files ({files.length})</h2>
            {loading ? (
              <p className="text-center text-gray-400 py-8">Loading files...</p>
            ) : files.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No files uploaded yet</p>
            ) : (
              <div className="grid gap-4">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-gray-700 bg-gray-900/40 rounded-lg hover:shadow-md hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="font-semibold text-white">{file.fileName}</h3>
                        <p className="text-sm text-gray-400">
                          {formatFileSize(file.fileSize)} • {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition border border-cyan-500/20 hover:border-cyan-500/40">
                        <Download className="w-5 h-5" />
                      </a>
                      <button onClick={() => handleDelete(file.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-500/20 hover:border-red-500/40">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Share tab */}
        {activeTab === 'share' && (
          <ShareFileComponent userId={user.userId} files={files} afterShare={fetchSharedFiles} />
        )}

        {/* Shared with me tab */}
        {activeTab === 'sharedwithme' && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-500/10 p-8 border border-gray-700/50">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
              <Eye className="w-6 h-6 text-purple-400" /> Files Shared With Me ({sharedFiles.length})
            </h2>
            {sharedFiles.length === 0 ? (
              <div className="text-center text-gray-400">No files shared with you yet.</div>
            ) : (
              <div className="grid gap-4">
                {sharedFiles.map((file) => (
                  <div key={file.shareId} className="flex items-center justify-between p-4 border border-gray-700 bg-gray-900/40 rounded-lg hover:shadow-md hover:shadow-purple-500/20 hover:border-purple-500/50 transition">
                    <div className="flex items-center gap-4">
                      <FileText className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="font-semibold text-white">{file.fileName}</h3>
                        <p className="text-sm text-gray-400">
                          {formatFileSize(file.fileSize)} • Shared by <b className="text-purple-400">{file.sharedByUsername}</b>
                        </p>
                        <p className="text-xs text-gray-500">Shared on: {new Date(file.sharedAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition border border-green-500/20 hover:border-green-500/40">
                        <Download className="w-5 h-5" />
                      </a>
                      <button
                        onClick={async () => {
                          if (confirm("Remove this shared file?")) {
                            await fetch(`https://api-backend-spring.onrender.com/api/files/share/${file.shareId}`, { method: "DELETE" });
                            await fetchSharedFiles();
                          }
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition border border-red-500/20 hover:border-red-500/40"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- ShareFileComponent with API integration ---
function ShareFileComponent({ userId, files, afterShare }: { userId: number; files: FileData[]; afterShare?: () => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [accessLevel, setAccessLevel] = useState('VIEW');
  const [result, setResult] = useState('');

  useEffect(() => { fetchUsers(); }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://api-backend-spring.onrender.com/api/user/all');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.filter((u: any) => u.id !== userId));
      }
    } catch { }
  };

  const handleShare = async () => {
    if (!selectedUser || !selectedFile) {
      alert('Please select a user and a file');
      return;
    }
    setResult('');
    try {
      const resp = await fetch('https://api-backend-spring.onrender.com/api/files/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: parseInt(selectedFile),
          sharedWithUserId: parseInt(selectedUser),
          accessLevel,
        }),
      });
      if (resp.ok) {
        setResult('File shared successfully!');
        setSelectedFile('');
        setSelectedUser('');
        if (afterShare) await afterShare();
      } else {
        setResult('Failed to share file');
      }
    } catch {
      setResult('Failed to share file');
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 max-w-2xl mx-auto border border-gray-700/50">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
        <Share2 className="w-6 h-6 text-cyan-400" />
        Share File
      </h2>
      {result && <div className={`mb-4 text-center font-semibold ${result.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{result}</div>}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Select User</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username} ({user.email})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Select File</label>
          <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
            <option value="">Choose a file...</option>
            {files.map((file) => (
              <option key={file.id} value={file.id}>{file.fileName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Access Level</label>
          <select value={accessLevel} onChange={e => setAccessLevel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
            <option value="VIEW">View Only</option>
            <option value="DOWNLOAD">Download</option>
          </select>
        </div>
        <button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition shadow-lg shadow-cyan-500/50"
        >Share File</button>
      </div>
    </div>
  );
}
