import { g, auth, config } from '@grafbase/sdk'


const user = g.model("user", {
  name : g.string().length({ min : 4, max: 20}),
  email : g.string().unique(),
  pfp : g.url(),
  bio : g.string(),
  githubUrl : g.string().optional(),
  linkedinUrl : g.string().optional(),
  projects : g.relation(() => project).list().optional(),
})
const project = g.model("prject" , {
  title : g.string().length({ min : 4}),
  desc : g.string(),
  image : g.url(),
  liveUrl : g.url(),
  githubUrl : g.url(),
  category : g.string().search(),
  author : g.relation(() => user),
})

export default config({
  schema: g
})