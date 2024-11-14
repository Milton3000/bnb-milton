import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container max-w-screen-md mx-auto px-5 lg:px-10 py-10 text-center">
      <h1 className="text-3xl font-semibold mb-4">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="text-lg">
          By using DreamBnB, you agree to comply with and be bound by these Terms of Service. Please review them carefully before using our platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
        <p className="text-lg">
          To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Bookings and Cancellations</h2>
        <p className="text-lg">
          All bookings made on DreamBnB are subject to availability and confirmation. Cancellation policies may vary, so please review them carefully before making a reservation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
        <p className="text-lg">
          Users are prohibited from using the platform for illegal activities, posting offensive content, or attempting to disrupt the service. Any violations may result in account suspension or termination.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
        <p className="text-lg">
          If you have any questions about these Terms of Service, please <Link href="/footer/contact" className="text-blue-600 underline">contact us here</Link>.
        </p>
      </section>
    </div>
  );
}
