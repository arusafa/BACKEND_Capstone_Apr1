const router = require("express").Router();
const { blogPost, validateBlogPost,  } = require("../models/blogPostModel.js");

//Add blog post

router.post("/create", async (req, res) => {
    try {
        const { error } = validateBlogPost(req.body);
        if (error) {
            console.log(error)
            return res.status(401).send(error.details[0].message);
        }
        console.log("req body", req.body)
        const BlogPost = await blogPost.findOne({ title: req.body.title, post: req.body.post });
        if(BlogPost){
            return res.status(401).send("Blog already there");
        }

        await new blogPost({ ...req.body}).save();
        res.status(201).send({message: "Blog post successfully created"});
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/list", async (req, res) => {
    try{
        const data = await blogPost.find();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ data})
    }
});

module.exports = router;