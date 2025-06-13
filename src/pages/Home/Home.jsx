import React from 'react';
import Banner from './Banner';
import VolunteerNowSection from './VolunteerNowSection';
import AboutVolunteering from './AboutVolunteering';
import TestimonialsSection from './TestimonialsSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <VolunteerNowSection/>
            <TestimonialsSection/>
            <AboutVolunteering/>
        </div>
    );
};

export default Home;