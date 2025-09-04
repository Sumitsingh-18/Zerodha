import React from 'react';
import Hero from './Hero';
import Awards from './Awards';
import State from './State';
import Pricing from './Pricing';
import Education from './Education';
import OpenAcc from '../OpenAcc';



function Homepage() {
    return (
        <>
       
        {/* <div  style={{ backgroundColor: '#ccf5d5ff' }}> */}
        
         <Hero />
         <Awards />
         <State />
         <Pricing />
         <Education />
         <OpenAcc />
        
        
         {/* </div> */}
        </>
    );
}

export default Homepage