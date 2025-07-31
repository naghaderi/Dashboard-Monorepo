import { BACKEND_URL } from '@/utils/constant'

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  })
  const json = await response.json()
  console.log('GRAPHQL RESPONSE:', json)
  if (json.errors) {
    console.error('GraphQL Error:', json.errors)
    throw new Error('Failed to fetch GraphQL data')
  }

  return json.data
}
