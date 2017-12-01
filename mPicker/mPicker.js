/**
 * @file mPicker.js: 3D Object picker for p5.js
 * @author David Harris <physicsdavid@gmail.com>
 * @version 1.0
 *
 * This set of functions allows a simple-to-use implementation of 3D object picking for beginning p5.js coders. It works by creating a hidden parallel 3D WEBGL model in which all objects in the visible model have corresponding objects with a color determined by the object's assigned ID number. To identify an object the color of the hidden canvas at a particular point then gives the ID number of the object closest to the camera at that point. More complex objects can be constructed by using the same object ID when creating each primitive. Then picking any point on that compound object will return the same ID.
 *
 * Principle of use:
 * The general principle of using the set of functions is to replace p5.js 3D functions with calls to these new functions, named by prepending the letter "m" to the method name and using camelCase capitalization. Methods that create 3D primitives require an extra parameter in the first position that assigns an ID number to that primitive. Multiple primitives can be assigned the same ID number to build up more complex objects that can be identified with a single ID number.
 *
 * Usage notes: 
 * The module can be included in the head of an html document with a line such as `<script src="mPicker.js"></script>`. Alternatively, the contents of mPicker.js can be simply copied into a p5.js sketch.js document.
 *
 * The p5.js draw() function should include the command mResetMatrix() before drawing any primitives to ensure proper synchronization of the hidden canvas with the visible canvas and accurate object identification.
 *
 * The creation of primitives should include an additional parameter, first in the list, that assigns an ID number to the primitive. The ID can be any positive integer. Multiple primitives can be assigned the same ID if they make up a more complex object that should later be identified as a single object. 
 *
 * To identify an object based on the canvas position, use the function call `getObjectID(x,y)` which will return the ID number of the object closest to the camera at those (x,y) canvas coordinates or 0 if there is no object. The object ID at the mouse position can be simply determined with `objectAtMouse()`.
 *
 * Functions:
 * The following p5.js functions are replaced with the corresponding functions listed below. An asterisk indicates that the parameter list should be prepended with an integer ID number. For details of the p5.js functions, see the p5.js reference at: https://p5js.org/reference/
 *
 * p5.js function         mPicker function name
 * createCanvas     ->  mCreateCanvas
 * background       ->  mBackground
 * resetMatrix      ->  mResetMatrix
 * camera           ->  mCamera
 * box              ->  mBox*
 * plane            ->  mPlane*
 * sphere           ->  mSphere*
 * cylinder         ->  mCylinder*
 * cone             ->  mCone*
 * ellipsoid        ->  mEllipsoid*
 * torus            ->  mTorus*
 * translate        ->  mTranslate
 * rotateX          ->  mRotateX
 * rotateY          ->  mRotateY
 * rotateZ          ->  mRotateZ
 * rotate           ->  mRotate
 * scale            ->  mScale
 * push             ->  mPush
 * pop              ->  mPop
 * texture          ->  mTexture
 * ortho            ->  mOrtho
 * perspective      ->  mPerspective
 *
 * 
 */

/**
 * mPage is a global variable that holds a (hidden) WEBGL canvas for color-based object picking.
 */
var mPage;

/**
 * mCreateCanvas is a 3D object picking version of createCanvas().
 *
 * Its parameters are identical to those for createCanvas().
 */
function mCreateCanvas() {
    createCanvas(...[...arguments]);
    pixelDensity(1);
    mPage = createGraphics(width, height, WEBGL);
	mPage.pixelDensity(1);
}

/**
 * getObjectID returns the ID number for the object closest to the camera at a
 * coordinate of the projection of the 3D model onto the 2D canvas.
 *
 * @param {Number} mx x-coordinate on canvas to find a 3D object
 * @param {Number} my y-coordinate on canvas to find a 3D object
 * @return {Number} the ID number of the 3D object closest to the camera at position (mx,my). 
 *                  Returns 0 if no object present.
 */
function getObjectID(mx, my) {
	if (mx > width || my > height || mx < 0 || my < 0) {
		return 0;
	}
    var gl = mPage.elt.getContext('webgl');
	var pix = getPixels();
	var index = 4 * ((gl.drawingBufferHeight-my) * gl.drawingBufferWidth + mx);

    return (pix[index]<<16 | pix[index+1]<<8 | pix[index+2]);
}

/**
 * getPixels returns an array of pixel color values of the canvas. 
 * It is only used by other functions.
 * 
 * @return {Array} pixel color values of canvas
 */
function getPixels() {
	var gl = mPage.elt.getContext('webgl');
	var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
	gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
	return (pixels);
}

