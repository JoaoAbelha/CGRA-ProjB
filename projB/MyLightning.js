class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.flag = false;
    }

    initGrammar() {
        this.grammar = {
            "F": new MyQuadLightning(this.scene, 0.1),
            "X": new MyQuadLightning(this.scene, 0.1)
        };
    };

    startAnimation(t) {
        if (this.flag == true)
            return;

        this.axiom = "X";
        this.iterate();
        this.depth = 0 ;
        this.intialAnimationTime=t;
      
        this.xTranslation = (Math.random() * (25.0 - (-25.0)) + (-25.0)).toFixed(1);
        this.zTranslation = (Math.random() * (25.0 - (-25.0)) + (-25.0)).toFixed(1);
        this.flag = true;
        
    }

    update(t) {
        if (this.flag) {
            this.deltatime = t - this.intialAnimationTime;
            if (this.deltatime < 1000) {
                console.log(this.deltatime);
                this.depth += 1000/this.axiom.length;
            }
            else {
                this.flag = false;
                this.depth = 0;
            }
        }
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.xTranslation, 60, this.zTranslation);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i = 0; i < this.depth; ++i) {

            // verifica se sao caracteres especiais
            switch (this.axiom[i]) {
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                case "\\":
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;
                case "/":
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;
                case "^":
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;
                case "&":
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive = this.grammar[this.axiom[i]];

                    if (primitive) {
                        this.scene.translate(0, 1, 0);
                        primitive.display();
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}