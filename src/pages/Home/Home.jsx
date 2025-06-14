import React from 'react';
import Banner from './Banner';
import VolunteerNowSection from './VolunteerNowSection';
import AboutVolunteering from './AboutVolunteering';
import useDynamicTitle from '../../hooks/useDynamicTitle';

const Home = () => {
    useDynamicTitle("Home")
    return (
        <div>
            <Banner/>
            <VolunteerNowSection/>
            <AboutVolunteering/>
        </div>
    );
};

export default Home;