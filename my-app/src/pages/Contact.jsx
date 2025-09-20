import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_xxx";
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_abc";
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "your_public_key";

    
    // IMPORTANT: keys must match the placeholders in your EmailJS template exactly
    const templateParams = {
      from_name: formData.name || "Anonymous",
      from_email: formData.email || "no-reply@example.com",
      message: formData.message,
      time: new Date().toLocaleString(),
      // optional: page_url: window.location.href
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log("EmailJS success:", result);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>Parenting Autism Together | Support for Indian Parents</title>
        <meta name="description" content="Explore resources, activities, and government schemes for autism parenting in India. Available in Marathi, Hindi, and English." />
      </Helmet>

      <h1 className="text-3xl font-bold text-center mb-2">{t("contactUS.heading")}</h1>
      <p className="text-gray-600 text-center mb-10">{t("contactUS.intro")}</p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">{t("contactUS.emailLabel")}</h2>
            <a href="mailto:parentingautismtogether.help@gmail.com" className="text-blue-600 underline break-all">parentingautismtogether.help@gmail.com</a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold mb-2">{t("contactUS.formTitle")}</h2>

          <input type="text" name="name" value={formData.name} onChange={handleChange}
                 placeholder={t("contactUS.formNamePlaceholder")} className="w-full border rounded-lg p-2" required />

          <input type="email" name="email" value={formData.email} onChange={handleChange}
                 placeholder={t("contactUS.formEmailPlaceholder")} className="w-full border rounded-lg p-2" required />

          <textarea name="message" value={formData.message} onChange={handleChange}
                    placeholder={t("contactUS.formMessagePlaceholder")} className="w-full border rounded-lg p-2 h-32 resize-y" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            {status === "sending" ? (t("contactUS.sending") || "Sending...") : t("contactUS.buttonSend")}
          </button>

          {status === "success" && (<p className="text-green-600 mt-2">{t("contactUS.responseNote")}</p>)}
          {status === "error" && (<p className="text-red-600 mt-2">Failed to send. Please try again later.</p>)}
        </form>
      </div>
    </div>
  );
}

export default Contact;
