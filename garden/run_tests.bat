@echo off
echo Starting tests...

:: Run npm test and suppress command output
npm test > nul 2>&1

echo Tests finished.
