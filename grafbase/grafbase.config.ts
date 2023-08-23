import { g, auth, config } from "@grafbase/sdk";
//@ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 4, max: 20 }),
    email: g.string().unique(),
    pfp: g.url(),
    bio: g.string().length({ min: 2, max: 1000 }).optional(),
    githubUrl: g.string().optional(),
    linkedinUrl: g.string().optional(),
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });
//@ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 4 }),
    desc: g.string(),
    image: g.url(),
    liveUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    author: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });
const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET"),
});

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
});
