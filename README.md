# mPicker - WEBGL 3D object picker for p5.js

This set of functions allows a simple-to-use implementation of 3D object picking for beginning p5.js coders. It works by creating a hidden parallel 3D WEBGL model in which all objects in the visible model have corresponding objects with a color determined by the object's assigned ID number. To identify an object the color of the hidden canvas at a particular point then gives the ID number of the object closest to the camera at that point.

The general principle of using the set of functions is to replace p5.js 3D methods with calls to these functions, named by prepending the letter "m" to the method name and using camelCase capitalization. Methods that create 3D primitives require an extra parameter in the first position that assigns an ID number to that primitive. Multiple primitives can be assigned the same ID number to build up more complex objects that can be identified with a single ID number.

To identify an object based on the canvas position, use the function getObjectID().

Important usage note: 
The p5.js draw() function should include the command mResetMatrix() to ensure proper synchronization of the hidden canvas with the visible canvas.

Functions:
The following methods are replaced with the corresponding functions listed below. An asterisk indicates that the parameter list should be prepended with an integer ID number. The ID can be any integer and do not need to be unique if objects built from multiple primitives are required.

p5.js method | mPicker function name
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
