import React from 'react';
import HeroSlider from '../components/Hero';
import RecipeCard from '../components/RecipeCard';
import TopRecipe from '../components/TopRecipe';
import StatSection from '../components/StatSection';
import QAPhoneMockup from '../components/QAPhoneMockUp';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopRecipe></TopRecipe>
            <QAPhoneMockup></QAPhoneMockup>
            <StatSection></StatSection>
        </div>
    );
};

export default Home;
