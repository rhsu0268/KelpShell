# Deploying Node.js with MongoDB Application

Setting Up Express With Nginx and pm2

<http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/>

Installing MongoDB

<https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04>

Here's a good reference of pm2:

<http://pm2.keymetrics.io/docs/usage/quick-start/>

Deployment with Docker

<https://scotch.io/tutorials/how-to-host-a-node-js-app-on-digital-ocean>

## Digital Ocean

Login to Digital Ocean and create a droplet.

![alt text](digital-ocean-droplet.png)

Make sure you select Ubuntu 16.04 and the $5 option will be sufficient.

You can leave the setting for location as New York and create an ssh key on your computer so that you can login without a password.

Follow the steps via this github link to generate your ssh key and **be sure** to add it to your ssh-agent.

When you create the droplet, you want to keep track of the IP address that is associated with your server. It will be four values separated with "."

You can login to the server with ssh. Open up your terminal and run the following:

```bash
$ ssh root@138.197.80.147
```

If you set up your ssh key properly, you should **NOT** be asked for a password.

## Setting up the Tools

Now, we can start setting up Node.js and MongDB. The following commands are coming from this article:
<https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04>

Use it as a reference if you get stuck or run into trouble.

Make sure you are at the root of the system:

```bash
$ cd ~
```

Use curl to retrieve the installation script for Nodejs:

```bash
$ curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
```

Run the script with the following:

```bash
sudo bash nodesource_setup.sh
```

Now we can install nodejs with:

```bash
sudo apt-get install nodejs
```

The previous command takes care of installing but some node packages require compiling code from source. Therefore, run the following to take care of this issue:

```bash
sudo apt-get install build-essential
```

The rest of the article walks through setting up a native node.js application which we will **NOT** follow.
