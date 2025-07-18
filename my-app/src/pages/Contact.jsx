import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Hook up to email service / backend API
    console.log("Contact form submitted:", formData);
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-2">
        {t("contactUS.heading")}
      </h1>
      <p className="text-gray-600 text-center mb-10">
        {t("contactUS.intro")}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact details */}
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">{t("contactUS.emailLabel")}</h2>
            <a
              href="mailto:comingsoon@gmail.com"
              className="text-blue-600 underline break-all"
            >
             TBC
            </a>
          </div>

          <div>
            <h2 className="font-semibold">{t("contactUS.phoneLabel")}</h2>
            <p className="text-gray-700">TBC</p>
          </div>

          <div>
            <h2 className="font-semibold">{t("contactUS.whatsappLabel")}</h2>
            <p className="text-gray-700">TBC</p>
          </div>

          <div>
            <h2 className="font-semibold">{t("contactUS.addressLabel")}</h2>
            <p className="text-gray-700">
              TBC
            </p>
          </div>
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">
            {t("contactUS.formTitle")}
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("contactUS.formNamePlaceholder")}
            className="w-full border rounded-lg p-2"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("contactUS.formEmailPlaceholder")}
            className="w-full border rounded-lg p-2"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("contactUS.formMessagePlaceholder")}
            className="w-full border rounded-lg p-2 h-32 resize-y"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("contactUS.buttonSend")}
          </button>

          {status === "success" && (
            <p className="text-green-600 mt-2">
              {t("contactUS.responseNote")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;
