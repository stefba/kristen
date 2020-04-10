package main

import (
	"log"
	"net/http"
	"os/exec"
	"text/template"
)

func main() {
	M = setupMake()
	http.HandleFunc("/rl/", reload)
	http.ListenAndServe(":8124", nil)
}

var M *Make

type Make struct {
	Status string
	Err    error
	Output string
	Queue  chan int
	Tmpl   *template.Template
}

func setupMake() *Make {
	t, err := template.ParseFiles("./status.html")
	if err != nil {
		log.Fatal(err)
	}

	return &Make{
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

	M.Output = string(b)
	M.Err = err
	<- M.Queue

	if len(M.Queue) > 0 {
		log.Println("Queue not empty. Initiate new build.")
		go runBuild()
	}
}

func reload(w http.ResponseWriter, r *http.Request) {
	log.Println("Request.")
	select {
	case M.Queue <- 1:
		log.Println("Added 1 to queue.")
	default:
		log.Println("Queue full. Doing nothing.")
	}
	if len(M.Queue) <= 1 {
		go runBuild()
		M.Status = "New build iniated!"
		M.Tmpl.Execute(w, M)
		return
	}
	M.Status = "Build already running. One in queue."
	M.Tmpl.Execute(w, M)
}
