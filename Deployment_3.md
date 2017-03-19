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

Now, for something more challenging. We need to make some changes to configuration.

```bash
cd /etc/nginx
```

If you do an -ls, you should see an sites-available and a sites-enabled directory.

```bash
cd sites-available
```

If you do an ls, you should see a file called default. It contains the default template for setting up configurations so that the nginx can point to our express application.

Make a copy of the file with the following:

```bash
cp default <example.com>
```

If you try to look through that file, you'll see that it boils down to the following:

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  root /var/www/html;
  index index.html index.htm;

  server_name _;

  location / {
      try_files $uri $uri/ =404;
  }
}
```

We must enable the site. To do this, we create a symbolic link so that changes we make here, propagate to sites-enabled.

```bash
ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

To successfully set up the reverse proxy, we need to change some of the things in our configuration file.

```
server {
  listen 80 default_server;
  listen [::]:80 default_server;

  server_name www.example.com;

  location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:3000/;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_redirect off;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```

Finally, make sure you delete the default config file with:

```bash
rm default
```

Make sure that there are no typos in your file with the following:

```bash
sudo nginx -t
```

Now, to make sure these changes take effect, we can run the following:

```bash
/etc/init.d/nginx restart
```

If you visit your ip address, you should see that the application is indeed running:

http://w.x.y.z

Congratulations! You did it again!
