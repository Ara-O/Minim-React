package main

import (
	"fmt"
	"log"
	"net/http"
)

type Server struct {
	listenAddr string
}

func (s *Server) newServer(listenAddr string) *Server {
	server := Server{
		listenAddr: listenAddr,
	}

	return &server
}

func (s *Server) start() error {
	http.HandleFunc("/health", health)
	http.HandleFunc("/api/register", register)

	fmt.Println("Server started on", s.listenAddr)
	err := http.ListenAndServe(s.listenAddr, nil)

	if err != nil {
		log.Fatal("There was an error starting a server")
		return err
	}
	
	return nil
}

func health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Server is alive :D")
}
