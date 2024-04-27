import { ProjectStatsEntry } from '@/components/ProjectStats';

export interface ProjectProps {
  imageSrc: string;
  imageAlt: string;
  imageBgColor?: string;
  headline: string;
  description: React.ReactNode;
  stats?: ProjectStatsEntry[];
}

export const projects: ProjectProps[] = [
  {
    headline: 'The Mobility House Website',
    imageSrc: '/assets/screens-tmh-website.jpg',
    imageAlt: 'Screenshots of the The Mobility House website',
    imageBgColor: '#D7E5F2',
    description: (
      <>
        <p>
          Orcaya was commissioned to redesign the website of Munich-based technology company The Mobility House, which
          develops and sells charging solutions for the mobility transition.
          <br />
          We opted for a combination of Next.js and the Strapi CMS to meet the customer&apos;s request for modern
          technologies and a headless CMS.
        </p>
        <p>
          An interesting aspect of the project was the preservation of the website&apos;s Magento store, which is
          managed by the client themselves. The content pages were implemented in Next.js, while Magento is used for
          product pages, shopping cart and checkout. For seamless integration, some of our Next.js components, such as
          the header and footer, were also integrated into Magento as normal React components.
        </p>
      </>
    ),
    stats: [
      { title: 'Technologie', text: 'Next.js, Strapi CMS, Cypress' },
      { title: 'My role', text: 'Part of Orcayas Development Team' },
      {
        title: 'Link',
        text: (
          <a href='https://www.mobilityhouse.com/' target='_blank' rel='noopener noreferrer'>
            mobilityhouse.com
          </a>
        ),
      },
    ],
  },
  {
    headline: 'The Mobility House Electricity Tariff',
    imageSrc: '/assets/screens-electricity-tariff.jpg',
    imageAlt: 'Screenshots of the The Mobility House Electricity Tariff website',
    imageBgColor: '#BED4CF',
    description: (
      <>
        <p>
          Another project of The Mobility House is the Electricity Tariff website, a white label solution that offers
          electric car owners cheaper electricity tariffs through smart charging. It is currently active exclusively
          under the name &ldquo;Eyond&rdquo;, but there are plans to use it for different car manufacturers in other
          color variants in the future.
        </p>
        <p>
          At the heart of the project is a complex form that requests current electricity prices in addition to customer
          data. Validating the form with Yup is particularly challenging, as there are many dependencies between the
          fields and the form can vary depending on the area of application. At an automotive manufacturer from France,
          for example, some customer data is retrieved via a single sign-on (SSO) instead of form inputs.
        </p>
      </>
    ),
    stats: [
      { title: 'Technologie', text: 'Next.js, Strapi CMS' },
      { title: 'My role', text: 'Part of Orcayas Development Team' },
      {
        title: 'Link',
        text: (
          <a href='https://eyond.mobilityhouse.com/' target='_blank' rel='noopener noreferrer'>
            eyond.mobilityhouse.com
          </a>
        ),
      },
    ],
  },
  {
    headline: 'Jira Time Tracker App',
    imageSrc: '/assets/screens-jtt.jpg',
    imageAlt: 'Screenshots of the Jira Time Tracker app',
    imageBgColor: '#D7E5F2',
    description: (
      <>
        <p>
          With the acquisition of hatchery by Orcaya, some of our tools have changed, including time tracking from
          Harvest to Jira. We missed the official Harvest app, as the Excel-like spreadsheet integrated in Jira is not
          very intuitive and suitable Jira-compatible alternatives were not ideal for our use case.
        </p>
        <p>
          That&apos;s why my colleague Florian and I decided to develop our own solution. Using React-Native, we created
          an app that synchronizes our working hours via the Jira API. Thanks to React-Native, we were able to quickly
          make the app available for Windows and Mac.
        </p>
        <p>
          The project is still under development, but a working MacOS prototype can be installed via the link on the
          right.
        </p>
      </>
    ),
    stats: [
      { title: 'Technologie', text: 'React-Native' },
      { title: 'My role', text: 'Designer and developer' },
      {
        title: 'Link',
        text: (
          <a href='https://testflight.apple.com/join/mB7ZA6s5' target='_blank' rel='noopener noreferrer'>
            Testflight invite
          </a>
        ),
      },
    ],
  },
  {
    headline: '1337 Camp Website',
    imageSrc: '/assets/screens-1337-camp.jpg',
    imageAlt: 'Screenshots of the 1337 Camp website',
    imageBgColor: '#C7BDD5',
    description: (
      <>
        <p>
          The 1337 Camp is a kind of hotel for gaming enthusiasts. The rooms there are used for LAN parties by amateur
          gamers as well as rented by reputable professional athletes to prepare for upcoming tournaments.
        </p>
        <p>
          I have been responsible for the development of the website as a freelancer for over three years and have taken
          on the design as well as the programming.
        </p>
      </>
    ),
    stats: [
      { title: 'Technologie', text: 'React, Kirby CMS' },
      { title: 'My role', text: 'Part of Orcayas Development Team' },
      {
        title: 'Link',
        text: (
          <a href='https://1337.camp' target='_blank' rel='noopener noreferrer'>
            1337.camp
          </a>
        ),
      },
    ],
  },
  {
    headline: 'DIANA Leuchten Website',
    imageSrc: '/assets/screens-diana.jpg',
    imageAlt: 'Screenshots of the DIANA website',
    imageBgColor: '#D7E5F2',
    description: (
      <>
        <p>
          DIANA develops various LED light sources, primarily for the industrial sector. We redesigned the website for
          the company using the Kirby CMS. React components are also used for some of the more complex sections.
        </p>
        <p>
          As the products are usually requested individually and in large quantities, we developed a &ldquo;store
          system&rdquo; without a payment function. The user places products in a shopping cart and then creates an
          individual request at the end.
        </p>
      </>
    ),
    stats: [
      { title: 'Technologie', text: 'React, Kirby CMS' },
      { title: 'My role', text: 'Designer and developer' },
      {
        title: 'Link',
        text: (
          <a href='https://diana-leuchten.de' target='_blank' rel='noopener noreferrer'>
            diana-leuchten.de
          </a>
        ),
      },
    ],
  },
];
