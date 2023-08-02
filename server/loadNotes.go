package main

import (
	"fmt"
	"net/http"
)

func (d *Database) loadNotes(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")

	if r.Method == "GET" {
		fmt.Print("options")
		return
	}

	fmt.Println("hi")
}
