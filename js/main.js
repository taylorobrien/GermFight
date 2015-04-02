//medicalgame
var P2Game = {};

var game = new Phaser.Game(800, 500, Phaser.CANVAS, 'game');

var score = 0;
var health = 150;
var mapscollected = 0;
var locationy = "hospital";
var timeleft = "300";
var flowerpoint = 0;
var gettingflowers = false;
var money = 0;

P2Game.Boot = function (game){

},

P2Game.Boot.prototype = {
	preload: function () {
		this.load.image('preloaderbar','assets/loader.png');

	},

	create: function (){
		this.game.stage.backgroundColor = '#abf';
		this.state.start('Preload');
	},

	update: function(){

	},
}



P2Game.Preload = function (game){

},

P2Game.Preload.prototype = {
	preload: function () {
		this.game.stage.backgroundColor = '#63B8FF';
		var preloaderbar = this.add.sprite(150,300, 'preloaderbar');
		this.game.add.text
		var style3 = {font: "30px Arial", fill:"#DC143C"};
		var scoringstuff = "Game is Loading....";
 		var winstatement = game.add.text(200,200,scoringstuff,style3);
		this.game.load.spritesheet('flowersprite','assets/flowerspritesheet.png',32,48,12);
		this.game.load.spritesheet('player','assets/police-spritesheet.png',30,36.5,12);
		this.game.load.spritesheet('witchsprite','assets/witchspritesheet.png',62,62,12);
		this.load.tilemap('level1', 'assets/outdoor.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('outdoortile', 'assets/outdoortile.png'); 
		this.load.tilemap('flowermap', 'assets/flowermap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('flowertile', 'assets/flowertile.png'); 
		this.load.tilemap('witchmap', 'assets/witchmap.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('witchtile', 'assets/witchtile.png'); 
		this.load.tilemap('hospitalroom', 'assets/hospitalroom.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('hospitaltile', 'assets/hospitaltile.png'); 
		this.load.image('hospital','assets/hospital.png');
		this.load.image('potion1','assets/potion1.png');
		this.load.image('potion2','assets/potion2.png');
		this.load.image('potion3','assets/potion3.png');
		this.load.image('potion4','assets/potion4.png');
		this.load.image('potion5','assets/potion5.png');
		this.load.image('flowerbackground','assets/flowerbackground.jpg');
		this.load.image('tilebackground','assets/tilebackground.jpg');
		this.load.image('witchbackground','assets/witchbackground.jpg');
		this.load.image('witch', 'assets/witch.png');
		this.load.image('redflower', 'assets/flower-red.png'); 
		this.load.image('blackbar','assets/blackbar.png');
		this.load.image('hospital','assets/hospital.png');
		this.load.image('flower','assets/flowershop.png');
		//var preloaderbar = this.add.sprite(150,300, 'preloaderbar');
		//this.load.audio('cellphonecall',['assets/cellphonecall.mp3','assets/cellphonecall.ogg']); 
		this.load.image('background','assets/background.jpg');
		

	},

	create: function (){

		this.state.start('InHospital');

	},

	update: function(){

	},
}


P2Game.InHospital = function (game) {

	this.player;
	this.bg;
	this.layer;

},

P2Game.InHospital.prototype = {

preload: function () {
 

    },

    create: function () {

	locationy = "hospital";
        //this.game.stage.backgroundColor = '#806000';
	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'tilebackground');
	//this.bg.scale.set(2,2);

	this.blackbar = this.game.add.sprite(850,590,'blackbar'); //435
	this.blackbar.scale.set(1,2);
	this.game.physics.arcade.enable(this.blackbar);
	this.blackbar.body.immovable = true;
	
	this.map = this.game.add.tilemap('hospitalroom');
	this.map.addTilesetImage('hospitaltile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.player = this.game.add.sprite(920,540,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('left', [3,4,5], 3, true);
    	this.player.animations.add('right', [6,7,8], 3, true);
    	this.player.animations.add('idle', [0,1,2], 3, true);
    	this.player.animations.add('up', [9,10,11], 3, true);


	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 3000, this.minustime,this);

    },


    gooutside: function(){
	this.state.start('Outside');
},

    minustime: function(){
	timeleft --;
},

    update: function () {

	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.collide(this.player,this.blackbar,this.gooutside,null,this);

	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;
	


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('up');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }



    },

    render: function () {

	if(gettingflowers == true){
		this.game.debug.text("Flowers: " + flowerpoint, 50,480);
	}       
	this.game.debug.text("Money: " + money, 400,50);
       this.game.debug.text("Time Remaining: " + timeleft, 50, 50);
	

    }

};


//  Outside //////////////////////////////////////////////////////////

P2Game.Outside = function (game) {
	this.player;
	this.map;
	this.bg;
	this.layer;
	this.cursors;
	this.facing = 'left';
	

};

P2Game.Outside.prototype = {

    create: function () {

	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'background');
	//this.bg.scale.set(.5,1);
	
	this.map = this.game.add.tilemap('level1');
	this.map.addTilesetImage('outdoortile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	//if(flowerpoint == 0){
		this.game.time.events.repeat(Phaser.Timer.SECOND * .0000001, 200, this.addflowers,this);

	//}

	this.blackbar = this.game.add.sprite(600,435,'blackbar'); //435
	this.blackbar.scale.set(1,2);
	this.game.physics.arcade.enable(this.blackbar);
	this.blackbar.body.immovable = true;
	
	this.blackbar2 = this.game.add.sprite(1020,228,'blackbar');
	this.blackbar2.scale.set(.9,3);
	this.game.physics.arcade.enable(this.blackbar2);
	this.blackbar2.body.immovable = true;
	
	this.blackbar3 = this.game.add.sprite(1655,398,'blackbar');
	this.blackbar3.scale.set(.35,3);
	this.game.physics.arcade.enable(this.blackbar3);
	this.blackbar3.body.immovable = true;

	this.hospital = this.game.add.sprite(600,300,'hospital');
	this.game.physics.arcade.enable(this.hospital);
	this.hospital.body.immovable = true;

	this.flower = this.game.add.sprite(1000,100,'flower');
	this.game.physics.arcade.enable(this.flower);
	this.flower.body.immovable = true;

	this.witch = this.game.add.sprite(1600,250,'witch');
	this.game.physics.arcade.enable(this.witch);
	this.witch.scale.set(.8,.8);
	this.witch.body.immovable = true;
	
	this.flowers = game.add.group();
	this.flowers.enableBody = true;

	//this.redflower1 = this.game.add.sprite(10,200,'redflower);
	//this.game.physics.arcade.enable(this.redflower1);


if(locationy == "hospital"){
	this.player = this.game.add.sprite(600,480,'player');
}
if(locationy == "flowershop"){
	this.player = this.game.add.sprite(1050,280,'player');
}
if(locationy == "witchshop"){
	this.player = this.game.add.sprite(1650,450,'player');
}
	//this.player = this.game.add.sprite(1900,50,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('left', [3,4,5], 3, true);
    //player.animations.add('turn', [4], 20, true);
    	this.player.animations.add('right', [6,7,8], 3, true);
    	this.player.animations.add('idle', [0,1,2], 3, true);
    	this.player.animations.add('up', [9,10,11], 3, true);
	this.player.body.collideWorldBounds = true;
	//this.player.scale.set(4.5,4.5);
	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
	
	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 3000, this.minustime,this);
	
	

    },

   enterhospital: function(){
	this.state.start('InHospital');
	
},


    minustime: function(){
	timeleft --;

},

   enterflowershop: function(){
	this.state.start('InFlowerShop');
	
},

   enterwitchshop: function(){
	this.state.start('InWitchShop');
	
},

   killflower: function(body1,body2){
	if(gettingflowers == true){
	body2.kill();
	flowerpoint++;
	}
},

   addflowers: function(){
	flowers2 = this.flowers.create(game.world.randomX, game.world.randomY, 'redflower');
	game.physics.enable(flowers2, Phaser.Physics.ARCADE);
	flowers2.scale.set(.05,.05);

},
    
    update: function () {
	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.overlap(this.player,this.flowers,this.killflower,null,this);
	this.game.physics.arcade.collide(this.player,this.witch);
	//this.game.physics.arcade.collide(this.player,this.flower);
	this.game.physics.arcade.collide(this.hospital,this.player);
	this.game.physics.arcade.overlap(this.blackbar,this.player,this.enterhospital,null,this);
	this.game.physics.arcade.overlap(this.blackbar2,this.player,this.enterflowershop,null,this);
	this.game.physics.arcade.overlap(this.blackbar3,this.player,this.enterwitchshop,null,this);
	

    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('up');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }


    },


    render: function () {
	
	this.game.debug.text("Time Remaining: " + timeleft, 50, 50);
	if(gettingflowers == true){
		this.game.debug.text("Flowers: " + flowerpoint, 50,480);
	}       
	this.game.debug.text("Money: " + money, 400,50);


    }

};


