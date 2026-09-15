import { useCallback, useEffect, useState } from "react";
import certs from "../assets/data/cert.json"
import { useRef } from "react";

const CertImgs = import.meta.glob(
    "../assets/images/certificates/*",
    {
        eager : true,
        import: "default"
    }
)



const CertificateSlide = ({id, title, institution, platform, date, image, url}) =>{
// Construct the exact path Vite generated in the certImgs object
                const imgPath = `../assets/images/certificates/${image}`;
                const resolvedImg = CertImgs[imgPath];
    return(
       <figure className="carousel-slide flex-[0_0_100%] grid grid-cols-1 md:grid-cols-[1.3fr_1fr] items-center gap-10 max-md:gap-5 bg-white border border-teal-pale-2 rounded-2xl min-h-[420px] max-md:min-h-0 p-10 max-md:p-6">
                        <div className="carousel-img-block">
                            <div className="w-full h-[360px] max-md:h-[220px] rounded-xl bg-teal-pale-2 flex items-center justify-center p-6 border border-teal-pale">
                                <img 
                                src={resolvedImg} 
                                alt={`${title} Certificate from ${institution}`}
                                className="max-w-full max-h-full object-contain image-render-crisp antialiased"
                                />
                            </div>
                        </div>
                        <div className="carousel-text-block flex flex-col gap-3">
                            <h4 className="carousel-title text-[1.4rem] max-md:text-[1.15rem] font-semibold text-brand-black font-heading">
                                {title} 
                            </h4>
                            <ul className="flex flex-col gap-2 mt-2">
                                <li className="flex items-center gap-2 text-sm text-teal-dark-2">
                                    <i className="fa-solid fa-fingerprint text-teal w-4"></i>
                                    <span
                                    className="font-mono text-xs bg-teal-pale-2 hover:bg-teal-pale px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1"
                                    onClick={() => navigator.clipboard.writeText(id)}
                                    title="Click to copy"
                                    aria-label="Copy certificate ID"
                                    >
                                        {id}
                                    <i className="fa-regular fa-copy text-xs"></i>  
                                </span>
                                </li>

                                <li className="flex items-center gap-2 text-sm text-teal-dark-2">
                                    <i className="fa-solid fa-calendar-days text-teal w-4"></i>
                                    <span>{date}</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-teal-dark-2">
                                    <i className="fa-solid fa-building-columns text-teal w-4"></i>
                                    <span>{institution}</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-teal-dark-2">
                                    <i className="fa-solid fa-globe text-teal w-4"></i> 
                                    <span>{platform}</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-teal-dark-2">
                                    <i className="fa-solid fa-link text-teal w-4"></i>  
                                    <a href={url}
                                    target="_blank" rel="noopener noreferrer"
                                    className="text-gold font-medium hover:text-gold-light underline-offset-2 hover:underline transition-colors"
                                    >
                                        Verify Certificate
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </figure>
    )
}

const Certificate = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    const autoSlideIntervals = useRef(null)
    const resumeTimer = useRef(null)

    const goToNext = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % certs.length)
    }, [])

    function goToPrev() {
        handleInteraction()
        setCurrentSlide((prevSlide) => (prevSlide - 1 + certs.length) % certs.length)
    }

    function goToSlide(targetIndex) {
        handleInteraction()
        setCurrentSlide(targetIndex)
    }

    function handleInteraction() {
        setIsPaused(true)

        if (resumeTimer.current) {
            clearTimeout(resumeTimer.current)
        }

        resumeTimer.current = setTimeout(() => {
            setIsPaused(false)
        }, 8000)
    }

    function handleNextClick() {
    handleInteraction()
    goToNext()
}

    useEffect(() => {
        if (isPaused) return

        autoSlideIntervals.current = setInterval(() => {
            goToNext()
        }, 5000)

        return () => clearInterval(autoSlideIntervals.current)
    }, [goToNext, isPaused])

    return (
         <section id="certification-sections" className="certifications-section max-w-[1200px] mx-auto py-20 px-8 max-md:py-12 max-md:px-5 border-y-[3px] border-teal-pale-2">
            <h2 className="section-title text-base font-semibold tracking-[0.15em] uppercase text-teal-primary mb-10 font-heading">My Certificates &amp; Certifications</h2>

            <div className="carousel relative w-full overflow-hidden">
                <div
                className="carousel-track flex"
                style={{transform: `translateX(-${currentSlide * 100}%)`}}
                >
                {certs.map((cert) => {
                    return (
                        <CertificateSlide key={cert.id} {...cert}/>
                    );
                })}

                </div>

                <button 
                className="carousel-btn carousel-btn-prev absolute top-2/5 -translate-y-1/2 -left-1.5 max-md:left-1 w-11 h-11 max-md:w-9 max-md:h-9 rounded-full border-none bg-white text-teal-primary text-base max-md:text-sm flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(0,128,128,0.18)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-teal-pale-2 hover:-translate-y-1/2 hover:scale-[1.08] active:-translate-y-1/2 active:scale-95 active:shadow-[0_2px_8px_rgba(0,128,128,0.22)] z-10" aria-label="Previous certificate"
                onClick={goToPrev}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button 
                className="carousel-btn carousel-btn-next absolute top-2/5 -translate-y-1/2 -right-1.5 max-md:right-1 w-11 h-11 max-md:w-9 max-md:h-9 rounded-full border-none bg-white text-teal-primary text-base max-md:text-sm flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(0,128,128,0.18)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-teal-pale-2 hover:-translate-y-1/2 hover:scale-[1.08] active:-translate-y-1/2 active:scale-95 active:shadow-[0_2px_8px_rgba(0,128,128,0.22)] z-10" aria-label="Next certificate"
                onClick={handleNextClick}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>

                <div
                className="carousel-dots flex justify-center gap-2.5 mt-7"
                >
                   {certs.length <= 3 ? (
                        certs.map((cert, index) => (
                            <button
                            key={cert.id}
                            className={`carousel-dot w-2.5 h-2.5 rounded-full border-none cursor-pointer p-0 transition-[background-color,transform] duration-200 hover:scale-[1.2]
                            ${index === currentSlide ? "active bg-teal-primary" : "bg-teal-pale-2"}`
                            }
                            aria-label={`Go to slide ${index + 1}`}
                            onClick={() => goToSlide(index)}
                            ></button>
                        ))
                    ) : (
                            <p className="text-sm font-mono flex items-center gap-1">
                                <span className="text-teal-primary font-semibold">{currentSlide + 1}</span>
                                <span className="text-teal-pale-2"> of </span>
                                <span className="text-teal-pale-2">{certs.length}</span>
                            </p>
                        )}
                </div>
            </div>
        </section>
    );
};


export default Certificate

