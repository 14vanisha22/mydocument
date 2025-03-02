import React from 'react';
import { 
  FileText, 
  Clock, 
  Tag, 
  Users, 
  AlertCircle, 
  CheckCircle,
  BarChart2,
  Search,
  Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for dashboard
  const recentDocuments = [
    { id: '1', name: 'Q1 Financial Report.pdf', type: 'Finance', date: '2 hours ago', status: 'Processed' },
    { id: '2', name: 'Employment Contract.docx', type: 'Legal', date: '5 hours ago', status: 'Processed' },
    { id: '3', name: 'Product Roadmap.pptx', type: 'Planning', date: 'Yesterday', status: 'Processing' },
    { id: '4', name: 'Customer Survey Results.xlsx', type: 'Research', date: 'Yesterday', status: 'Processed' },
  ];

  const documentStats = [
    { label: 'Total Documents', value: '1,254', icon: FileText, color: 'bg-blue-500' },
    { label: 'Processed Today', value: '37', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Pending Processing', value: '12', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Processing Errors', value: '3', icon: AlertCircle, color: 'bg-red-500' },
  ];

  const topCategories = [
    { name: 'Finance', count: 342 },
    { name: 'Legal', count: 256 },
    { name: 'HR', count: 198 },
    { name: 'Marketing', count: 145 },
    { name: 'Research', count: 87 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <Link 
            to="/documents" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Documents
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {documentStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-5 flex items-center">
            <div className={`${stat.color} p-3 rounded-full mr-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Documents</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doc.status === 'Processed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/documents/${doc.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <Link to="/documents" className="text-sm text-indigo-600 hover:text-indigo-900">View all documents</Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Top Categories</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <Tag className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count} docs</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${(category.count / 342) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link to="/documents" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Upload className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Upload Documents</span>
            </Link>
            <Link to="/search" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Search className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Search Documents</span>
            </Link>
            <Link to="/analytics" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <BarChart2 className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">View Analytics</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <Users className="h-8 w-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Users</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;