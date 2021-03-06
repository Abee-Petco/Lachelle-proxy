# Proxy-Server-Nick
 A proxy server for PetToyCo that relies on the six services listed in "Related Projects"

## Related Projects

  - https://github.com/PetToyCo/photo-gallery
  - https://github.com/PetToyCo/description_directions_attributes_
  - https://github.com/PetToyCo/mainTitle_price
  - https://github.com/PetToyCo/reviews
  - https://github.com/PetToyCo/ProductRecommendations
  - https://github.com/PetToyCo/deliver-pickup

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

To use this proxy server:

1. From project's root directory, >npm install
2. Download each of the above repos (in the section "Related Projects". Each repo represents a service to this proxy) into its own unique directory. Then follow the instructions in each ReadMe - for each service - for how to seed a MongoDB instance running on your computer, with data. Also, follow the instructions for starting each of the service's servers.
3. Then start the proxy's server by making the proxy's root directory the cd in terminal and running >npm run server
4. Visit any page that follows the form:
http://127.0.0.1:3000/product?itemID='value 100 to 199 without the quotes'

5. To run the tests, visit the following link (after following the special note below):
http://127.0.0.1:3000/SpecRunner.html
NOTE: as the page that loads tells you, you have to wait before the tests will run. This is to give the embedded iframe the chance to load the proxy's html file, followed by that html file sending out get requests for the service components, followed by those components sending out requests for data.
5. See section below on deployment, if you want to deploy the proxy server.

SPECIAL NOTE: For one of the tests to pass, you currently have to make a modification to it before running the spec runner. To do this, follow these steps
1. In your mongo terminal instance:
a. >use images
b. >db.images.find({itemId: '100'})
c. For the data you receive back: the itemImages field is an array with two objects in it. Each object has 'small', 'medium', and 'large' keys. For the first object's 'small' key, copy the url stored there.
2. In client/tests.js, replace the url on line 30 with the one you just copied.
3. You can now run the SpecRunner.
4. Alternatively, you can just comment out that test (lines 26-31) and visually inspect that changing item ids in the proxy's url always leads to the same images appearing when viewing the same itemID
5. We are currently working to change the images database so that this special note can be removed and so the tests will pass without any modification.

## Deployment

You have two options. In ./bashScripts, there are some example bash scripts you can use to semi-automate the process. This is option 1. However, if you have yet to deploy this project before, it is recommended you follow the "Manual Deployment Instructions" for the first deployment.

Semi-automated Deployment Instructions:
1. In terminal, >cd "project's root directory path, without quotes"

2. In client/index.html, scroll to the bottom and make sure the script tags that point to 127.0.0.1 are commented out while the script tags that point to AWS instances are no longer commented. Do the same for lines 12-15. If any AWS servers were restarted after stop/terminate, make sure to update the appropriate IP addresses.

3.  If you already followed this step and steps 4/5, skip to step 6. Otherwise: At ./bashScripts, there are six files. They each have an extension .example.sh. Duplicate each of these and rename so .example copy.sh is now just .sh.

Example: bashScript4.example copy.sh should now be bashScript4.sh

IMPORTANT: If you do not follow these instructions exactly, the .gitignore and .dockerignore will not properly ignore the files you just duplicated/renamed. To check that you correctly renamed them all, in terminal >git status

If you renamed correctly, none of the files should show up as changes that needed to be staged/committed

4. You will now need to open each file and make changes for each variable. Variables come in the format: variable=[[[Instructions for what this variable value should be changed to]]]

For each variable, you replace all the [ ] brackets and everything inside them with the actual value IMPORTANT: two things: one, some variables will need to be changed everytime you want to deploy a new build. Those are mentioned in comments found within each file AND below in step 6. Two, DO NOT use string brackets around values. This is not javascript and so you do not need '' or ""

5. You will have to make it so three of the files you created can be edited and executed by only the root user on your comp. Do so with the following commands
>chmod 700 ./bashScripts/bashScript.sh
>chmod 700 ./bashScripts/bashScript2.sh
>chmod 700 ./bashScripts/bashScript3.sh

You do not need to do this with the last three files since you won't be executing them directly.
=======
You do not need to do this with the last three files since you won't be executing them directly.
>>>>>>> 5df1b656179a19d18f0808fdd493a855cf398263

