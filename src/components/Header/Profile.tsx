import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Leonardo Lissone</Text>
        <Text color="gray.300" fontSize="sm">
          leonardo.lissonez@gmail.com
        </Text>
      </Box>

      <Avatar size="md" name="Leonardo Lissone" src="https://github.com/Lissone.png" />
    </Flex>
  )
}