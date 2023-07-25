package main

func main() {

	db := new(Database)

	server := Server{
		listenAddr: ":8080",
		database: db,
	}

	server.start()

}
