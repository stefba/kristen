package main

import (
	"log"
	"net/http"
)

var Site *SiteData

func main() {
	load()
	http.HandleFunc("/", view)
	http.HandleFunc("/load", reload)
	http.ListenAndServe(":8999", nil)
}

func view(w http.ResponseWriter, r *http.Request) {
	load()
	err := Site.tmpl.ExecuteTemplate(w, "front", Site)
	if err != nil {
		log.Println(err)
	}
}

func load() {
	site, err := loadSite()
	if err != nil {
		log.Fatal(err)
	}
	Site = site
}

func reload(w http.ResponseWriter, r *http.Request) {
	site, err := loadSite()
	if err != nil {
		http.Error(w, err.Error(), 500)
		log.Println(err)
	}
	Site = site
}