//////////InFlowerShop/////////////////////////////
P2Game.InFlowerShop = function (game) {

	this.player;
	this.bg;
	this.layer;

},

P2Game.InFlowerShop.prototype = {

preload: function () {
 

    },

    create: function () {
	locationy = "flowershop";

        //this.game.stage.backgroundColor = '#806000';
	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'flowerbackground');
	//this.bg.scale.set(2,2);

	this.blackbar = this.game.add.sprite(850,590,'blackbar'); //435
	this.blackbar.scale.set(1,2);
	this.game.physics.arcade.enable(this.blackbar);
	this.blackbar.body.immovable = true;
	
	this.map = this.game.add.tilemap('flowermap');
	this.map.addTilesetImage('flowertile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.flowerlady = this.game.add.sprite(500,350,'flowersprite');
	this.game.physics.arcade.enable(this.flowerlady);
	this.flowerlady.body.collideWorldBounds = true;
	this.flowerlady.animations.add('left', [3,4,5], 3, true);
    	this.flowerlady.animations.add('right', [6,7,8], 3, true);
    	this.flowerlady.animations.add('idle', [0,1,2], 3, true);
    	this.flowerlady.animations.add('up', [9,10,11], 3, true);


	this.player = this.game.add.sprite(920,540,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('left', [3,4,5], 3, true);
    	this.player.animations.add('right', [6,7,8], 3, true);
    	this.player.animations.add('idle', [0,1,2], 3, true);
    	this.player.animations.add('up', [9,10,11], 3, true);


	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 3000, this.minustime,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 3000, this.flowerladymove,this);
    },


    gooutside: function(){
	this.state.start('Outside');
},


    minustime: function(){
	timeleft --;
},

   flowerladymove: function(){
	this.flowerlady.body.velocity.x = Math.random()*(101)+100*-1^(Math.random());
	this.flowerlady.body.velocity.y = Math.random()*(101)+100*-1^(Math.random());
},

   stopmoving: function(){
	this.flowerlady.body.velocity.x = 0;
	this.flowerlady.body.velocity.y = 0;
	gettingflowers = true;
	if(flowerpoint >=150){
		money =  money + flowerpoint;
		flowerpoint = 0;
	}
},

 
   
   
    update: function () {
	
	this.game.physics.arcade.overlap(this.player,this.flowerlady,this.stopmoving,null,this);

	this.game.physics.arcade.collide(this.flowerlady,this.layer);

	if(this.flowerlady.body.velocity.x > 0 && this.flowerlady.body.velocity.x > this.flowerlady.body.velocity.y){
		this.flowerlady.animations.play('right');
}
	else if (this.flowerlady.body.velocity.x < 0 && this.flowerlady.body.velocity.x < this.flowerlady.body.velocity.y){
		this.flowerlady.animations.play('left');
}
	else if(this.flowerlady.body.velocity.y > 0 && this.flowerlady.body.velocity.y > this.flowerlady.body.velocity.x){
		this.flowerlady.animations.play('up');
}
	else{
		this.flowerlady.animations.play('idle');
}


	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.collide(this.player,this.blackbar,this.gooutside,null,this);

	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;
	


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('up');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }



    },

    render: function () {

       

       this.game.debug.text("Time Remaining: " + timeleft, 50, 50);
	if(gettingflowers == true){
		this.game.debug.text("Flowers: " + flowerpoint, 50,480);
	}       
	this.game.debug.text("Money: " + money, 400,50);



    }

};




