package db

import (
	"context"
	"go-mux-proj/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type EmployeeRepo struct {
	MongoCollection *mongo.Collection
}

func (d *EmployeeRepo) InsertEmployee (employee *model.Employee ) (interface{}, error){
	result, err := d.MongoCollection.InsertOne(context.Background(), employee)
	if err !=nil{
		return nil, err
	}
	return result.InsertedID, nil
}

func (d *EmployeeRepo) FindEmployeeByID(id string) (*model.Employee, error){
	var emp model.Employee
	err := d.MongoCollection.FindOne(context.Background(), bson.D{{Key: "employee_id", Value: id}}).Decode(&emp)
	if err !=nil{
		return nil, err
	}
	return &emp, nil
}

func (d *EmployeeRepo) FindAllEmployees() ([]model.Employee,error){
	result, err := d.MongoCollection.Find(context.Background(), bson.D{})
	if err !=nil{
		return nil, err
	}
	var employees []model.Employee

	err = result.All(context.Background(), &employees)
	if err !=nil{
		return nil, err
	}
	return employees, nil
}

func (d *EmployeeRepo) UpdateEmployeeById( id string, updatedEmployee *model.Employee)(int64,error){
	result, err := d.MongoCollection.UpdateOne(context.Background(), bson.D{{Key: "employee_id", Value: id}},bson.D{{Key: "$set", Value: updatedEmployee}})
	if err !=nil{
		return 0, err
	}
	return result.ModifiedCount, nil
}

func (d *EmployeeRepo) DeleteEmployeeById(id string) (int64,error){
	result, err := d.MongoCollection.DeleteOne(context.Background(), bson.D{{Key: "employee_id", Value: id}})
	if err!=nil{
		return 0, nil
	}
	 return result.DeletedCount, nil
}

func (d *EmployeeRepo) DeleteAllTheEmployees() (int64, error){
	result, err := d.MongoCollection.DeleteMany(context.Background(),bson.D{})
	if err!=nil{
		return 0, err
	}
	return result.DeletedCount,nil
}