import React from 'react';
import { useGetArticlesQuery, useUpdateArticleStatusMutation } from '../services/studentApi';
import { toast } from 'react-toastify';

const BASE_URL = 'http://127.0.0.1:5000/uploads';

const AdminArticles = () => {
  const { data, isLoading } = useGetArticlesQuery();
  const [updateStatus] = useUpdateArticleStatusMutation();

  const handleDecision = async (article, decision) => {
    try {
      await updateStatus({
        id: article.id,
        decision,
        email: article.email,
      }).unwrap();
      toast.success(`Article ${decision}`);
    } catch (err) {
      toast.error(err?.data?.error || 'Error processing decision');
    }
  };

  if (isLoading) return <p className="text-center text-blue-600 font-semibold">Loading articles...</p>;

  return (
    <div className="p-6 overflow-x-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📑 Recived  Articles</h1>
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Username</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Mobile</th>
            <th className="py-2 px-4 text-left">Type</th>
            <th className="py-2 px-4 text-left">Bonafide</th>
            <th className="py-2 px-4 text-left">Essay</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.data.map((article) => (
            <tr key={article.id} className="hover:bg-gray-50 transition-all">
              <td className="py-2 px-4">{article.username}</td>
              <td className="py-2 px-4">{article.email}</td>
              <td className="py-2 px-4">{article.mobile_number}</td>
              <td className="py-2 px-4 capitalize">{article.article_type}</td>
              <td className="py-2 px-4">
                <a
                  href={`${BASE_URL}/bonafide/${article.bonafide_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  View Bonafide
                </a>
              </td>
              <td className="py-2 px-4">
                <a
                  href={`${BASE_URL}/essay/${article.essay_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  View Essay
                </a>
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  onClick={() => handleDecision(article, 'approved')}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(article, 'rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticles;
