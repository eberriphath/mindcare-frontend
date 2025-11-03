import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-900 via-emerald-800 to-gray-900 text-white px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Contact Us 🌿</h1>
        <p className="text-gray-300 mb-10">
          Have any questions or need assistance?  
          Reach out to us through the details below — we’d love to hear from you.
        </p>

        <div className="space-y-6 text-lg">
          <div>
            <p className="font-semibold text-green-400">📞 Phone</p>
            <p className="text-gray-300">+254 703 843 265</p>
          </div>

          <div>
            <p className="font-semibold text-green-400">📧 Email</p>
            <p className="text-gray-300">riphatheber@gmail.com</p>
          </div>

          <div>
            <p className="font-semibold text-green-400">📍 Address</p>
            <p className="text-gray-300">Nairobi, Kenya</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} MindCare. All rights reserved.
        </p>
      </div>
    </div>
  );
}
