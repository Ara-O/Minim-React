package main

import (
	"log"
)

func main() {

	db := new(Database)

	server := Server{
		listenAddr: ":8080",
		database:   db,
	}

	err := server.start()

	if err != nil {
		log.Fatal("There has been an error starting the server: ", err)
	}

	db.end()

}
