package main

type Pieces []*Piece

type Piece struct {
	Title  string  `json: "title"`
	Date   string  `json: "date"`
	Info   Info    `json: "info,omitempty"`
	Images []Image `json: "images"`
}

type Info struct {
	PieceType Prop      `json: "piece_type,omitempty"`
	ClayBody  Prop      `json: "glay_body,omitempty"`
	Glaze     GlazeProp `json: "glaze,omitempty"`
	Firing    Prop      `json: "firing,omitempty"`
	Process   string    `json: "process,omitempty"`
	Width     float32   `json: "width,omitempty"`
	Height    float32   `json: "height,omitempty"`
	Length    float32   `json: "length,omitempty"`
}

type Image struct {
	Url string `json: "url"`
}

type GlazeProp struct {
	Name string `json: "name"`
	Hide bool   `json: "hide,omitempty"`
}

type Prop struct {
	Name string `json: "name"`
}

