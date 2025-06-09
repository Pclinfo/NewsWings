// import React from 'react';
// import {QRCode } from 'react-qr-code';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectPlan, markPaid } from '../features/PlanSlice';
// import { PLAN_AMOUNTS } from '../constants/planPrice';
// import { Navigate } from 'react-router-dom';

// const UPI_ID = 'nagarajthangaraj872@okhdfcbank';
// const PAYEE_NAME = 'Nagaraj Thangaraj';

// const Payment = () => {
//   const dispatch = useDispatch();
//   const { selectedPlan } = useSelector((state) => state.plans);

//   const getUPILink = () => {
//     if (!selectedPlan) return '';
//     const amount = PLAN_AMOUNTS[selectedPlan];
//     return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=Payment for ${selectedPlan} plan`;
//   };

//   const handleUPIPayment = () => {
//     const upiLink = getUPILink();
//     if (!upiLink) {
//       alert('Please select a plan');
//       return;
//     }

//     window.location.href = upiLink;
//     dispatch(markPaid());
//     if (isPaid === true) {
//           Navigate('/e-paper')
//     }

//   };

//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   const upiLink = getUPILink();

//   return (
//     <div className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-center text-gray-800">Choose a Plan</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {['weekly', 'monthly', 'yearly'].map((plan) => (
//           <button
//             key={plan}
//             className={`w-full py-3 rounded-lg border font-semibold text-center hover:bg-blue-100 transition ${
//               selectedPlan === plan ? 'bg-blue-200 border-blue-600' : 'bg-white'
//             }`}
//             onClick={() => dispatch(selectPlan(plan))}
//           >
//             {plan.charAt(0).toUpperCase() + plan.slice(1)} <br />
//             ₹{PLAN_AMOUNTS[plan]}
//           </button>
//         ))}
//       </div>

//       {selectedPlan && (
//         <div className="space-y-4 text-center">
//           {isMobile ? (
//             <>
//               <p className="text-lg text-gray-700">
//                 Pay ₹{PLAN_AMOUNTS[selectedPlan]} via UPI
//               </p>
//               <button
//                 onClick={handleUPIPayment}
//                 className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg text-lg"
//               >
//                 Pay with Google Pay / PhonePe
//               </button>
//             </>
//           ) : (
//             <>
//               <p className="text-lg text-gray-700">
//                 Scan QR to pay ₹{PLAN_AMOUNTS[selectedPlan]}
//               </p>
//               <div className="flex justify-center">
//                 <div className="bg-white p-4 rounded-lg shadow-md inline-block">
//                   <QRCode value={upiLink} size={220} />
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 mt-2">UPI ID: {UPI_ID}</p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payment;

import React from 'react';
import QRCode from 'react-qr-code';
import { useDispatch, useSelector } from 'react-redux';
import { selectPlan, markPaid } from '../features/PlanSlice';
import { PLAN_AMOUNTS } from '../constants/planPrice';
import { useNavigate } from 'react-router-dom';

const UPI_ID = 'nagarajthangaraj872@okhdfcbank';
const PAYEE_NAME = 'Nagaraj Thangaraj';

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPlan } = useSelector((state) => state.plans);

  const getUPILink = () => {
    if (!selectedPlan) return '';
    const amount = PLAN_AMOUNTS[selectedPlan];
    return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=Payment for ${selectedPlan} plan`;
  };

  const handleUPIPayment = () => {
    const upiLink = getUPILink();
    if (!upiLink) {
      alert('Please select a plan');
      return;
    }

    // Redirect to UPI app
    window.location.href = upiLink;
  };

  const handleManualConfirmation = () => {
    const confirm = window.confirm('Have you completed the payment successfully?');
    if (confirm) {
      dispatch(markPaid());
      navigate('/e-paper');
    }
  };

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const upiLink = getUPILink();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Choose a Plan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['weekly', 'monthly', 'yearly'].map((plan) => (
          <button
            key={plan}
            className={`w-full py-3 rounded-lg border font-semibold text-center hover:bg-blue-100 transition ${
              selectedPlan === plan ? 'bg-blue-200 border-blue-600' : 'bg-white'
            }`}
            onClick={() => dispatch(selectPlan(plan))}
          >
            {plan.charAt(0).toUpperCase() + plan.slice(1)} <br />
            ₹{PLAN_AMOUNTS[plan]}
          </button>
        ))}
      </div>

      {selectedPlan && (
        <div className="space-y-4 text-center">
          {isMobile ? (
            <>
              <p className="text-lg text-gray-700">
                Pay ₹{PLAN_AMOUNTS[selectedPlan]} via UPI
              </p>
              <button
                onClick={handleUPIPayment}
                className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-lg text-lg"
              >
                Pay with Google Pay / PhonePe
              </button>
            </>
          ) : (
            <>
              <p className="text-lg text-gray-700">
                Scan QR to pay ₹{PLAN_AMOUNTS[selectedPlan]}
              </p>
              <div className="flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-md inline-block">
                  <QRCode value={upiLink} size={220} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">UPI ID: {UPI_ID}</p>
            </>
          )}

          {/* Confirm Payment Button */}
          <button
            onClick={handleManualConfirmation}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
          >
            I Have Paid
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
