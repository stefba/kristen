package main

import (
	"encoding/json"
	"io"
	"net/http"
	"text/template"
)

type SiteData struct {
	Info   *SiteInfo
	Pieces Pieces
	tmpl   *template.Template
}

func loadSite() (*SiteData, error) {
	siteInfo, err := getSiteInfo()
	if err != nil {
		return nil, err
	}
	pieces, err := getPieces()
	if err != nil {
		return nil, err
	}
	t, err := template.ParseFiles("./km.html")
	if err != nil {
		return nil, err
	}
	return &SiteData{
		Info:   siteInfo,
		Pieces: pieces,
		tmpl:   t,
	}, nil
}

type SiteInfo struct {
	Title       string `json: "title"`
	Description string `json: "description"`
	About       string `json: "about"`
}

func getSiteInfo() (*SiteInfo, error) {
	resp, err := http.Get("http://localhost:1337/site-information")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	siteInfo := &SiteInfo{}
	dec := json.NewDecoder(io.Reader(resp.Body))
	return siteInfo, dec.Decode(&siteInfo)
}

func getPieces() (Pieces, error) {
	resp, err := http.Get("http://localhost:1337/pieces")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	pieces := []*Piece{}
	dec := json.NewDecoder(io.Reader(resp.Body))
	return pieces, dec.Decode(&pieces)
}

type Pieces []*Piece

type Piece struct {
	Title  string    `json: "title"`
	Date   string    `json: "date"`
	Info   PieceInfo `json: "info,omitempty"`
	Images []Image   `json: "images"`
}

type PieceInfo struct {
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
