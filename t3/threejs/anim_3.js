function Fly() {}

Object.assign( Fly.prototype, {

    init: function() {

        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/1.2 }, 100)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let  [x, y, z]  = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                right_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
            .repeat(18)
            .yoyo(true);

        let upperArmTween2 = new TWEEN.Tween( {theta:0} )
            .to( {theta:Math.PI/1.2 }, 100)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
            .repeat(18)
            .yoyo(true);

        let torsoTween = new TWEEN.Tween( {x:0, y:0, z:0} )
            .to( {x:0, y:6, z:0}, 2000)
            .onUpdate(function(){
                let torso =  robot.getObjectByName("torso");

                torso.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(this._object.x, this._object.y, this._object.z) )


                    torso.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })
            .delay(250)
        
        let torsoTweenBack = new TWEEN.Tween( {x:0, y:6, z:0} )
            .to( {x:0, y:0, z:0}, 1000)
            .easing(TWEEN.Easing.Bounce.Out)
            .onUpdate(function(){
                let torso =  robot.getObjectByName("torso");

                torso.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(this._object.x, this._object.y, this._object.z) )


                    torso.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let upperArmTweenBack = new TWEEN.Tween( {theta:Math.PI/1.2} )
            .to( {theta:0 }, 400)
            .onUpdate(function(){
                let right_upper_arm =  robot.getObjectByName("right_upper_arm");
                let  [x, y, z]  = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                right_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                right_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        let upperArmTween2Back = new TWEEN.Tween( {theta:Math.PI/1.2} )
            .to( {theta:0 }, 400)
            .onUpdate(function(){
                let left_upper_arm =  robot.getObjectByName("left_upper_arm");
                let  [x, y, z]  = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z]; 
                let pivot = {x:0, y:2, z:0};

                left_upper_arm.matrix.makeTranslation(0, 0, 0)
                    .multiply( new THREE.Matrix4().makeTranslation(x, y, z) )
                    .multiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z) )
                    .multiply( new THREE.Matrix4().makeRotationZ(-this._object.theta) )
                    .multiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z) )


                left_upper_arm.updateMatrixWorld(true);
                stats.update();
                renderer.render(scene, camera);    
            })

        upperArmTween.start();  
        upperArmTween2.start();
        torsoTween.start();  
        torsoTween.chain(torsoTweenBack, upperArmTweenBack, upperArmTween2Back);
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});




