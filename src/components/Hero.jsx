import heroImg from "../assets/images/profile/heroImg.png"

const Hero = () =>{
    return(
         <section id="hero-section" className="hero-section max-w-[1200px] mx-auto py-12 px-8 max-md:py-10 max-md:px-5 bg-teal-pale-2">
            <div className="hero-grid grid grid-cols-1 md:grid-cols-[1fr_1.2fr] items-center gap-x-12 gap-y-4 max-md:gap-y-8 mt-8 max-md:mt-4 max-md:text-center">
                <div className="hero-img-block flex justify-center max-md:order-1">
                    <img src={heroImg} alt="My Picture" className="hero-img w-full max-w-[380px] max-md:max-w-[240px] aspect-square object-cover rounded-[20%] border-[3px] border-teal-dark shadow-[0_12px_32px_rgba(0,128,128,0.18)]" />
                </div>
                <div className="hero-txt-block max-md:order-2">
                    <h2 className="section-title text-base font-semibold tracking-[0.15em] uppercase text-teal-primary mb-6 font-heading">About Me</h2>
                    <p className="hero-intro text-[1.35rem] max-md:text-[1.05rem] leading-[1.7] text-brand-black text-justify">
                        Hi, I am <span className="my-name text-teal-primary font-bold">Chiemerie Obinwa</span>, 
                        a Computer Science student at the Federal University of 
                        Technology, Owerri (FUTO), Nigeria. I am a front end 
                        developer and tech enthusiast with growing passion for 
                        System Architecture and Designs, and Defensive Security.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero