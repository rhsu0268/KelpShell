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

### MongoDB

In the same way that MongoDB is a pain to install on the operating system, installation on the Ubuntu machine is also pretty involved.

The following commands are coming from this article: <https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04>

Use it as a reference if you get stuck or run into trouble.

First, import the key for the official MongoDB repository:

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

Next, create a list file for mongo:

```bash
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

Next, update the package list:

```bash
sudo apt-get update
```

Now, install mongo with the following:

```bash
sudo apt-get install -y mongodb-org
```

Create a unit file for mongo with the following:

```bash
sudo nano /etc/systemd/system/mongodb.service
```

Paste in the following contents and close the file:

```
[Unit]
Description=High-performance, schema-free document-oriented database
After=network.target

[Service]
User=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf

[Install]
WantedBy=multi-user.target
```

Start mongo with the following:

```bash
sudo systemctl start mongod
```

You can check the status of mongo with the following:

```bash
sudo systemctl status mongod
```

You should see output like the following:

```
● mongod.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: active (running) since Fri 2017-02-17 18:57:26 UTC; 17min ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 2811 (mongod)
    Tasks: 17
   Memory: 56.8M
      CPU: 7.294s
   CGroup: /system.slice/mongod.service
           └─2811 /usr/bin/mongod --quiet --config /etc/mongod.conf
```
You can ensure that it restarts automatically at boot:

```bash
sudo systemctl enable mongod
```

Finally, to stop mongo, run the following:

```bash
sudo systemctl stop mongod
```

Congratulations! You successfully installed the two main pieces of technologies we need for deployment.
