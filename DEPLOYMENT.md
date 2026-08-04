# Publishing the Website on GitHub Pages

## Your two URLs

Repository page:

`https://github.com/PritamY2K/Chattopadhyay.github.io`

Git clone address:

`https://github.com/PritamY2K/Chattopadhyay.github.io.git`

Public website:

`https://pritamy2k.github.io/Chattopadhyay.github.io/`

The `.git` address is used by Git software to clone or push the repository. Visitors should use the public website address.

## Browser upload method

1. Sign in to GitHub and open `PritamY2K/Chattopadhyay.github.io`.
2. Click **Add file**, then **Upload files**.
3. Extract the ZIP package on your computer.
4. Open the extracted `Chattopadhyay.github.io` folder.
5. Select all files and folders inside it. Do not upload only the outer folder.
6. Confirm that `index.html` and the `assets` folder appear in the upload list.
7. Use the commit message `Publish personal academic website`.
8. Click **Commit changes**.

## Enable GitHub Pages

1. Open the repository's **Settings**.
2. Select **Pages** from the left sidebar.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main**.
5. Select folder **/(root)**.
6. Click **Save**.
7. Wait for GitHub to complete the first deployment.
8. Open `https://pritamy2k.github.io/Chattopadhyay.github.io/`.

## Command-line method

From PowerShell inside the extracted website folder:

```powershell
git init
git branch -M main
git add .
git commit -m "Publish personal academic website"
git remote add origin https://github.com/PritamY2K/Chattopadhyay.github.io.git
git push -u origin main
```

You may also run `publish_to_github.ps1` after installing Git for Windows.

## Updating the website later

Edit the local files, upload the changed files to the same repository, and commit them. GitHub Pages will redeploy the website automatically from the selected publishing branch.
