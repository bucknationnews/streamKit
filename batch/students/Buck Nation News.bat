@ECHO off
IF EXIST "C:\Program Files\VideoLAN\VLC\" set vlc64=true & set vlc=true
IF EXIST "C:\Program Files (x86)\VideoLAN\VLC\" set vlc32=true & set vlc=true
IF EXIST "C:\Program Files (x86)\TechyGeeksHome.co.uk\VLC Player 2.2.2\" set vlcmsi=true & set vlc=true

IF DEFINED vlc64 echo start /d "C:\Program Files\VideoLAN\VLC\" vlc.exe udp://@239.1.1.46:1234/ > %UserProfile%\Desktop\Buck^ Nation^ News.bat
IF DEFINED vlc32 echo start /d "C:\Program Files (x86)\VideoLAN\VLC\" vlc.exe udp://@239.1.1.46:1234/ > %UserProfile%\Desktop\Buck^ Nation^ News.bat
IF DEFINED vlcmsi echo start /d "C:\Program Files (x86)\TechyGeeksHome.co.uk\VLC Player 2.2.2\" vlc.exe udp://@239.1.1.46:1234/ > %UserProfile%\Desktop\Buck^ Nation^ News.bat
IF DEFINED vlc32 echo We detected that you have VLC Media Player (32 bit) installed. & echo. & echo A shortcut to the BNN Live Stream has been placed on your desktop. It's named "Buck Nation News Live Stream." You can click that to launch the stream. & echo. & echo Please let Ms. Sullins or Hampton know if you have any problems!
IF DEFINED vlc64 echo We detected that you have VLC Media Player (64 bit) installed. & echo. & echo A shortcut to the BNN Live Stream has been placed on your desktop. It's named "Buck Nation News Live Stream." You can click that to launch the stream. & echo. & echo Please let Ms. Sullins or Hampton know if you have any problems!
IF DEFINED vlcmsi echo We detected that you have VLC Media Player 2.2.2 (via MSI GPO) installed. & echo A shortcut to the BNN Live Stream has been placed on your desktop. It's named "Buck Nation News Live Stream." You can click that to launch the stream. & echo. & echo Please let Ms. Sullins or Hampton know if you have any problems!
IF NOT DEFINED vlc echo You don't have VLC Media Player. Please have Ms. Sullins or a broadcasting student come install VLC on your computer.
echo.
pause
