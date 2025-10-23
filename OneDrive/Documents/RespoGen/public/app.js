// Global variables
let snippets = [];
let uploadedFiles = [];
let uploadedZip = null;

// DOM elements
const fileInput = document.getElementById('fileInput');
const zipInput = document.getElementById('zipInput');
const repoNameInput = document.getElementById('repoName');
const descriptionInput = document.getElementById('description');
const templateSelect = document.getElementById('template');
const generateBtn = document.getElementById('generateBtn');
const statusDiv = document.getElementById('status');
const fileListDiv = document.getElementById('fileList');
const zipStatusDiv = document.getElementById('zipStatus');

// Event listeners
fileInput.addEventListener('change', handleFileUpload);
zipInput.addEventListener('change', handleZipUpload);
generateBtn.addEventListener('click', generateZip);

// File upload handling
function handleFileUpload(event) {
    uploadedFiles = Array.from(event.target.files);
    updateFileList();
}

function updateFileList() {
    if (uploadedFiles.length === 0) {
        fileListDiv.innerHTML = '';
        return;
    }
    
    fileListDiv.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background: rgba(100, 255, 218, 0.1); border-radius: 8px;">
            <strong>📁 ${uploadedFiles.length} file(s) selected:</strong>
            <ul style="margin: 0.5rem 0 0 1rem; color: #94a3b8;">
                ${uploadedFiles.map(file => `<li>${file.name} (${(file.size / 1024).toFixed(1)} KB)</li>`).join('')}
            </ul>
        </div>
    `;
}

// ZIP upload handling
function handleZipUpload(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedZip = file;
        zipStatusDiv.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(100, 255, 218, 0.1); border-radius: 8px;">
                <strong>📦 ZIP file selected:</strong> ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
        `;
    } else {
        uploadedZip = null;
        zipStatusDiv.innerHTML = '';
    }
}

// Snippet management functions
function addSnippet() {
    const container = document.getElementById('snippetContainer');
    const snippetItem = document.createElement('div');
    snippetItem.className = 'snippet-item';
    snippetItem.innerHTML = `
        <input type="text" placeholder="Filename (e.g., main.js)" class="snippet-filename" />
        <textarea placeholder="Paste your code here..." class="snippet-content"></textarea>
        <button type="button" onclick="removeSnippet(this)">Remove</button>
    `;
    container.appendChild(snippetItem);
}

function removeSnippet(button) {
    button.parentElement.remove();
}

// Generate repository function
async function generateZip() {
    const formData = new FormData();
    
    // Add uploaded files
    uploadedFiles.forEach(file => {
        formData.append('files', file);
    });
    
    // Add ZIP if selected (server '/generate' accepts multipart 'zip')
    if (uploadedZip) {
        formData.append('zip', uploadedZip);
    }
    
    // Collect snippets into an array and send as JSON string (server expects 'snippets')
    const snippetsData = [];
    const snippetItems = document.querySelectorAll('.snippet-item');
    snippetItems.forEach((item) => {
        const filename = item.querySelector('.snippet-filename').value.trim();
        const content = item.querySelector('.snippet-content').value.trim();
        if (filename && content) {
            snippetsData.push({ filename, content });
        }
    });
    if (snippetsData.length > 0) {
        formData.append('snippets', JSON.stringify(snippetsData));
    }
    
    // Add repository settings
    const repoName = repoNameInput.value.trim() || 'my-project';
    const description = descriptionInput.value.trim() || '';
    const template = templateSelect.value;
    
    formData.append('repoName', repoName);
    formData.append('description', description);
    formData.append('template', template);
    
    try {
        // Update status
        statusDiv.innerHTML = `
            <div class="loading">
                🔄 Generating GitHub-ready repository... This may take a moment.
            </div>
        `;
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        const response = await fetch('/generate', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server error: ${errorText}`);
        }
        
        // Download the generated ZIP
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${repoName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Success message
        statusDiv.innerHTML = `
            <div class="success">
                ✅ GitHub-ready repository "${repoName}" generated and downloaded successfully!<br>
                <small>The ZIP contains a complete project structure ready for GitHub.</small>
            </div>
        `;
        
    } catch (error) {
        console.error('Error:', error);
        statusDiv.innerHTML = `
            <div class="error">
                ❌ Error generating repository: ${error.message}<br>
                <small>Please check your inputs and try again.</small>
            </div>
        `;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate GitHub-Ready Repository';
    }
}

generateBtn.addEventListener('click', generateZip);