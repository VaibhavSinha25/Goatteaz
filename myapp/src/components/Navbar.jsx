import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { FaSearch } from 'react-icons/fa';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // Handle the search logic here
        console.log('Searching for:', query);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const tl = useRef(null); // Use ref to persist timeline across renders
    const navbarRef = useRef(null);
    
    const menuLinks = [
       
        { title: 'Home', path: '/' },
        { title: 'Explore Facts', path: '/explore' },
        { title: 'Blogs', path: '/blogs' },
        { title: 'Community', path: '/community' },
        { title: 'Contact Us', path: '/contact' },
        
        { title: 'About Us', path: '/about' },
        ];

    useEffect(() => {
        // Initial fade in animation for navbar
        gsap.fromTo(navbarRef.current,
            { 
                opacity: 0,
                y: -20 
            },
            { 
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 2 // Adjusted delay to match video animation
            }
        );

        // Menu animation timeline
        tl.current = gsap.timeline({ paused: true });

        // Animate the full-screen menu
        tl.current.to(menuRef.current, {
            y: '0%',
            duration: 0.5,
            ease: 'power3.inOut'
        });

        // Animate menu items
        tl.current.fromTo(
            linksRef.current,
            { 
                y: -50,
                opacity: 0,
                rotateX: -45
            },
            { 
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'back.out(1.7)',
            },
            '-=0.3'
        );

        // Expose the timeline to parent component
        if (window.navbarTimeline) {
            window.navbarTimeline = tl.current;
        }
    }, []);

    // Toggle the menu animation when isMenuOpen changes
    useEffect(() => {
        if (isMenuOpen) {
            tl.current.play(); // Play forward when menu opens
        } else {
            tl.current.reverse(); // Reverse animation when menu closes
        }
    }, [isMenuOpen]);

    return (
        <nav 
            ref={navbarRef}
            className="w-full bg-transparent text-white p-4 fixed top-0 left-0 z-50 opacity-0" // Added opacity-0
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
               
              
                <div className="text-3xl font-extrabold flex items-center hover:text-red-500 cursor-pointer transition-colors">
                    <img src="./src/assets/logowhite.png" alt="Goateaz" className="w-10 h-10" />
                    Goateaz
                    </div>

                    
                    {/* <div className="search-bar bg-red-500 bg-opacity-10 backdrop-blur-lg w-1/4 h-9 border-2 border-white rounded-3xl flex items-center px-3">
                <input 
                type="text" 
                placeholder="Search..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className="search-input w-96 me-2 bg-transparent  text-white outline-none active:outline-none placeholder:text-white"
                        />
                          <button onClick={handleSearch} className="search-button hover:text-red-500">
                <FaSearch />
            </button>
                        </div> */}
                <button 
                    className="text-white text-3xl font-extrabold  focus:outline-none hover:text-cyan-400 transition-colors active:scale-90"
                    onClick={() => setIsMenuOpen(true)}
                >
                    Menu
                </button>
            </div>

            {/* Updated Menu Links with perspective */}
            <div 
                ref={menuRef}
                className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 translate-y-[-100%] z-40 flex items-center justify-center perspective-[1000px]"
            >
                {/* Close Button */}
                <button 
                    className="absolute top-8 right-8 text-white text-4xl focus:outline-none hover:text-red-500 transition-colors active:scale-90"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <FaTimes />
                </button>

                {/* Menu Links */}
                <ul className="text-center space-y-8">
                    {menuLinks.map((link, index) => (
                        <li 
                            key={link.title}
                            ref={el => linksRef.current[index] = el}
                            className="text-6xl font-extrabold text-white hover:text-black transition-colors transform-style-preserve-3d"
                        >
                            <a href={link.path}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
