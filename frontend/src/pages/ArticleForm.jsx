import React, { useState } from 'react';
import { useCreateArticleMutation } from '../services/studentApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ArticleForm = () => {
  const [form, setForm] = useState({
    article_type: '',
    bonafide_file: null,
    essay_file: null,
  });

  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const userDetails = useSelector((state) => state.user.user);
console.log(userDetails);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.bonafide_file || !form.essay_file || !form.article_type) {
      toast.error('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('article_type', form.article_type);
    formData.append('username', userDetails.name);
    formData.append('mobile_number', userDetails.mobile);
    formData.append('bonafide_file', form.bonafide_file); // ✅ Send file object
    formData.append('essay_file', form.essay_file);       // ✅ Send file object
    formData.append('email', userDetails.email);
    console.log('FormData submission:');
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]); 
    }

    try {
      await createArticle(formData).unwrap();
      toast.success('✅ Article submitted successfully!');
      setForm({
        article_type: '',
        bonafide_file: null,
        essay_file: null,
      });
    } catch (err) {
      toast.error(err?.data?.error || '❌ Submission failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 border border-gray-300 rounded-md max-w-lg mx-auto mt-6 shadow-md bg-white"
    >
      <h2 className="text-xl font-semibold text-center text-blue-600">Submit Your Article</h2>

      <div>
        <label htmlFor="article_type" className="block font-medium mb-1">
          Article Type<span className="text-red-500">*</span>
        </label>
        <select
          name="article_type"
          value={form.article_type}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="" disabled>Select Article Type</option>
          <option value="research articles">Research Articles</option>
          <option value="essay">Essay</option>
          <option value="posters">Posters</option>
          <option value="research projects">Research Projects</option>
          <option value="short reports or letter">Short Reports or Letter</option>
        </select>
      </div>
  <div>
        <label className="block font-medium mb-1">email</label>
        <input
          type="text"
          value={userDetails?.email || ''}
          className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          value={userDetails?.name || ''}
          className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Mobile Number</label>
        <input
          type="text"
          value={userDetails?.mobile || ''}
          className="border p-2 w-full rounded bg-gray-100 cursor-not-allowed"
          disabled
        />
      </div>

      <div>
        <label htmlFor="bonafide_file" className="block font-medium mb-1">
          Bonafide Certificate (PDF/DOC/DOCX)<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="bonafide_file"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="essay_file" className="block font-medium mb-1">
          Essay File (PDF/DOC/DOCX)<span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          name="essay_file"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ArticleForm;
