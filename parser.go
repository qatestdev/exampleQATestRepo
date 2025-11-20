package main

import (
    "encoding/json"
    "encoding/xml"
    "errors"
    "fmt"
    "io/ioutil"
    "os"
    "path/filepath"
    "strings"

    "gopkg.in/yaml.v3"

    "github.com/sqweek/dialog"
)

type Data struct {
    A string `json:"A" xml:"A" yaml:"A"`
    B string `json:"B" xml:"B" yaml:"B"`
}

func parseFileContent(content []byte, fileType string) (Data, error) {
    var data Data
    switch fileType {
    case "json":
        err := json.Unmarshal(content, &data)
        return data, err
    case "xml":
        err := xml.Unmarshal(content, &data)
        return data, err
    case "yaml", "yml":
        err := yaml.Unmarshal(content, &data)
        return data, err
    default:
        return data, errors.New("unsupported file type")
    }
}

func main() {
    filePath, err := dialog.File().Filter("JSON files", "json").Filter("XML files", "xml").Filter("YAML files", "yaml", "yml").Title("Select File").Load()
    if err != nil {
        fmt.Println("No file selected or error:", err)
        return
    }
    ext := strings.ToLower(filepath.Ext(filePath))
    var fileType string
    switch ext {
    case ".json":
        fileType = "json"
    case ".xml":
        fileType = "xml"
    case ".yaml", ".yml":
        fileType = "yaml"
    default:
        fmt.Println("Unsupported file type")
        return
    }
    content, err := ioutil.ReadFile(filePath)
    if err != nil {
        fmt.Println("Error reading file:", err)
        return
    }
    data, err := parseFileContent(content, fileType)
    if err != nil {
        fmt.Println("Invalid file or format:", err)
        return
    }
    if data.A == "" || data.B == "" {
        fmt.Println("Fields A and B are required.")
        return
    }
    if data.A == data.B {
        fmt.Println("Fields A and B are the same.")
    } else if data.B > data.A {
        fmt.Println("Field B is greater than A.")
    } else {
        fmt.Println("Fields A and B are different.")
    }
}
