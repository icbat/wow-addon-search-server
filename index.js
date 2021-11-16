import fetch from 'node-fetch';

const githubApiToken = process.env.GITHUB_API_TOKEN

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

const body = { query: query };

fetch('https://api.github.com/graphql', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${githubApiToken}` }
})
    .then(
        response => response.json())
    .then(
        data => console.log(data)
    )
    .catch(console.error)
