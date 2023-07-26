package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/Ara-O/Minim-React/models"
	"golang.org/x/crypto/bcrypt"
)

// Register function
func (d *Database) register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method != "POST" {
		return
	}

	//Decode user data
	var user models.User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&user)

	// Sanitize user data
	user.Username = strings.Trim(user.Username, " ")
	user.EmailAddress = strings.ToLower(strings.Trim(user.EmailAddress, " "))
	user.Password = strings.Trim(user.Password, " ")

	// Validating non-empty fields
	if user.Username == "" || user.EmailAddress == "" || user.Password == "" {
		w.WriteHeader(422)
		fmt.Fprintf(w, "Information is missing, please try again")
	}

	stmt, err := d.db.Prepare("INSERT INTO User(username, email, password) VALUES(?, ?, ?)")

	if err != nil {
		log.Fatal(err)
	}

	// Hashing password
	pw_hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}

	//Insert into table
	stmt.QueryRow(user.Username, user.EmailAddress, pw_hash)
	stmt.Close()

	if err != nil {
		log.Fatal(err)
	}
}
