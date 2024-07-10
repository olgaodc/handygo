$excludeFolder = "node_modules"

# Get all files recursively except those in the excluded folder
$files = Get-ChildItem -Recurse | Where-Object { $_.FullName -notlike "*\$excludeFolder\*" }

# Iterate through each file and change line endings
foreach ($file in $files) {
    # Read the content of the file and replace CRLF with LF
    $content = Get-Content $file.FullName -Raw
    $contentFixed = $content -replace "`r`n", "`n"
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $contentFixed
}


