import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container max-w-screen-md mx-auto px-5 lg:px-10 py-10 text-center">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information Collection</h2>
        <p className="text-lg">
          We collect information that you provide directly to us when you create an account, use our platform, make a booking, or communicate with us. This may include personal details such as your name, email address, and payment information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
        <p className="text-lg">
          We use the information we collect to provide, maintain, and improve our services. This includes using your data to facilitate bookings, process payments, and enhance the user experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Information Sharing</h2>
        <p className="text-lg">
          We do not share your personal information with third parties except to comply with legal requirements or to provide you with services, such as payment processing through trusted providers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="text-lg">
          We implement security measures to protect your information from unauthorized access and disclosure. However, no method of transmission over the Internet is completely secure, so we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p className="text-lg">
          If you have questions about our privacy practices, please <Link href="/footer/contact" className="text-blue-600 underline">contact us here</Link>.
        </p>
      </section>
    </div>
  );
}
