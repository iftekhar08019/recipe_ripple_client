import React from 'react';
import HeroSlider from '../components/Hero';
import RecipeCard from '../components/RecipeCard';
import TopRecipe from '../components/TopRecipe';
import StatSection from '../components/StatSection';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopRecipe></TopRecipe>
            <StatSection></StatSection>
        </div>
    );
};

export default Home;
