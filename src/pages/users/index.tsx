import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { useQuery } from 'react-query'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Pagination } from '../../components/Pagination'

export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  const { isLoading, data, error } = useQuery('users', async () => { // name of key cache local and fetch to get data
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()

    return data
  })

  return (
    <Box>
      <Header />

      <Flex 
        w="100%" 
        my="6" 
        maxWidth={1480} 
        mx="auto" 
        px="6"
      >
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                    { isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  <Tr>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td px={["4", "4", "6"]}>
                      <Box>
                        <Text fontWeight="bold">Leonardo Dias</Text>
                        <Text fontSize="sm" color="gray.300">leonardo.lissonez@gmail.com</Text>
                      </Box>
                    </Td>
                    { isWideVersion && <Td>04 de Abril, 2021</Td> }
                    { isWideVersion && (
                      <Td>
                        <Button 
                          as="a" 
                          size="sm" 
                          fontSize="sm" 
                          colorScheme="purple"
                          cursor="pointer"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                        >
                          Editar
                        </Button>
                      </Td>
                    ) }
                  </Tr>
                </Tbody>
              </Table>
              
              <Pagination />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  )
}