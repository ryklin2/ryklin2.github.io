import React, { useState } from 'react';
import { FolderUp, Image, Folder, Tag, Settings, Search, ChevronDown, HelpCircle, Trash, Clock, LayoutGrid, List, Heart, Filter, AlertTriangle, Palette, Download, Eye } from 'lucide-react';

const AIImageSorter = () => {
  const [screen, setScreen] = useState('main'); // Options: main, login, fileSelect
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Images');
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample categories for anime/game art
  const categories = [
    'All Images',
    'Characters',
    'Fanart',
    'Official Art',
    'Video Games',
    'Game Screenshots',
    'Pixel Art',
    'Wallpapers',
    'Mecha',
    'Landscapes',
    'Uncategorized'
  ];

  // Sample tags that DeepDanbooru might detect
  const popularTags = [
    'blue_hair',
    'sword',
    'armor',
    'blonde_hair',
    'magic',
    'school_uniform',
    'mecha',
    'cat_ears'
  ];

  // Sample images (placeholders updated for GitHub Pages)
  const images = [
    { id: 1, preview: 'https://via.placeholder.com/150', category: 'Characters', franchise: 'Genshin Impact', tags: ['blonde_hair', 'sword', 'gloves'], date: '2025-02-14', confidence: 0.98, character: 'Jean' },
    { id: 2, preview: 'https://via.placeholder.com/150', category: 'Fanart', franchise: 'Fate Series', tags: ['blue_hair', 'armor', 'sword'], date: '2025-03-01', confidence: 0.95, character: 'Saber (Artoria)' },
    { id: 3, preview: 'https://via.placeholder.com/150', category: 'Official Art', franchise: 'Fire Emblem', tags: ['red_hair', 'armor', 'fire', 'magic'], date: '2025-01-23', confidence: 0.99, character: 'Roy' },
    { id: 4, preview: 'https://via.placeholder.com/150', category: 'Game Screenshots', franchise: 'Final Fantasy', tags: ['magic', 'blonde_hair', 'weapon'], date: '2025-03-15', confidence: 0.89, character: 'Cloud Strife' }
  ];

  // Login screen
  if (screen === 'login') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-purple-900">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-600 p-4 text-center">
            <div className="flex justify-center items-center space-x-2">
              <Image size={28} className="text-white" />
              <h1 className="text-2xl font-bold text-white">AnimeArt Sorter</h1>
            </div>
            <span className="inline-block mt-1 bg-purple-800 text-xs px-2 py-0.5 rounded text-white">DeepDanbooru Powered</span>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-purple-600 hover:text-purple-500">Forgot password?</a>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setScreen('main')}
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <a className="ml-1 text-purple-600 hover:text-purple-500 font-medium" href="#">
                  Sign up
                </a>
              </p>
              <button
                className="mt-4 w-full border border-gray-300 bg-white text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={() => setScreen('main')}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // File selection screen
  if (screen === 'fileSelect') {
    return (
      <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
        {/* Header */}
        <header className="bg-purple-600 text-white p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                className="text-white hover:bg-purple-700 p-1 rounded-md"
                onClick={() => setScreen('main')}
              >
                ← Back
              </button>
              <Image size={24} />
              <h1 className="text-xl font-bold">Import Images</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md"
                onClick={() => setScreen('main')}
              >
                Start Import
              </button>
            </div>
          </div>
        </header>

        {/* Windows-style file browser */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <button className="px-3 py-1 border border-gray-300 rounded flex items-center space-x-1">
                  <span>←</span>
                  <span>Back</span>
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded flex items-center space-x-1">
                  <span>↑</span>
                  <span>Up</span>
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className="w-full px-3 py-1 border border-gray-300 rounded"
                    value="C:\\Users\\User\\Pictures\\Anime\\"
                    readOnly
                  />
                </div>
                <button className="px-3 py-1 border border-gray-300 rounded">
                  <Search size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Left sidebar - folders */}
              <div className="w-60 border-r border-gray-200 overflow-y-auto p-2">
                <div className="mb-2 font-medium text-sm">Quick access</div>
                <ul className="space-y-1">
                  <li>
                    <button className="w-full flex items-center space-x-2 p-1 hover:bg-gray-100 rounded text-left">
                      <Folder size={16} className="text-yellow-500" />
                      <span className="text-sm">Desktop</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center space-x-2 p-1 hover:bg-gray-100 rounded text-left">
                      <Folder size={16} className="text-yellow-500" />
                      <span className="text-sm">Documents</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center space-x-2 p-1 hover:bg-gray-100 rounded text-left">
                      <Folder size={16} className="text-yellow-500" />
                      <span className="text-sm">Downloads</span>
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center space-x-2 p-1 bg-blue-100 rounded text-left">
                      <Folder size={16} className="text-yellow-500" />
                      <span className="text-sm">Pictures</span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Main content - files and folders */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="aspect-square border border-gray-200 rounded flex items-center justify-center">
                      <Folder size={32} className="text-yellow-500" />
                    </div>
                    <div className="text-xs mt-1 truncate">Genshin Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square border border-gray-200 rounded flex items-center justify-center">
                      <Folder size={32} className="text-yellow-500" />
                    </div>
                    <div className="text-xs mt-1 truncate">Fate Series</div>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square border border-gray-200 rounded flex items-center justify-center">
                      <img src="https://via.placeholder.com/60" alt="Preview" className="object-cover" />
                    </div>
                    <div className="text-xs mt-1 truncate">saber_01.png</div>
                  </div>
                  <div className="text-center">
                    <div className="aspect-square border border-gray-200 rounded flex items-center justify-center">
                      <img src="https://via.placeholder.com/60" alt="Preview" className="object-cover" />
                    </div>
                    <div className="text-xs mt-1 truncate">archer_fight.jpg</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar - import options */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium mb-1">Import Options</div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="auto-tag"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="auto-tag" className="ml-2 block text-sm text-gray-700">
                        Auto-tag with DeepDanbooru
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="detect-chars"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="detect-chars" className="ml-2 block text-sm text-gray-700">
                        Detect characters
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700"
                    onClick={() => setScreen('main')}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded"
                    onClick={() => setScreen('main')}
                  >
                    Import Selected Files
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main app screen (default)
  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-purple-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image size={24} />
            <h1 className="text-xl font-bold">AnimeArt Sorter</h1>
            <span className="bg-purple-800 text-xs px-2 py-0.5 rounded">DeepDanbooru Powered</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md flex items-center space-x-2"
              onClick={() => setScreen('fileSelect')}
            >
              <FolderUp size={18} />
              <span>Import Images</span>
            </button>
            <button className="bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md flex items-center space-x-2">
              <Tag size={18} />
              <span>Batch Tag</span>
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-md">
              <Settings size={18} />
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded-md"
              onClick={() => setScreen('login')}
            >
              <HelpCircle size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-4 flex flex-col overflow-y-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search images..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-2">Categories</h2>
          <ul className="space-y-1 mb-6">
            {categories.map(category => (
              <li key={category}>
                <button
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 ${
                    selectedCategory === category ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <Folder size={16} />
                  <span>{category}</span>
                </button>
              </li>
            ))}
          </ul>

          <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-2">Smart Filters</h2>
          <ul className="space-y-1 mb-6">
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-gray-300">
                <Clock size={16} />
                <span>Recently Added</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-gray-300">
                <Heart size={16} />
                <span>Favorites</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-gray-300">
                <Filter size={16} />
                <span>High Confidence (>90%)</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-gray-300">
                <AlertTriangle size={16} />
                <span>Low Confidence (&lt;70%)</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 hover:bg-gray-300">
                <Palette size={16} />
                <span>Art Style Analysis</span>
              </button>
            </li>
          </ul>

          <h2 className="font-semibold text-sm uppercase tracking-wider text-gray-500 mb-2">Popular Tags</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {popularTags.map(tag => (
              <button
                key={tag}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs px-2 py-1 rounded-md"
              >
                {tag}
              </button>
            ))}
            <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-md">
              + More Tags
            </button>
          </div>
        </aside>

        {/* Main panel */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{selectedCategory}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-gray-200 rounded-md p-1">
                <button
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* AI Analysis Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Image className="text-purple-600" size={20} />
              </div>
              <div>
                <h3 className="font-medium">DeepDanbooru Analysis Complete</h3>
                <p className="text-sm text-gray-600">125 anime/game images tagged with 94% average confidence</p>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
              Review Tags
            </button>
          </div>

          {/* Images grid view */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div
                key={img.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <div className="aspect-square bg-gray-200 relative">
                  <img
                    src={img.preview}
                    alt={`${img.character || 'Anime character'} from ${img.franchise}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 p-1">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                      {img.confidence && `${Math.round(img.confidence * 100)}%`}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span className="text-xs text-white font-medium">{img.franchise}</span>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      {img.category}
                    </span>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>
                        <Eye size={14} className="hover:text-blue-500 transition-colors" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600" onClick={(e) => e.stopPropagation()}>
                        <Heart size={14} className="hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {img.tags && img.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Preview panel */}
        <aside className="w-72 bg-gray-100 border-l border-gray-300 p-4 flex flex-col overflow-y-auto hidden md:block">
          <h2 className="font-semibold text-lg mb-4">Character Details</h2>
          {selectedImage ? (
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="aspect-square bg-gray-200 mb-4 rounded-md overflow-hidden">
                <img
                  src={selectedImage.preview}
                  alt={`${selectedImage.character} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Character</h3>
                  <p className="text-sm flex items-center">
                    <span>{selectedImage.character}</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded-md">
                      {Math.round(selectedImage.confidence * 100)}%
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Source</h3>
                  <p className="text-sm">{selectedImage.franchise}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Tags</h3>
                  <p className="text-sm">{selectedImage.tags.join(', ')}</p>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Date Added</h3>
                  <p className="text-sm">{selectedImage.date}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Select an image to view details</p>
          )}

          <h3 className="font-medium text-sm uppercase tracking-wider text-gray-500 mb-2">Actions</h3>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-3">
              <div>
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Tag size={14} className="mr-2" />
                  Edit Tags
                </button>
              </div>
              <div>
                <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Folder size={14} className="mr-2" />
                  Move to Collection
                </button>
              </div>
              <div>
                <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-md text-sm flex items-center justify-center">
                  <Download size={14} className="mr-2" />
                  Download Image
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AIImageSorter;