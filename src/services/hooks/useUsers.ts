import { useQuery } from 'react-query'

import { api } from '../api'

interface IUser {
  id: string
  name: string
  email: string
  createdAt: string
}

interface GetUsersResponse {
  users: IUser[]
}

export async function getUsers(): Promise<IUser[]> {
  const { data } = await api.get<GetUsersResponse>('/users')

  const users = data.users.map(user => {
    return {
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return users
}

export function useUsers() {
  return useQuery('users', getUsers, { // name of key cache local and fetch to get data
    staleTime: 1000 * 5 // 5 seconds in fresh state
  })
}