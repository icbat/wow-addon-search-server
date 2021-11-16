import fetch from 'node-fetch';

// TODO this only gets the first 100 results
const query = /* graphql */`
query {
  rateLimit {
    limit
    cost
    remaining
    resetAt
  }
  topic(name:"wow-addon") {
    repositories(first: 100, privacy:PUBLIC, orderBy:{field:STARGAZERS, direction:DESC}) {
      nodes {
        name
        description
        releases{
          totalCount
        }
      }
      pageInfo{
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
}
`

export const getPage = async (apiToken) => {
  const body = { query: query };

  const response = await fetch('https://api.github.com/graphql', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiToken}` }
  })
  return response.json()
}
