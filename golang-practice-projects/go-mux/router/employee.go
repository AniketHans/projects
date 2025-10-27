package router

import (
	"go-mux-proj/service"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

func EmployeeRouter(r *mux.Router, mongoCollection *mongo.Collection){

	/*
		We could have also created a subrouter
		employeeSubRouter := r.PathPrefix("/employee").Subrouter()
	*/

	// creating employee service
	employeeService := service.EmployeeService{MongoCollection: mongoCollection}

	//routes
	r.HandleFunc("/employee", employeeService.CreateEmployee).Methods(http.MethodPost)
	r.HandleFunc("/employee/{id}",employeeService.GetEmployeeByID).Methods(http.MethodGet)
	r.HandleFunc("/employee",employeeService.GetAllEmployee).Methods(http.MethodGet)
	r.HandleFunc("/employee/{id}", employeeService.UpdateEmployeeByID).Methods(http.MethodPut)
	r.HandleFunc("/employee/{id}", employeeService.DeleteEmployeeByID).Methods(http.MethodDelete)
	r.HandleFunc("/employee", employeeService.DeleteAllTheEmployees).Methods(http.MethodDelete)
}