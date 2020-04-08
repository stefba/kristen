package main

import (
	"io"
	"fmt"
	"net/http"
	"encoding/json"
)

func main() {
	pieces, err := getPieces()
	for _, p := range pieces {
		fmt.Println(p)
	}
	fmt.Println(err)
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

