import React, { useState } from 'react';
import publication from '../assets/college/publication.webp'
import ArticleForm from './ArticleForm';
const Publication = () => {
  const [formData, setFormData] = useState({
    title: '',
    institution: '',
    sourceUrl: '',
    content: '',
    deadline: '',
    submitterName: '',
    submitterEmail: '',
    submissionType: ''
  });
  
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'content') {
      setCharCount(value.length);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };
  
  return (
   <div className=" container mx-auto ">
     <div className="relative w-full h-[300px] md:h-[300px] overflow-hidden ">
            <img
              src={publication}
              alt="homeBG"
              className="w-full h-[300px] object-cover"
            />
           
          </div>
    
   </div>
  
  );
};

export default Publication;