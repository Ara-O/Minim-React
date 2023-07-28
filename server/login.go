package main

import (
	"fmt"
	"net/http"
)

func (d *Database) login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")
	if r.Method == "POST" {

		fmt.Println("should be logini in")
	}
}
