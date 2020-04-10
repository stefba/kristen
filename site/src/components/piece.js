import React from "react"; 

const Pieces = ({ pieces }) => {
    return (
        <div id="pieces">
        {pieces.map( piece => (
            <Piece key={piece.node.id} piece={piece.node} />
        ))}
        </div>
    );
}

const size = (url, size) => {
    const dir = "/uploads"
    return "/files/cache/" + size + url.substr(dir.length)
}

const dimensions = info => {
    const dims = [info.height, info.width, info.length];
    let str = "";
    dims.map( dim => (
        dim ? str += dim + " " : null
    ));
}

const Piece = ({ piece }) => {
    return (
        <article className="piece">
            <PieceImage piece={piece} />
            <PieceInfo piece={piece} /> 
        </article>
    );
}

const PieceImage = ({ piece }) => {
    return (
        piece.images.map( image => (
            <a href={size(image.url, 1280)}>
                <img className="piece-image" key={image.id} alt={piece.title}
                srcSet={
                    size(image.url, 640)+ " 640w, " +
                    size(image.url, 960)+ " 960w, " + 
                    size(image.url, 1280) + " 1280w"
                }
                src={size(image.url, 1280)} />
            </a>
        ))
    );
}

const cleanInfo = i => {
    for (const key of Object.keys(i)) {
        if (i[key] == null) {
            i[key] = undefined;
        }
    }
    return i;
}

const PieceInfo = ({ piece }) => {
    const i = cleanInfo(piece.info);
    const dims = dimensions(i);
    return (
        <div className="piece-info">
            <dt>Title</dt>
                <dd>{piece.title}</dd>
            <dt>Date</dt>
                <dd>{piece.date}</dd>
 
        {i.piece_type ? (
            <div>
                <dt>Type</dt>
                <dd>{i.piece_type.name}</dd>
            </div>
        ):(null)}

        {i.clay_body ? (
            <div>
                <dt>Clay body</dt>
                <dd>{i.clay_body.name}</dd>
            </div>
        ):(null)}

        {i.firing ? (
            <div>
                <dt>Firing</dt>
                <dd>{i.firing.name}</dd>
            </div>
        ):(null)}

        {i.glaze ? (
            <div>
                <dt>Glaze</dt>
                <dd>{i.glaze.name}</dd>
            </div>
        ):(null)}

        {i.process ? (
            <div>
                <dt>Process</dt>
                <dd>{i.process}</dd>
            </div>
        ):(null)}

        {dims ? (
            <div>
                <dt>Dimensions</dt>
                <dd>{dims}</dd>
            </div>
        ):(null)}

        </div>
    )
}


export default Pieces
