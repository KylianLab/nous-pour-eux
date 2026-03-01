"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const mailtoLink = `mailto:nous.pour.eux.asbl@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Contact depuis le site"
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-secondary-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-light px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="h-4 w-4" />
            Contact
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Une question sur l&apos;adoption ? Envie de nous aider ? N&apos;hésitez
            pas à nous écrire.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-warm-bg rounded-2xl p-6 border border-warm-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary mb-1">Email</h3>
                    <a
                      href="mailto:nous.pour.eux.asbl@gmail.com"
                      className="text-gray-600 hover:text-primary transition-colors text-sm"
                    >
                      nous.pour.eux.asbl@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-warm-bg rounded-2xl p-6 border border-warm-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary mb-1">
                      Siège social
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Chemin des Meuniers 3<br />
                      1367 Autre-Église
                      <br />
                      Belgique
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-warm-bg rounded-2xl p-6 border border-warm-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-xl p-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary mb-1">
                      N° Entreprise
                    </h3>
                    <p className="text-gray-600 text-sm">597.657.382</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-green-50 rounded-2xl p-12 text-center border border-green-200">
                  <Send className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-secondary mb-2">
                    Message préparé !
                  </h3>
                  <p className="text-gray-600">
                    Votre client email devrait s&apos;ouvrir avec le message
                    pré-rempli. Si ce n&apos;est pas le cas, envoyez-nous un email
                    directement.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-primary hover:text-primary-dark font-medium"
                  >
                    Envoyer un nouveau message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre nom
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="jean@exemple.be"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      <option value="">Choisir un sujet</option>
                      <option value="Adoption">Adoption</option>
                      <option value="Don">Don</option>
                      <option value="Bénévolat">Bénévolat</option>
                      <option value="Famille d'accueil">
                        Famille d&apos;accueil
                      </option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre message
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      placeholder="Votre message ici..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
                  >
                    <Send className="h-5 w-5" />
                    Envoyer
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
