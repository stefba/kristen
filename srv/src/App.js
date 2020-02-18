import React from 'react';
import Helmet from 'react-helmet'
import Strapi from 'strapi-sdk-javascript/build/main';
import './App.css';

const strapi = new Strapi('http://localhost:1337');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Pieces: []
        }
    }


    async componentDidMount() {
        try {
            const pieces = await strapi.getEntries('pieces')
            this.setState({ Pieces: pieces });
        } 
        catch(err) {
            alert(err);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Kristen Mounsey</title>
                </Helmet>
                <div className="App">
                    <header className="App-header">
                        <h1>Kristen Mounsey Ceramics</h1>
                    </header>
                </div>
                <Pieces pieces={this.state.Pieces} />
            </div>
        );
    }
}

function Pieces(props) {
    return (
        <div>
        {props.pieces.map( piece => (
            <Piece key={piece.id} piece={piece} />
        ))}
        </div>
    );
}

function Piece(props) {
    return (
        <div>
        {props.piece.images.map( image => (
            <img key={image.id} alt={props.piece.title} src={image.url} />
        ))}
        </div>
    );
}

export default App;
