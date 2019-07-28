@echo off

@call makensiscode.bat

@call makeskinzip.bat template1

".\NSIS\makensis.exe" /DINSTALL_WITH_NO_NSIS7Z=1 ".\SetupScripts\template1\template1_setup.nsi"

REM 调试模式，会打开新的控制台查看输出日志
REM ".\NSIS\makensisw.exe" /DINSTALL_WITH_NO_NSIS7Z=1 ".\SetupScripts\template1\template1_setup.nsi"
