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

type UserData struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (d *Database) login(w http.ResponseWriter, r *http.Request) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method != "POST" {
		return
	}

	var user UserData
	var userFromDatabase models.RegisteredUserData

	//Takes data from front end
	json.NewDecoder(r.Body).Decode(&user)
	user.Email = strings.ToLower(strings.Trim(user.Email, " "))
	user.Password = strings.Trim(user.Password, " ")

	if user.Email == "" {
		w.WriteHeader(422)
		fmt.Fprint(w, "Missing information")
		return
	}

	err = d.db.QueryRow("SELECT * FROM Users WHERE email = ?", user.Email).Scan(&userFromDatabase.Id, &userFromDatabase.Username, &userFromDatabase.Email, &userFromDatabase.Password)

	if err != nil {
		w.WriteHeader(404)
		fmt.Fprint(w, "No account was found with this email address")
		return
	}

	//Check password
	err = bcrypt.CompareHashAndPassword([]byte(userFromDatabase.Password), []byte(user.Password))

	if err != nil {
		w.WriteHeader(404)
		fmt.Fprint(w, "Password does not match")
		return
	}

	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(900000 * time.Minute)
	claims["userId"] = userFromDatabase.Id

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	w.WriteHeader(200)
	fmt.Fprint(w, tokenString)
}
