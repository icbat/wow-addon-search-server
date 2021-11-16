import Koa from 'koa'
import { getPage } from './github.js'

const app = new Koa();
const githubApiToken = process.env.GITHUB_API_TOKEN

app.use(async ctx => {
    const page = await getPage(githubApiToken)
    ctx.body = page
});

app.listen(process.env.PORT || 3000)
