package utils

func CreateUserTable() string {
	return `CREATE TABLE IF NOT EXISTS Users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(255),
		email VARCHAR(255),
		password VARCHAR(255)
	);
	`
}

func CreateNoteTable() string {
	return `CREATE TABLE IF NOT EXISTS Notes (
		userId INT,
		lastUpdated BIGINT,
		noteData TEXT,
		noteId VARCHAR(255) PRIMARY KEY,
		noteSnippet VARCHAR(100),
		noteTitle VARCHAR(255),
		FOREIGN KEY (userId) REFERENCES User(id)
	);`
}
