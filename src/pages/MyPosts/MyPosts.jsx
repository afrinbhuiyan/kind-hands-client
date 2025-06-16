import React from 'react';
import MyVolunteerNeedPost from './MyVolunteerNeedPost';
import MyVolunteerRequestPost from './MyVolunteerRequestPost';

const MyPosts = () => {
    return (
        <div>
            <MyVolunteerNeedPost/>
            <MyVolunteerRequestPost/>
        </div>
    );
};

export default MyPosts;