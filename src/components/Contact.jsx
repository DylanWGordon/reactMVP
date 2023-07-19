import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Contact = () => {
    return (
        
     <div id='Contact'>If you have any inquiries about my art, commissions, or just to say ‘hello’, you can reach me at any of my contacts below! (Email will be the most direct line, though.)
            <ul id='contactInfo'>

                <li>
                    <FontAwesomeIcon icon="fab fa-tumblr" />
                    <a href='https://www.tumblr.com/fieryramenart'> Tumblr</a>
                </li>

                <li>
        Instagram: https://www.instagram.com/fieryramenart/
                </li>

                <li>
                    ArtFight: https://artfight.net/~FieryRamen
                </li>

                <li>
        Send an Email: 
                    <form action="FieryRamenArt@gmail.com" method="post" enctype="text/plain" >
                        FirstName:<input type="text" name="FirstName"></input>
                            Email:<input type="text" name="Email"></input>
                                <input type="submit" name="submit" value="Submit"></input>
                    </form>
                </li>
            </ul>
    </div>
    )
}

export default Contact