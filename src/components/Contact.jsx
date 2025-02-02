import React, { useState } from "react";

const Contact = () => {
  const [form, setform] = useState({ Name: "", Email: "", Message: "" });

  function ChangeHandler(e) {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  }

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen flex flex-col items-center justify-center px-6">
      <div className="container mx-auto p-8 rounded-lg shadow-xl bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <form className="space-y-6">
          
          <input
            type="text"
            name="Name"
            value={form.Name}
            placeholder="Enter your name"
            onChange={ChangeHandler}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
         
          <input
            type="email"
            name="Email"
            value={form.Email}
            placeholder="Enter your email"
            onChange={ChangeHandler}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
       
          <textarea
            name="Message"
            value={form.Message}
            placeholder="Enter your message"
            onChange={ChangeHandler}
            className="w-full p-3 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            rows="6"
          />
          
          <button
            onClick={() => console.log(form)}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
