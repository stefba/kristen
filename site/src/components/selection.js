import React from "react"; 

const Selection = ({ pieces }) => {
  console.log(pieces)
    return (
        <div id="selection">
        {pieces.map( piece => (
            <SelectionPiece key={piece.id} piece={piece} />
        ))}
        </div>
    );
}

const size = (url, size) => {
    const dir = "/uploads"
    return "/files/cache/" + size + url.substr(dir.length)
}

const SelectionPiece = ({ piece }) => {
    return (
        <article className="selection-piece">
          <SelectionPieceImage piece={piece} />
        </article>
    );
}

const SelectionPieceImage = ({ piece }) => {
    return (
        piece.images.map( image => (
            <a href={size(image.url, 1280)}>
                <img className="selection-piece-image" key={image.id} alt={piece.title}
                srcSet={
                    size(image.url, 640)+ " 640w, " +
                    size(image.url, 960)+ " 960w, " + 
                    size(image.url, 1280)+ " 1280w, " + 
                    size(image.url, 2560) + " 2560w"
                }
                src={size(image.url, 1280)} />
            </a>
        ))
    );
}

export default Selection
