# mPicker - WEBGL 3D object picker for p5.js

This set of functions allows a simple-to-use implementation of 3D object picking for beginning p5.js coders. It works by creating a hidden parallel 3D WEBGL model in which all objects in the visible model have corresponding objects with a color determined by the object's assigned ID number. To identify an object the color of the hidden canvas at a particular point then gives the ID number of the object closest to the camera at that point.

The general principle of using the set of functions is to replace p5.js 3D functions with calls to these new functions, named by prepending the letter "m" to the method name and using camelCase capitalization. Methods that create 3D primitives require an extra parameter in the first position that assigns an ID number to that primitive. Multiple primitives can be assigned the same ID number to build up more complex objects that can be identified with a single ID number.

Usage notes: 
* The module can be included in the head of an html document with a line such as `<script src="mPicker.js"></script>`. Alternatively, the contents of mPicker.js can be simply copied into a p5.js sketch.js document.

* The p5.js draw() function should include the command mResetMatrix() before drawing any primitives to ensure proper synchronization of the hidden canvas with the visible canvas and accurate object identification.

* The creation of primitives should include an additional parameter, first in the list, that assigns an ID number to the primitive. The ID can be any positive integer. Multiple primitives can be assigned the same ID if they make up a more complex object that should later be idenfied as a single object. 

* To identify an object based on the canvas position, use the function call `getObjectID(x,y)` which will return the ID number of the object closest to the camera at those (x,y) canvas coordinates or 0 if there is no object. The object ID at the mouse position can be simply determined with `objectAtMouse()`.

Functions:
The following p5.js functions are replaced with the corresponding mPicker functions listed below. An asterisk indicates that the parameter list should be prepended with an ID number.

p5.js function | mPicker function name
------------ | -------------
createCanvas | mCreateCanvas
background | mBackground
resetMatrix | mResetMatrix
camera | mCamera
box | mBox*
plane | mPlane*
sphere | mSphere*
cylinder | mCylinder*
cone | mCone*
ellipsoid | mEllipsoid*
torus | mTorus*
translate | mTranslate
rotateX | mRotateX
rotateY | mRotateY
rotateZ | mRotateZ
rotate | mRotate
scale | mScale
push | mPush
pop | mPop
texture | mTexture
ortho | mOrtho
perspective | mPerspective

# Example code

See example code for an implementation of the 3D object picker. It displays a set of 3D objects moving in space. Arrow keys move the camera. Mouseover changes the texture image for some objects. Mouse clicks on other objects either change the texture image or spawn other objects.