6. Now follow this process to deploy:
- Make sure all IP addresses and script tags are accurate(see step 2 above)
- >./bashScripts/bashScript.sh
- The above script will build your docker image locally. At the end of the build, it will report the image's id. Copy and paste that to the imageID variable in bashScript2.sh. Also update the version variable in that file.
- >./bashScripts/bashScript2.sh   You will have to enter your Docker Hub password when prompted
- While waiting for the above command to finish running, you can open a second terminal window, cd to project's root directory, and run >./bashScripts/bashScript3.sh
- Once both script 2 and 3 are done running, you will have your image on Docker Hub and you will be logged into your AWS server, in the second terminal window. It is this window that you will use for the remaining steps.
- If you already have an older image running on the AWS instance. You have to: 1. >docker ps     and then copy and paste the correct container's ID into bashScript4.sh, for the runningContainerID variable. 2. the same command already gives you access to Image ID also, so copy and paste the correct image's ID for the runningImageID variable in the same file. 3. Copy and paste the entire contents of bashScript4.sh (EXCEPT the last line) into the second terminal, hit enter, then enter y when prompted. Once those scripts finihs running, copy just the last line into the terminal and hit enter.
- To pull the image you built and pushed to Docker Hub, you first have to login to Docker Hub with >docker login --username="your username, without quotes". Then in bashScript5.sh, update the version variable with the same version you gave it, then copy and paste all the code into the second terminal, and hit enter. You will have to enter your Docker Hub password when prompted
- Lastly, use >docker images     to get the Image ID for the image you just pulled, then copy and paste it into bashScript6.sh for the variable  imageID. Then copy and paste the file's entire contents into the second terminal and hit enter. The instance should now be running. Visit http://"your proxy instance's IP address, without quotes":3000/product?itemID=10,000,000 to confirm
=======
- Lastly, use >docker images     to get the Image ID for the image you just pulled, then copy and paste it into bashScript6.sh for the variable  imageID. Then copy and paste the file's entire contents into the second terminal and hit enter. The instance should now be running. Visit http://"your proxy instance's IP address, without quotes":3000/product?itemID=100 to confirm
>>>>>>> 5df1b656179a19d18f0808fdd493a855cf398263





Manual Deployment Instructions
1. In client/index.html, at the bottom is all the script tags used to fetch bundles from the six services this proxy server relies on. In development mode, these all read 127.0.0.1. Once all the deployment servers have been launched, you can change these to their actual IP addresses. Don't worry. Just above the script tags are commented-out duplicates with the 127.0.0.1 address, allowing quick and easy switching back to development mode. NOTE: there are also CSS link tags on line 13 and 15 that need IP address changes, too.
2. Once all changes to IP addresses have been made and saved, build the image with >docker build -t "name of image, without quotes". If you want to assign a tag, don't forget :tagName after the image name. If you don't supply the tag name, :latest will be automatically appended. I currently use proxy-server-nick as my image name.
3. If not already done so, create account at hub.docker.com and login. Then create a public repo. The name of the repo I currently use is fec-proxy-server-nick.
4. In terminal, you can directly login into your Docker Hub account with >docker login --username="your username, without quotes". When prompted, enter your password.
5. The image you just built should report the image ID at the end of the build. Or you can find it by >docker images. In the printout caused by this command, the image should be the first one listed if you haven't built any other images since building the one for this proxy. With either method, copy the image's ID number for use in step 6
6. Before you push, you have to tag the image with >docker tag "image ID, without quotes" "Docker Hub username, without quotes"/"repo name from step 3, without quotes":"tag name, without quotes". Earlier, it was OK to let :latest be automatically appended but for this tag name, you will probably want to assign a version number or some other uniquely identifying feature.
7.  To push: >docker push "Docker Hub username, without quotes"/"repo name you tagged the image with in step 6, without quotes".
8. With the image on Docker Hub, you now need to get it onto your AWS instance that should have been fired up before (or during) step 1.
9. In terminal, >cd "file directory where .pem file is saved for the AWS instance".
10. If not done already, make sure only the root user on your computer can access the .pem file with >chmod 400 "name of .pem file, without quotes".pem
11. Then SSH into your AWS instance with >ssh -i "name of .pem file, without quotes".pem ec2-user@"the IP address of the AWS instance"
12. If not already done so, install docker onto the instance with >sudo yum update -y && sudo yum install -y docker && sudo service docker start. You can then add the ec2-user to the docker group so all docker commands can be run without sudo by >sudo usermod -a -G docker ec2-user. You then have to exit for this change to take effect using >exit. Re-sign-in to your AWS instance by repeating step 11.
13. You can now run Docker commands the same way you run them on your local terminal. Login to Docker (step 4).
14. Pull the image with >docker pull "Docker Hub username, without quotes"/"repo name from step 3, without quotes":"tag name, without quotes"
15. Find image ID with >docker images. Copy it for use in step 16.
16. Fire up the proxy image with >docker run -dp 3000:3000 "image ID, without quotes"
17. At this point, the proxy should be live and you can visit it by going to http://"AWS instance IP address for the instance the proxy is on":3000/product?itemID="value 100 to 199, without quotes". However, if the services are not already updated and live, you probably won't see much. If nothing displays, you can confirm the proxy is live by right clicking the blank page and selecting "Inspect". You should at least see the DOM skeleton found in the body of the index.html file.

## Requirements

- Node 12.16.1


## Development

### Installing Dependencies

From within the root directory: npm install


