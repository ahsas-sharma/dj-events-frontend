import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
import { API_URL } from '@/config/index';
const PER_PAGE = 2;

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt.attributes} />
      ))}

      <Pagination page={page} total={total} perPage={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Caclulate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/api/events?fields[0]=id`);
  const data = await totalRes.json();
  const total = data.meta.pagination.total;

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:asc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );
  const events = await eventRes.json();
  return {
    props: { events: events.data, page: +page, total },
  };
}
