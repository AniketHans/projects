package service

import (
	"encoding/json"
	"fmt"
	"go-mux-proj/db"
	"go-mux-proj/model"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

type EmployeeService struct{
	MongoCollection *mongo.Collection
}

type Response struct {
	Message interface{} `json:"message,omitempty"`
	Error   string       `json:"error,omitempty"`
}

func (s *EmployeeService) CreateEmployee(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	var emp model.Employee

	err := json.NewDecoder(r.Body).Decode(&emp)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		log.Println("invalid body")
		res.Error= err.Error()
		return
	}

	// assign new emp id
	emp.EmployeeID = uuid.NewString()

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}
	insertId, err := repo.InsertEmployee(&emp)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Insert Error:",err)
		res.Error = err.Error()
		return 
	}

	res.Message = emp.EmployeeID
	w.WriteHeader(http.StatusOK)
	log.Println("Employee inserted with id", insertId, emp)
}

func (s *EmployeeService) GetEmployeeByID(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	//get employee id
	empID := mux.Vars(r)["id"]
	log.Println("Employee Id", empID)

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}

	emp, err := repo.FindEmployeeByID(empID)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Wrong Employee ID:",err)
		res.Error = err.Error()
		return 
	}

	res.Message=emp
	w.WriteHeader(http.StatusOK)
}
func (s *EmployeeService) GetAllEmployee(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}

	emps, err := repo.FindAllEmployees()
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Unable to fetch employees",err)
		res.Error = err.Error()
		return 
	}

	res.Message=emps
	w.WriteHeader(http.StatusOK)
	
}
func (s *EmployeeService) UpdateEmployeeByID(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	//get employee id
	empID := mux.Vars(r)["id"]
	log.Println("Employee Id", empID)

	//Updated employee data

	var emp model.Employee
	emp.EmployeeID = empID

	err := json.NewDecoder(r.Body).Decode(&emp)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		log.Println("invalid body")
		res.Error= err.Error()
		return
	}

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}

	updatedRecords, err := repo.UpdateEmployeeById(empID, &emp)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Unable to update",err)
		res.Error = err.Error()
		return 
	}
	res.Message= fmt.Sprintf("The number of updated records: %v", updatedRecords)
	w.WriteHeader(http.StatusOK)
}
func (s *EmployeeService) DeleteEmployeeByID(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	//get employee id
	empID := mux.Vars(r)["id"]
	log.Println("Employee Id", empID)

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}

	deletedRecords, err := repo.DeleteEmployeeById(empID)
	if err!=nil{
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Wrong Employee ID:",err)
		res.Error = err.Error()
		return 
	}

	res.Message=fmt.Sprintf("The number of deleted records: %v", deletedRecords)
	w.WriteHeader(http.StatusOK)
}

func (s *EmployeeService) DeleteAllTheEmployees(w http.ResponseWriter, r *http.Request){
	w.Header().Add("Content-Type", "application/json")

	res := &Response{}
	defer json.NewEncoder(w).Encode(res)

	repo := db.EmployeeRepo{MongoCollection: s.MongoCollection}

	deletedRecords, err := repo.DeleteAllTheEmployees()
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		log.Println("Unable to delete employees",err)
		res.Error = err.Error()
		return
	}

	res.Message=fmt.Sprintf("The number of deleted records: %v", deletedRecords)
	w.WriteHeader(http.StatusOK)
	
}
