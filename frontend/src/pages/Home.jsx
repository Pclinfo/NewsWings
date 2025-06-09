import React from "react";
import HomeBG from "../assets/Home/homePageBG.webp";
import PublishNewsPaper from "../assets/Home/PublishNewsPaper.webp";
import hubStudentResearch from "../assets/Home/hubStudent-research.webp";
import gateWay from '../assets/Home/gateWay.webp'
import ResearchAndInnovation from '../assets/Home/ResearchAndInnovation.webp'
import Join from '../assets/Home/Join.webp'

const Home = () => {
  
  return (
    <div className="w-full">
    {/* Hero Section */}
    <img src={HomeBG} alt="homeBG" className="w-full h-auto object-cover" />
  
    <div className="flex justify-center items-center py-2 px-4">
      <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center mt-6">
        Publishing of Paper - Publish Your News on Our Platform
      </h2>
    </div>
  
    {/* Section 1 */}
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 items-center">
      <div>
        <img
          src={PublishNewsPaper}
          alt="Publish News Paper"
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-gray-700 text-justify">
          We are excited to offer a space for community-driven news publication.
          If you have news, an important story, or are interested in Publishing of Paper,
          we invite you to submit it to our team for review. Once verified, your news will
          be published on our platform for a wider audience to read and engage with.
        </p>
      </div>
    </div>
  
    {/* Section 2 */}
    <div className="px-4 mt-16">
      <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
        The Hub for Student Research and Innovation
      </h2>
    </div>
  
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
      <div>
        <p className="text-gray-700 text-justify">
          At Prachida, we believe in empowering the next generation of innovators and researchers.
          Our platform is designed to provide students with the opportunity to showcase their
          academic research and R&D projects to a global audience.
          Whether you’re working on a ground-breaking scientific discovery, a comprehensive
          academic paper, or an innovative tech project, our platform offers you the space to
          share your work with peers, professionals, and enthusiasts worldwide.
        </p>
      </div>
      <div>
        <img
          src={hubStudentResearch}
          alt="Student Research"
          className="w-full  h-64 object-cover rounded-md"
        />
      </div>
    </div>
  
    {/* Section 3 */}
    <div className="px-4 mt-16">
      <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
        Your Gateway to a Career in Media Technology & Journalism
      </h2>
    </div>
  
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
      <div>
        <img
          src={gateWay}
          alt="Gateway to Media"
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-gray-700 text-justify">
          At Prachida Class, we offer specialized training programs designed to prepare you
          for the dynamic and fast-evolving world of media technology and journalism.
          Whether you aspire to become a digital journalist, a media technologist,
          or a broadcasting expert, our courses are tailored to provide you with the skills
          and knowledge necessary to succeed in today’s media landscape.
          Additionally, we emphasize Research paper Publication, equipping you with the
          expertise to contribute valuable insights and findings to the field of media and technology.
        </p>
      </div>
    </div>

    {/* section4 */}

    <div className="px-4 mt-16">
      <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
      The Hub for Online University 
      </h2>
    </div>
  
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
      <div>
        <p className="text-gray-700 text-justify">
        At Prachida Online University, we offer specialized programs
designed to equip you with the skills and expertise for
success in today’s fast-evolving digital world. Whether
you're aiming to become a data scientist, a software
developer, a business analyst, or an expert in digital
marketing, Product design, our courses are crafted to meet
the demands of modern industries. With practical, realworld projects, guidance from seasoned professionals, and
opportunities to Publish a Paper, you’ll gain the knowledge
and confidence to excel in your chosen field and build a
future-ready career.
        </p>
      </div>
      <div>
        <img
          src={ResearchAndInnovation}
          alt="Student Research"
          className="w-full  h-64 object-cover rounded-md"
        />
      </div>
    </div>
{/* section5 */}
<div className="px-4 mt-16">
      <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
      Join Prachida Class Today
      </h2>
    </div>
  
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
      <div>
        <img
          src={Join}
          alt="Gateway to Media"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-gray-700 text-justify">
          At Prachida Class, we offer specialized training programs designed to prepare you
          for the dynamic and fast-evolving world of media technology and journalism.
          Whether you aspire to become a digital journalist, a media technologist,
          or a broadcasting expert, our courses are tailored to provide you with the skills
          and knowledge necessary to succeed in today’s media landscape.
          Additionally, we emphasize Research paper Publication, equipping you with the
          expertise to contribute valuable insights and findings to the field of media and technology.
        </p>
      </div>
    </div>
    <div className="p-5 py-3 flex justify-center items-center">
    <button className=" button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 cursor-pointer"> Enroll Now</button>
    </div>
  </div>
  
  );
};

export default Home;
