import { useEffect } from 'react'

const popupJSON = import.meta.glob(
    "../assets/data/popup/**/*",
    {
        eager : true,
        import: "default"
    }
)

const popupImg = import.meta.glob(
    "../assets/images/projects/*",
    {
        eager : true,
        import: "default"
    }
)



const PopupCard = ({folder, id, img, title, link, desc}) =>{
    const imgTrack = `../assets/images/project/${folder}/${img}`
    const popImage = popupImg[imgTrack]
    return(
        <div className="project flex flex-col p-6 bg-white border border-teal-pale-2 rounded-[14px]">
                    <img
                    src={popImage} alt={id}
                    className="project-img w-full h-[180px] object-cover rounded-[10px] mb-4 bg-teal-pale-2"
                    />
                    <h3
                    className="project-title title-3 text-[1.15rem] font-semibold text-brand-black mb-2 font-heading">
                        {title}
                    </h3>
                    <p
                    className="project-desc text-[0.9rem] leading-[1.55] text-teal-dark-2 mb-5"
                    >
                    {desc}
                    </p>
                    <a href={link} className="project-link mt-auto self-start text-[0.9rem] font-semibold text-teal-primary no-underline transition-colors duration-200 hover:text-teal-dark">Check it Out &rarr;</a>
                </div>
    )
}


const Popup = ({getter, setter}) =>{
    const popupItem = `../assets/data/popup/${getter}.json`
    const verifiedPop = popupJSON[popupItem] || []
    const showClass = getter ? '' : "none"
    useEffect(() => {
    document.body.style.overflow = getter ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
    }, [getter])

    return(
        <>
             <aside>
                {/* Backdrop */}
            <div 
            className={`${showClass}
            popup-backdrop fixed inset-0 z-[1900] bg-brand-black/65 backdrop-blur-[2px]`} >
            </div>


            {/* PopUp Container */}
            <div
            className= {`${showClass}
            pop-up fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] w-[90%] max-w-[960px] max-h-[85vh] max-md:max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-12 max-md:py-7 max-md:px-5 bg-white rounded-[20px] shadow-[0_30px_70px_rgba(0,0,0,0.35)]`}>
                <button 
                onClick={()=>{setter('')}}
                className="popup-close sticky top-0 ml-auto w-10 h-10 rounded-full border- flex items-center justify-center bg-teal-pale-2 text-teal-dark-2 text-[1.1rem] cursor-pointer col-span-full justify-self-end transition-[background-color,color,transform] duration-200 hover:bg-teal-primary hover:text-white hover:rotate-90 z-10" data-popup-close aria-label="Close project details">
                    <i className="fa-solid fa-xmark"></i>
                </button>

                {/* Popup Cards */}
                {getter && (
                    verifiedPop.length > 0
                        ? verifiedPop.map((item, index) => {
                            return <PopupCard folder={getter} key={item.id ?? index} {...item} />
                        })
                        : <p className="col-span-full text-center text-teal-dark-2 text-xl font-semibold py-10">Nothing to see here</p>
                        )}
            </div>
            </aside>
        </>
    )
}

export default Popup