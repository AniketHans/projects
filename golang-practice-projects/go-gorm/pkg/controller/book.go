package controller

import (
	"encoding/json"
	"fmt"
	"go-gorm/pkg/models"
	"go-gorm/pkg/utils"
	"io"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetAllBooks(w http.ResponseWriter, r *http.Request){
	newBooks := models.GetAllBook()
	res, _ := json.Marshal(newBooks)
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetBookByID(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
	bookId := vars["bookid"]

	ID, err := strconv.ParseInt(bookId,0,0)
	if err!=nil{
		log.Println(err)
		return
	}
	bookDetails, _ := models.GetBookById(ID)
	res, _ := json.Marshal(bookDetails)
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
func CreateBook(w http.ResponseWriter, r *http.Request){
	newBook := &models.Book{}
	utils.ParseBody(r, newBook)
	fmt.Println(newBook)
	b, _ := newBook.CreateBook()
	res, _ := json.Marshal(b)
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteBook(w http.ResponseWriter, r *http.Request){
	vars := mux.Vars(r)
	bookId := vars["bookid"]
	Id, err := strconv.ParseInt(bookId,0,0)
	if err!=nil{
		log.Fatal(err)
		return
	}
	book := models.DeleteBook(Id)
	res, _ := json.Marshal(book)
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}

func UpdateBook(w http.ResponseWriter, r *http.Request){
	var updatedBooksData = make(map[string]interface{})
	vars := mux.Vars(r)
	bookId := vars["bookid"]
	Id, err := strconv.ParseInt(bookId,0,0)
	if err!=nil{
		log.Fatal(err)
		return
	}
	body, err := io.ReadAll(r.Body)
	if err!=nil{
		panic(err)
	}
	err = json.Unmarshal([]byte(body),&updatedBooksData)
	if err!=nil{
		panic(err)
	}

	err = models.UpdateBookByMap(Id, updatedBooksData)
	if err!=nil{
		panic(err)
	}
	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Book updated"))
}