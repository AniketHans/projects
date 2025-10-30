package models

import (
	"fmt"
	"go-gorm/pkg/config"
	"log"

	"gorm.io/gorm"
)

var db *gorm.DB

type Book struct{
	gorm.Model //Model a basic GoLang struct which includes the following fields: ID, CreatedAt, UpdatedAt, DeletedAt It may be embedded into your model or you may build your own model without it
	Name string `gorm:"column:name" json:"name"`
	Author string `gorm:"column:author" json:"author"`
	Publication string `gorm:"column:publication" json:"publication"`
}	

func init(){ 
	// This function will connect with the database at the time of code execution and create the book table in the db
	config.Connect()
	db = config.GetDB()
	db.AutoMigrate(&Book{})
}

func (b *Book) CreateBook() (*Book,error){
	t :=db.Create(&b)
	if t.Error!=nil{
		return nil,t.Error
	}
	return b,nil
}

func GetAllBook() []Book{
	var books []Book
	db.Find(&books)
	return books
}

func GetBookById(id int64) (*Book, *gorm.DB){
	var book Book
	db := db.Where("ID=?",id).Find(&book)
	return &book, db
}

func DeleteBook(id int64) *Book{
	book := &Book{}
	t := db.First(book, id)
	if t.Error!=nil{
		panic(fmt.Sprintf("Unable to find the record with id %v",id))
	}
	db.Delete(book)
	return book
}

func (b *Book) UpdateBook(id int64) (*Book,error){
	t :=db.Model(&Book{}).Where("ID=?",id).Updates(Book{Name: b.Name, Author: b.Author, Publication: b.Publication})
	if t.Error !=nil{
		log.Fatal(t.Error)
		return nil,t.Error
	}
	return b,nil
}

func UpdateBookByMap(id int64, updatedBook map[string]interface{}) (error){
	t :=db.Model(&Book{}).Where("ID=?",id).Updates(updatedBook)
	if t.Error !=nil{
		log.Fatal(t.Error)
		return t.Error
	}
	return nil
}