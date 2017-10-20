![](https://i.imgur.com/6nYomKw.png)

# Description

This is a simple web page to show an indicator of your microphone activity. Mainly aimed at streamers.

# Usage

You can simply clone the project and open the index.html locally and it will work. You will be asked for permission to access the microphone every time you open the document or whenever you change on of the two "activity settings".

Alternatively, just run it on a webserver and the permission will be saved.

# Settings

*All settings are automatically saved and reloaded every time you open this page.*

**Activity Level (Range: 0 to 1, 0.01 steps)**

*Default: 0.5*

This is the threshold of when the icon will light up. The closer to 1, the louder you will need to be. Make sure your microphone is set up well beforehand, because this setting doesn't allow for too much tuning.


**Activity Timeout (Range: 10ms to 1000ms, 10ms steps)**

*Default: 550ms*

This specifies how long the icon will stay lit up after you stop speaking. As a result of this, it somewhat smoothes the icon, as it will not cut off instantly after every word.


**Background Color**

*Default: #00B140*

HEX color value of your desired background color. The default color is recommended for chroma keying, as it is the standard chroma key green.


**Activity Color**

*Default: #CE0202*

HEX color value of your desired icon color. This is the color the icon will be, when you are speaking. Make sure it has enough contrast to your background color, as this will increase keying performance.


**Icon Size (Range: 10pt to 100pt)**

*Default: 55pt**

Specifies the font size of the icon. Use this to scale your icon to size, rather than scaling the already rendered icon.


**Reset to default**

This button will clear **ALL** saved settings, without warning. This cannot be undone. Use with caution.

# Setup in OBS

If you wish to display this icon on your stream, here is how you set it up in OBS Studio:

1. Add a new screen or window capture
2. Right click the new capture and click "Filters"
3. Add a "Crop" filter and crop the capture to the size of the icon
4. Add a "Chroma Key" filter
5. Set the chroma key color type to "custom"
6. Click "Choose color" and put your background color (default: #00b140) in the "HTML:" input field
7. Press Okay/Close a couple of times and position your capture where you want it - you are done

# Acknowledgment

Big thanks to [Chris Wilson](https://github.com/cwilso) and his work on his [volume-meter](https://github.com/cwilso/volume-meter/). This project has greatly helped in the development of this.

And a shoutout to GinTatsu for the idea and "funding" of this project.
