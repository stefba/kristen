import React from "react"  

const Pieces = ({ pieces }) => {
    let i = 0;
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

const dimensions = info => {
    if (info == null || info.height == null) {
        return ""
    }
    let str = info.height;
    if (info.width != null) {
        str += " " + info.width;
    }
    if (info.length != null) {
        str += " " + info.length;
    }
    return str
}

const Piece = ({ piece }) => {
    const i = piece.info;
    return (
        <article className="piece">
        {piece.images.map( image => (
            <img className="piece-image" key={image.id}
            srcset={
                thumb(image.url, 640)+ " 640w, " +
                thumb(image.url, 960)+ " 960w, " + 
                thumb(image.url, 1280) + " 1280w"
            }
            src={thumb(image.url, 1280)} />
        ))}
        <div className="piece-info">
            <dt>Title</dt>
            <dd>{piece.title}</dd>
            <dt>Date</dt>
            <dd>{piece.date}</dd>
            
            {i.piece_type != null ? (
                <div>
                    <dt>Type</dt>
                    <dd>{i.piece_type.name}</dd>
                </div>
            ):(null)}
            {i.clay_body != null ? (
                <div>
                    <dt>Clay body</dt>
                    <dd>{i.clay_body.name}</dd>
                </div>
            ):(null)}
            {i.firing != null ? (
                <div>
                    <dt>Firing</dt>
                    <dd>{i.firing.name}</dd>
                </div>
            ):(null)}
            {i.glaze != null ? (
                <div>
                    <dt>Glaze</dt>
                    <dd>{i.glaze.name}</dd>
                </div>
            ):(null)}
            {i.process != null ? (
                <div>
                    <dt>Process</dt>
                    <dd>{i.process}</dd>
                </div>
            ):(null)}

            {dimensions(i) != "" ? (
                <div>
                    <dt>Dimensions</dt>
                    <dd>{dimensions(i)}</dd>
                </div>
            ):(null)}

            </div>
        
        </article>
    );
}

export default Pieces
