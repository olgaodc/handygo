# Get the current directory
$directoryPath = Get-Location

# Get all .js files in the current directory and its subdirectories
Get-ChildItem -Path $directoryPath -Recurse -Filter *.js | ForEach-Object {
    $oldFile = $_.FullName
    $newFile = [System.IO.Path]::ChangeExtension($oldFile, ".ts")
    
    # Rename the file
    Rename-Item -Path $oldFile -NewName $newFile
    Write-Host "Renamed $oldFile to $newFile"
}

Write-Host "All .js files have been renamed to .ts"
