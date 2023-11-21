@echo off
SETLOCAL

SET /P PORT=Enter the port number your Node.js server uses: 

echo Finding processes listening on port %PORT%...
FOR /F "tokens=5" %%P IN ('netstat -ano ^| findstr /R /C:":%PORT% .* LISTENING"') DO (
    SET PID=%%P
)

IF DEFINED PID (
    echo Found process %PID% listening on port %PORT%, killing...
    taskkill /PID %PID% /F
    IF ERRORLEVEL 1 (
        echo Failed to kill process %PID%. Please close it manually.
        EXIT /B 1
    )
    echo Successfully killed process %PID%.
) ELSE (
    echo No process found listening on port %PORT%.
)

echo Starting Node.js server...
node server.js

ENDLOCAL
