# Github Pages

This repo contains Github Actions workflows (under the `.github/workflows` directory) that
can automatically publish documentation to a `gh-pages` branch, and publish documentation
for the code on the Github Pages site associated with the repo.

This file explains the necessary one-time setup steps to publish this documentation.

After that, the scripts should keep it automatically up-to-date, but if you need to manually regenerate it, the information
below explains how to do that.

When you first pull from this repo into another one, you might get a red X on the Github actions that publish the Github pages site;
following the instructions below should take care of that.

# Steps to setup Github Pages for this repo

1. Enable Github Pages on the repo settings as shown below.

   Select `Settings`, then `Pages`, then change:

   - `Source` to `Deploy from a branch`
   - `Branch` to `gh-pages`
   - `Select Folder` should show `/ (root)`

   As shown here:

   <img width="606" alt="image" src="https://github.com/ucsb-cs156-m23/STARTER-jpa03/assets/1119017/4b762858-0b2d-42ad-a778-94680c50015a">

   If `gh-pages` is not an option, then perform the next step where you launch workflow `02-gh-pages-rebuild` first, then try this step again.

2. Go to the `Actions` menu, and launch workflow `02-gh-pages-rebuild-part-1` as shown. You

   - select the job in the left hand navigation,
   - click on right where it says 'Run workflow'
   - then select `main` branch and click the green `Run Workflow` button

   <img width="1307" alt="Run Workflow: 02-gh-pages-rebuild-part-1" src="https://github.com/ucsb-cs156-m23/STARTER-jpa03/assets/1119017/fb506c1f-dc95-4e33-9cfa-f91324705c87">

   It will create the Github Pages site for the repo, with links to documentation for both the backend (javadoc) and
   frontend (storybook).

3. Return to the main page for the repo, click on the gear at right, and click the box for Github Pages, as shown below

   ![add-gh-pages-link](https://user-images.githubusercontent.com/1119017/235330985-1d181d00-c775-4c93-aec1-87414467e0ed.gif)

4. Check that the link loads the Github Pages site. It should look something like this, but with your repo name in place
   of the one shown.

   If it doesn't come up right away, check to see whether the `02-gh-pages-rebuild` has finished yet. You may find that
   it takes a minute or two for the page to become available, and another minute or two before the `javadoc` and `storybook` links
   for the main branch begin working; but within a minute or two of the `02-gh-pages-rebuild` finishing both links should
   work.

   <img width="500" alt="image" src="https://user-images.githubusercontent.com/1119017/235750584-2e66dc07-12b3-4593-a289-7e2f2b2060c2.png">

# What should it look like?

When it works, the top level page should look something like this:

<img width="400" alt="image" src="https://user-images.githubusercontent.com/1119017/235764245-af5360e9-3e6e-4fe8-b69a-f79213febded.png">

The javadoc should look something like this:

<img width="400" alt="image" src="https://user-images.githubusercontent.com/1119017/235764018-3de19026-bab8-4308-93bf-7cad2679cbf6.png">

The storybook should look something like this:

<img width="400" alt="image" src="https://user-images.githubusercontent.com/1119017/235764128-e705b51d-761c-48df-963b-a354a1c0a575.png">

# Keeping the site up to date

As you add pull requests, the javadoc and storybook will be generated for those as well by GitHub Actions scripts.

Note that:

- The javadoc is only generated when there is a change to the backend code (either files under `src/` or the `pom.xml` file)
- The storybook is only generated when there is a change to the frontend code (files under `frontend/`)

# Regenerating the site

If at any point, you want to rebuild the entire documentation site, you can run the GitHub Action `02-gh-pages-rebuild`
again.
