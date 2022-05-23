import { Accordion } from 'flowbite-react';

export default function () {
  return (
    <div>
      <Accordion flush={true}>
        <Accordion.Panel open={true}>
          <Accordion.Title arrowIcon={undefined}>
            What is Conjure Kit?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-black">
              <strong>Conjure Kit</strong> is a simple client-side app that offers additional <a
              href="/integrations" className="border-b-2 text-blue-400">integrations</a> to existing <strong
              className="text-indigo-600">Conjure</strong> users.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title arrowIcon={undefined}>
            Where is data stored?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-black">
              Data is stored in your browser. This entire application doesn't have any back-end and is, also, <a
              href="https://github.com/fakeheal/conjure-kit/" target="_blank" className="border-b-2 text-blue-400">open-source
              so come check it out</a>.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title arrowIcon={undefined}>
            Are you affiliated with conjure.so?
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-black">
              No, I am just a person that loves tracking almost everything I do. <strong
              className="text-indigo-600">Conjure</strong> is still in active development and is missing some popular
              integrations. Their API is constantly changing (their words) so sometimes this app might no work as
              expected.
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  )
}
