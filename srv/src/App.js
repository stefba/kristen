
import React from 'react';
import Helmet from 'react-helmet'
import Strapi from 'strapi-sdk-javascript/build/main';
import ReactMarkdown from "react-markdown";


import './App.css';

const strapi = new Strapi('/api/');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Pieces: [],
            Posts: []
        }
    }


    async componentDidMount() {
        try {
            const pieces = await strapi.getEntries('pieces', { "archived_ne": "true", "_sort": "id:DESC" })
            const posts = await strapi.getEntries('posts', {  "_sort": "id:DESC" })
            this.setState({
                Pieces: pieces,
                Posts: posts
            });
        } 
        catch(err) {
            alert(err);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Kristen Mounsey Ceramics</title>
                </Helmet>
                <h1 id="title">Kristen Mounsey Ceramics</h1>
                <Pieces pieces={this.state.Pieces} />
                <Posts posts={this.state.Posts} />
            </div>
        );
    }
}

function Pieces(props) {
    return (
        <div id="pieces">
        {props.pieces.map( piece => (
            <Piece key={piece.id} piece={piece} />
        ))}
        </div>
    );
}

function Piece(props) {
    return (
        <figure>
        {props.piece.images.map( image => (
            <img className="preview" key={image.id} alt={props.piece.title} src={thumb(image.url, "medium")} />
        ))}
        </figure>
    );
}

function thumb(url, size) {
    const dir = "/uploads"
    return "/files/sizes/" + size + url.substr(dir.length)
}

function Posts(props) {
    return (
        <div id="posts">
        {props.posts.map( post => (
            <Post key={post.id} post={post} />
        ))}
        </div>
    );
}

function Post(props) {
    return (
        <article>
            <h2>{props.post.title}</h2>
            <div className="post">
                <ReactMarkdown source={props.post.text} />
            </div>
            {props.post.images.map( image => (
                <img className="preview" key={image.id}  src={thumb(image.url, "medium")} />
            ))}
        </article>
    );
}
export default App;
