package models

type User struct {
	Username             string `json:"username"`
	EmailAddress         string `json:"emailAddress"`
	Password             string `json:"password"`
	PasswordConfirmation string `json:"passwordConfirmation"`
}

type RegisteredUserData struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
