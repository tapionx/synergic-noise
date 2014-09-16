
Synergic Noise
==============

Synergic Noise is a simple yet powerful collaborative drum machine.

It is based on:
- node.js (http://nodejs.org)
- socket.io (http://socket.io)
- sound.js (http://github.com/CreateJS/SoundJS)
- jQuery (http://jquery.com)

Quick start
-----------
If you don't have node.js installed, simply install it:

> sudo apt-get install nodejs

or (http://nodejs.org/download/)

Then you can download the software

> git clone https://github.com/tapione/synergic-noise/

> cd synergic-noise

.. install the dependencies

> npm install

.. start the server

> node app.js

.. and you are done :)

Usage
-----

Synergic Noise consists of two different pages, the "noisier", which sends the beats to the server, and the "player", which plays the beats.

It listen to default at the 8080 port, but you can change this behavior simply changing the "port" var in app.js

So:
- from the PC who will reproduce the samples, turn up the volume and visit
> http://localhost:8080/player.html

- from the devices that will be your "noisiers", visit:
> http://localhost:8080/

- touch the buttons and let the magic happen :)

TODO:
-----
(pull requests are welcome !)
- improve graphics
- add better beats

License
-------
Synergic Noise is released under the WTFPL (http://www.wtfpl.net/)

.. but don't bother me if your neighbors suddenly start to hate you..

Author
------
Riccardo Serafini - http://tapion.it
