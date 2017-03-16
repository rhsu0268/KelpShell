# Deployment

Now that we have most of our tools installed, let's start deploying.

First, make sure git is installed on the Ubuntu machine. If you followed the instructions in the previous file, you shouldn't have to do this but for good measure, here is the command for installing git.

```bash
sudo apt-get install git
```

Next, you want to clone your project repo with the following:

```bash
git clone <GITHUB PROJECT URL>
```

Now, that you cloned it, cd into the directory. Make sure mongodb is running and run the following:

```bash
sudo systemctl start mongod
```

This starts MongoDB on your droplet.

Now, that you did that, start up your project with the following:

```bash
npm start
```

You should visit the following url:

```
http://w.x.y.z:3000
```

You should see the root of your application. Congratulations!

But we are not finished!

We do need to keep npm running in order to have continuous deployment.

To do this, we will use a tool called pm2, a production process manager for Node.js.

Here's a link with some information about it:

<http://pm2.keymetrics.io/>

## Setting up pm2

Now, let's set that up.

First, install pm2 with the following:

```bash
npm install -g pm2
```

Now, we can start the application with pm2 with the following:

```bash
pm2 start bin/www
```
You can visit your application again and even if you logout of your digital ocean server, your application will still be running. You did it.

Now, pm2 will keep the application running as long as it is running itself. If pm2 somehow is terminated, we want it to reboot so that it starts back up automatically. To do this, the following command needs to be run:

```bash
pm2 startup
```

```bash
sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u root
```

The following is the documentation where these commands are coming from:

<http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/>

You are good! Now, you can celebrate!
