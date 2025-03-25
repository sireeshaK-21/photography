import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusCircle, Image as ImageIcon, Video } from 'lucide-react';
import api from '../api'; // where baseURL = http://localhost:3001




const LessonManager = () => {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newLesson, setNewLesson] = useState({
    course_id: '',
    title: '',
    content: '',
    photo_url: '',
    video_url: '',
  });
  useEffect(() => {
    api.get("/api/lessons").then(res => setLessons(res.data));
    api.get("/api/courses").then(res => setCourses(res.data));
  }, []);
  
  useEffect(() => {
    axios
      .get('/api/lessons')
      .then((res) => setLessons(res.data))
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    axios
      .get('/api/courses')
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);
  const handleChange = (e) => {
    setNewLesson({
      ...newLesson,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/lessons', newLesson)
      .then((res) => {
        setLessons([...lessons, res.data]);
        setNewLesson({ course_id: '', title: '', content: '', photo_url: '', video_url: '' });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div style={{ maxWidth: '6xl', margin: '0 auto', padding: '32px' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '24px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px' }}>Add New Lesson</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <select
              name="course_id"
              value={newLesson.course_id}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {Array.isArray(courses) && courses.length > 0 ? (
                <>
                  <option value="">Select a Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">No courses available</option>
              )}
            </select>
          </div>
          <div>
            <input
              name="title"
              placeholder="Lesson Title"
              value={newLesson.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <textarea
              name="content"
              placeholder="Lesson Content"
              value={newLesson.content}
              onChange={handleChange}
              rows="4"
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                <ImageIcon style={{ width: '20px', height: '20px', marginRight: '8px', color: '#777' }} />
                <input
                  name="photo_url"
                  placeholder="Photo URL"
                  value={newLesson.photo_url}
                  onChange={handleChange}
                  style={{ flex: '1', padding: '8px', border: 'none' }}
                />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px' }}>
                <Video style={{ width: '20px', height: '20px', marginRight: '8px', color: '#777' }} />
                <input
                  name="video_url"
                  placeholder="Video URL"
                  value={newLesson.video_url}
                  onChange={handleChange}
                  style={{ flex: '1', padding: '8px', border: 'none' }}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 16px', backgroundColor: '#007BFF', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            <PlusCircle style={{ width: '20px', height: '20px', marginRight: '8px' }} />
            Add Lesson
          </button>
        </form>
      </div>
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '16px' }}>Existing Lessons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {Array.isArray(lessons) && lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div key={lesson.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ aspectRatio: '16 / 9', position: 'relative' }}>
                  <img src={lesson.photo_url} alt={lesson.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{lesson.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>{lesson.content}</p>
                  {lesson.video_url && (
                    <video src={lesson.video_url} controls style={{ width: '100%', borderRadius: '4px' }} />
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