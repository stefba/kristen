package main

import (
	"log"
	"net/http"
	"os/exec"
	"text/template"
)

func main() {
	H = setupHooker()
	http.HandleFunc("/rl/", reload)
	http.ListenAndServe(":8124", nil)
}

var H *Hooker

type Hooker struct {
	Status string
	Err    error
	Output string
	Queue  chan int
	Tmpl   *template.Template
}

func setupHooker() *Hooker {
	t, err := template.ParseFiles("./hooker.html")
	if err != nil {
		log.Fatal(err)
	}

	return &Hooker{
		Status: "",
		Err:    nil,
		Output: "",
		Queue:  make(chan int, 2),
		Tmpl:   t,
	}
}

func runBuild() {
	log.Println("New build run.")

	cmd := exec.Command("yarn", "--cwd", "../site", "build")
	b, err := cmd.CombinedOutput()
	if err != nil {
		log.Println(err)
		log.Println(string(b))
	}

	H.Output = string(b)
	H.Err = err
	<- H.Queue

	if len(H.Queue) > 0 {
		log.Println("Queue not empty. Initiate new build.")
		go runBuild()
	}
}

func reload(w http.ResponseWriter, r *http.Request) {
	log.Println("Request.")
	select {
	case H.Queue <- 1:
		log.Println("Added 1 to queue.")
	default:
		log.Println("Queue full. Doing nothing.")
	}
	if len(H.Queue) <= 1 {
		go runBuild()
		H.Status = "New build iniated!"
		H.Tmpl.Execute(w, H)
		return
	}
	H.Status = "Build already running. One in queue."
	H.Tmpl.Execute(w, H)
}
