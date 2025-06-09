import React from "react";
import HeroSection from "../assets/college/Firefly.webp";
import communicationBMC from "../assets/college/communicationBMC.webp";
import massCommunication from "../assets/college/massCommunication.webp";
import Journalisam from "../assets/college/Journalisam.webp";
const College = () => {
  return (
    <div className=" w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden ">
        <img
          src={HeroSection}
          alt="homeBG"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-xl font-bold text-white md:text-4xl lg:text-6xl text-center">
            College
          </h2>
        </div>
      </div>
      {/* section 1 */}

      <div className="px-4 mt-6 ">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          Bachelor of Mass Communication [B.M.C.]
        </h2>
      </div>

      <div className="  px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10  justify-center items-center">
        <div className="w-full">
          {" "}
          <p>
            The course explores the principles behind mass media, advertising
            techniques, and strategic communication. Mass communication is an
            intriguing and dynamic area offering diverse career opportunities in
            advertising, public relations, television, and radio broadcasting.
            It focuses on how content from individuals and organizations is
            shared with a global audience simultaneously.
          </p>
        </div>
        <div className="w-full md:w-[450px]">
          <img
            src={communicationBMC}
            alt="industrialDesign"
            className="w-full md:mx-7 h-full object-cover rounded-md"
          />
        </div>
      </div>
      {/* section2 */}
      <div className="px-4 mt-6">
        <h2 className='className="text-2xl md:text-3xl text-blue-600 font-bold text-center'>
          What is it about? (BMC)
        </h2>
        <div className=" flex flex-col  justify-start items-center">
          <ul className="text-start list-disc my-4">
            <h4 className="  text-gray-800 font-bold  py-2 mt-2 ">
              Here are the specifics of the Bachelor of Mass Communication
              program:
            </h4>
            <li className="text-start text-sm">
              Mass communication involves analyzing various communication
              methods through empirical research
            </li>
            <li className=" text-start text-sm">
              Mass communication programs offer students comprehensive insights
              and practical skills in the functioning of different media
              platforms like television, radio, and the internet.
            </li>
            <li className=" text-start text-sm">
              {" "}
              It offers students a comprehensive foundation in essential
              concepts and skills, preparing them to become both media
              professionals and informed consumers of media.
            </li>
            <li className=" text-start text-sm">
              {" "}
              It provides insights into rhetorical principles and effective
              marketing tactics designed for diverse, specific audiences to
              craft, share, and evaluate impactful messages.
            </li>
            <li className=" text-start text-sm">
              {" "}
              Bachelor’s degree programs teach students how to operate
              telecommunications software while exploring various elements of
              live-broadcast production
            </li>
            <li className=" text-start text-sm">
              {" "}
              This course specialization includes Journalism, Public Relations,
              Human Relations, Advertising, and Film or Video Production.
            </li>
            <li className=" text-start text-sm">
              The diverse range of mass media channels and networking approaches
              allows for a creative and flexible approach to job selection.
            </li>
          </ul>
        </div>
      </div>
      {/* section 3 */}
      <div className="px-4 mt-6">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          Why Study Bachelor of Mass Communication (BMC)?
        </h2>
        <div className=" flex justify-center items-center my-5">
          <img
            src={massCommunication}
            alt="massCommunication"
            className=" w-[300px]"
          />
        </div>
        <p className=" text-xl font-bold text-center">
          The motivations for pursuing a Bachelor of Mass Communication degree
          vary from person to person. Below, we've highlighted some common
          reasons why many opt for this area of study
        </p>
        <div className="px-5 md:px-15 flex flex-col  justify-start items-center">
          <ul className="text-start list-disc my-4">
            <li className="text-start text-sm">
              This program is perfect for individuals who are curious and
              passionate about storytelling, focusing on the study of mass
              communication and exploring the influence and dynamics of various
              media platforms on both local and global cultures
            </li>
            <li className=" text-start text-sm">
              Mass communication empowers professionals to play a key role in
              the continuous flow of media that informs, educates, and
              entertains audiences globally.
            </li>
            <li className=" text-start text-sm">
              {" "}
              Building a successful career in mass broadcasting can be exciting
              and rewarding, but it requires dedication and a strong passion for
              the media industry
            </li>
            <li className=" text-start text-sm">
              {" "}
              Students with a bachelor's degree in this field can continue their
              education with doctoral studies, opening pathways to careers in
              academia and research
            </li>
            <li className=" text-start text-sm">
              {" "}
              Completing mass communication courses opens up diverse career
              opportunities in fields such as advertisement, news, public
              relations, event management, broadcasting, online media, and radio
            </li>
            <li className=" text-start text-sm">
              {" "}
              After completing this course, students can secure job
              opportunities with salary packages ranging from INR 2,00,000 to
              INR 10,00,000.
            </li>
          </ul>
        </div>
      </div>
      {/* section 4 */}
      <div className="px-4 mt-6 flex justify-center items-center">
        <div className=" flex justify-center items-center p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-20 gap-y-4 p-4 items-center text-start justify-center">
            {[
              {
                title: "SEMESTER I",
                subjects: [
                  "English I",
                  "Fundamentals of journalism",
                  "Mass communication",
                  "Current affairs I",
                  "Disaster management",
                  "Indian political system",
                ],
              },
              {
                title: "SEMESTER II",
                subjects: [
                  "English II",
                  "Introduction to reporting",
                  "Photography",
                  "Current affairs II",
                  "Environment science",
                  "Development communication",
                ],
              },
              {
                title: "SEMESTER III",
                subjects: [
                  "English III",
                  "Introduction to radio",
                  "Print editing",
                  "Current affairs III",
                  "Cybersecurity",
                  "Introduction to advertising",
                ],
              },
              {
                title: "SEMESTER IV",
                subjects: [
                  "English IV",
                  "Media laws",
                  "Introduction to television",
                  "Current affairs IV",
                  "Human rights",
                  "Online journalism",
                ],
              },
              {
                title: "SEMESTER V",
                subjects: [
                  "English V",
                  "Radio specialization",
                  "Television specialization",
                  "Advertising",
                  "Current affairs V",
                ],
              },
              {
                title: "SEMESTER VI",
                subjects: [
                  "Minor project",
                  "Major project",
                  "Industrial training",
                ],
              },
            ].map((sem, index) => (
              <div
                key={index}
                className="w-[200px] h-[200px] text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl overflow-y-auto flex flex-col"
              >
                <h2 className="text-xl font-bold mb-2">{sem.title}</h2>
                <p className="text-center text-xs leading-5">
                  {sem.subjects.map((subject, idx) => (
                    <span key={idx}>
                      {subject}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* section 5 */}
      <div className="px-4 mt-6">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          B.A. Journalism
        </h2>
        <div className="  px-10 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-6 my-5  justify-center items-center">
          <div className="w-full md:w-[550px]  ">
            <h2 className="text-2xl md:text-3xl text-black font-bold  my-5 text-center">
              About
            </h2>

            <img
              src={Journalisam}
              alt="industrialDesign"
              className="w-full md:mx-7 my-2 h-full object-cover rounded-md"
            />
          </div>
          <div className="w-full md:w-[550px]  py-5 ">
            <p className=" my-1">
              Journalism serves as an essential bridge connecting news with the
              public. Journalism basically depends on the principle of truth,
              editorial independence and disclosure. By the growing trend of
              media and technology, the people are being in touch through the
              radio, television, mobile, social media and the internet by the
              great efforts of the mass media
            </p>
            <p className=" my-1">
              Journalism is a subject that deals with researching events,
              creating accurate reports and then distributing the information to
              the public through various communication channels. Journalism
              plays a vital role in society by providing objective analysis,
              verifying facts, and uncovering the truth behind every
              story.Whether it is through traditional media (newspapers,
              magazines, radio, television) or digital/new media (social media,
              blogs, vlogs, and others), studying Journalism will allow you to
              keep people informed and discuss key factors that contribute to
              the overall welfare of society. Our Journalism course delivers
              essential knowledge for working in media organisations, such as
              excellent written and spoken communication skills, critical
              thinking, research, as well as an ethical and responsible
              attitude.
            </p>
          </div>
        </div>
      </div>
      {/* section 6 */}
      <div className="flex justify-center items-start px-5 py-10 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl">
          {/* Skills Card */}
          <div className="shadow-2xl rounded-md p-6 bg-white">
            <h2 className="font-bold text-2xl text-center mb-4">
              Skills Required
            </h2>
            <ul className="list-disc text-left px-4">
              <li className="my-2">Communication Skills</li>
              <li className="my-2">General Awareness</li>
              <li className="my-2">Keen Observer</li>
              <li className="my-2">Ability to create news stories</li>
              <li className="my-2">Confidence</li>
              <li className="my-2">Creative Skills</li>
            </ul>
          </div>

          {/* Principles of Journalism */}
          <div className="md:col-span-3 shadow-2xl rounded-md p-6 bg-white text-lg">
            <h2 className="font-bold text-2xl text-center mb-4">
              What are the principles of Journalism?
            </h2>
            <ul className="list-disc text-left px-4">
              <li className="my-2">
                Journalism’s first obligation is to the truth
              </li>
              <li className="my-2">Its first loyalty is to citizens</li>
              <li className="my-2">
                Its essence is discipline of verification
              </li>
              <li className="my-2">
                Those practicing must uphold their impartiality towards the
                subjects they report on
              </li>
              <li className="my-2">
                It should act as an impartial overseer of authority
              </li>
              <li className="my-2">
                It should offer a platform for public discourse and
                reconciliation
              </li>
              <li className="my-2">
                It should present important issues in an engaging and meaningful
                way
              </li>
              <li className="my-2">
                It should ensure the news is thorough and balanced
              </li>
              <li className="my-2">
                Professionals should be free to follow their moral compass
              </li>
              <li className="my-2">Core design principles</li>
            </ul>
          </div>
        </div>
      </div>
      {/* section 7 */}
      <h2 className=" text-center font-bold text-2xl my-3 md:my-10">
        Learning Outline
      </h2>
      {/* section8 */}
      <div className="px-4 mt-6 flex justify-center items-center">
        <div className="w-full max-w-7xl p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Module 1 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 1
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>Introduction to Journalism</li>
                <li>Media and Journalism</li>
                <li>Reporting and feature writing</li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 2
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>Global media</li>
                <li>Geopolitics</li>
                <li>Media laws and ethics</li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 3
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>Art appreciation</li>
                <li>Literary criticism</li>
              </ul>
            </div>

            {/* Module 4 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 4
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>History of press</li>
                <li>Magazine and niche Journalism</li>
                <li>Broadcast Journalism</li>
              </ul>
            </div>

            {/* Module 5 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 5
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>Production</li>
                <li>Photojournalism</li>
                <li>Media management</li>
              </ul>
            </div>

            {/* Module 6 */}
            <div className="p-6 md:p-8 shadow-2xl rounded-xl bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Module - 6
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-gray-700 dark:text-neutral-300">
                <li>News media management</li>
                <li>Regional Journalism</li>
                <li>Producing a news magazine</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* section 9 */}
      <div className="flex  justify-center items-center">
        <h2 className="px-4 mt-6   text-2xl font-bold "> Scope</h2>
      </div>
      <div className=" flex  justify-center items-center">
        <p className="px-4 text-center mt-6">
          After there is a fierce increase in the involvement in the social
          media and internet network, there is a great influx of jobs in the
          field of journalism. Now, there are the best career opportunities in
          this field.
        </p>
      </div>
      <div className="flex justify-center items-center p-5 ">
        <div className=" grid grid-cols-1 grid-rows-1 sm:grid-cols-4 sm:grid-rows-4  gap-x-20 gap-y-4  p-4 items-center text-start">
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Journalist
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Copywriter
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Sports Journalist
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Editor
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Sub-editor
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Associate Editor
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Proof-reader
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Reporter
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Writer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Lead writer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Columnist
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Critic
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Photojournalist
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Content Marketer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Public Relations Specialist
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Grant Writer
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
        Corporate Communications Specialist
      </div>
    </div>
  );
};

export default College;
