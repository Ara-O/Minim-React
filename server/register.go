package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("User is registering", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	decoder := json.NewDecoder(r.Body)
	fmt.Println(decoder)
}
