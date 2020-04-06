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

const thumb = (url, size) => {
    const dir = "/uploads"
    return "/files/cache/" + size + url.substr(dir.length)
}

const dir = (url) => {
    const dir = "/uploads"
    return "./files" + url.substr(dir.length)
}

const iname = obj => {
    if (obj != null ) {
        return obj.name
    }
    return ""
}

const Piece = ({ piece }) => {
    return (
        <article>
        {piece.images.map( image => (
            <img className="piece-image" key={image.id}  src={thumb(image.url, 1280)} />
        ))}
        <div>
            <dt>Title</dt>
            <dd>{piece.title}</dd>
            <dt>Date</dt>
            <dd>{piece.date}</dd>

            <dt>Type</dt>
            <dd>{iname(piece.info.piece_type)}</dd>
            <dt>Clay body</dt>
            <dd>{iname(piece.info.clay_body)}</dd>
            <dt>Firing</dt>
            <dd>{iname(piece.info.firing)}</dd>
            <dt>Glaze</dt>
            <dd>{iname(piece.info.glaze)}</dd>
            <dt>Process</dt>
            <dd>{piece.info.process}</dd>
            <dt>Width</dt>
            <dd>{piece.info.width}</dd>
            <dt>Height</dt>
            <dd>{piece.info.height}</dd>
            <dt>Length</dt>
            <dd>{piece.info.length}</dd>
        </div>
        
        </article>
    );
}

export default Pieces
