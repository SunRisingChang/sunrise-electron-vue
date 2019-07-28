del ".\SetupScripts\app.7z"

rem ����app.7z
7z.exe a ".\SetupScripts\app.7z" ".\..\..\..\dist\electron\win-unpacked\*.*"

@set DestPath=%cd%\..\..\..\dist\electron\win-unpacked\
@echo off& setlocal EnableDelayedExpansion

for /f "delims=" %%a in ('dir /ad/b %DestPath%') do (
7z.exe a ".\SetupScripts\app.7z" ".\..\..\..\dist\electron\win-unpacked\%%a"
@echo "compressing .\..\..\..\dist\electron\win-unpacked\%%a"
)