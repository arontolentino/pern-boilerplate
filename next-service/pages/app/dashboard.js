import { PlusIcon, ChevronRightIcon } from '@heroicons/react/outline';
import Card from '../../components/card/Card';
import CardHeader from '../../components/card/CardHeading';
import CardBody from '../../components/card/CardBody';
import Nav from '../../components/layout/Nav';
import Header from '../../components/header/Header';
import Link from 'next/link';

const applications = [
  {
    applicant: {
      name: 'Ricardo Cooper',
      email: 'ricardo.cooper@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Kristen Ramos',
      email: 'kristen.ramos@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
  {
    applicant: {
      name: 'Ted Fox',
      email: 'ted.fox@example.com',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    date: '2020-01-07',
    dateFull: 'January 7, 2020',
    stage: 'Completed phone screening',
    href: '#',
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="py-10">
        <Header>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Dashboard
          </h1>

          <Link href="/app/greetings/create">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-base font-bold rounded-md shadow-sm text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <PlusIcon className="h-6 w-6 mr-1" aria-hidden="true" />
              Create New Greeting
            </a>
          </Link>
        </Header>

        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>Greetings</CardHeader>
                <CardBody>
                  <h3 className="px-4 sm:px-6 text-xl">Accepting Responses</h3>
                  <ul className="mt-4">
                    {applications.map((application) => (
                      <li key={application.applicant.email}>
                        <a
                          href={application.href}
                          className="block hover:bg-gray-50"
                        >
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-12 w-12 rounded-full"
                                  src={application.applicant.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1 px-4 ">
                                <div>
                                  <p className="text-lg text-green-500 truncate">
                                    <span className="font-semibold">
                                      {application.applicant.name}
                                    </span>
                                    , Happy 30th Birthday
                                  </p>
                                  <div className="mt-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 mr-2">
                                      10 Messages
                                    </span>

                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                                      $300.00
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <ChevronRightIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>Reminders</CardHeader>

                <CardBody>{/* Content goes here */}</CardBody>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
