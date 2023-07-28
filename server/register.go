package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/Ara-O/Minim-React/models"
	"github.com/golang-jwt/jwt/v4"
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
	result, err := stmt.Exec(user.Username, user.EmailAddress, pw_hash)
	if err != nil {
		log.Fatal(err)
	}

	userId, err := result.LastInsertId()
	stmt.Close()

	//Creating token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(10000 * time.Minute)
	claims["userId"] = userId

	tokenString, err := token.SignedString([]byte("test"))

	if err != nil {
		log.Fatal("e", err)
	}


	fmt.Fprintf(w, tokenString)
	// Parse the token without verifying the signature
	// decodedToken, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
	// if err != nil {
	// 	log.Fatal("Error parsing token:", err)
	// 	return
	// }

	// // Access the claims data
	// claims, ok := decodedToken.Claims.(jwt.MapClaims)
	// if !ok {
	// 	log.Fatal("Error accessing claims")
	// 	return
	// }

	// // Extract the data from the claims
	// userID, ok := claims["userId"].(float64)
	// if !ok {
	// 	log.Fatal("Error extracting user ID")
	// 	return
	// }

	// // Do something with the extracted data
	// fmt.Println("User ID:", userID)

	// if err != nil {
	// 	log.Fatal(err)
	// }
}
