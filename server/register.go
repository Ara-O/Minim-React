package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Username             string `json:"username"`
	EmailAddress         string `json:"emailAddress"`
	Password             string `json:"password"`
	PasswordConfirmation string `json:"passwordConfirmation"`
}

func register(w http.ResponseWriter, r *http.Request) {
	fmt.Println("User is registering", r.Method)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	var user User
	decoder := json.NewDecoder(r.Body)

	// Structs are pass by value, and it is being
	//passed into this function, so we want to alter the actual user
	decoder.Decode(&user)
	fmt.Println(user.EmailAddress)
}
