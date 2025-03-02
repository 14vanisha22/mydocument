import React, { useState } from 'react';
import { 
  FileText, 
  Filter, 
  Plus, 
  Search, 
  SortAsc, 
  Tag, 
  Trash2, 
  Upload,
  FileSpreadsheet,
  Image,
  FileCode,
  File,
  FileType,
  FileText as FileDocIcon,
  MoreVertical,
  Download,
  Eye,
  Edit,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const Documents = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Mock data for documents
  const documents = [
    { 
      id: '1', 
      name: 'Q1 Financial Report.pdf', 
      type: 'PDF', 
      category: 'Finance', 
      size: '2.4 MB', 
      date: '2023-04-15', 
      tags: ['financial', 'quarterly', 'report'],
      icon: File
    },
    { 
      id: '2', 
      name: 'Employment Contract.docx', 
      type: 'DOCX', 
      category: 'Legal', 
      size: '1.2 MB', 
      date: '2023-04-12', 
      tags: ['contract', 'employment', 'legal'],
      icon: FileDocIcon
    },
    { 
      id: '3', 
      name: 'Product Roadmap.pptx', 
      type: 'PPTX', 
      category: 'Planning', 
      size: '5.7 MB', 
      date: '2023-04-10', 
      tags: ['product', 'roadmap', 'planning'],
      icon: FileType
    },
    { 
      id: '4', 
      name: 'Customer Survey Results.xlsx', 
      type: 'XLSX', 
      category: 'Research', 
      size: '3.1 MB', 
      date: '2023-04-08', 
      tags: ['survey', 'customer', 'research'],
      icon: FileSpreadsheet
    },
    { 
      id: '5', 
      name: 'Marketing Campaign Images.zip', 
      type: 'ZIP', 
      category: 'Marketing', 
      size: '15.8 MB', 
      date: '2023-04-05', 
      tags: ['marketing', 'images', 'campaign'],
      icon: Image
    },
    { 
      id: '6', 
      name: 'API Documentation.md', 
      type: 'MD', 
      category: 'Technical', 
      size: '0.5 MB', 
      date: '2023-04-03', 
      tags: ['api', 'documentation', 'technical'],
      icon: FileCode
    },
  ];

  const categories = [
    'All',
    'Finance',
    'Legal',
    'Planning',
    'Research',
    'Marketing',
    'Technical',
    'HR'
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileSelect = (id: string) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fileId => fileId !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredDocuments.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredDocuments.map(doc => doc.id));
    }
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const handleUpload = () => {
    // Simulate upload process
    console.log('Uploading files:', uploadedFiles);
    // In a real app, you would send these files to your backend
    
    // Reset and close modal after "upload"
    setTimeout(() => {
      setUploadedFiles([]);
      setIsUploadModalOpen(false);
    }, 1500);
  };

  const removeUploadedFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const getFileIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'pdf': return File;
      case 'docx': return FileDocIcon;
      case 'pptx': return FileType;
      case 'xlsx': return FileSpreadsheet;
      case 'zip': return Image;
      case 'md': return FileCode;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Documents</h1>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SortAsc className="h-4 w-4 mr-2" />
              Sort
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={selectedFiles.length === filteredDocuments.length && filteredDocuments.length > 0}
              onChange={handleSelectAll}
            />
            <span className="ml-3 text-sm text-gray-700">
              {selectedFiles.length > 0 ? `${selectedFiles.length} selected` : 'Select all'}
            </span>
          </div>
          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <Tag className="h-4 w-4 mr-1" />
                Tag
              </button>
              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Select</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((doc) => {
                const DocIcon = doc.icon;
                return (
                  <tr key={doc.id} className={selectedFiles.includes(doc.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedFiles.includes(doc.id)}
                        onChange={() => handleFileSelect(doc.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <Link to={`/documents/${doc.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                            {doc.name}
                          </Link>
                          <p className="text-xs text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(doc.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-500 hover:text-indigo-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-indigo-600">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500 hover:text-indigo-600">
                          <Share2 className="h-4 w-4" />
                        </button>
                        <div className="relative group">
                          <button className="text-gray-500 hover:text-indigo-600">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit metadata</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Move to folder</a>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredDocuments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-lg font-medium">No documents found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upload Documents</h3>
                    <div className="mt-2">
                      <Dropzone onDrop={handleFileDrop}>
                        {({getRootProps, getInputProps}) => (
                          <div 
                            {...getRootProps()} 
                            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-indigo-500"
                          >
                            <input {...getInputProps()} />
                            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Drag and drop files here, or click to select files</p>
                            <p className="text-xs text-gray-500 mt-1">Supports PDF, DOCX, XLSX, PPTX, and more</p>
                          </div>
                        )}
                      </Dropzone>
                      
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Files to upload ({uploadedFiles.length})</h4>
                          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200 max-h-40 overflow-y-auto">
                            {uploadedFiles.map((file, index) => {
                              const FileIcon = getFileIcon(file.name.split('.').pop() || '');
                              return (
                                <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                  <div className="flex items-center">
                                    <FileIcon className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="truncate">{file.name}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    <button 
                                      onClick={() => removeUploadedFile(index)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpload}
                  disabled={uploadedFiles.length === 0}
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsUploadModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;