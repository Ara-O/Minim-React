package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type DatabaseInterface interface {
	start() error
	end()
	register(http.ResponseWriter, *http.Request)
	login(http.ResponseWriter, *http.Request)
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

func (d *Database) end() {
	fmt.Println("Database is getting closed...")
	d.db.Close()
}
