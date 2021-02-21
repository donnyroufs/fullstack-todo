import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from './QueryClient'

export const Provider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <ChakraProvider>{children}</ChakraProvider>
  </QueryClientProvider>
)
