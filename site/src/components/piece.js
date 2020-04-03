import React from "react"  

const Pieces = ({ pieces }) => {
    return (
        <div id="pieces">
        {pieces.map( piece => (
            <Piece key={piece.node.id} piece={piece.node} />
        ))}
        </div>
    );
}

const dir = (url) => {
    const dir = "/uploads"
    return "./files" + url.substr(dir.length)
}


const Piece = ({ piece }) => {
    return (
        <article>
        {piece.Images.map( image => (
            <img className="piece-image" key={image.id}  src={dir(image.url)} />
        ))}
        <div>{piece.Title}</div>
        </article>
    );
}

export default Pieces
