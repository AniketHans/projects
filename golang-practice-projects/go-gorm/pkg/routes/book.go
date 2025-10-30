package routes

import (
	"go-gorm/pkg/controller"

	"github.com/gorilla/mux"
)

func BookRouter(router *mux.Router){
	router.HandleFunc("/book", controller.CreateBook).Methods("POST")
	router.HandleFunc("/books", controller.GetAllBooks).Methods("GET")
	router.HandleFunc("/books/{bookid}",controller.GetBookByID).Methods("GET")
	router.HandleFunc("/books/{bookid}", controller.DeleteBook).Methods("DELETE")
	router.HandleFunc("/books/{bookid}", controller.UpdateBook).Methods("PUT")
}