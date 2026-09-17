import seatImg from "../assets/images/profile/seatImg.png"

const Paragraph = ({children}) =>{
    return(
        <p className="story-text text-[1.15rem] max-md:text-base leading-[1.8] text-brand-black text-justify mb-12 max-md:mb-8">    
        {children}
        </p>
    )
}

const Story = ()=>{
    return(
        <section id="story-section" className="story-section max-w-[1200px] mx-auto py-20 px-8 max-md:py-12 max-md:px-5">
            <h2 className="section-title text-base font-semibold tracking-[0.15em] uppercase text-teal-primary mb-6 font-heading">My Story</h2>
             
            <div className="my-story grid grid-cols-1 md:grid-cols-[1.2fr_1fr] items-center gap-12 max-md:gap-8">
                <div className="story-txt-block md:order-1 max-md:order-2">
                    <Paragraph>
                        I grew up wanting to invent new colors for the wheel, 
                        and that zeal led me into Computer Science at FUTO — 
                        where I realized invention doesn't just happen. It 
                        meant research, problem-finding, pragmatic problem-solving, 
                        and secure system architecture. Somewhere along the way, 
                        I was opportuned to lead small teams, and I learned that 
                        the best solutions rarely come from a single thread of interest 
                        — they come from real collaboration and trust.
                    </Paragraph>

                    <Paragraph>
                        Today, I'm focused on integrating myself into communities exploring 
                        the intersection of system design and defensive security — not for the 
                        career options, but because I believe that as technology advances globally, 
                        we need systems that can hold themselves under assault. I'm always looking 
                        for the next room where like minds converge.
                    </Paragraph>


                    <a className="resume-download inline-flex items-center gap-2 py-3 px-6 mb-12 bg-teal-primary text-white text-[0.9rem] font-semibold no-underline rounded-lg transition-[background-color,transform] duration-200 hover:bg-teal-dark hover:-translate-y-0.5 active:translate-y-0" href="https://drive.google.com/file/d/1luEuoMrkhj52sRX_AVK-dTwWcABnMqD9/preview" target="_blank" rel="noopener">
                        <i className="fa-solid fa-file-arrow-down"></i>
                        View My Resume
                    </a>
                </div>

                <div className="story-img-block md:order-2 max-md:order-1 flex justify-center">
                    <img src={seatImg} alt="My Picture" className="story-img w-full max-w-[420px] max-md:max-w-[280px] aspect-[4/5] object-cover rounded-2xl border-4 border-teal-pale-2 shadow-[0_12px_32px_rgba(0,128,128,0.16)]" />
                </div>
            </div>
        </section>
    )
}

export default Story