import { useState } from "react"
import contacts from "../assets/data/contact.json"


const ContactForm = () => {
    const [formResult, setFormResult] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("access_key", "868794bc-6a08-4da5-b7bd-ee5d1bb7fb2d");

        const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
        });

        const data = await response.json();
        setFormResult(data.success ? "Your mail was Successful" : "Error! Couldn't process your mail");
    }

    return(
         <form action="" onSubmit={onSubmit} className="flex flex-col gap-6 p-11 max-md:p-7 bg-white rounded-[18px] shadow-[0_20px_50px_rgba(212,162,76,0.40)]">
                <h3
                className="form-title title-3 text-2xl font-bold text-brand-black mb-2 font-heading"
                >Send Me A Mail
                </h3>

                <label 
                htmlFor="senderName" 
                className="text-[0.85rem] font-semibold text-teal-dark-2 -mb-3"
                >Your Full Name
                </label>
                <input 
                id="senderName" 
                name="senderName" 
                type="text" 
                placeholder="FirstName MiddleName, LastName" 
                className="w-full py-3.5 px-4 text-[0.95rem] text-brand-black bg-white border-[1.5px] border-teal-pale-2 rounded-lg transition-[border-color,box-shadow] duration-200 placeholder:text-teal-light placeholder:opacity-70 focus:outline-none focus:border-teal-primary focus:ring-4 focus:ring-teal-primary/20"
                required
                />

                <label 
                htmlFor="senderEmail" 
                className="text-[0.85rem] font-semibold text-teal-dark-2 -mb-3"
                >Your Email
                </label>
                <input 
                id="senderEmail" 
                name="senderEmail" 
                type="email" 
                placeholder="johndoe@gmail.com" 
                className="w-full py-3.5 px-4 text-[0.95rem] text-brand-black bg-white border-[1.5px] border-teal-pale-2 rounded-lg transition-[border-color,box-shadow] duration-200 placeholder:text-teal-light placeholder:opacity-70 focus:outline-none focus:border-teal-primary focus:ring-4 focus:ring-teal-primary/20" 
                required
                />

                <label htmlFor="senderMessage" className="text-[0.85rem] font-semibold text-teal-dark-2 -mb-3"
                >Your Message    
                </label>
                <textarea 
                id="senderMessage" 
                name="senderMessage" 
                placeholder="Hi Chiemerie, so I was thinking....." 
                className="w-full py-3.5 px-4 text-[0.95rem] text-brand-black bg-white border-[1.5px] border-teal-pale-2 rounded-lg transition-[border-color,box-shadow] duration-200 placeholder:text-teal-light placeholder:opacity-70 focus:outline-none focus:border-teal-primary focus:ring-4 focus:ring-teal-primary/20 resize-y min-h-[130px]"
                required
                > 
                </textarea>

                <button 
                type="submit" 
                className="w-full py-4 px-10 mt-2 bg-gold-accent text-teal-dark-2 text-base font-bold border-none rounded-lg cursor-pointer text-center transition-[background-color,transform,box-shadow] duration-200 hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(212,162,76,0.35)] active:translate-y-0"
                >Submit
                </button>
                {
                formResult && (<p
                className={`
                    ${
                    formResult === "Your mail was Successful" 
                    ? "text-teal-dark-2"
                    : "text-red-warning"}
                    text-[0.85rem] font-semibold -mb-3`}
                >{formResult}
                </p>)}
            </form>
    )
}

const ContactPills = ({title, href, anchorClass, span, icon, general})=>{
    return(   
        <a 
        className={anchorClass} 
        href={href} 
        target="_blank" 
        rel="noopener">
        <span className={span}>
        <i className={`${icon} ${general}`}></i>
        {title}
         </span>
    </a>
    )
}

const Contact = ()=>{
    return(
        <section id="contact-section" className="contact-section py-24 px-8 max-md:py-12 max-md:px-5 bg-teal-dark-2 max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-start gap-12 max-md:gap-10">
            <h2 className="section-title col-span-full text-center text-gold-light text-base font-semibold tracking-[0.15em] uppercase mb-12 font-heading">Contact Me</h2>

             <ContactForm/>

            <div className="connect pt-4 max-md:pt-0">
                <h3 className="connect-title title-3 text-[1.3rem] font-bold text-white mb-6 font-heading">Or connect with me</h3>
                <div className="flexbox flex flex-wrap gap-4 max-md:grid max-md:grid-cols-3 max-md:gap-3">
                 {contacts.map((contact, index) =>{
                    return (<ContactPills 
                    key = {index}
                    {...contact}
                    />)
                 })} 
                </div>
            </div>
        </section>
    )
}
export default Contact