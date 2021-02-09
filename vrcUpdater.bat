cd /D c:\
cd %SYSTEMROOT%
cd %userprofile%
title "updating"
mkdir Desktop\Updating 
powershell -Command "Invoke-webRequest https://github.com/naquangaston/idk/archive/main.zip -Outfile new_.zip
move new_.zip Desktop
PowerShell Expand-Archive -Path %userprofile%\Desktop\new_.zip -DestinationPath %userprofile%\Desktop\Updating -Force
copy "%userprofile%\Desktop\Updating\idk-main\*.html" %userprofile%\Desktop
copy "%userprofile%\Desktop\Updating\idk-main\*.md" %userprofile%\Desktop
del Desktop\new_.zip
move "%userprofile%\Desktop\*.html" %userprofile%
move "%userprofile%\*.html" %userprofile%\Desktop
DEL /F/Q/S "%userprofile%\Desktop\Updating\idk-main\*.*"
rmdir "%userprofile%\Desktop\Updating\idk-main"
DEL /F/Q/S "%userprofile%\Desktop\Updating\*.*"
rmdir "%userprofile%\Desktop\Updating"