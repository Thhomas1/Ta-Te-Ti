const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext('2d') // para los canvas se necesita context :p
const arcadeFont = new FontFace('Arcade', 'url(./ARCADE_N.ttf)');  // que es esto? ni idea a ya se el font

arcadeFont.load().then(function(font){

  document.fonts.add(font);
  console.log('Arcade Font loaded'); // para ver el error  //* sacar!

});

let fps = 15; 
let gameOver = false;
let highscore = localStorage.getItem("highscore");



window.onload = () => {
    let gameOver = false;
    if(highscore == null) {
        localStorage.setItem("highscore", 0);
    }
    highscore = localStorage.getItem("highscore");
    gameLoop()
}

function gameLoop() {
    setInterval(show, 1000/fps)
}

function show() {
    update()
    draw()
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height) //aca no se si es canvas uwu
    snake.move()
    eatApple()
    checkHitWall()
}

function restart() {
  window.location.reload();


}



function eatApple() {
    if(snake.tail[snake.tail.length - 1].x == apple.x && 
        snake.tail[snake.tail.length - 1].y == apple.y){
        snake.tail[snake.tail.length] = {x:apple.x, y: apple.y} // cambiado esto para que la snake crezca 

            score = snake.tail.length - 1


            if (score > highscore) {
                // highscore = score;
                localStorage.setItem("highscore", score)  //seteamos tood pa q se aiga to'
                highscore = localStorage.getItem("highscore"); // para que se guarde el progresssssssssssso
            }


          apple = new Apple();


        }
}

function checkHitWall() {
    let headTail = snake.tail[snake.tail.length -1]

    if (headTail.x == - snake.size) {
        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;

        // heif(headTail.x == -snake.size) ;

      } else if (headTail.x == canvas.width) {
        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
        // heif(headTail.x == -snake.size);


      } else if (headTail.y == - snake.size) {
        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
        // heif(headTail.x == -snake.size);

      } else if (headTail.y == canvas.height) {
        gameOver = true;
        snake.tail = [headTail];
        headTail.x = canvas.width / 2;
        headTail.y = canvas.height / 2;
        // heif(headTail.y == canvas.height)
      } // seteamos funcionalidades para movimentasao
    }

    function draw() {
      // StyleSheet
      createRect(0,0,canvas.width, canvas.height, "black")
      createRect(0,0, canvas.width, canvas.height)


      for (let i = 0; i < snake.tail.length; i++){
        createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5,
           snake.size - 5, snake.size- 5, "white")

      } // seteamos el tamaño y el color del pana snake

 
    if(gameOver) {
      canvasContext.font = "20px Arial"
      canvasContext.fillStyle = "#00FF42"
      canvasContext.fillText("Sos malismo, apreta 'R' para reiniciar", canvas.width / 2 - 150, 300)    // ! Cambiar a espanolo!!!!
    }

      canvasContext.font = "20px Arial"
      canvasContext.fillStyle = "#00FF42"
      canvasContext.fillText("Puntos: " + (snake.tail.length -1),canvas.width - 150, 38)
      canvasContext.fillText("Record: " + highscore,canvas.width - 150, 70)     // ! Cambiar a espanolo!!!!
      

    if(!gameOver) {
      createRect(apple.x, apple.y, apple.size, apple.size, apple.color)  // seteado x2222
    }
  }

  function createRect(x,y,width, height,color, lineWidth=0) {
    canvasContext.lineWidth = lineWidth;
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height)
  }

  window.addEventListener("keydown", (event) => {
    if(!gameOver) {
      setTimeout(() => {
        if (event.keyCode == 37 && snake.rotateX != 1) {
          snake.rotateX = -1
          snake.rotateY = 0

        } else if (event.keyCode == 38 && snake.rotateY != 1) {
          snake.rotateX = 0
          snake.rotateY = -1


        } else if (event.keyCode == 39 && snake.rotateX != -1) {
          snake.rotateX = 1
          snake.rotateY = 0

        } else if (event.keyCode == 40 && snake.rotateY != -1) {
          snake.rotateX = 0
          snake.rotateY = 1
        }

      }, 1)
    }
      if(gameOver) {

        if(event.keyCode == 82) {
          console.log("Restart")
          restart()
      }
      }

  })

  class Snake {
    constructor(x, y, size) {
      this.x = x
      this.y = y
      this.size = size
      this.tail = [{x:this.x, y:this.y}]
      this.rotateX = 0
      this.rotateY = 1

    }

  
  move() {
    let newRect

    if(!gameOver) {

      if (this.rotateX == 1) {
        newRect = {
            x: this.tail[this.tail.length - 1].x + this.size,
            y: this.tail[this.tail.length - 1].y // + this.size,

        }
        
      } else if (this.rotateX == -1) {
        newRect = {
            x: this.tail[this.tail.length - 1].x - this.size,
            y: this.tail[this.tail.length - 1].y  // + this.size,
        }
      } else if (this.rotateY == 1) {
        newRect = {
        x: this.tail[this.tail.length - 1].x, // - this.size  //* no olvidaros las coma'''
        y: this.tail[this.tail.length - 1].y + this.size

             }
      } else if (this.rotateY == -1) {
          newRect = {
          x: this.tail[this.tail.length - 1].x, // - this.size  //* no olvidaros las coma avece''''
          y: this.tail[this.tail.length - 1].y - this.size

            }
          }
            this.tail.shift()
            this.tail.push(newRect)

        }
      }
    }
 
    class Apple{
      constructor(){
        let isTouching

        while (true) {
          isTouching = false;
          this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size 
          this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size


            for (let i = 0; i < snake.tail.length; i++) {
              if (this.x == snake.tail[i].x && this.y == snake.tail[i].y) {
                isTouching = true
              }
            }

            this.size = snake.size
            this.color = "red"  // setttt color rai naii

            if (!isTouching) {
              break;
            }
            if(isTouching) {

              gameOver = true;
            }   
          }
        }
    }

    const snake = new Snake(20,20,20)
    let apple = new Apple();
    




    


































































    

/* 
            _  _
           (.)(.)
          /  ()  \
        _ \ '--' / _
       { '-`""""`-' }
        `"/      \"`
          \      /
         _/  /\  \_
        {   /  \   }
         `"`    `"`
            Thomyyy
*/ 