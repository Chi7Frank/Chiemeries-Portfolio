import skills from "../assets/data/skills.json";

const SkillCard = ({ name, icon }) => {
    return (
        <li className="flex-object list-none flex flex-col items-center justify-center gap-2.5 w-[110px] min-h-[120px] p-5 max-md:p-3.5 bg-white border border-teal-pale-2 rounded-xl text-center transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-teal-light hover:shadow-[0_10px_22px_rgba(0,128,128,0.14)] max-md:flex-[1_1_calc(50%-0.5rem)] max-md:w-auto max-md:min-h-[90px]">
            <i className={icon}></i>
            <span>{name}</span>
        </li>
    );
}

const SkillGroup = ({ label, skills }) => {
    return (
        <>
            <h4 className="skill-group-label text-[0.85rem] font-semibold tracking-[0.08em] uppercase text-teal-dark mt-3 mb-3 font-heading">{label}</h4>
            <ul className="flexbox flex flex-wrap gap-4 max-md:gap-3">
                {skills.map((skill) => (
                    <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
                ))}
            </ul>
        </>
    );
}

const SkillColumn = ({ title, groups }) => {
    return (
        <div className="flex flex-col">
            <h3 className="skill-title title-3 text-[1.3rem] font-semibold text-brand-black mb-6 font-heading">{title}</h3>
            {Object.entries(groups).map(([label, skills]) => (
                <SkillGroup key={label} label={label} skills={skills} />
            ))}
        </div>
    );
}

const Skills = () => {
    return (
        <section id="skills-section" className="skills-section max-w-[1200px] mx-auto py-20 px-8 max-md:py-12 max-md:px-5">
            <h2 className="section-title text-base font-semibold tracking-[0.15em] uppercase text-teal-primary mb-10 font-heading">My Skillset</h2>
            <div className="skills-container grid grid-cols-1 md:grid-cols-2 gap-12 max-md:gap-10">
                <SkillColumn title="Technical Skills" groups={skills.technical} />
                <SkillColumn title="Soft Skills" groups={skills.soft} />
            </div>
        </section>
    );
}

export default Skills