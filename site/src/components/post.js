import React from "react"  
import ReactMarkdown from "react-markdown";

const thumb = (url, size) => {
    const dir = "/uploads"
    return "/files/cache/" + size + url.substr(dir.length)
}

const dir = (url) => {
    const dir = "/uploads"
    return "./files" + url.substr(dir.length)
}


const Posts = ({ posts }) => {
    return (
        <div id="posts">
        {posts.map( post => (
            <Post key={post.node.id} post={post.node} />
        ))}
        </div>
    );
}

const Post = ({ post }) => {
    return (
        <article>
        <h2>{post.Title}</h2>
        <div className="post">
        <ReactMarkdown source={post.Text} />
        </div>
        {post.Images.map( image => (
            <img className="post-image" key={image.id}  src={thumb(image.url)} />
        ))}
        </article>
    );
}

export default Posts
