import Facebook from "../../../assets/icons/Facebook.svg"
import Instagram from "../../../assets/icons/Insta.svg"


const Socials: React.FC = () => {
    return (
        <ul className="flex justify-center items-center space-x-10">
            <li className=" text-center">
                <a href="https://www.instagram.com/slackerevents" target="_blank" rel="noopener noreferrer">
                    <img src={Instagram} alt="Instagram" className="w-8 h-8 mx-auto" />
                </a>
            </li>

            <li className=" text-center">
                <a href="https://www.facebook.com/slackerevents/" target="_blank" rel="noopener noreferrer">
                    <img src={Facebook} alt="Facebook" className="w-8 h-8 mx-auto" />
                </a>
            </li>
        </ul>
    );
};

export default Socials;