//////////InWitchShop/////////////////////////////
P2Game.InWitchShop = function (game) {

	this.player;
	this.bg;
	this.layer;
	this.stop = false;

},

P2Game.InWitchShop.prototype = {

preload: function () {
 

    },

    create: function () {
	locationy = "witchshop";

        //this.game.stage.backgroundColor = '#806000';
	this.bg = game.add.tileSprite(0, 0, 2000, 600, 'witchbackground');
	//this.bg.scale.set(2,2);

	this.blackbar = this.game.add.sprite(870,590,'blackbar'); //435
	this.blackbar.scale.set(1,2);
	this.game.physics.arcade.enable(this.blackbar);
	this.blackbar.body.immovable = true;
	
	this.map = this.game.add.tilemap('witchmap');
	this.map.addTilesetImage('witchtile');
    	this.layer =this. map.createLayer('Tile Layer 1');
    	this.layer.resizeWorld();
 	this.map.setCollisionBetween(1, 12);

	this.potion1 = this.game.add.sprite(1500,400,'potion1');
	this.game.physics.arcade.enable(this.potion1);
	this.potion1.body.immovable = true;
	this.potion1.scale.set(.3,.3);

	this.potion2 = this.game.add.sprite(700,80,'potion2');
	this.game.physics.arcade.enable(this.potion2);
	this.potion2.body.immovable = true;
	this.potion2.scale.set(.3,.3);

	this.potion3 = this.game.add.sprite(1300,100,'potion3');
	this.game.physics.arcade.enable(this.potion3);
	this.potion3.body.immovable = true;
	this.potion3.scale.set(.3,.3);

	this.potion4 = this.game.add.sprite(500,400,'potion4');
	this.game.physics.arcade.enable(this.potion4);
	this.potion4.body.immovable = true;
	this.potion4.scale.set(.3,.3);

	this.potion5 = this.game.add.sprite(1000,200,'potion5');
	this.game.physics.arcade.enable(this.potion5);
	this.potion5.body.immovable = true;
	this.potion5.scale.set(.3,.3);

	this.witchlady = this.game.add.sprite(900,400, 'witchsprite');
	this.game.physics.arcade.enable(this.witchlady);
	this.witchlady.animations.add('left', [3,4,5], 3, true);
    	this.witchlady.animations.add('right', [6,7,8], 3, true);
    	this.witchlady.animations.add('idle', [0,1,2], 3, true);
    	this.witchlady.animations.add('up', [9,10,11], 3, true);

	this.player = this.game.add.sprite(920,540,'player');
	this.game.physics.arcade.enable(this.player);
	this.player.animations.add('left', [3,4,5], 3, true);
    	this.player.animations.add('right', [6,7,8], 3, true);
    	this.player.animations.add('idle', [0,1,2], 3, true);
    	this.player.animations.add('up', [9,10,11], 3, true);


	this.game.camera.follow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();

	this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 3000, this.minustime,this);
	this.game.time.events.repeat(Phaser.Timer.SECOND * 3, 3000, this.witchladymove,this);


	
    
},

   witchladymove: function(){
	this.witchlady.body.velocity.x = Math.random()*(101)+100*-1^(Math.random());
	this.witchlady.body.velocity.y = Math.random()*(101)+100*-1^(Math.random());
},

    minustime: function(){
	timeleft --;
},
   
    gooutside: function(){
	this.state.start('Outside');
},

   pausemovement: function(){
	this.witchlady.body.velocity.x = 0;
	this.witchlady.body.velocity.y = 0;
},


    update: function () {

	
	this.game.physics.arcade.collide(this.witchlady,this.layer);
	this.game.physics.arcade.collide(this.player,this.layer);
	this.game.physics.arcade.collide(this.player,this.blackbar,this.gooutside,null,this);

	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;

	this.game.physics.arcade.overlap(this.player,this.witchlady,this.pausemovement,null,this);
	

if(this.witchlady.body.velocity.x > 0 && this.witchlady.body.velocity.x > this.witchlady.body.velocity.y){
		this.witchlady.animations.play('right');
}
	else if (this.witchlady.body.velocity.x < 0 && this.witchlady.body.velocity.x < this.witchlady.body.velocity.y){
		this.witchlady.animations.play('left');
}
	else if(this.witchlady.body.velocity.y > 0 && this.witchlady.body.velocity.y > this.witchlady.body.velocity.x){
		this.witchlady.animations.play('up');
}
	else{
		this.witchlady.animations.play('idle');
}


if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing != 'left')
        {
            this.player.animations.play('left');
            this.facing = 'left';
        }
    }
