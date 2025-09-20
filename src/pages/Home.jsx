import React from 'react';
import InputField from '../component/InputField';
import Footer from './Footer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Home() {
  useGSAP(() => {
    const animation = gsap.from('#heading', {
      y: -35,
      opacity: 0,
      duration: 1,
      ease: "sine.out",
    });

    // Cleanup on unmount
    return () => animation.kill();
  }, []);

  return (
    <div>
      <h1
        id="heading"
        className="text-center text-3xl font-bold text-slate-900"
      >
        Task Manager
      </h1>
      <InputField />
      <Footer />
    </div>
  );
}

export default Home;