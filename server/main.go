package main

func main() {

	server := Server{
		listenAddr: ":8080",
	}

	server.start()

}
