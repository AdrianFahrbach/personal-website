import pageStyles from '@/styles/pages.module.scss';
import Link from 'next/link';

export default function LegalNotice() {
  return (
    <main>
      <section className={pageStyles.section}>
        <div className={pageStyles.wrapper}>
          <div className={pageStyles.contentContainer}>
            <h1>Legal notice</h1>
            <h2>Contact</h2>
            <p>
              Adrian Fahrbach
              <br />
              Filderstraße 71/1
              <br />
              70771 Leinfelden-Echterdingen
              <br />
              E-Mail: adrianfahrbach@me.com
            </p>
            <h2>Attributions</h2>
            <ul>
              <li>
                Spline balloon material is based on{' '}
                <Link href='https://community.spline.design/file/1a12ce58-e8f7-4ae1-8a43-4b1527dab076'>
                  Ballon Experience by aximoris
                </Link>
              </li>
              <li>
                The icons used are from the <Link href='https://phosphoricons.com/'>Phosphor Icons icon pack</Link>
              </li>
            </ul>
            <h2>Liability for own content</h2>
            <p>
              We are responsible for our own content that we make available for use in accordance with the general laws.
              We assume no guarantee or responsibility for the completeness, editorial and technical errors, omissions,
              etc. or the accuracy of the information contained on this website.
            </p>
            <h2>Liability for content on third-party websites</h2>
            <p>
              Links to third-party websites are provided for your information only. The responsibility for this
              third-party content lies solely with the provider who makes this content available on the linked website.
              The internet offers of third parties have been checked before the corresponding link was set up. However,
              we assume no liability for the completeness and accuracy of the information behind a reference or link; in
              particular, the content of these websites may be changed at any time without our knowledge. If we become
              aware of any legal infringements on pages to which we have placed a link on our website, we will remove
              this link immediately.
            </p>
            <h2>Changes to the information provided</h2>
            <p>
              We reserve the right to change, supplement or remove the information provided without prior notice.
              Translated
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
