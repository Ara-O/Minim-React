package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/Ara-O/Minim-React/models"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

// Register function
func (d *Database) register(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")

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
		return
	}

	var existingUser models.RegisteredUserData
	//Check if user already exists
	row := d.db.QueryRow("SELECT * FROM Users WHERE email = ?", user.EmailAddress)
	if err := row.Scan(&existingUser.Id, &existingUser.Username, &existingUser.Email, &existingUser.Password); err == nil {
		w.WriteHeader(409)
		fmt.Println("A user already exists")
		fmt.Fprintf(w, "A user with this email address already exists")
		return
	}

	// Hashing password
	pw_hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		fmt.Println(err)
	}

	stmt, err := d.db.Prepare("INSERT INTO User(username, email, password) VALUES(?, ?, ?)")
	result, err := stmt.Exec(user.Username, user.EmailAddress, pw_hash)

	if err != nil {
		fmt.Println(err)
	}
	defer stmt.Close()

	userId, err := result.LastInsertId()

	//Creating token
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(900000 * time.Minute)
	claims["userId"] = userId

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		log.Fatal("e", err)
	}

	//Sending the token sring

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
