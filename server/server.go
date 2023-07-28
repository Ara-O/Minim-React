package main

import (
	"fmt"
	"net/http"
)

type Server struct {
	listenAddr string
	database   DatabaseInterface
}

func (s *Server) newServer(listenAddr string) *Server {
	server := Server{
		listenAddr: listenAddr,
	}

	return &server
}

func (s *Server) start() error {
	// Starting database
	err := s.database.start()

	if err != nil {
		return err
	}

	//Routes
	http.HandleFunc("/health", health)
	http.HandleFunc("/api/register", s.database.register)
	http.HandleFunc("/api/login", s.database.login)

	fmt.Println("Server started on", s.listenAddr)
	err = http.ListenAndServe(s.listenAddr, nil)

	if err != nil {
		return err
	}

	return nil
}

func health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Server is alive :D")
}
