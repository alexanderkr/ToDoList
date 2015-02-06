package main

import (
    "./wiki"
    "net/http"
    "html/template"
)

func renderTemplate(w http.ResponseWriter, tmpl string, p *wiki.Page) {
    t, _ := template.ParseFiles(tmpl + ".html")
    t.Execute(w, p)
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/wiki/view/"):]
    p, err := wiki.LoadPage(title)
    if err != nil {
        http.Redirect(w, r, "/wiki/edit/" + title, http.StatusFound)
        return
    }
    renderTemplate(w, "view", p)
}

func editHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/wiki/edit/"):]
    p, err := wiki.LoadPage(title)
    if err != nil {
        p = &wiki.Page{Title: title}
    }
    renderTemplate(w, "edit", p)
}

func saveHandler(w http.ResponseWriter, r *http.Request) {
    title := r.URL.Path[len("/wiki/save/"):]
    body := r.FormValue("body")
    p := &wiki.Page{Title: title, Body: []byte(body)}
    p.Save()
    http.Redirect(w, r, "/wiki/view/"+title, http.StatusFound)
}

func main() {
    http.HandleFunc("/wiki/view/", viewHandler)
    http.HandleFunc("/wiki/edit/", editHandler)
    http.HandleFunc("/wiki/save/", saveHandler)
    http.ListenAndServe(":8080", nil)
}
