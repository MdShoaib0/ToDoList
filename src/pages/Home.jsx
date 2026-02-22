import React from 'react';
import InputField from '../component/InputForm';
import Footer from './Footer';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Home() {

useGSAP(() => {
const animation = gsap.from('#heading', {
y: -40,
opacity: 0,
duration: 1.2,
ease: "power3.out",
});


}, []);

return ( <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white flex flex-col">
  {/* Header Section */}
  <div className="w-full border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">

      <h1
        id="heading"
        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
      >
        TaskFlow Dashboard
      </h1>

      <span className="text-xs text-gray-300 hidden md:block">
        Organize • Focus • Execute
      </span>

    </div>
  </div>

  {/* Main Content */}
  <main className="flex-1">
    <InputField />
  </main>

  {/* Footer */}
  <div className="mt-10">
    <Footer />
  </div>

</div>

);
}

export default Home;
