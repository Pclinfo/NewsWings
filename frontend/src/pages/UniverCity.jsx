import React from "react";
import BachelarOfDesign from "../assets/Univercity/BachelarOfDesign.webp";
import industriealDesign from "../assets/Univercity/industriealDesign.webp";
import CAREEROPPORTUNITIES from "../assets/Univercity/CAREEROPPORTUNITIES.webp";
import productDesign from "../assets/Univercity/productDesign.webp";
import CommunicationDesign from "../assets/Univercity/CommunicationDesign.webp";
import teenagersReadingBooks from "../assets/Univercity/teenagersReadingBooks.webp";
import communication from "../assets/Univercity/communication.webp";
import carrer from "../assets/Univercity/carrer.webp";
import skills from "../assets/Univercity/skills.webp";
import flimcommunication from "../assets/Univercity/flim&videocommunication.webp";
import Animation from "../assets/Univercity/Animation.webp";
import graphicDesign from "../assets/Univercity/graphicDesign.webp";
import ExhibitionDesign from "../assets/Univercity/ExhibitionDesign.webp";
import codingMan from "../assets/Univercity/codingMan.webp";
import videoEditingMan from "../assets/Univercity/videoEditingMan.webp";
import scientist from "../assets/Univercity/scientist.webp";
import Diagram from "../assets/Univercity/diagram.webp";
import manager from "../assets/Univercity/manager.webp";
import exitedouman from '../assets/Univercity/exitedouman.webp'
const UniverCity = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <img
        src={teenagersReadingBooks}
        alt="homeBG"
        className="w-full h-auto object-cover"
      />

      <div className="flex justify-center items-center py-2 px-4">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center mt-6">
          INDUSTRIAL DESIGN
        </h2>
      </div>
      <div className="flex justify-start items-start py-2 mx-5 font-bold px-6">
        <h1>BACHELOR OF DESIGN - INDUSTRIAL DESIGN</h1>
      </div>
      {/* Section 1 */}
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 items-center">
        <div>
          <img
            src={BachelarOfDesign}
            alt="BachelarOfDesign"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
        <div>
          <p className="text-gray-700 text-justify">
            Industrial Design is a profession that involves creating goods and
            services that are utilized daily by millions of people all over the
            world. Industrial designers frequently work on much more during a
            development cycle than just the physical look, functionality, and
            manufacturability of a product, but these are the areas where they
            typically concentrate
          </p>
          <p className="text-gray-700 text-justify py-3">
            Every item you regularly use in your home, workplace, educational
            institution, or public space is the outcome of a design process. An
            Industrial Designer makes a variety of decisions throughout this
            process with the goal of making your life better through
            well-executed design
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          Industrial Design at Prachida
        </h2>
      </div>

      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <p className="text-gray-700 text-justify">
            With our teaching approach, students are not only encouraged to
            learn but also to increase their creative zeal and industrial design
            knowledge through practical exercises. Putting ideas into practice,
            students will explore more practical activities and resolve
            authentic problems. Over time, students will be molded strong and
            confident with fundamentals like basic geometry, representation of
            shadow and highlights, before stepping up to advanced concepts like
            form study, color finish and materials, product process, and human
            ergonomics
          </p>
          <p className="text-gray-700 text-justify py-2">
            Students submit a graduation project by the conclusion of their
            final year that displays all the knowledge and abilities they have
            acquired and refined throughout the course of the program. They
            finish their Industrial Design bachelor program with a jury
            evaluating their work, prepared for a reputable placement.
          </p>
          <p className="text-gray-700 text-justify py-2">
            <span className="font-bold">Prachida</span> is confident in its
            ability to provide students with quality education through our
            renowned faculty from prestigious universities, industry
            professionals serving as advisers, regular syllabus updates, and
            industry-viable infrastructure. Enrolling in our Industrial Design
            course will enable you to polish your talents and prepare for a wide
            range of employment opportunities
          </p>
        </div>
        <div>
          <img
            src={industriealDesign}
            alt="industrialDesign"
            className="w-full  h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          CAREER OPPORTUNITIES
        </h2>
      </div>

      <div className="px-4   grid grid-cols-1 mt-10 ">
        <div className=" flex justify-center items-center">
          <img
            src={CAREEROPPORTUNITIES}
            alt="CAREEROPPORTUNITIES"
            className="w-[340px] h-auto object-cover rounded-md"
          />
        </div>
        <div className="flex justify-center items-center  p-4">
          <p className="text-gray-700 text-justify ">
            Industrial Design is a broad spectrum field and discipline.
            Graduates can also concentrate in
            <p className="text-gray-700 text-center">
              {" "}
              specific fields as designers, such as:
            </p>
          </p>
        </div>
      </div>

      <div className=" flex justify-center items-center p-4">
        <div className="   grid grid-cols-1 grid-rows-1 sm:grid-cols-4 sm:grid-rows-3  gap-x-20 gap-y-4  p-4 items-center text-start">
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl ">
            Product Designer
          </div>
          <div className="py-4 text-center text-xs  font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Automobile Designer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Toy Designer
          </div>
          <div className=" py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Ceramic Designer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Furniture Designer
          </div>
          <div className=" py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            User Experience Designer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Design Researcher
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Interaction Designer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Accessory Designer
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black shadow-2xl">
            Package Designer
          </div>
        </div>
      </div>

      {/* section4 */}

      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          PRODUCT DESIGN (B. Des )
        </h2>
      </div>

      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <p className="text-gray-700 text-justify p-3 py-3">
            The Product Design discipline at Prachida focuses on addressing
            challenges linked to designing a variety of products, services, and
            experiences, offering practical solutions that cater to user needs.
            As part of the curriculum, students explore fundamental design
            principles, gain knowledge in ergonomics, materials, and
            manufacturing techniques, and develop their aesthetic sensibilities.
            These sensibilities are refined through Product Design projects,
            where students create visually appealing and user-friendly products
            that align with user needs and aspirations.
          </p>
          <p className="text-gray-700 text-justify p-3">
            Through these Product Design projects, students tackle issues of
            varying complexity and impact, emphasizing the importance of
            research and a user-centric approach. This discipline spans a broad
            spectrum of concerns, enabling students to thoughtfully address the
            diverse requirements of user-groups with different physical,
            economic, and emotional needs
          </p>
        </div>
        <div>
          <img
            src={productDesign}
            alt="SproductDesign"
            className="w-full  h-64 object-cover rounded-md"
          />
        </div>
      </div>

      {/* section5 */}

      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl  text-blue-600 font-bold text-center">
          COMMUNICATION DESIGN
        </h2>
      </div>
      <h1 className="text-center font-bold text-2xl p-5">
        BACHELOR OF DESIGN - COMMUNICATION DESIGN
      </h1>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={communication}
            alt="Gateway to Media"
            className="w-full h-[600px] object-cover   rounded-md"
          />
        </div>
        <div className=" ">
          <p className="text-gray-700 text-justify ">
            Communication design, a field that merges creativity with
            information development, emphasizes how media engage with audiences.
            It focuses on the development of new media channels to make sure the
            message reaches the intended audience. Due to the overlap in
            expertise, some designers use the terms graphic design and
            communication design interchangeably
          </p>
          <p className="text-gray-700 text-justify  py-5">
            Communication design aims to attract, inspire, arouse desire in, and
            inspire people to act on messages. It may involve influencing
            behavior, spreading a message, or disseminating information.
            Communication design is a process that incorporates strategic
            business thinking, market research, problem-solving, creativity, and
            technical expertise in areas like color theory, page layout,
            typography, and constructing visual hierarchy. Communication
            designers use a range of media to translate concepts and information
          </p>
        </div>
      </div>

      {/* section6 */}

      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          Communication Design at Prachida
        </h2>
      </div>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <p className="text-gray-700 text-justify">
            With our teaching approach, students are not only encouraged to
            learn but also to increase their creative zeal and communication
            knowledge through practical exercises. Putting ideas into practice,
            students will explore more practical activities and resolve
            authentic problems. Over 4 years, you will be made sure that you are
            strong & confident with the basics like principles of design,
            typography, color, and form before advanced lessons like user
            interface and user experience (UI/UX), digital graphics, publication
            design, and advanced photo manipulation.
          </p>
          <p className="text-gray-700 text-justify py-2">
            Students submit a graduation project by the conclusion of their
            final year that displays all the knowledge and abilities they have
            acquired and refined throughout the course of the program. They
            finish their communication design bachelor program with a jury
            evaluating their work, prepared for a reputable placement.
          </p>
          <p className="text-gray-700 text-justify py-2">
            Prachida is confident in its ability to provide students with
            quality education with our renowned faculty from prestigious
            universities, industry professionals serving as advisers, regular
            syllabus updates, and industry-viable infrastructure. Enrolling in
            our communication design course will enable you to polish your
            talents and get ready with a wide range of employment options.
          </p>
        </div>
        <div>
          <img
            src={CommunicationDesign}
            alt="industrialDesign"
            className="w-full  h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* section 7 */}

      <div className="px-4 mt-16"></div>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            CAREER OPPORTUNITIES
          </h2>
          <p className="text-gray-700 text-justify">
            Prachida is confident in its ability to provide students with
            quality education with our renowned faculty from prestigious
            universities, industry professionals serving as advisers, regular
            syllabus updates, and industry-viable infrastructure. Enrolling in
            our communication design course will enable you to polish your
            talents and get ready with a wide range of employment options.
          </p>
          <p className="text-gray-700 text-justify py-2">
            Communication design graduates have countless opportunities to put
            their abilities to use in a range of businesses, including
            publishing houses, advertising agencies, digital media firms,
            human-centered research groups, and non-profits. They can work on a
            variety of projects in the fields of art direction, branding and
            identity design, packaging design, social media design,
            illustration, publication design, and photography. They can start
            their own business or work as a freelance designer
          </p>
        </div>
        <div>
          <img
            src={carrer}
            alt="carrer"
            className="w-full  h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/*section 8 */}
      <div className="flex justify-center items-center p-5 ">
        <div className=" grid grid-cols-1 grid-rows-1 sm:grid-cols-4 sm:grid-rows-3  gap-x-20 gap-y-4  p-4 items-center text-start">
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Design Thinking
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Publication Design
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Freehand Drawing
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Basic Animation and Storytelling
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Materials &amp; Production
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Interactive Media
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Form Space and Order
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Sound Design
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Packaging Design
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Design &amp; Production Drawing
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Elements of Film
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Liberal Arts: Cultural Studies
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Colour &amp; Composition
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Visual Merchandising
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Advanced Graphics and Imaging
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Intellectual Property Rights
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Film Theory and Structure
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Internship (Industrial Practicum)
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Ethnography
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Product Graphics
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Design Process &amp; Research Methodology
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Basic Graphics, Typography, Photography
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Design Management &amp; Professional Practice
          </div>
          <div className="py-4 text-center text-xs font-medium bg-white rounded-md p-4 text-black  shadow-2xl">
            Graduation Projects in Design
          </div>
        </div>
      </div>

      {/* section 9 */}

      <h1 className="text-center font-bold  text-3xl p-5">SKILLS</h1>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={skills}
            alt="Gateway to Media"
            className="w-[500px] h-[300px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
        <div className=" ">
          <p className="text-gray-700 text-left ">
            In order to enroll in the Communication Design course at Prachida,
            we require certain competencies from our students, such as
            visualization techniques, innovation and creativity, a very good eye
            for detail, observational techniques, communication proficiency,
            business knowledge, visual thinking and persuasiveness
          </p>
        </div>
      </div>

      {/* section 10 */}
      <div className="px-4 mt-16"></div>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Film and Video Communication (B. Des.)
          </h2>
          <p className="text-gray-700 text-justify">
            The Film and Video Communication discipline equips students to excel
            as adaptable, design-savvy directors, skilled in creating and
            producing Films for various purposes, including education, culture,
            society, entertainment, and marketing. It emphasizes building a
            solid base in visual communication skills, social studies, and both
            theoretical and technical aspects of filmmaking. Over the past
            century, the goals and applications of this medium have evolved
            significantly, catering to an increasing variety of audience
            segments in recent years.
          </p>
          <p className="text-gray-700 text-justify py-2">
            As a result, the program prioritizes cultivating comprehensive
            conceptual skills that can adapt to advancing technologies. Films
            created by students have earned international acclaim, winning
            prestigious awards at competitive film festivals in India and
            worldwide. Graduates have successfully established careers in
            advertising, film production, television, feature films, interactive
            media, and collaborative projects with government agencies and NGOs
            focused on developmental and communication objectives.
          </p>
        </div>
        <div>
          <img
            src={flimcommunication}
            alt=" flimcommunication"
            className="w-full  h-full object-cover rounded-md p-2"
          />
        </div>
      </div>

      {/* section11 */}
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={Animation}
            alt="Gateway to Media"
            className="w-[500px] h-[500px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
        <div className=" ">
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Animation Film Design (B. Des.)
          </h1>
          <p className="text-gray-700 text-left ">
            The Animation Film Design discipline at Prachida focuses on
            nurturing and guiding the visual storytelling skills of young
            students through the art of moving images. Students are inspired to
            explore the vibrant heritage of storytelling, art forms, music, and
            sounds from the Indian subcontinent. Emphasizing traditional drawing
            and animation skills, combined with advanced digital animation
            techniques, this program equips students to produce original short
            animation films and graphic novels.
          </p>
          <p className="text-gray-700 text-left py-4 ">
            Many graduates from the Animation Film Design program have secured
            positions in production houses, TV channels, independent animation
            studios, digital gaming studios, and UI/UX and e-learning companies.
            Others have successfully launched their own studios, becoming key
            contributors and stakeholders in the thriving Indian Animation
            Industry
          </p>
        </div>
      </div>
      {/* section 12 */}

      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Graphic Design (B. Des.)
          </h2>
          <p className="text-gray-700 text-justify">
            The Graphic Design field focuses on the critical importance of
            building a visual language through drawing, developing an
            appreciation for aesthetics, and understanding key principles like
            form, proportion, image, and language. This discipline motivates
            students to engage in diverse projects while specializing in
            particular sub-domains of graphic design. Topics include typography,
            type design, publication design, image-making, illustration,
            photography, packaging, print design, corporate identity, branding,
            and information & communication systems across both digital and
            analogous media
          </p>
          <p className="text-gray-700 text-justify py-2">
            Additionally, students explore cultural and historical contexts, as
            well as the social and ethical influences shaping design decisions.
            The program aims to foster independent critical thinking, strong
            research abilities, and the creativity necessary to practice design
            professionally. Graduates often secure positions at top graphic
            design firms or launch their own design ventures if they choose
          </p>
        </div>
        <div>
          <img
            src={graphicDesign}
            alt="graphicDesign"
            className="w-full  h-full object-cover rounded-md p-2"
          />
        </div>
      </div>

      {/* section13 */}

      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={ExhibitionDesign}
            alt="ExhibitionDesign"
            className="w-[500px] h-[500px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
        <div className=" ">
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Exhibition Design (B. Des.)
          </h1>
          <p className="text-gray-700 text-left ">
            The Exhibition Design field at Prachida adopts a comprehensive,
            multi-disciplinary approach to convey ideas and information in
            diverse settings. It centers on storytelling through environmental
            experiences that both educate and inspire. This discipline
            integrates aspects of communication, design, and fabrication,
            cultivating expertise in spatial planning, image-making,
            narrative-building, lighting design, interactive media technology,
            and scenography. Additionally, it incorporates knowledge of
            structures, typography, and visual design fundamentals, all while
            considering human factors. In essence, it utilizes physical space
            and visual storytelling to craft environments that communicate.
          </p>
          <p className="text-gray-700 text-left py-4 ">
            Exhibition designers are involved in various domains such as
            museums, galleries, trade shows, thematic interior-design
            environments, and scenography for festivals, cultural and theatrical
            events. They also focus on environmental branding, signage systems,
            experience design, and virtual museums/environments. Moreover, they
            contribute to public spaces, designing experiences that engage not
            just the senses but also emotions
          </p>
        </div>
      </div>

      {/* section 14 */}
      <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
        Bachelors in Animation, Multimedia, Game Design and Film Making
      </h1>
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" ">
          <p className="text-gray-700 text-center ">
            The Bachelors in Animation, Game Design, Multimedia Design and Film
            Making (Undergraduate) degree provides a comprehensive and immersive
            learning experience. The curriculum is designed to offer both
            theoretical knowledge and hands-on practice, ensuring you feel
            comfortable and prepared for a dynamic career ahead. We foster
            creativity to help you bring animated visuals to life, opening
            opportunities to shine globally. Our program invites you to be part
            of a diverse group of students exploring Animation & Multimedia
            Design while gaining expertise in Filmmaking. You will experience
            subjects like Film appreciation & analysis, Computer Application and
            Information Technology, Theory of Design, and Post-production. The
            course is aimed at propelling you into the exciting world of
            creative animation
          </p>
          <p className="text-gray-700 text-center py-3">
            The Bachelors in Animation, Game & Multimedia Design is a full-time
            program focused on intensive practice, allowing you to hone skills
            in game aesthetics and game design in both 2D and 3D formats. It
            combines technical mastery with creativity to prepare students for a
            successful career in animation
          </p>
          <p className="text-gray-700 text-center py-3">
            The Bachelors in Animation program ensures students develop
            expertise by integrating the latest technology with hands-on
            practice. By streamlining ideas and enhancing visual communication
            and storytelling abilities, you will be prepared for the animation
            industry. The curriculum includes training for various mediums, such
            as films, television, advertisements, games, and education,
            alongside training in cutting-edge AR, VR, and MR technologies.
          </p>
          <p className="text-gray-700 text-center py-3">
            The Bachelors in Animation & Film Making course, with an emphasis on
            Digital Filmmaking, covers the entire film production process,
            including pre-production, production, and post-production. Students
            explore the technical, creative, and business aspects of filmmaking,
            from camera techniques to production management, marketing, and
            event organization. The course encourages experimentation and
            teamwork, helping students find their unique voice while working
            collaboratively.
          </p>
        </div>
        <div className=" flex justify-center items-center">
          <img
            src={teenagersReadingBooks}
            alt="teenagersReadingBooks "
            className="w-[800px] h-full] object-cover p-5 mx-5   rounded-md"
          />
        </div>
      </div>
      {/* section 15 */}

      <div className="px-4 mt-16">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center">
          Exciting Career Opportunities after a Bachelor s in Animation and
          Multimedia (Film Making)
        </h2>
      </div>

      <div className="px-4   grid grid-cols-1 mt-10 ">
        <div className=" flex justify-center items-center">
          <img
            src={codingMan}
            alt="codingMan"
            className="w-[340px] h-auto object-cover rounded-md"
          />
        </div>
        <div className="flex justify-center items-center  p-4">
          <p className="text-gray-700 text-justify ">
            The opportunities for Animation and Multimedia graduates are vast.
            The industry provides roles such as 2D/3D artists, illustration
            designers, video developers, UI/UX designers, graphic editors, 3D
            generalists, character artists, and more. It also provides
            opportunities to Concept artists, Storyboard developers, Visual
            Communication consultants, and many more.
          </p>
        </div>
      </div>
      {/* section16 */}
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Aerospace Design
          </h2>
          <p className="text-gray-700 text-justify">
            Aerospace Design encompasses a range of specialized courses that
            cover industrystandard CAD tools used by Aerospace Engineers to
            perform essential tasks such as drafting and prototyping aircraft
            and spacecraft models.
          </p>
          <p className="text-gray-700 text-justify py-2">
            These CAD tools support the entire lifecycle, from research and
            design to manufacturing, operation, and maintenance of both aircraft
            and spacecraft.
          </p>
        </div>
        <div>
          <img
            src={videoEditingMan}
            alt=" videoEditingMan"
            className="w-full  h-full object-cover rounded-md p-2"
          />
        </div>
      </div>

      {/* section16 */}

      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={scientist}
            alt="ExhibitionDesign"
            className="w-[500px] h-[500px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
        <div className=" ">
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
            Aerospace Engineering
          </h1>
          <p className="text-gray-700 text-left ">
            Aerospace Engineering is a vital discipline focused on the design
            and advancement of both aircraft and spacecraft.
          </p>
          <p className="text-gray-700 text-left py-4 ">
            It serves as the foundation for two primary branches: Aeronautical
            Engineering and Astronautical Engineering
          </p>
          <p className="text-gray-700 text-left py-4 ">
            Aeronautical Engineering is dedicated to the creation, structure,
            and systems of aircraft, covering aspects such as material science,
            assembly, testing, and maintenance
          </p>
          <p className="text-gray-700 text-left py-4 ">
            Astronautical Engineering, on the other hand, applies scientific and
            engineering principles to space exploration, emphasizing
            astrodynamics, the design of aerospace systems, and control
            mechanisms
          </p>
        </div>
      </div>
      {/* section 17 */}
      <div className="flex flex-col justify-center items-center">
        <img src={Diagram} alt="Diagram" className="w-[500px] h-full" />
      </div>
      {/* section 18 */}
      <div className="flex flex-col  items-center">
        <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-2">
          Employments
        </h1>
        <img src={manager} alt="manager" className="w-[500px] h-full" />
        <p className="text-gray-700 text-left p-4 ">
          Aerospace Engineers proficient in CAD can secure opportunities across
          diverse industries, including
        </p>
        <ul className="list-disc p-4">
          <li>Manufacturing industries</li>
          <li>Aeronautical industries</li>
          <li>Heavy industries</li>
          <li>Locomotives</li>
        </ul>
      </div>
      {/* section 19 */}
      <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        <div className=" flex justify-center items-center">
          <img
            src={scientist}
            alt="ExhibitionDesign"
            className="w-[400px] h-[400px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
        <div className="  flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-3">
            CAD Courses at Prachida
          </h1>
          <p className="text-gray-700 text-left ">
            Prachida provides courses as stand-alone options or in combinations
            for key software in Aerospace Engineering. Our training covers the
            latest versions of renowned CAD/CAM/CAE software used for designing,
            prototyping, and manufacturing aircraft and spacecraft models.
          </p>
          <p className="text-gray-700 text-left py-4 ">
            Acquiring these CAD skills equips aerospace engineers to enhance
            productivity and secure promising career opportunities
          </p>
        </div>
      </div>
    {/* section 20 */}
    <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-6  mt-2 items-center">
        
        <div className="  flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-3xl text-blue-600 font-bold text-center p-3">
          Courses offered at CADD Centre
          </h1>
          <p className="text-gray-700 text-start ">
          Mastering CAD skills enables aerospace engineers to secure job opportunities and
          contribute effectively to productivity
          </p>
          <ul className=" p-2  list-disc">
