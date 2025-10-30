package main

import (
	"fmt"
	"go-gorm/pkg/routes"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	routes.BookRouter(r)
	fmt.Println("Listening at PORT",9090)
	http.ListenAndServe(":9090",r)
	
}