/**
 * mBox creates a box primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to box().
 */
function mBox() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    box(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.box(...passon);
}

/**
 * mPlane creates a plane primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to plane().
 */
function mPlane() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    plane(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.plane(...passon);
}
/**
 * mSphere creates a sphere primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to sphere().
 */
function mSphere() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    sphere(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.sphere(...passon);
}

/**
 * mCylinder creates a cylinder primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to cylinder().
 */
function mCylinder() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    cylinder(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.cylinder(...passon);
}

/**
 * mCone creates a cone primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to cone().
 */
function mCone() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    mPage.rotateX(PI);
    cone(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.cone(...passon);
}

/**
 * mEllipsoid creates an ellipsoid primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to ellipsoid().
 */
function mEllipsoid() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    ellipsoid(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.ellipsoid(...passon);
}

/**
 * mTorus creates a torus primitive with an associated ID number.
 * 
 * @param {Number} ID first parameter assigns an ID number to the object.
 * Following parameters are passed through to torus().
 */
function mTorus() {
    var passon = [...arguments].slice(1);
  	var c=arguments[0];
    torus(...passon);
    mPage.fill((c >> 16) & 0xFF, (c >> 8) & 0xF, c & 0xFF);
    mPage.torus(...passon);
}

/**
 * mTranslate performs the translate function to both visible and hidden 3D models.
 *
 * All parameters are the same as for translate().
 */
function mTranslate() {
    translate(...[...arguments]);
    mPage.translate(...[...arguments]);
}

/**
 * mResetMatrix performs the resetMatrix function to both visible and hidden 3D models.
 *
 * All parameters are the same as for resetMatrix().
 */
function mResetMatrix() {
    resetMatrix();
    mPage.resetMatrix();
}

/**
 * mRotateX performs the rotateX function to both visible and hidden 3D models.
 *
 * All parameters are the same as for rotateX().
 */
function mRotateX() {
    rotateX(...[...arguments]);
    mPage.rotateX(...[...arguments]);
}

/**
 * mRotateY performs the rotateY function to both visible and hidden 3D models.
 *
 * All parameters are the same as for rotateY().
 */
function mRotateY() {
    rotateY(...[...arguments]);
    mPage.rotateY(...[...arguments]);
}

/**
 * mRotateZ performs the rotateZ function to both visible and hidden 3D models.
 *
 * All parameters are the same as for rotateZ().
 */
function mRotateZ() {
    rotateZ(...[...arguments]);
    mPage.rotateZ(...[...arguments]);
}

/**
 * mRotate performs the rotate function to both visible and hidden 3D models.
 *
 * All parameters are the same as for rotate().
 */
function mRotate() {
    rotate(...[...arguments]);
    mPage.rotate(...[...arguments]);
}

/**
 * mScale performs the scale function to both visible and hidden 3D models.
 *
 * All parameters are the same as for scale().
 */
function mScale() {
    scale(...[...arguments]);
    mPage.scale(...[...arguments]);
}

/**
 * mCamera performs the camera function to both visible and hidden 3D models.
 *
 * All parameters are the same as for camera().
 */
function mCamera() {
    camera(...[...arguments]);
    mPage.camera(...[...arguments]);
}

/**
 * mOrtho performs the ortho function to both visible and hidden 3D models.
 *
 * All parameters are the same as for ortho().
 */
function mOrtho() {
    ortho(...[...arguments]);
    mPage.ortho(...[...arguments]);
}

/**
 * mPerspective performs the perspective function to both visible and hidden 3D models.
 *
 * All parameters are the same as for perspective().
 */
function mPerspective() {
    perspective(...[...arguments]);
    mPage.perspective(...[...arguments]);
}

/**
 * mPush performs the push function to both visible and hidden 3D models.
 */
function mPush() {
    push();
    mPage.push();
}

/**
 * mPop performs the pop function to both visible and hidden 3D models.
 */
function mPop() {
    pop();
    mPage.pop();
}

/**
 * mBackground performs the background function to the visible 3D models and sets
 * the background color of the hidden 3D model to 0 (black).
 *
 * All parameters are the same as for background().
 */
function mBackground() {
    background(...[...arguments]);
    mPage.background(0);
}

/**
 * mTexture performs the texture function to the visible 3D models.
 *
 * All parameters are the same as for texture().
 */
function mTexture() {
    texture(...[...arguments]);
}

/**
 * objectAtMouse returns the object ID at the current mouse position.
 *
 * @return {Number} ID of object nearest to camera at position of mouse.
 */
function objectAtMouse() {
    return getObjectID(mouseX, mouseY);
}