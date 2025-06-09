import React, { useState } from 'react';
import { useUploadPDFMutation } from '../services/AdminPosts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PDFUploader = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('weekly');
  const [uploadPDF, { isLoading }] = useUploadPDFMutation();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    } else {
      setFile(null);
      toast.error('❌ Please select a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file || !category) {
      toast.error('❌ Please select both a file and category.');
      return;
    }

    try {
      await uploadPDF({ file, category }).unwrap();
      toast.success('✅ PDF uploaded successfully!');
      setFile(null);
    } catch (err) {
      toast.error(`❌ Upload failed: ${err?.data?.message || 'Server error'}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <ToastContainer position="top-center" />
      <h2 className="text-xl font-semibold mb-4 text-center">Upload PDF</h2>

      <select
        className="w-full mb-4 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <input type="file" accept="application/pdf" onChange={handleFileChange} className="mb-4" />

      {file && (
        <div className="text-sm mb-4">
          <strong>{file.name}</strong> ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </div>
      )}

      <button
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        onClick={handleUpload}
        disabled={!file || isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </div>
  );
};

export default PDFUploader;
