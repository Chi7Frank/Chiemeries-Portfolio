import logoImg from "../assets/images/profile/C-logo-dark.png"
import navlink from "../assets/data/navlink.json"
import { useEffect, useState } from "react"

const NavLink = ({title, section, classes, closeMenu}) =>{
    return(
        <li>
            <a 
            href={section}
            className={classes}
            onClick={closeMenu}
            >
                {title}
            </a>
        </li>
    )
}

const Header = () =>{
    const [isSticky, setIsSticky] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY > 0){
                setIsSticky(true)
            } else{
                setIsSticky(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    },[])

    useEffect(() => {
    const handleResize = () => {
        // If the screen gets wide (desktop size) and the menu is open, close it
        if (window.innerWidth > 768 && isOpen) {
            setIsOpen(false);
        }
    };

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, [isOpen]); 



    return(
        <header className={`header bg-teal-pale-2 border-b border-teal-pale shadow-[0_1px_8px_rgba(15,61,62,0.06)] transition-[box-shadow] duration-200 ${isSticky ? 'sticky' : ''}`}>
        <nav className="navbar flex items-center justify-between h-[72px] px-8 max-md:px-5 max-w-[1200px] mx-auto">
            <div className="logo">
                <a href="/" className="flex items-center">
                    <img src={logoImg} alt="Chiemerie's Logo" className="h-10 w-auto block rounded-full" />
                </a>
            </div>
                
            <ul className={`nav-links flex items-center gap-9 list-none ${isOpen ? "mobile-open" : "max-md:hidden"}`}>
                {navlink.map((link, index) => (
                        <NavLink
                            key={index}
                            {...link}
                            closeMenu={() => setIsOpen(false)} 
                        />
                    )
                )}
            </ul>
                
            <button 
            className="hamburger hidden max-md:flex max-md:items-center max-md:justify-center max-md:w-10 max-md:h-10 max-md:border-none max-md:bg-transparent max-md:text-teal-dark-2 max-md:text-xl max-md:cursor-pointer" id="hamburger-btn" aria-label="Toggle navigation menu" aria-expanded={isOpen}
            onClick={() =>{setIsOpen(!isOpen)}}
            >
                <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
        </nav>
    </header>
    )
}

export default Header