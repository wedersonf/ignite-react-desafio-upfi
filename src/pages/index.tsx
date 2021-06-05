import { Button, Box } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      if (pageParam !== null) {
        const { data } = await api.get(`/api/images`, {
          params: {
            after: pageParam
          }
        })

        return data
      }

      const { data } = await api.get(`/api/images`)
      return data
    },
    {
      getNextPageParam: lastPage => lastPage.after ?? null
    }
  );

  const formattedData = useMemo(() => {
    let formattedTotal = []
    const dataPages = data?.pages

    dataPages?.map(page => {
      formattedTotal = [...formattedTotal, ...page.data]
      return
    });

    return formattedTotal
  }, [data])

  if (isLoading) return <Loading />

  if (isError) return <Error />

  return (
    <>
      <Header />

      <Box maxW={1120} px={[0.05, 20]} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            mt="5"
            ml={["10", 0, 0]}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
