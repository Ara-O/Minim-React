package models

type User struct {
	Username             string `json:"username"`
	EmailAddress         string `json:"emailAddress"`
	Password             string `json:"password"`
	PasswordConfirmation string `json:"passwordConfirmation"`
}
