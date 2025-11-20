import tkinter as tk
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

root = tk.Tk()
root.title("File Parser")
root.geometry("300x100")
btn = tk.Button(root, text="Select File", command=on_file_select)
btn.pack(pady=30)
root.mainloop()
