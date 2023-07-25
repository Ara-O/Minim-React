package main

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type DatabaseInterface interface {
	start() error
}

type Database struct {
}

func (d *Database) start() error {
	fmt.Println("Starting database")

	db, err := sql.Open("mysql", "root:password@tcp(localhost)/test")

	if err != nil {
		log.Fatal(err)
	}

	//Closing the database if necessary
	defer db.Close()

	//Recommended settings
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	rows, err := db.Query(`CREATE TABLE IF NOT EXISTS testtable(
			name VARCHAR(255)
	);`)

	fmt.Println(rows)

	if err != nil {
		log.Fatal(err)
	}

	return nil
}
