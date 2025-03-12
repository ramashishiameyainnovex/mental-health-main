import axios from 'axios';
import React,{ useState } from 'react';

export default function MoodAdmin  () {
  const [formData, setFormData] = useState({
    mood: '',
    emoji: '',
    color: 'blue',
    types: [{ type: '', solution: '', musicLink: '', videoLink: '' }],
    musicLinks: [{ title: '', url: '' }],
    videoLinks: [{ title: '', url: '' }],
    contentLinks: [{ title: '', url: '' }]
  });

  const colors = ['blue', 'purple', 'red', 'yellow', 'gray', 'green', 'pink'];

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = [...formData[section]];
    updatedSection[index][field] = value;
    setFormData({ ...formData, [section]: updatedSection });
  };

  const addNewEntry = (section) => {
    const newEntry = section === 'types' 
      ? { type: '', solution: '', musicLink: '', videoLink: '' }
      : { title: '', url: '' };
    
    setFormData({ 
      ...formData, 
      [section]: [...formData[section], newEntry] 
    });
  };

  const removeEntry = (section, index) => {
    const filtered = formData[section].filter((_, i) => i !== index);
    setFormData({ ...formData, [section]: filtered });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!formData.mood || !formData.emoji) {
      alert('Mood and Emoji fields are required!');
      return;
    }
  
    // Validate types array
    if (formData.types.length === 0) {
      alert('At least one type must be added!');
      return;
    }
  
    // Validate individual type fields
    for (const type of formData.types) {
      if (!type.type || !type.solution) {
        alert('All type fields must be filled out!');
        return;
      }
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/mood', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 201) {
        // Reset form after successful submission
        setFormData({
          mood: '',
          emoji: '',
          color: 'blue',
          types: [{ type: '', solution: '', musicLink: '', videoLink: '' }],
          musicLinks: [{ title: '', url: '' }],
          videoLinks: [{ title: '', url: '' }],
          contentLinks: [{ title: '', url: '' }]
        });
        alert('Mood data saved successfully!');
      }
    } catch (err) {
      // Handle error responses
      const errorMessage = err.response?.data?.message || 'Failed to save mood data';
      console.error('Submission error:', errorMessage);
      alert(`Error: ${errorMessage}`);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16 max-w-lg m-auto">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Mood Data</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Mood Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mood Name</label>
              <input
                type="text"
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Emoji</label>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {colors.map(color => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mood Types Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Mood Types</h3>
            {formData.types.map((type, index) => (
              <div key={index} className="space-y-4 mb-4 border rounded p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Type #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeEntry('types', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type Name</label>
                    <input
                      type="text"
                      value={type.type}
                      onChange={(e) => handleInputChange('types', index, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Solution</label>
                    <input
                      type="text"
                      value={type.solution}
                      onChange={(e) => handleInputChange('types', index, 'solution', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Music Link</label>
                    <input
                      type="url"
                      value={type.musicLink}
                      onChange={(e) => handleInputChange('types', index, 'musicLink', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Video Link</label>
                    <input
                      type="url"
                      value={type.videoLink}
                      onChange={(e) => handleInputChange('types', index, 'videoLink', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addNewEntry('types')}
              className="w-full bg-blue-100 text-blue-700 py-2 rounded-md hover:bg-blue-200"
            >
              Add New Type
            </button>
          </div>

          {/* Resource Sections (Music, Video, Content Links) */}
          {['musicLinks', 'videoLinks', 'contentLinks'].map((section) => (
            <div key={section} className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">
                {section.replace('Links', '').charAt(0).toUpperCase() + 
                 section.replace('Links', '').slice(1)} Resources
              </ h3>
              
              {formData[section].map((resource, index) => (
                <div key={index} className="space-y-4 mb-4 border rounded p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Resource #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeEntry(section, index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={resource.title}
                        onChange={(e) => handleInputChange(section, index, 'title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">URL</label>
                      <input
                        type="url"
                        value={resource.url}
                        onChange={(e) => handleInputChange(section, index, 'url', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addNewEntry(section)}
                className="w-full bg-blue-100 text-blue-700 py-2 rounded-md hover:bg-blue-200"
              >
                Add New {section.replace('Links', '')} Resource
              </button>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Mood Data
          </button>
        </form>
      </div>
    </div>
  );
};

