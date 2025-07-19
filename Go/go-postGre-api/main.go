package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

type Scheme struct {
	SchemeCode  string
	Name        string
	Overview    string
	Benefits    string
	Eligibility string
	HowToAvail  string
}

// Global DB connection
var db *sqlx.DB

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalln("Error loading .env file")
	}

	// environment variables घ्या
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=require",
		dbHost, dbPort, dbUser, dbPass, dbName)

	db, err = sqlx.Connect("postgres", dsn)
	if err != nil {
		log.Fatalln("DB Connection Failed:", err)
	}
	if err != nil {
		log.Fatalln("DB connection error:", err)
	}

	// Define routes
	mux := http.NewServeMux()
	mux.HandleFunc("/activities", getActivitiesJSON)
	mux.HandleFunc("/government-schemes", getGovernmentSchemesJSON)

	origins := []string{"http://localhost:3000"}
	if os.Getenv("ENV") == "production" {
		origins = append(origins, "https://react-learning-wheat-pi.vercel.app/")
	}
	handler := cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}).Handler(mux)

	log.Println("Server listening on :8081")
	log.Fatal(http.ListenAndServe(":8081", handler))
}

// GET /activities?lang=en
func getActivitiesJSON(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		lang = "en"
	}

	var jsonData []byte
	err := db.Get(&jsonData, "SELECT get_home_activities_json($1)", lang)
	if err != nil {
		http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}

func getGovernmentSchemesJSON(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		lang = "en"
	}
	rows, err := db.Query("SELECT * FROM get_government_schemes_by_lang($1)", lang)

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var schemes []Scheme
	for rows.Next() {
		var s Scheme
		err := rows.Scan(
			&s.SchemeCode,
			&s.Name,
			&s.Overview,
			&s.Benefits,
			&s.Eligibility,
			&s.HowToAvail,
		)
		if err != nil {
			log.Fatal(err)
		}
		schemes = append(schemes, s)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(schemes)
}
