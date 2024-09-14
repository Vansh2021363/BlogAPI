import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Exploring the Mysteries of the Deep Sea",
    content:
      "The deep sea is one of the most unexplored regions of our planet. With its dark waters and strange, otherworldly creatures, it continues to fascinate scientists and adventurers alike. In this post, we dive into the secrets of the ocean's depths and the technology used to explore them.",
    author: "Olivia Carter",
    date: "2024-05-12T11:45:00Z",
  },
  {
    id: 2,
    title: "The Future of Space Tourism: A Dream Becoming Reality",
    content:
      "Space tourism is no longer just a concept from science fiction. With private companies like SpaceX and Blue Origin leading the charge, the dream of commercial space travel is closer than ever. But what does the future hold for this industry, and how soon can the average person hope to travel beyond Earth?",
    author: "Liam Johnson",
    date: "2024-06-22T08:30:00Z",
  },
  {
    id: 3,
    title: "Mastering the Art of Minimalist Living",
    content:
      "In a world full of distractions and excess, minimalism offers a refreshing perspective. This lifestyle encourages you to focus on the essentials, declutter your space, and lead a simpler, more intentional life. In this post, we explore practical ways to embrace minimalism in your home and mindset.",
    author: "Sophia Martinez",
    date: "2024-07-30T16:00:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
