import projects from "../assets/data/projects.json"

const ProjectImgs = import.meta.glob(
    "../assets/images/projects/*",
    {
        eager : true,
        import: "default"
    }
)

const ProjectCard = ({id, title, img, role, icon, list, hint, handlePopup}) =>{
    const imgPath = `../assets/images/projects/${img}`;
    const resolvedImg = ProjectImgs[imgPath];

    return(
        <>
            <div id={id}
            onClick={handlePopup}
            className="project-theme-card bg-white border border-teal-pale-2 rounded-[14px] p-8 max-md:p-6 cursor-pointer flex flex-col transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1.5 hover:border-teal-light hover:shadow-[0_12px_28px_rgba(0,128,128,0.16)] active:-translate-y-0.5 active:shadow-[0_6px_14px_rgba(0,128,128,0.22)] active:border-teal-primary"
            >
                <img src={resolvedImg}
                alt={`${title} Projects`}
                className="project-card-img w-full h-[180px] object-cover rounded-lg mb-6 bg-teal-pale-2"
                />
                    <h3 className="project-theme title-3 text-xl font-semibold text-brand-black mb-3 font-heading">
                        {title}
                    </h3>
                    <p className="project-theme-desc text-[0.95rem] text-teal-dark-2 leading-normal mb-5 max-md:text-justify">
                        {role}
                    </p>
                    <ul className="project-theme-list list-none flex flex-col gap-2.5 mt-auto">
                        {list.map((item, index)=>{
                            return (
                                <li
                                key={index}
                                className="flex items-center gap-2.5 text-[0.9rem] text-brand-black"
                                >
                                    <i className={icon}></i>
                                    {item}
                                </li>
                            )
                        })}

                        <li className="flex items-center gap-2.5 text-[0.9rem] text-brand-black mt-3">
                            <i className={hint.icon}></i>
                            {hint.message}
                        </li>

                    </ul>
            </div>
        </>
    )
}

const Projects = ({setter}) =>{
    return(
        <>
        <section id="projects-section" className="projects-section max-w-[1200px] mx-auto py-20 px-8 max-md:py-12 max-md:px-5">
            <h2 className="section-title text-base font-semibold tracking-[0.15em] uppercase text-teal-primary mb-10 font-heading">My Projects</h2>

            <div className="projects-card-container grid grid-cols-1 md:grid-cols-3 gap-8 max-md:gap-6">
                {projects.map((project, index) =>{
                    return(
                        <ProjectCard
                        handlePopup={()=>{
                            setter(project.id) 
                        }} 
                        key={project.id ?? index} {...project}/>
                    )
                })}
            </div>
        </section>
        </>
    )
}

export default Projects