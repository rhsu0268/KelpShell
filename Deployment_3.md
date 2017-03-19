# Nginx

We got an application running. However, it turns out that opening many ports will expose services to potential exploits.

In order to avoid this and increase security, we want to only open port 80, which is the standard port for HTTP requests.

When a request comes in through port 80, we want to route that to our Express application.

In other words, we ware setting up a reverse proxy.

A proxy is a server that can be used to access other servers.

A reverse proxy is the other way around. In particular, the application server responds to the client through a web server. In particular, the client does not know how this was done.

In our deployment, we will use nginx to create a reverse proxy.

## Nginx

The commands are coming from this article: <http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/>

Start with a command that allows us to run others with super user privilege:

```bash
sudo -s
```

We want to use the stable version of nginx:

```bash
nginx=stable
```

```bash
add-apt-repository ppa:nginx/$nginx
```

Now, do an update:

```bash
add-apt-repository ppa:nginx/$nginx
```

```bash
apt-get update
```

Finally, we are ready to install nginx.

```bash
apt-get install nginx
```

## Configuration
