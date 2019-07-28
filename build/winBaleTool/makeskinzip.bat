@echo off
del ".\SetupScripts\%1\skin.zip"

7z.exe a ".\SetupScripts\%1\skin.zip" ".\SetupScripts\%1\skin\*.*"

@set DestPath=%cd%\SetupScripts\%1\skin\
@echo off & setlocal EnableDelayedExpansion

for /f "delims=" %%a in ('dir /ad/b %DestPath%') do (
7z.exe a ".\SetupScripts\%1\skin.zip" ".\SetupScripts\%1\skin\%%a"
@echo "compressing .\SetupScripts\%1\skin\%%a"
)