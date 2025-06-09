import React from 'react';
import MyVolunteerNeedPost from './MyVolunteerNeedPost';
import MyVolunteerRequestPost from './MyVolunteerRequestPost';

const MyPosts = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Manage My Volunteer Posts</h2>

      {/* My Volunteer Need Posts Section */}
      <section className="mb-12 p-6 bg-white rounded-2xl shadow-md border">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">📝 My Volunteer Need Posts</h3>
        <MyVolunteerNeedPost />
      </section>

      {/* My Volunteer Request Posts Section */}
      <section className="p-6 bg-white rounded-2xl shadow-md border">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">🤝 My Volunteer Request Posts</h3>
        <MyVolunteerRequestPost />
      </section>
    </div>
  );
};

export default MyPosts;
