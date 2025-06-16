import Image from "next/image";
import Facebook from "../../../../public/assets/icons/Facebook.svg";
import Instagram from "../../../../public/assets/icons/Insta.svg";

const Socials: React.FC = () => {
  return (
    <ul className="flex justify-center items-center space-x-10">
      <li className="text-center">
        <a
          href="https://www.instagram.com/slackerevents"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Instagram} alt="Instagram" width={32} height={32} className="mx-auto" />
        </a>
      </li>

      <li className="text-center">
        <a
          href="https://www.facebook.com/slackerevents/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={Facebook} alt="Facebook" width={32} height={32} className="mx-auto" />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
