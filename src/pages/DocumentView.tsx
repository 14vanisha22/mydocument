import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Edit, 
  Share2, 
  Tag, 
  Trash2, 
  FileText, 
  Clock, 
  User, 
  MessageSquare, 
  Plus,
  File,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const DocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('preview');
  const [showMetadataForm, setShowMetadataForm] = useState(false);

  // Mock document data
  const document = {
    id: id,
    name: 'Q1 Financial Report.pdf',
    type: 'PDF',
    category: 'Finance',
    size: '2.4 MB',
    date: '2023-04-15',
    uploadedBy: 'John Smith',
    lastModified: '2023-04-16',
    status: 'Processed',
    tags: ['financial', 'quarterly', 'report'],
    description: 'Quarterly financial report for Q1 2023 including revenue, expenses, and profit analysis.',
    metadata: {
      author: 'Finance Department',
      createdDate: '2023-04-10',
      pages: 24,
      keywords: ['finance', 'quarterly', 'revenue', 'expenses', 'profit'],
      confidentiality: 'Internal',
      department: 'Finance',
      documentType: 'Report',
      fiscalYear: '2023',
      quarter: 'Q1',
      reviewStatus: 'Approved',
      reviewedBy: 'Sarah Johnson',
      reviewDate: '2023-04-14'
    },
    extractedData: {
      totalRevenue: '$1,245,000',
      totalExpenses: '$876,000',
      netProfit: '$369,000',
      growthRate: '12.5%',
      topPerformingProduct: 'Product X',
      challengeAreas: 'International Markets',
      recommendations: 'Increase marketing budget for Q2'
    },
    relatedDocuments: [
      { id: '7', name: 'Q4 2022 Financial Report.pdf', type: 'PDF' },
      { id: '8', name: 'Q1 2023 Marketing Expenses.xlsx', type: 'XLSX' },
      { id: '9', name: 'Q1 2023 Sales Analysis.pptx', type: 'PPTX' }
    ],
    aiInsights: [
      { type: 'summary', content: 'This report shows a 12.5% growth in Q1 2023 compared to Q4 2022, with Product X being the top performer. International markets remain challenging, and the document recommends increasing the marketing budget for Q2.' },
      { type: 'sentiment', content: 'The overall tone of the document is positive, highlighting growth and opportunities while acknowledging challenges.' },
      { type: 'entities', content: 'Key entities mentioned include Product X, International Markets, Marketing Department, and Sales Team.' },
      { type: 'anomalies', content: 'Unusual expense increase in the Research department compared to previous quarters.' }
    ],
    comments: [
      { id: '1', user: 'Sarah Johnson', date: '2023-04-16', content: 'Great report! The growth numbers are impressive.' },
      { id: '2', user: 'Michael Chen', date: '2023-04-16', content: 'We should discuss the international market challenges in our next meeting.' }
    ],
    versions: [
      { version: '1.0', date: '2023-04-15', user: 'John Smith', notes: 'Initial upload' },
      { version: '1.1', date: '2023-04-16', user: 'John Smith', notes: 'Updated with final numbers' }
    ]
  };

  // Mock document preview (in a real app, this would be fetched from a backend)
  const documentPreviewUrl = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex items-center">
          <Link to="/documents" className="mr-4 text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <File className="h-6 w-6 text-red-500 mr-2" />
              {document.name}
            </h1>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {document.uploadedBy}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last modified {document.lastModified}
              </span>
              <span className="mx-2">•</span>
              <span className={`flex items-center ${
                document.status === 'Processed' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {document.status === 'Processed' ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-1" />
                )}
                {document.status}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      {/* Document Tabs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'preview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'metadata'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('metadata')}
            >
              Metadata & Extracted Data
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'ai'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              AI Insights
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'comments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comments & History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="flex flex-col space-y-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={documentPreviewUrl} 
                  alt="Document Preview" 
                  className="w-full object-cover"
                  style={{ maxHeight: '600px' }}
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Document Description</h3>
                <p className="text-gray-700">{document.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  <button className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Tag
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Related Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {document.relatedDocuments.map((doc) => (
                    <Link 
                      key={doc.id} 
                      to={`/documents/${doc.id}`}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Metadata Tab */}
          {activeTab === 'metadata' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Document Metadata</h3>
                <button 
                  onClick={() => setShowMetadataForm(!showMetadataForm)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {showMetadataForm ? 'Cancel' : 'Edit Metadata'}
                </button>
              </div>

              {showMetadataForm ? (
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(document.metadata).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          defaultValue={value as string}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button 
                      onClick={() => setShowMetadataForm(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    {Object.entries(document.metadata).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">{value as string}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Extracted Data</h3>
                <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    {Object.entries(document.extractedData).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 font-medium">{value as string}</dd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Insights Tab */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-100">
                <h3 className="text-lg font-medium text-indigo-900 mb-3 flex items-center">
                  <BrainCircuitIcon className="h-5 w-5 mr-2 text-indigo-600" />
                  AI-Generated Summary
                </h3>
                <p className="text-gray-800">{document.aiInsights[0].content}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                    Sentiment Analysis
                  </h4>
                  <p className="text-sm text-gray-700">{document.aiInsights[1].content}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-green-500" />
                    Entity Recognition
                  </h4>
                  <p className="text-sm text-gray-700">{document.aiInsights[2].content}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    Anomaly Detection
                  </h4>
                  <p className="text-sm text-gray-700">{document.aiInsights[3].content}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Document Relationships</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                  <p className="text-gray-500 mb-2">Interactive document relationship graph would appear here</p>
                  <p className="text-sm text-gray-400">Visualizing connections between this document and related content</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900">AI-Powered Recommendations</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Info className="h-3 w-3 mr-1" />
                    Smart Suggestions
                  </span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Review the international market strategy based on the challenges mentioned in this report</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Schedule a meeting with the Marketing team to discuss the increased budget recommendation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700">Compare Q1 2023 results with Q1 2022 to analyze year-over-year performance</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Comments</h3>
                <div className="space-y-4">
                  {document.comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium">
                            {comment.user.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{comment.user}</p>
                            <p className="text-xs text-gray-500">{comment.date}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <textarea
                      rows={3}
                      placeholder="Add a comment..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Version History</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {document.versions.map((version, index) => (
                      <li key={index} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 font-medium">
                              v{version.version}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">Version {version.version}</p>
                              <p className="text-xs text-gray-500">
                                {version.date} by {version.user}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-sm text-indigo-600 hover:text-indigo-900">View</button>
                            <button className="text-sm text-indigo-600 hover:text-indigo-900">Restore</button>
                          </div>
                        </div>
                        {version.notes && (
                          <p className="mt-2 text-sm text-gray-700 ml-11">{version.notes}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom icon component
const BrainCircuitIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
    <path d="M16 8V5c0-1.1.9-2 2-2" />
    <path d="M12 13h4" />
    <path d="M12 18h6a2 2 0 0 1 2 2v1" />
    <path d="M12 8h8" />
    <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
    <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
  </svg>
);

export default DocumentView;