<li>Creo</li>
<li>Ansys</li>
<li>NX CAM</li>
<li>GD& amp;T</li>
<li>Catia</li>
<li>NX CAD</li>
<li>NX Nastran</li>
<li>Overview of Aerospace Design</li>
<li>Hypermesh</li>
          </ul>
        </div>
        <div className=" flex justify-center items-center">
          <img
            src={exitedouman}
            alt="exitedouman"
            className="w-[500px] h-[300px] object-cover p-5 mx-5   rounded-md"
          />
        </div>
      </div>
      {/* section 21 */}
      <h2 className=" p-5 font-bold text-center">Mastering CAD skills enables aerospace engineers to secure job opportunities and contribute effectively to productivity</h2>
      <div className=" flex justify-center items-center">
    
      <div className=" grid grid-cols-1 sm:grid-cols-4 gap-5 p-5 sm:gap-20 sm:p-5 ">
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Aerospace Engineer</div>
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Aeronautical Engineer</div>
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Astronautical
        Engineer</div>
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3 text-center">Analyst</div>
      </div>
    
      </div>
      <div className=" flex justify-center items-center p-5">
     <div className=" grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 sm:gap-20 sm:p-5 ">
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Product Designer</div>
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Product Engineer</div>
        <div className=" shadow-lg shadow-gray-400 rounded-lg p-3">Design Engineer
      </div>
      
      </div>
     </div>
    </div>
  );
};

export default UniverCity;
