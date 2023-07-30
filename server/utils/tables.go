package utils

func CreateUserTable() string {
	return `CREATE TABLE IF NOT EXISTS User (
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
		lastUpdated INT,
		noteData TEXT,
		noteId VARCHAR(255),
		noteSnippet VARCHAR(100),
		noteTitle VARCHAR(255),
		FOREIGN KEY (userId) REFERENCES User(id)
	);`
}
