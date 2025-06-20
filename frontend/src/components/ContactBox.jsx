
import {assets} from "../assets/assets"

const ContactBox = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center justify-center gap-3 text-2xl py-10">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          CONTACT
          <span className="font-bold text-black">US</span>
        </div>
        <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
      </div>
      <div className="flex max-md:flex-col">
        <div className="flex p-5 w-1/2">
          <img src={assets.contact_img} alt="About Image" />
        </div>
        <div className="flex flex-col gap-3 justify-center p-5 text-gray-600 text-xl">
          <p className="font-bold">
            Our Store
          </p>
          <p>
            <p>
            SIMATS University, Chennai, TN, India - 602105
            </p>
            <p>Tel: (+91) 9963752468</p>
            <p>Email: jsupreeth2005@gmail.com</p>
          </p>
          <p className="font-bold">Careers at Forever</p>
          <p>
            Learn more about our teams and job openings.
          </p>
          <button className="border-1 border-black py-2 hover:bg-black hover:text-white transition-all 3s ease-in-out">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactBox;
