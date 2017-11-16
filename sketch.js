/**
 * Example code to demonstrate use of the mouse3D.js picker functions.
 *
 * All WEBGL 3D p5.js functions are replaced with versions named with a 
 * prepended "m" and the rest of the function name in camelCase.
 *
 * Note: mResetMatrix() should be included in the draw() function to ensure
 * proper operation.
 */

var kitten;
var puppy;
var cameraX = 0, cameraY = 0, cameraZ = 0;

const BOX1=101;
const CONE1=102;
const PLANE1=103;
const SPHERE1=104;
const TORUS1=105;

const CLICKBOX=128;
const CLICKPLANE=129;

function preload() {
	kitten = loadImage('kitten.jpg');
    puppy = loadImage('puppy.jpg');
}

function setup() {
	mCreateCanvas(800, 600, WEBGL);
}

function draw() {
    mBackground(0);
	mResetMatrix();
    
    adjustCamera();
    mCamera(cameraX, cameraY, cameraZ);
    
	mRotateY(frameCount * 0.01);
	mRotateX(frameCount * 0.01);

    mPush();
    mTranslate(50,50,50);
    mRotateZ(frameCount * 0.01);
    mTexture(kitten);
    mBox(BOX1, 100);
    mPop();
    
    mPush();
    mTranslate(150,150,150);
    mRotateX(frameCount * 0.02);
    mTexture(kitten);
    mPlane(PLANE1, 100);
    mPop();
    
    mPush();
    mTranslate(-50,-50,-50);
    mRotateZ(frameCount * -0.03);
    mCone(CONE1, 100);
    mTexture(getObjectID(mouseX, mouseY)==CONE1 ? puppy : kitten);
    mCone(CONE1, 100);
    mPop();
    
    mPush();
    mTranslate(0,-200,-50);
    mSphere(SPHERE1, 100);
    mTexture(getObjectID(mouseX, mouseY)==SPHERE1 ? puppy : kitten);
    mSphere(SPHERE1, 100);
    mPop();
    
    if(mouseIsPressed) {
        var objectID = getObjectID(mouseX, mouseY);
    
        switch(objectID) {
            case BOX1:
                for(var i=0; i<10; i++) {
                    mPush();
                    mTranslate(0,0,(i-5)*50);
                    mRotateZ(frameCount * 0.01);
                    mTexture(puppy);
                    mBox(CLICKBOX, 30);
                    mPop();
                }
                break;
            case PLANE1:
                mPush();
                mTranslate(150,150,150);
                mRotateX(frameCount * 0.02);
                mTexture(puppy);
                mPlane(CLICKPLANE, 100);
                mPop();
                break;
        }
    }
}

function adjustCamera() {
    if (keyIsDown(UP_ARROW)) {
        cameraZ -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        cameraZ += 10;
    }
    if (keyIsDown(LEFT_ARROW)) {
        cameraX -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        cameraX += 10;
    }
}
