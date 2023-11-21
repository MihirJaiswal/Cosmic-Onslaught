const scoreEL = document.querySelector('#score')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1200
canvas.height = 600


//player creation
class Player {
    constructor(){
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.rotation = 0
        this.opacity = 1

        const image = new Image()
        image.src = 'assests/spaceShip.png'
        image.onload = () => {
            const scale = 0.12
            this.image = image
            this.width = image.width * scale
            this. height = image.height * scale
            this.position = {
                x: canvas.width /2 - this.width/2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
       /*  c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height ) */
        
        c.save()
        c.globalAlpha = this.opacity
        c.translate(
        player.position.x + player.width / 2,
        player.position.y + player.height/2
        )

        c.rotate(this.rotation)

        c.translate(
        -player.position.x - player.width / 2,
        -player.position.y - player.height/2
        )

        c.drawImage
        (this.image,
        this.position.x,
        this.position.y, 
        this.width, 
        this.height
        )
        c.restore()
    }

    update() {
        if (this.image) {
        this.draw()
        this.position.x += this.velocity.x
        }
    }

}

class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Particle {
    constructor({position, velocity, radius, color, fades }){
        this.position = position
        this.velocity = velocity

        this.radius = radius
        this.color = color
        this.opacity = 1
        this.fades = fades
    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath
        c.restore()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.fades) this.opacity -= 0.01
    }
}

class InvaderProjectile {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;

        this.width = 3
        this.height = 10
    }

    draw() {
        c.fillStyle = 'white'
        c.fillRect(this.position.x, this.position.y, this.width,
            this.height)
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


class Invader {
    constructor({position}){
        
        this.velocity = {
            x: 0,
            y: 0
        }


        const image = new Image()
        image.src = 'assests/invader.png'
        image.onload = () => {
            const scale = 0.09       
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }

    draw() {
       /*  c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height ) */
        c.drawImage(
        this.image,
        this.position.x,
        this.position.y, 
        this.width, 
        this.height
        )
     
    }

    update({velocity}) {
        if (this.image) {
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
        }
    }

    shoot(invaderProjectiles) {
        invaderProjectiles.push(
            new InvaderProjectile({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }))
    }

}


class Grid {
    constructor(){
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []
        
        const columns = Math.floor(Math.random() * 8 +5)
        const rows = Math.floor(Math.random() * 4 + 2)

        this.width = columns * 60

        for(let x = 0; x < columns; x++){
            for(let y = 0; y < rows; y++){
            this.invaders.push(
                new Invader({
                position: {
                x: x * 50,
                y : y * 50
            }
         })
      )
    }
}
    console.log(this.invaders)
    }

    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}

const player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []

const keys = {
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    space: {
        pressed: false
    }
}


let frames = 0
let randomInterval = Math.floor(Math.random()* 500 + 500)
let game = {
    over: false,
    active: true
}

let score = 0

for(let i = 0; i < 100; i++){
    particles.push(
        new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() *canvas.height
        },
        velocity: {
            x: 0,
            y: 0.4
        },
        radius: Math.random() * 3,
        color: 'white'
    })
)
}

function createParticles({object, color, fades}) {
    for(let i = 0; i < 12; i++){
        particles.push(
            new Particle({
            position: {
                x: object.position.x + object.width/2,
                y: object.position.y + object.height/2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color,
            fades
    
        })
    )
    }
}

//animation loop taki image baar baar draw ho 
function animate() {
    if(!game.active) return
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    particles.forEach((particle, i) => {
        if(particle.position.y - particle.radius >= canvas.height){
            particle.position.x = Math.random() * canvas.width
            particle.position.y = Math.random() * canvas.height
        }
        if (particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(i, 1)
            },0)
        } else {
            particle.update()
        }
        
    })
    console.log(particles)

    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.
            height >= canvas.height) {
                setTimeout(() => {
                    invaderProjectiles.splice(index, 1)
                },0)
            } else invaderProjectile.update()

            if (invaderProjectile.position.y + invaderProjectile.
                height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width
                >= player.position.x && invaderProjectile.position.x <= player.position.x +
                player.width) {
                    setTimeout(() => {
                        invaderProjectiles.splice(index, 1)
                        player.opacity = 0
                        game.over = true
                    },0)

                    setTimeout(() => {
                       game.active = false
                    },2000)

                    createParticles({
                        object: player,
                        color: 'orange',
                        fades: true
                    })
                }
    })

    projectiles.forEach((projectile, index) => {

        if(projectile.position.y + projectile.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index,1)
            }, 0)
           
        } else {
            projectile.update()
        }
    })

    grids.forEach((grid, grindIndex) => {
        grid.update()

        if (frames % 100 === 0 &&  grid.invaders.length > 0){
            grid.invaders [Math.floor(Math.random() * grid.invaders.
            length)].shoot(invaderProjectiles)
        }
       
        grid.invaders.forEach((invader, i) => {
            invader.update({ velocity: grid.velocity })

            projectiles.forEach((projectile, j) => {
                if( 
                projectile.position.y - projectile.radius <=
                invader.position.y + invader.height &&
                projectile.position.x + projectile.radius >=
                invader.position.x &&
                projectile.position.x - projectile.radius <= 
                invader.position.x + invader.width &&
                projectile.position.y + projectile.radius >= 
                invader.position.y
                ) {  
                  
                  setTimeout(() => {
                    const invaderFound = grid.invaders.find((invader2) => 
                        invader2 === invader
                    )
                    const projectileFound = projectiles.find(
                        (projectile2) => projectile2 === projectile)

                    if(invaderFound && projectileFound){
                        score += 100
                        scoreEL.innerHTML = score
                        createParticles({
                            object: invader,
                            color: '#989898',
                            fades: true
                        })
                    grid.invaders.splice(i, 1)
                    projectiles.splice(j, 1)

                    if(grid.invaders.length > 0) {
                        const firstInvader = grid.invaders[0]
                        const lastInvader = grid.invaders[grid.
                        invaders.length - 1]

                        grid.width = 
                         lastInvader.position.x -
                         firstInvader.position.x +
                          lastInvader.width
                         grid.position.x = firstInvader.position.x
                    }  else{
                        grids.splice(grindIndex, 1)
                    }
                    }
                  }, 0)  
                }
            })
             
        })
    })

    if(keys.ArrowLeft.pressed && player.position.x >= 0){
        player.velocity.x = -7
        player.rotation = -0.15
    }
    else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    }
    else{
        player.velocity.x = 0
        player.rotation = 0
    }

    
    //spawning enemies
    if(frames % randomInterval === 0){
        grids.push(new Grid())
        randomInterval = Math.floor(Math.random()* 500 + 500)
        frames = 0
        console.log(randomInterval)
    }
    //spawn projectiles
    
    frames++
}

animate()

addEventListener('keydown', ({key}) => {

    if (game.over) return
    switch (key) {
        case 'ArrowLeft':
            console.log('left')
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = true
            break
        case ' ':
            console.log('space')
            projectiles.push(new Projectile({
                position:{
                    x: player.position.x + player.width/2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            break
    }

})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('left')
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            console.log('right')
            keys.ArrowRight.pressed = false
            break
        case ' ':
            console.log('space')
            break
    }

})
