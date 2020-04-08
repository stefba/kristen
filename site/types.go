package main

type Pieces []*Piece

type Piece struct {
	Title  string  `json: "title"`
	Date   string  `json: "date"`
	Info   Info    `json: "info,omitempty"`
	Images []Image `json: "images"`
	//Id     int     `json: "id"`
	//CreatedAt string  `json: "created_at"`
	//UpdatedAt string  `json: "updated_at"`
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
	//Id        int       `json: "id"`
}

type Image struct {
	Url string `json: "url"`
	//Name             string `json: "hash"`
	//Ext              string `json: "ext"`
	//Size             float32 `json: "size"`
	//Id               int    `json: "id"`
	//Hash             string `json: "hash"`
	//Sha256           string `json: "sha256"`
	//Mime             string `json: "mime"`
	//Provider         string `json: "provider"`
	//ProviderMetadata string `json: "provider_metadata"`
	//CreatedAt        string `json: "created_at"`
	//UpdatedAt        string `json: "updated_at"`
}

type GlazeProp struct {
	Name string `json: "name"`
	Hide bool   `json: "hide,omitempty"`
}

type Prop struct {
	Name string `json: "name"`
	//Id        int    `json: "id"`
	//CreatedAt string `json: "created_at"`
	//UpdatedAt string `json: "updated_at"`
}

