import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default function Privacy() {
  return (
    <>
      <Navigation />
      <main id="main" className="section-shell pt-28 sm:pt-32 max-w-3xl">
        <h1 className="text-4xl font-bold">Privacy</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
          <p>
            When you request information, the site collects the name, email, and
            answers you provide so Max can review your request and follow up.
            Submissions are stored using Supabase.
          </p>
          <p>
            Notes about Max include your name, relationship, note, any optional
            email, and your publication preference. Notes are reviewed before
            publication. Your email is not included in a published testimonial.
          </p>
          <p>
            The fun facts feature stores the IDs of facts you've seen in this
            browser's local storage. Clearing site data resets that history.
          </p>
          <p>
            The private lab requires a password. Its content is not stored in
            local storage. Hosting services may process technical request
            information to operate the site.
          </p>
          <p>
            Booking a call opens Calendly. External services, including LinkedIn
            and GitHub, have their own privacy practices. Après Boston is a
            separate application under the projects path and uses its own
            account and community data.
          </p>
          <p>
            For questions or requests about information you've submitted, email{" "}
            <a
              href="mailto:maxlobel1@gmail.com"
              className="text-primary underline"
            >
              maxlobel1@gmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
