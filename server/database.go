package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

type DatabaseInterface interface {
	start() error
	end()
	register(http.ResponseWriter, *http.Request)
}

type Database struct {
	db *sql.DB
}

func createTables() string {
	return `CREATE TABLE IF NOT EXISTS User (
		id INT PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(255),
		email VARCHAR(255),
		password VARCHAR(255)
	)`
}

func (d *Database) start() error {
	fmt.Println("Starting database...")

	db, err := sql.Open("mysql", "root:password@tcp(localhost)/test")

	if err != nil {
		return err
	}

	d.db = db

	// Creating table
	row, err := db.Query(createTables())
	row.Close()

	if err != nil {
		return err
	}

	fmt.Println("Table was created")

	//Recommended settings
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	if err != nil {
		return err
	}

	return nil
}

// Register function
func (d *Database) register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	if r.Method != "POST" {
		return
	}

	//Decode user data
	var user User
	decoder := json.NewDecoder(r.Body)
	decoder.Decode(&user)

	// Sanitize user data
	user.Username = strings.Trim(user.Username, " ")
	user.EmailAddress = strings.Trim(user.EmailAddress, " ")
	user.Password = strings.Trim(user.Password, " ")
	
	// Validating non-empty fields
	if user.Username  == "" || user.EmailAddress == "" || user.Password == "" {
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

func (d *Database) end() {
	fmt.Println("Database is getting closed...")
	d.db.Close()
}
