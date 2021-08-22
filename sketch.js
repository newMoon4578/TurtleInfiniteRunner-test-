var sea;
var turtle,turtleImg;
var seaweed,seaweedImg,seaweedGroup;
var plasticBags,plasticBagsImg,plasticBagsGroup;
var rock1,rock1Img,rock2,rock2Img,rocksGroup;
var gameOver,gameOverImg;

var score = 0

var PLAY = 1
var END = 0
var gameState = 1


function preload(){

    turtleImg = loadImage("turtle-icon-10983.png")
    seaweedImg = loadImage("seaweed.png")
    gameOverImg = loadImage("game over.png")
    rock1Img = loadImage("rock-1.png")
    rock2Img = loadImage("rock-2.png")
    plasticBagsImg = loadImage("plastic bag.png")

}

function setup(){

    createCanvas(400,600)
    sea = createSprite(200,300,400,600)
    sea.shapeColor = "SkyBlue"

    turtle = createSprite(200,500,20,20)
    turtle.addImage("turtle",turtleImg)
    turtle.scale = 0.2

    seaweedGroup = new Group()
    rocksGroup = new Group()
    plasticBagsGroup = new Group()
 
}


function draw() {
    if(gameState===PLAY){

        turtle.x = World.mouseX
        edges = createEdgeSprites()
        turtle.collide(edges)

        createSeaweed()
        createRocks()
        createPlasticBags()

        if(seaweedGroup.isTouching(turtle)){
            seaweedGroup.destroyEach()
            score = score+1
        }
        if(rocksGroup.isTouching(turtle)){
            rocksGroup.destroyEach()
            score = score-5
        }

        else{

            if(plasticBagsGroup.isTouching(turtle)){
                gameState = END
                
                turtle.addImage("Game Over",gameOverImg)
                turtle.x = 200
                turtle.y = 300

                seaweedGroup.destroyEach()
                plasticBagsGroup.destroyEach()
                rocksGroup.destroyEach()

                seaweedGroup.setVelocityYEach(0)
                plasticBagsGroup.setVelocityYEach(0)
                rocksGroup.setVelocityYEach(0)
            }
        }
    drawSprites()
    textSize(20)
    fill(255)
    text("Seaweed Eaten: " + score,200,30)
    }
}

function createSeaweed(){
    if (World.frameCount % 30 == 0)
        seaweed = createSprite(Math.round(random(50, 350),40,10,10))
        seaweed.addImage(seaweedImg)
        seaweed.scale = 0.12
        seaweed.velocityY = 3
        seaweed.lifetime = 100
        seaweedGroup.add(seaweed)
}

function createRocks(){
    if (World.frameCount % 100 == 0)
        var rocks = createSprite(Math.round(random(50, 350),40,10,10))
        
        var rand = Math.round(random(1,2))
        switch(rand){
            case 1: rock.addImage(rock1Img)
            break;
            case 2: rock.addImage(rock2Img)
            break;
        }

        rocks.scale = 0.5
        rocks.lifetime = 100

        rocksGroup.add(rocks)
}

function createPlasticBags(){
    if(World.frameCount % 60 == 0)
        plasticBags = createSprite(Math.round(random(50,350),40,10,10))
        plasticBags.addImage(plasticBagsImg)
        plasticBags.scale = 0.1
        plasticBags.velocityY = 3
        plasticBags.lifetime = 100
        plasticBagsGroup.add(plasticBags)
    }