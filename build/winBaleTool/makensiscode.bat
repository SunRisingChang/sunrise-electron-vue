@echo off & setlocal EnableDelayedExpansion
@set DestFiles=%cd%\SetupScripts\app.nsh
del ".\SetupScripts\app.nsh"
cd../../
@set DestPath=%cd%\dist\electron\win-unpacked\
@set total=1

for /f  "tokens=*" %%a in ('dir /s/b/a-d %DestPath%') do (
@set /a total+=1
)
@set curr=0
@set tmpValue=1

for /f "delims=*" %%d in ('dir /a-d/b %DestPath%') do (
set /a curr+=
@echo Push !total!  >> %DestFiles%
@echo Push !curr!  >> %DestFiles%
@echo Call ExtractCallback >> %DestFiles%
@echo File "%DestPath%%%d" >> %DestFiles%
)

@set dstString=
for /f "delims=*" %%a in ('dir /s/ad/b %DestPath%') do (
@set foldername=%%a
@set "foldername=!foldername:%DestPath%=%dstString%!"
@echo SetOutPath "$INSTDIR\!foldername!" >> %DestFiles%
for /f "delims=*" %%c in ('dir /a-d/b %%a') do (
@set /a curr+=1
@echo Push !total!  >> %DestFiles%
@echo Push !curr!  >> %DestFiles%
@echo Call ExtractCallback >> %DestFiles%
@echo File "%%a\%%c"  >> %DestFiles%
@echo find file: %%c
)
)

@echo Push %total%  >> %DestFiles%
@echo Push %total%  >> %DestFiles%
@echo Call ExtractCallback >> %DestFiles%
