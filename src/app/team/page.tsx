
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DjangoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#092E20"/>
    <path d="M6 18V6H8.5C10.1667 6 11.5 6.41667 12.5 7.25C13.5 8.08333 14 9.16667 14 10.5C14 11.8333 13.5 12.9167 12.5 13.75C11.5 14.5833 10.1667 15 8.5 15H8V18H6ZM8 13H8.5C9.33333 13 9.91667 12.75 10.25 12.25C10.5833 11.75 10.75 11.1667 10.75 10.5C10.75 9.83333 10.5833 9.25 10.25 8.75C9.91667 8.25 9.33333 8 8.5 8H8V13Z" fill="white"/>
    <path d="M14.5 18V6H16.5V18H14.5Z" fill="white"/>
  </svg>
);

const OdooIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#714B67" />
    <path d="M8.5 15C10.433 15 12 13.433 12 11.5C12 9.567 10.433 8 8.5 8C6.567 8 5 9.567 5 11.5C5 13.433 6.567 15 8.5 15Z" fill="white" />
    <path d="M15.5 15C17.433 15 19 13.433 19 11.5C19 9.567 17.433 8 15.5 8C13.567 8 12 9.567 12 11.5C12 13.433 13.567 15 15.5 15Z" fill="white" />
    <path d="M8.5 12C9.32843 12 10 11.3284 10 10.5C10 9.67157 9.32843 9 8.5 9C7.67157 9 7 9.67157 7 10.5C7 11.3284 7.67157 12 8.5 12Z" fill="#714B67" />
    <path d="M15.5 12C16.3284 12 17 11.3284 17 10.5C17 9.67157 16.3284 9 15.5 9C14.6716 9 14 9.67157 14 10.5C14 11.3284 14.6716 12 15.5 12Z" fill="#714B67" />
  </svg>
);

const PostgresqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-3.38c-1.49.69-2.5 1.58-2.5 2.38 0 .83.99 1.5 2.5 1.5zm0-4.88V9H8.5v3.62c-1.49.69-2.5 1.58-2.5 2.38 0 .83.99 1.5 2.5 1.5s2.5-.67 2.5-1.5c0-.91-1.35-1.74-2.5-2.38zm0-4.62V4.5c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5v-3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5zm4.5 6c1.49 0 2.5.67 2.5 1.5s-1.01 1.5-2.5 1.5V13c1.49 0 2.5-.67 2.5-1.5S16.49 10 15 10v1.5zm0 3v3.38c1.49-.69 2.5-1.58 2.5-2.38 0-.83-.99-1.5-2.5-1.5z" fill="#336791"/>
</svg>
);


export default function TeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 text-center md:px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Our Development Team
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Meet the passionate individuals behind TechnovaAI WebChat.
              </p>
            </div>
          </div>
        </section>

        <section id="mitesh-bhimani" className="w-full bg-muted py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Mitesh Bhimani</h2>
                <p className="text-muted-foreground md:text-lg">
                  Work in Best ERP to Provide the business solutions
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="flex flex-col">
                  <CardHeader className="items-center">
                    <DjangoIcon className="h-16 w-16" />
                    <CardTitle className="mt-4">Django Web Development</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      A motivated and proficient Django Web Developer with 1 year of hands-on experience in developing and maintaining web applications. Skilled in leveraging the Django framework to build robust, scalable, and secure web solutions. Proficient in Python programming, with strong expertise in designing and implementing RESTful APIs, integrating third-party services, and managing databases using PostgreSQL. Adept at translating complex business requirements into functional and efficient web applications. Committed to writing clean, maintainable code and continuously improving development practices. Passionate about learning new technologies and contributing to innovative projects.
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader className="items-center">
                    <OdooIcon className="h-16 w-16" />
                    <CardTitle className="mt-4">Odoo ERP Online Business Solution</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      A highly skilled Odoo ERP Developer with 2 years of experience in designing, developing, and deploying custom Odoo modules and applications. Expertise in configuring and customizing the Odoo framework to meet diverse business needs, including accounting, inventory management, and human resources. Proficient in Python programming, with a strong background in developing dynamic field and section creation based on JSON data, as well as implementing validations and restrictions for various business processes. Demonstrated ability to translate complex business requirements into functional and efficient ERP solutions. Committed to delivering high-quality, scalable, and maintainable code. Passionate about leveraging technical skills to contribute to innovative ERP projects and improve business efficiency.
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader className="items-center">
                    <OdooIcon className="h-16 w-16" />
                    <CardTitle className="mt-4">Odoo ERP Online Business Solution</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      During the 1.5 year project, I gained hands-on experience in ETL processes, document generation and ERP development using odoo15 and PostgresSQL. I successfully contributed to the SearatesERP project, enhancing my skills in data migration, reporting and collaborative software development. I developed a RIS module where the HR department and other departments could store, share and manage their documents.
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col">
                  <CardHeader className="items-center">
                    <PostgresqlIcon className="h-16 w-16" />
                    <CardTitle className="mt-4">PostgreSQL</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      A proficient PostgreSQL Developer with 1 year of hands-on experience in managing and optimizing PostgreSQL databases. Skilled in designing and implementing efficient database schemas, writing complex SQL queries, and optimizing database performance. Experienced in handling data migrations, backups, and restorations, ensuring data integrity and availability. Adept at using PostgreSQL tools and extensions to enhance database functionality and improve application performance. Strong understanding of database security practices and best practices for maintaining robust and secure databases. Committed to continuous learning and applying new technologies to improve database management and performance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TechnovaAI WebChat. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="/about" className="text-xs hover:underline">
            About Us
          </Link>
           <Link href="/team" className="text-xs hover:underline">
            Our Team
          </Link>
          <Link href="/contact" className="text-xs hover:underline">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
