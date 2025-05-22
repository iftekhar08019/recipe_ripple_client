import React from 'react';
import HeroSlider from '../components/Hero';
import RecipeCard from '../components/RecipeCard';
import TopRecipe from '../components/TopRecipe';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopRecipe></TopRecipe>
        </div>
    );
};

export default Home;
