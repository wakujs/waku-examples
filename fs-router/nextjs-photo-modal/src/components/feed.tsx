import { Link } from 'waku';
import { unstable_createRouteHref as createRouteHref } from 'waku/router';
import { photoIds } from '../photos';

const getPhotoHref = createRouteHref({ path: '/photos/[id]' });

export const Feed = () => (
  <ul className="feed">
    {photoIds.map((id) => (
      <li key={id}>
        <Link to={getPhotoHref({ params: { id } })}>{id}</Link>
      </li>
    ))}
  </ul>
);
