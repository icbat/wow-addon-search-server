import Koa from 'koa'
import { getPage } from './github.js'
import { get, set } from './cache.js'

const app = new Koa();
const githubApiToken = process.env.GITHUB_API_TOKEN

app.use(async ctx => {
    const cached = get()
    if (cached) {
        return ctx.body = cached
    }

    const page = await getPage(githubApiToken)

    set(page)
    ctx.body = page
});

app.listen(process.env.PORT || 3000)
