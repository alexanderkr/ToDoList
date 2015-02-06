package wiki

import (
    "io/ioutil"
)

type Page struct {
    Title string
    Body []byte
}

const content_dir = "assets/wiki"

func (p *Page) Save() error {
    filename := content_dir + "/" + p.Title + ".txt"
    return ioutil.WriteFile(filename, p.Body, 0600)
}

func LoadPage(title string) (*Page, error) {
    filename := content_dir + "/" + title + ".txt"
    body, err := ioutil.ReadFile(filename)
    if err != nil {
        return nil, err
    }
    return &Page{Title: title, Body: body}, nil
}
