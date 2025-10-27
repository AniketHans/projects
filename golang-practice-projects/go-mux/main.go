package main

import (
	"context"
	"go-mux-proj/router"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var mongoClient *mongo.Client

func init(){
	// loading the env variables

	err := godotenv.Load()
	if err!=nil{
		log.Fatal("Error loading the file", err)
	}
	log.Print("Env file loaded")

	//create mongo connection
	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err!=nil{
		log.Fatal("Connection Error", err)
	}

	err = mongoClient.Ping(context.Background(), readpref.Primary())
	if err!=nil{
		log.Fatal("Ping failed", err)
	}
	log.Println("mongo connected")
}
func main() {
	// close the mongo collection
	defer mongoClient.Disconnect(context.Background())

	//assigning collection and database
	collection := mongoClient.Database(os.Getenv("DB_NAME")).Collection(os.Getenv("COLLECTION_NAME"))

	// creating the router
	r := mux.NewRouter()

	// attaching the employeeRouter
	router.EmployeeRouter(r,collection)

	// healthcheck
	r.HandleFunc("/health", healthHandler).Methods(http.MethodGet)
	log.Println("The server is running at PORT 4578")
	http.ListenAndServe(":4578",r)

}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("heathHandler")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Running...."))
}