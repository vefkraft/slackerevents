import Frame41 from '../../assets/social-Icons/Frame 41.svg';
import Group from '../../assets/social-Icons/Group.svg';
import Vector from '../../assets/social-Icons/Vector.svg';

const Socials: React.FC = () => {
    return (
        <ul className="flex justify-around items-evenly ">
            <li className=" text-center">
                <a href="https://www.instagram.com/slackerevents" target="_blank" rel="noopener noreferrer">
                    <img src={Frame41} alt="Instagram" className="w-8 h-8 mx-auto" />
                </a>
            </li>
            <li className=" text-center">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={Group} alt="Twitter" className="w-8 h-8 mx-auto" />
                </a>
            </li>
            <li className=" text-center">
                <a href="https://www.facebook.com/slackerevents/" target="_blank" rel="noopener noreferrer">
                    <img src={Vector} alt="Facebook" className="w-8 h-8 mx-auto" />
                </a>
            </li>
        </ul>
    );
};

export default Socials;