else if (this.cursors.down.isDown)
    {
        this.player.body.velocity.y = 200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('idle');
            this.facing = 'idle';
        }
    }
else if (this.cursors.up.isDown)
    {
        this.player.body.velocity.y = -200;

        if (this.facing != 'idle')
        {
            this.player.animations.play('up');
            this.facing = 'idle';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;
	        if (this.facing != 'right')
        {
            this.player.animations.play('right');
            this.facing = 'right';
        }


    }
     else
    {
        if (this.facing != 'idle')
        {
            this.player.animations.stop();

            if (this.facing == 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }



    },

    render: function () {

       

       this.game.debug.text("Time Remaining: " + timeleft, 50, 50);
	if(gettingflowers == true){
		this.game.debug.text("Flowers: " + flowerpoint, 50,480);
	}       
	this.game.debug.text("Money: " + money, 400,50);


    }

};



game.state.add('Boot', P2Game.Boot);
game.state.add('InWitchShop', P2Game.InWitchShop);
game.state.add('InHospital', P2Game.InHospital);
game.state.add('Preload', P2Game.Preload);
game.state.add('Outside', P2Game.Outside);
game.state.add('InFlowerShop', P2Game.InFlowerShop);


game.state.start('Boot');

//http://fc05.deviantart.net/fs70/i/2010/059/2/6/Green_Grass_Texture_01_by_goodtextures.jpg
//http://sr.photos2.fotosearch.com/bthumb/CSP/CSP991/k12164140.jpg
//http://sr.photos3.fotosearch.com/bthumb/CSP/CSP991/k11905391.jpg
//http://static6.depositphotos.com/1002015/655/v/950/depositphotos_6550816-Haunted-halloween-witch-house....jpg
//http://3.imimg.com/data3/QP/HB/IMFCP-3130063/sites-default-files-images-sandy-20brown_0-thumbnail-250x250.jpg
//http://enisma.com/dark-wood-floor-pattern-ideas-amazing-7-design-awesome.html
//https://farm8.staticflickr.com/7033/6690036699_abfc7aece3_n.jpg
//http://s818.photobucket.com/user/qtpi0121/media/-RTP%20Edits-/Witch.png.html

