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
  totalCount: number
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get('/users', {
    params: {
      page
    }
  })

  const totalCount= Number(headers['x-total-count'])

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

  return {
    users,
    totalCount
  }
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), { // name of key cache local and fetch to get data
    staleTime: 1000 * 5 // 5 seconds in fresh state
  })
}