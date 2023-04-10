# Mooody
## Next.js + Tailwind CSS Example

Tailwind CSS is integrated into the `create-next-app` CLI, which supports TypeScript and JavaScript, as well as the App Router (`app/`) and the pages directory `pages/`.

## Napkin design
```
todo list but it has sentiment analysis and crit assignation 
- should be able to do basic curd
- persistent memory
- accounts
-  mood: depends upon task_added_time, task_complexiy, task_sentiment
- crit: manually can be updated, depends on the deadline proximity
- todo : {
    "name": "abc",
    "desc": {
        "points": [
            "doabc"
        ]
    },
    "task_by": "alpha",
    "deadline": "12:00 , 12/04/23",
    "mood": 3,
    "crit": 2,
    "metadata": {
        "image_url": "https: //abc.xyz/pic1"
    },
    "created": "12:00 , 10/04/23",
    "last_updated": "12:00 , 10/04/23",
    "updated_by": "alpha"
}
- use small db (redis?)
- make it very minimal UI
- make it as fast as possible
```
## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap a project preconfigured with Tailwind CSS:

```bash
npx create-next-app --tailwind with-tailwindcss-app
```

```bash
yarn create next-app --tailwind with-tailwindcss-app
```

```bash
pnpm create next-app --tailwind with-tailwindcss-app
k