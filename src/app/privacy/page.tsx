import pageStyles from '@/styles/pages.module.scss';
import Link from 'next/link';

export default function LegalNotice() {
  return (
    <main>
      <section className={pageStyles.section} style={{ backgroundColor: 'grey' }}>
        <div className={pageStyles.wrapper}>
          <div className={pageStyles.contentContainer}>
            <h1>Privacy information</h1>

            <h2>Purpose of the collection of personal data</h2>
            <p>We collect personal data for the following reasons:</p>
            <ul>
              <li>To operate and continually improve the website.</li>
              <li>
                To understand user behavior on adrianfahrbach.com in order to ensure that the website functions
                properly.
              </li>
            </ul>

            <h2>Methods for collecting and processing personal data</h2>
            <p>
              adrianfahrbach.com uses external service providers to collect and process personal data. These service
              providers and their functions are explained below.
            </p>

            <h3>Processing of user data</h3>

            <h4>Cookies</h4>
            <p>
              This website sometimes uses cookies, small text files that are stored on your computer and managed by your
              browser. Cookies are used to make the website more user-friendly, effective and secure.
            </p>
            <p>
              Most of the cookies used are &ldquo;session cookies&rdquo;, which are automatically deleted when you end
              your visit. Other cookies remain stored on your end device until you delete them. They enable us to
              recognize your browser on your next visit.
            </p>
            <p>
              Cookies that are required to carry out the electronic communication process or to provide certain
              functions you have requested are stored on the basis of Art. 6 para. 1 lit. f GDPR. Other cookies for
              analyzing your user behavior are treated separately.
            </p>

            <h4>Server log files</h4>
            <p>
              As the operator of this website, we automatically collect and store information in server log files that
              your browser transmits to us. This information includes, among other things
            </p>
            <ul>
              <li>Browser type and browser version</li>
              <li>Operating system used</li>
              <li>referrer URL</li>
              <li>Host name of the accessing computer</li>
              <li>Time of the server request</li>
              <li>IP address</li>
            </ul>
            <p>
              This data is not merged with other personal data sources and is used for the technically error-free
              presentation and optimization of our website.
            </p>

            <h4>Sentry</h4>
            <p>
              This website uses the Sentry service to improve technical stability by monitoring system stability and
              identifying code errors. Sentry is certified under the EU-US data protection agreement and is therefore
              committed to complying with EU data protection regulations.
            </p>
            <p>The information collected by Sentry includes:</p>
            <ul>
              <li>the browser type/version</li>
              <li>the type of device</li>
              <li>the operating system used</li>
              <li>the URL of the page on which an error occurred</li>
              <li>the time of the server request</li>
            </ul>

            <h4>Vercel</h4>
            <p>
              This website uses the <Link href='https://vercel.com/'>Vercel</Link> service. The provider is Vercel Inc, 340 S
              Lemon Ave #4133, Walnut, CA 91789, USA. Vercel is a cloud platform through which we provide our website.
              provide our website. This means that visits to our website are processed or routed through Vercel&apos;s
              servers. is routed through. The data associated with your visit to our website is also transmitted to
              Vercel transmitted. This is necessary so that your browser request can be processed successfully. This
              data includes:
            </p>
            <ul>
              <li>the browser type/version</li>
              <li>the operating system used</li>
              <li>the referrer URL (the previously visited page)</li>
              <li>the IP address</li>
              <li>the time of the server request</li>
              <li>Cookies</li>
            </ul>
            <p>
              You can find Vercel&apos;s privacy policy at{' '}
              <Link href='https://vercel.com/legal/privacy-policy'>https://vercel.com/legal/privacy-policy</Link>.
            </p>
            <p>
              The data processing is carried out on the basis of Art. 6 para. 1 lit. f GDPR, as the data transmission is
              necessary in order to be able to use the website.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
