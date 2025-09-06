import Image from "next/image";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import SecondFooter from "../components/SecondFooter";
import Recommendation from "../components/Recommendation";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <div className="main-container">
          <Image src={'/header.jpg'} alt="kjfd" height={1000} width={1000} className="banner" />
          <div className="sellers">
            <div className="sellers-container">
              <div className="sellers-left">
                <div className="sellers-top">
                  <h2>Top Sellers</h2>
                </div>
                <div className="sellers-text-container">
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <Image src={'/roler1.jpg'} className="rounded-[5px]" height={60} width={60} />
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Role Model</h3>
                        <p>Role Model</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <Image src={'/ethel-cain-2025-tickets-222.jpg'} className="rounded-[5px]" height={60} width={60} />
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Ethel Cain</h3>
                        <p>Ethel Cain</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <Image src={'/joanne-mcnally-new-2022-222.jpg'} className="rounded-[5px]" height={60} width={60} />
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Joanne McNally</h3>
                        <p>Joanne McNally: Pinotphile</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>4</h1>
                        <FaCaretUp className="text-2xl text-green-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Sting</h3>
                        <p>Sting</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>5</h1>
                        <FaCaretDown className="text-2xl text-red-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Lord Huron</h3>
                        <p>Lord Huron</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>6</h1>
                        <FaCaretDown className="text-2xl text-red-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Greg Davies</h3>
                        <p>Greg Davies</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>7</h1>
                        <FaCaretUp className="text-2xl text-green-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Jim Jefferies</h3>
                        <p>Jim Jefferies: Son of a Carpenter</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>8</h1>
                        <FaCaretDown className="text-2xl text-red-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Elis & John</h3>
                        <p>Elis & John</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>9</h1>
                        <FaCaretUp className="text-2xl text-green-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Men I Trust</h3>
                        <p>Men I Trust</p>
                      </span>
                    </div>
                  </div>
                  <div className="sellers-left-item">
                    <div className="sellers-left-content">
                      <span>
                        <h1>10</h1>
                        <FaCaretUp className="text-2xl text-green-700" />
                      </span>
                    </div>
                    <div className="sellers-text">
                      <span>  
                        <h3>Belinda Carlisle</h3>
                        <p>Belinda Carlisle</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sellers-right">
                <Image src={'/role-model.jpg'} className="sellers-Banner" height={1000} width={1000} alt="hgs" />
                <Image src={'/lord-huron.jpg'} className="sellers-Banner" height={1000} width={1000} alt="hgs" />
                <Image src={'/ethel-cain.jpg'} className="sellers-Banner" height={1000} width={1000} alt="hgs" />
                <Image src={'/joanne-mcnally.jpg'} className="sellers-Banner" height={1000} width={1000} alt="hgs" />
              </div>
            </div>
          </div>
          <Recommendation />
          <SecondFooter />
        </div>
      </main>
      <Footer />
    </>
  );
}
