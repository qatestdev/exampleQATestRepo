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
import json
import xml.etree.ElementTree as ET
import yaml

from tkinter import filedialog, messagebox
try:
except ImportError:
    yaml = None

def parse_file_content(content, file_type):
    if file_type == 'json':
        return json.loads(content)
    elif file_type == 'xml':
        root = ET.fromstring(content)
        A = root.findtext('A')
        B = root.findtext('B')
        return {'A': A, 'B': B}
    elif file_type in ('yaml', 'yml'):
        if yaml is None:
            raise ImportError("PyYAML is not installed")
        return yaml.safe_load(content)
    else:
        raise ValueError('Unsupported file type')

def on_file_select():
    file_path = filedialog.askopenfilename(filetypes=[
        ("JSON files", "*.json"),
        ("XML files", "*.xml"),
        ("YAML files", "*.yaml;*.yml")
    ])
    if not file_path:
        return
    ext = file_path.split('.')[-1].lower()
    if ext == 'json':
        file_type = 'json'
    elif ext == 'xml':
        file_type = 'xml'
    elif ext in ('yaml', 'yml'):
        file_type = 'yaml'
    else:
        messagebox.showerror("Error", "Unsupported file type")
        return
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        data = parse_file_content(content, file_type)
        if data.get('A') is None or data.get('B') is None:
            messagebox.showerror("Error", "Fields A and B are required.")
            return
        if data['A'] == data['B']:
            messagebox.showinfo("Result", "Fields A and B are the same.")
        elif data['B'] > data['A']:
            messagebox.showinfo("Result", "Field B is greater than A.")
        else:
            messagebox.showinfo("Result", "Fields A and B are different.")
    except Exception:
        messagebox.showerror("Error", "Invalid file or format.")

def on_file_select_duplicated():
    file_path = filedialog.askopenfilename(filetypes=[
        ("JSON files", "*.json"),
        ("XML files", "*.xml"),
        ("YAML files", "*.yaml;*.yml")
    ])
    if not file_path:
        return
    ext = file_path.split('.')[-1].lower()
    if ext == 'json':
        file_type = 'json'
    elif ext == 'xml':
        file_type = 'xml'
    elif ext in ('yaml', 'yml'):
        file_type = 'yaml'
    else:
        messagebox.showerror("Error", "Unsupported file type")
        return
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        data = parse_file_content(content, file_type)
        if data.get('A') is None or data.get('B') is None:
            messagebox.showerror("Error", "Fields A and B are required.")
            return
        if data['A'] == data['B']:
            messagebox.showinfo("Result", "Fields A and B are the same.")
        elif data['B'] > data['A']:
            messagebox.showinfo("Result", "Field B is greater than A.")
        else:
            messagebox.showinfo("Result", "Fields A and B are different.")
    except Exception:
        messagebox.showerror("Error", "Invalid file or format.")

root = tk.Tk()
root.title("File Parser")
root.geometry("300x100")
btn = tk.Button(root, text="Select File", command=on_file_select)
btn.pack(pady=30)
root.mainloop()
