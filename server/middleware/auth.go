package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*, Authorization")
		if r.Method == "OPTIONS" {
			return
		}

		authToken := r.Header.Get("Authorization")

		if authToken == "" {
			http.Error(w, "No valid auth token", http.StatusNotFound)
			return
		}

		token := strings.Split(authToken, " ")[1]

		if strings.TrimSpace(token) == "" {
			http.Error(w, "No valid auth token", http.StatusNotFound)
			return
		}

		decodedToken, _, err := new(jwt.Parser).ParseUnverified(token, jwt.MapClaims{})
		if err != nil {
			fmt.Println("Error parsing token:", err)
			http.Error(w, "Error parsing token", http.StatusNotFound)
			return
		}

		// Access the claims data
		claims, ok := decodedToken.Claims.(jwt.MapClaims)
		if !ok {
			fmt.Println("Error accessing claims")
			return
		}

		//TODO: Validate expiry date
		userId := claims["userId"].(float64)

		//Storing the user id in a context
		//This is the request context, compared to the background context

		ctx := r.Context()
		ctx = context.WithValue(ctx, "id", userId)
		r = r.WithContext(ctx)

		next(w, r)
	}
}
