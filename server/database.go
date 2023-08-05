package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/Ara-O/Minim-React/utils"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type DatabaseInterface interface {
	start() error
	end()
	register(http.ResponseWriter, *http.Request)
	login(http.ResponseWriter, *http.Request)
	saveNote(http.ResponseWriter, *http.Request)
	loadNotes(http.ResponseWriter, *http.Request)
	deleteNote(http.ResponseWriter, *http.Request)
	generateIdeaVisualization(http.ResponseWriter, *http.Request)
	generateTestQuestions(http.ResponseWriter, *http.Request)
	generateNoteSummary(http.ResponseWriter, *http.Request)
}

type Database struct {
	db *sql.DB
}

func (d *Database) start() error {
	godotenv.Load()
	fmt.Println("Starting database...")

	key := os.Getenv("MYSQL_CONNECTION_STRING")
	db, err := sql.Open("mysql", key)

	if err != nil {
		return err
	}

	//Recommended settings
	// db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	d.db = db

	// Creating table
	_, err = db.Exec(utils.CreateUserTable())
	if err != nil {
		return err
	}
	_, err = db.Exec(utils.CreateNoteTable())
	if err != nil {
		return err
	}

	fmt.Println("Table was created")

	if err != nil {
		return err
	}

	return nil
}

func (d *Database) end() {
	fmt.Println("Database is getting closed...")
	d.db.Close()
}
