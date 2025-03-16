// Juego de Arquería en GitHub con Phaser.js
// Usa el motor de física Matter.js para el cálculo de disparos

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            enableSleep: true
        }
    },
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);

// Escena del menú principal
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menu_bg', 'menu.png');
        this.load.image('play_bots', 'play_bots.png');
        this.load.image('play_online', 'play_online.png');
        this.load.image('shop', 'shop.png');
    }

    create() {
        this.add.image(400, 300, 'menu_bg');
        
        let playBots = this.add.image(400, 250, 'play_bots').setInteractive();
        let playOnline = this.add.image(400, 350, 'play_online').setInteractive();
        let shop = this.add.image(400, 450, 'shop').setInteractive();
        
        playBots.on('pointerdown', () => {
            this.scene.start('GameScene', { mode: 'bots' });
        });
        
        playOnline.on('pointerdown', () => {
            this.scene.start('GameScene', { mode: 'online' });
        });
        
        shop.on('pointerdown', () => {
            // Implementar tienda de skins
        });
    }
}

// Escena del juego
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.mode = data.mode;
    }

    preload() {
        this.load.image('bow', 'bow.png'); // Cargar imagen del arco
        this.load.image('arrow', 'arrow.png'); // Cargar imagen de la flecha
        this.load.image('target', 'target.png'); // Cargar imagen del objetivo
    }

    create() {
        this.bow = this.add.image(100, 300, 'bow');
        this.arrow = this.matter.add.image(120, 300, 'arrow');
        this.arrow.setStatic(true);
        
        this.target = this.matter.add.image(700, 300, 'target');
        this.target.setStatic(true);

        this.input.on('pointerdown', () => {
            if (!this.shooting) {
                this.power = 0;
                this.shooting = true;
            }
        });
        
        this.input.on('pointerup', () => {
            if (this.shooting) {
                this.arrow.setStatic(false);
                this.arrow.setVelocity(this.power * 0.2, -this.power * 0.1);
                this.shooting = false;
            }
        });
        
        if (this.mode === 'bots') {
            this.addBots();
        } else if (this.mode === 'online') {
            this.startOnlineMatch();
        }
    }

    addBots() {
        // Implementar lógica de bots
    }

    startOnlineMatch() {
        // Implementar lógica multijugador
    }

    update() {
        if (this.shooting) {
            this.power += 5;
            if (this.power > 100) this.power = 100;
        }
    }
}
