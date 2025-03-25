import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Image as ImageIcon, Video } from 'lucide-react';

const LessonManager = () => {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: '',
    content: '',
    photo_url: '',
    video_url: '',
  });

  // Fetch all lessons
  useEffect(() => {
    axios.get('/api/lessons')
      .then(res => setLessons(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewLesson({
      ...newLesson,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/lessons', newLesson)
      .then(res => {
        setLessons([...lessons, res.data]);
        setNewLesson({ title: '', content: '', photo_url: '', video_url: '' });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-medium mb-4">Add New Lesson</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="title"
              placeholder="Lesson Title"
              value={newLesson.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Lesson Content"
              value={newLesson.content}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <input
                name="photo_url"
                placeholder="Photo URL"
                value={newLesson.photo_url}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5 text-gray-400" />
              <input
                name="video_url"
                placeholder="Video URL"
                value={newLesson.video_url}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 w-full md:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Lesson</span>
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-6">Existing Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(lessons) && lessons.length > 0 ? (
    lessons.map(lesson => (
      <div key={lesson.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <img
            src={lesson.photo_url}
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{lesson.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{lesson.content}</p>
          {lesson.video_url && (
            <video
              src={lesson.video_url}
              controls
              className="w-full rounded-md"
            />
          )}
        </div>
      </div>
    ))
  ) : (
    <p>No lessons available</p>
  )}
        </div>
      </div>
    </div>
  );
};

export default LessonManager;
