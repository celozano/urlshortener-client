import { useMutation, useQuery } from '@apollo/client';

import { LINKS_QUERY, CREATE_LINK_MUTATION } from '../queries/links';

export const useGetLinks = () => {
  const { data, ...rest } = useQuery(LINKS_QUERY);

  return {
    data: data?.getLinks,
    ...rest,
  };
};

export const useCreateLink = () => {
  const [createLink, rest] = useMutation(CREATE_LINK_MUTATION, {
    update(cache, { data }) {
      const { getLinks } = cache.readQuery({
        query: LINKS_QUERY,
      }) as any;

      cache.writeQuery({
        query: LINKS_QUERY,
        data: {
          getLinks: [data.createLink, ...getLinks],
        },
      });
    },
  });

  return {
    createLink: (url: string) => {
      return createLink({ variables: { url } });
    },
    ...rest,
  };
};
