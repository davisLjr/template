import { useState, FormEvent } from "react";
import styles from "./ContactForm.module.scss";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    hiddenField: "", // honeypot invisible
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // ✅ Validación antes de enviar
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus("error");
      alert("Por favor completa todos los campos obligatorios.");
      setIsSubmitting(false);
      return;
    }

    //  Protección anti-bot: si el honeypot tiene algo, se cancela el envío
    if (formData.hiddenField) {
      // console.warn("Intento de bot bloqueado");
      setIsSubmitting(false);
      return;
    }

    try {
      const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.firstName);
      formDataToSend.append("lastname", formData.lastName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("hiddenField", formData.hiddenField);

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        hiddenField: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.subtitle}>
          <div className={styles.line}></div>
          <span className={styles.text}>Contacto</span>
          <div className={styles.line}></div>
        </div>

        <h2 className={styles.title}>¿Listo para comenzar?</h2>
        <p className={styles.description}>
          Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Campo honeypot oculto */}
          <input
            type="text"
            name="hiddenField"
            value={formData.hiddenField}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.label}>
                Nombre *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Nombre"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Apellido *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="Apellido"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Número de celular *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="+56 0 0000 0000"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
                placeholder="tu_mail@gmail.com"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Mensaje *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="Cuéntanos los detalles de tu consulta o proyecto..."
              rows={5}
            />
          </div>

          {submitStatus === "success" && (
            <div className={styles.successMessage}>
              ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
            </div>
          )}

          {submitStatus === "error" && (
            <div className={styles.errorMessage}>
              Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
};
