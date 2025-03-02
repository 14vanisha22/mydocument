import React, { useState } from 'react';
import { 
  Search as SearchIcon, 
  FileText, 
  Filter, 
  SortAsc, 
  Tag, 
  Calendar, 
  User,
  File,
  FileSpreadsheet,
  Image,
  FileCode,
  FileType,
  FileText as FileDocIcon,
  Clock,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    documentTypes: [] as string[],
    dateRange: 'any',
    categories: [] as string[]
  });

  // Mock search results
  const mockResults = [
    { 
      id: '1', 
      name: 'Q1 Financial Report.pdf', 
      type: 'PDF', 
      category: 'Finance', 
      size: '2.4 MB', 
      date: '2023-04-15', 
      snippet: '...showing a <mark>12.5% growth</mark> in revenue compared to the previous quarter. The <mark>financial</mark> outlook for Q2 is positive...',
      relevance: 0.95,
      icon: File
    },
    { 
      id: '2', 
      name: 'Employment Contract.docx', 
      type: 'DOCX', 
      category: 'Legal', 
      size: '1.2 MB', 
      date: '2023-04-12', 
      snippet: '...this <mark>financial</mark> agreement between the company and the employee outlines compensation and benefits...',
      relevance: 0.82,
      icon: FileDocIcon
    },
    { 
      id: '3', 
      name: 'Product Roadmap.pptx', 
      type: 'PPTX', 
      category: 'Planning', 
      size: '5.7 MB', 
      date: '2023-04-10', 
      snippet: '...product development timeline with projected <mark>financial</mark> requirements for each phase...',
      relevance: 0.78,
      icon: FileType
    },
    { 
      id: '4', 
      name: 'Customer Survey Results.xlsx', 
      type: 'XLSX', 
      category: 'Research', 
      size: '3.1 MB', 
      date: '2023-04-08', 
      snippet: '...customer satisfaction metrics and their correlation with <mark>financial</mark> performance indicators...',
      relevance: 0.71,
      icon: FileSpreadsheet
    },
    { 
      id: '5', 
      name: 'Marketing Budget.xlsx', 
      type: 'XLSX', 
      category: 'Finance', 
      size: '1.8 MB', 
      date: '2023-03-25', 
      snippet: '...detailed breakdown of marketing expenses and their impact on <mark>financial</mark> goals for the fiscal year...',
      relevance: 0.68,
      icon: FileSpreadsheet
    },
    { 
      id: '6', 
      name: 'Board Meeting Minutes.docx', 
      type: 'DOCX', 
      category: 'Corporate', 
      size: '0.9 MB', 
      date: '2023-03-15', 
      snippet: '...board members discussed the <mark>financial</mark> performance and approved the budget for the next quarter...',
      relevance: 0.65,
      icon: FileDocIcon
    },
  ];

  const documentTypes = [
    { value: 'PDF', label: 'PDF Documents', icon: File },
    { value: 'DOCX', label: 'Word Documents', icon: FileDocIcon },
    { value: 'XLSX', label: 'Excel Spreadsheets', icon: FileSpreadsheet },
    { value: 'PPTX', label: 'PowerPoint Presentations', icon: FileType },
    { value: 'IMG', label: 'Images', icon: Image },
    { value: 'CODE', label: 'Code Files', icon: FileCode },
  ];

  const categories = [
    'Finance',
    'Legal',
    'Planning',
    'Research',
    'Marketing',
    'Technical',
    'Corporate',
    'HR'
  ];

  const dateRanges = [
    { value: 'any', label: 'Any time' },
    { value: 'day', label: 'Past 24 hours' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: 'year', label: 'Past year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const recentSearches = [
    'quarterly report',
    'marketing plan',
    'employee handbook',
    'project timeline'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  const toggleDocumentTypeFilter = (type: string) => {
    setSelectedFilters(prev => {
      const types = prev.documentTypes.includes(type)
        ? prev.documentTypes.filter(t => t !== type)
        : [...prev.documentTypes, type];
      
      return { ...prev, documentTypes: types };
    });
  };

  const toggleCategoryFilter = (category: string) => {
    setSelectedFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  const setDateRange = (range: string) => {
    setSelectedFilters(prev => ({ ...prev, dateRange: range }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      documentTypes: [],
      dateRange: 'any',
      categories: []
    });
  };

  const getFileIcon = (type: string) => {
    const iconComponent = documentTypes.find(dt => dt.value === type)?.icon;
    return iconComponent || FileText;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Document Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search documents by content, metadata, or tags..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSearchQuery('')}
                >
                  <span className="text-gray-400 hover:text-gray-500">×</span>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600"
            >
              <Filter className="h-4 w-4 mr-1" />
              {showFilters ? 'Hide filters' : 'Show filters'}
            </button>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 text-indigo-500 mr-1" />
              <span className="text-sm text-gray-600">AI-powered semantic search enabled</span>
            </div>
          </div>
        </form>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">Search Filters</h3>
              <button
                onClick={clearFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                Clear all filters
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Document Type Filter */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Document Type</h4>
                <div className="space-y-1">
                  {documentTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <label key={type.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={selectedFilters.documentTypes.includes(type.value)}
                          onChange={() => toggleDocumentTypeFilter(type.value)}
                        />
                        <IconComponent className="h-4 w-4 ml-2 mr-1 text-gray-500" />
                        <span className="ml-2 text-sm text-gray-700">{type.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Date Range</h4>
                <div className="space-y-1">
                  {dateRanges.map((range) => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        checked={selectedFilters.dateRange === range.value}
                        onChange={() => setDateRange(range.value)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Categories</h4>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        checked={selectedFilters.categories.includes(category)}
                        onChange={() => toggleCategoryFilter(category)}
                      />
                      <span className="ml-2 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Searches */}
        {!searchResults.length && !isSearching && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Recent Searches</h2>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                  onClick={() => {
                    setSearchQuery(search);
                    handleSearch(new Event('submit') as any);
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {isSearching ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Found {searchResults.length} results for "{searchQuery}"
              </p>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                <select className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Relevance</option>
                  <option>Date (newest)</option>
                  <option>Date (oldest)</option>
                  <option>Name (A-Z)</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {searchResults.map((result) => {
                  const ResultIcon = result.icon;
                  return (
                    <li key={result.id} className="p-4 hover:bg-gray-50">
                      <Link to={`/documents/${result.id}`} className="block">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <ResultIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-medium text-indigo-600 hover:text-indigo-800">
                                {result.name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {Math.round(result.relevance * 100)}% match
                              </span>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <span className="flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {result.category}
                              </span>
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(result.date).toLocaleDateString()}
                              </span>
                              <span className="mx-2">•</span>
                              <span>{result.size}</span>
                            </div>
                            <p 
                              className="mt-2 text-sm text-gray-700"
                              dangerouslySetInnerHTML={{ __html: result.snippet }}
                            ></p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Search;