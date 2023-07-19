import emailjs from 'emailjs-com'
import { useRef } from 'react'
const Contact = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_1yk7do7', 'template_un8o6jg', form.current, 'edG8fFZX_aI4hNESH')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        
        <div id='Contact'>
                    <div className="form-container">
            <div id='contactLeft'>If you have any inquiries about my art, commissions, or just to say ‘hello’, you can reach me at any of my contacts below! (Email will be the most direct line, though.)</div>
          <div id='contactMid'>
                <ul id='contactInfo'>

                <li>
                    <a href='https://www.tumblr.com/fieryramenart'> Tumblr</a>
                </li>

                <li>
                    <a href='https://www.instagram.com/fieryramenart/'>Instagram </a>
                </li>
                <li>
                    <a href='https://artfight.net/~FieryRamen'>ArtFight </a>                    
                        </li>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    Send an Email: 
                </ul>
                </div>
                <div id='contactRight'>

                    {/* "FieryRamenArt@gmail.com"  */}
                    <form id="contact" name="contact" acceptCharset="utf-8" ref={form} onSubmit={sendEmail}>
                            <label><span>Name</span><input className='formInput' name="name" type="text" placeholder="Name" /></label>
                        <label><span>Email</span><input className='formInput' name="email" type="email" placeholder="Email" /></label>
                        <label><span>Message</span><textarea id='formMessage' className='formInput' name="message" placeholder="Message"></textarea></label>
                            <input className='formInfocenterBtn' name="submit" type="submit" value="Send" />
                        </form>
                </div>
                
                    </div>
    </div>
    )
}

export default Contact