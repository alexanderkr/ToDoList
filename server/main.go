package main

import (
    "fmt"
    "log"
    "net/http"
)

type Root struct{}
func (h Root) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello!")
}

type List struct{}
func (this List) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "I am a list")
}

func main() {
    http.Handle("/", Root{})
    http.Handle("/list", List{})
    err := http.ListenAndServe("0.0.0.0:4000", nil)
    if err != nil {
        log.Fatal(err)
    }
}
