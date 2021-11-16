import Koa from 'koa'
import { getPage } from './github.js'
import cache from './cache.js'

const app = new Koa();
const githubApiToken = process.env.GITHUB_API_TOKEN

app.use(async ctx => {
    const cached = cache.get()
    if (cached) {
        return ctx.body = cached
    }

    const page = await getPage(githubApiToken)

    cache.set(cached)
    ctx.body = page
});

app.listen(process.env.PORT || 3000)
