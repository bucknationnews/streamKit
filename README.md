# streamKit

StreamKit is a simple JavaScript app written for easy multicast streaming at Buckhorn High School. It detects network settings and gives the appropriate stream automatically.

### How does it work?

- Uses WebRTC leaks to detect both local and public IP
- Parses local IP to determine subnet
- Based on subnet, links user to a specific ``.bat`` file which opens the appropriate stream in VLC Media Player.

StreamKit is designed to be simple, static (for hosting on GitHub Pages), and expandable. It is released under the MIT License.

### Requirements

- Edit some ``if`` statements to get the streams set up right for your network
- Create your own ``.bat`` scripts to open the stream in VLC
- Users must view the page in a browser that supports WebRTC, such as Google Chrome. Internet Explorer is not supported.