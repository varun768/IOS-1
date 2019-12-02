# UI2019


THis is my first project

clone the barnch (git clone url)
add remote repositories into your local (git remote add origin url)
git cofig --global user.name "varun"
git cofig --global user.email "varun"
git cofig --global user.password "varun"

steps 1: what are the files im changed (git status)
step 2: what are the things i have been changed in the files(git diff fileName)
step 3: what are the files i need to commit (git add fileName)
step 4: i need to add those things into git 
step 5: i need to give a commit msg (git commit -m "msg")
step 6: git pull remote repository  (git pull origin master)
step 7: any merge conflicts need to resolve (manullay)
step 8: push our code (git push origin master)
step 9: raise PR(pull request) 


if i want to revert my changes before adding into git git checkout fileName
after adding if i want to reset
git reset HEAD fileName
git checkout fileName

creating a branch i prefer git checkout -b branchName
if you want to checkout existing branch git checkout branchName


git fetch which will gets all the things in the remote repository to local

git stash will gives a local commit and we can revert those commits after getting the data from remote

and git stash pop which will gives you back those local commits
