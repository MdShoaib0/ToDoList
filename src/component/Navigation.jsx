import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router'; // ✅ Correct import

function Navigation() {
  useGSAP(() => {
    const timeLine = gsap.timeline();

    // Animate Namaz and OurStory together
    timeLine.from('#Namaz', {
      x: -100,
      duration: 1,
      opacity: 0,
      ease: 'sine',
    }, "Navigation");

    timeLine.from('#OurStory', {
      x: 100,
      duration: 1,
      opacity: 0,
      ease: 'sine',
    }, "Navigation");
  }, []); // ✅ Empty dependency array so it runs only once

  return (
    <div className="grid grid-cols-2 gap-8">
      <Link
        id="Namaz"
        className="text-white text-center font-bold py-4 bg-fuchsia-600 rounded-lg outline-none border-none shadow-lg cursor-pointer active:scale-97 transition-all duration-200"
        to="/namaz"
      >
        Namaz
      </Link>
      <Link
        id="OurStory"
        className="text-white text-center font-bold py-4 bg-rose-500 rounded-lg outline-none border-none shadow-lg cursor-pointer active:scale-97 transition-all duration-200"
        to="https://kabooter1.netlify.app/"
        target="_blank" // ✅ Optional: Opens external link in new tab
        rel="noopener noreferrer"
      >
        Our Story
      </Link>
    </div>
  );
}

export default Navigation;