import React from 'react';
import { useGetPDFsQuery,useLazyDownloadPDFQuery } from '../services/AdminPosts';

const categoryTitles = {
  weekly: '📅 Weekly Reports',
  monthly: '🗓️ Monthly Reports',
  yearly: '📈 Yearly Reports',
};


import { useSelector } from 'react-redux';
import { selectToken } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';



const PDFCard = ({ filename, thumbnail_url, url }) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const isPaid = useSelector((state) => state.plans.isPaid);
  console.log( isPaid);
  const thumbUrl = `http://127.0.0.1:5000${thumbnail_url}`;
  const [triggerDownload] = useLazyDownloadPDFQuery();

  const handleDownload = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (!isAdmin && !isPaid) {
      navigate('/payment');
      return;
    }

    try {
   
      const blob = await triggerDownload(filename).unwrap();
      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div
      tabIndex={0}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col w-full h-full max-w-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
      aria-label={`PDF report: ${filename}`}
    >
      <div className="bg-gray-100 flex items-center justify-center w-full h-48">
        <img
          src={thumbUrl}
          alt={`Thumbnail of ${filename}`}
          className="object-contain max-h-full max-w-full"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h4
          title={filename}
          className="text-md font-semibold text-gray-900 truncate mb-3 select-text text-center"
        >
          {filename}
        </h4>
        {/* <button
          onClick={handleDownload}
          className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 focus:bg-blue-800
                     text-white text-sm font-semibold py-2 px-4 rounded-lg text-center
                     transition-colors duration-200"
          aria-label={`Download ${filename}`}
        >
          ⬇ Download
        </button> */}
        <button
  onClick={handleDownload}
  disabled={!isAdmin && !isPaid}
  className={`mt-auto inline-block text-sm font-semibold py-2 px-4 rounded-lg text-center transition-colors duration-200
    ${!isAdmin && !isPaid 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white'}
  `}
  aria-label={`Download ${filename}`}
  // title={!isAdmin && !isPaid ? 'Please complete payment to download' : `Download ${filename}`}
>
  ⬇ Download
</button>
      </div>
    </div>
  );
};




const PdfGallery = () => {
  const { data, isLoading, isError } = useGetPDFsQuery();

  const categorized = {
    weekly: [],
    monthly: [],
    yearly: [],
  };

  if (data) {
    data.forEach((pdf) => {
      categorized[pdf.category]?.push(pdf);
    });
  }

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg font-medium">
        Loading PDFs...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-500 text-lg font-semibold">
        Failed to load PDFs.
      </div>
    );

  return (
    <main className="px-6 py-12 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      {Object.entries(categorized).map(([category, items]) =>
        items.length > 0 ? (
          <section key={category} className="space-y-8" aria-labelledby={`${category}-title`}>
            <h2
              id={`${category}-title`}
              className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 select-none"
            >
              <span aria-hidden="true" className="text-4xl">
                {categoryTitles[category].split(' ')[0]}
              </span>{' '}
              <span className="text-xl font-semibold text-gray-700">
                {categoryTitles[category].slice(categoryTitles[category].indexOf(' ') + 1)}
              </span>
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                         gap-x-6 gap-y-10"
            >
              {items.map((pdf) => (
                <div key={pdf.id} className="flex">
                  <PDFCard {...pdf} />
                </div>
              ))}
            </div>
          </section>
        ) : null
      )}
    </main>
  );
};

export default PdfGallery;
