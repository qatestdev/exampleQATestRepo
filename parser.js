document.getElementById('jsonFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.A === undefined || data.B === undefined) {
                alert('Fields A and B are required.');
                return;
            }
            if (data.A === data.B) {
                alert('Fields A and B are the same.');
            } else if (data.B > data.A) {
                alert('Field B is greater than A.');
            } else {
                alert('Fields A and B are different.');
            }
        } catch (err) {
            alert('Invalid JSON file.');
        }
    };
    reader.readAsText(file);
});

document.getElementById('jsonFileInput').setAttribute('accept', '.json,.xml,.yaml,.yml');

function parseFileContent(content, fileType) {
    if (fileType === 'json') {
        return JSON.parse(content);
    } else if (fileType === 'xml') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(content, 'application/xml');
        const A = xmlDoc.getElementsByTagName('A')[0]?.textContent;
        const B = xmlDoc.getElementsByTagName('B')[0]?.textContent;
        return { A, B };
    } else if (fileType === 'yaml' || fileType === 'yml') {
        // Requires js-yaml library
        return jsyaml.load(content);
    }
    throw new Error('Unsupported file type');
}

document.getElementById('jsonFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const ext = file.name.split('.').pop().toLowerCase();
            let fileType;
            if (ext === 'json') fileType = 'json';
            else if (ext === 'xml') fileType = 'xml';
            else if (ext === 'yaml' || ext === 'yml') fileType = 'yaml';
            else throw new Error('Unsupported file type');

            const data = parseFileContent(e.target.result, fileType);

            if (data.A === undefined || data.B === undefined) {
                alert('Fields A and B are required.');
                return;
            }
            if (data.A === data.B) {
                alert('Fields A and B are the same.');
            } else if (data.B > data.A) {
                alert('Field B is greater than A.');
            } else {
                alert('Fields A and B are different.');
            }
        } catch (err) {
            alert('Invalid file or format.');
        }
    };
    reader.readAsText(file);
});
